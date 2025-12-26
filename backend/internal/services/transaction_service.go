package services

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/interfaces"
)

type TransactionService struct {
	userRepo        interfaces.UserRepository
	portfolioRepo   interfaces.PortfolioRepository
	transactionRepo interfaces.TransactionRepository
	stockCache      *cache.StockCache
	networthService *NetworthService
}

// this is the constructor or dependency
func NewTransactionService(
	userRepo interfaces.UserRepository,
	portfolioRepo interfaces.PortfolioRepository,
	transactionRepo interfaces.TransactionRepository,
	stockCache *cache.StockCache,
	networthService *NetworthService,
) *TransactionService {
	return &TransactionService{
		userRepo:        userRepo,
		portfolioRepo:   portfolioRepo,
		transactionRepo: transactionRepo,
		stockCache:      stockCache,
		networthService: networthService,
	}
}

func (s *TransactionService) Buy(
	ctx context.Context,
	userID uuid.UUID,
	symbol string,
	qty decimal.Decimal,
) error {

	if qty.LessThanOrEqual(decimal.Zero) {
		return errors.New("invalid quantity")
	}

	//get live prices heheh
	priceFloat, err := s.stockCache.GetPrice(symbol)
	if err != nil {
		return errors.New("price unavailable")
	}

	price := decimal.NewFromFloat(priceFloat)
	total := price.Mul(qty)

	//fake balance is deducted here
	if err := s.userRepo.DeductFakeBalance(userID, total.InexactFloat64()); err != nil {
		return errors.New("insufficient balance")
	}

	//we update the portfolio
	if err := s.portfolioRepo.BuyStock(&models.PortfolioItem{
		UserID:      userID,
		StockSymbol: symbol,
		Quantity:    int(qty.IntPart()),
		AvgPrice:    priceFloat,
	}); err != nil {
		return err
	}

	//persist transaction
	tx := &models.Transaction{
		ID:        uuid.New(),
		User_ID:   userID,
		Symbol:    symbol,
		Side:      models.SideBuy,
		Price:     price,
		Quantity:  qty,
		Total:     total,
		CreatedAt: time.Now().UTC(),
	}

	if err := s.transactionRepo.AddTransaction(tx); err != nil {
		return err
	}

	go s.networthService.RecalculateNetworth(ctx, userID)

	return nil
}

//sell stock service

func (s *TransactionService) Sell(
	ctx context.Context,
	userID uuid.UUID,
	symbol string,
	qty decimal.Decimal,
) error {

	if qty.LessThanOrEqual(decimal.Zero) {
		return errors.New("invalid quantity")
	}

	holding, err := s.portfolioRepo.GetStockHolding(userID, symbol)
	if err != nil || holding.Quantity < int(qty.IntPart()) {
		return errors.New("not enough holdings")
	}

	priceFloat, err := s.stockCache.GetPrice(symbol)
	if err != nil {
		return errors.New("price unavailabe")
	}

	price := decimal.NewFromFloat(priceFloat)
	total := price.Mul(qty)

	//update the portfolio
	if err := s.portfolioRepo.SellStock(
		userID,
		symbol,
		int(qty.IntPart()),
	); err != nil {
		return err
	}

	if err := s.userRepo.IncrementFakeBalance(
		userID,
		total.InexactFloat64(),
	); err != nil {
		return err
	}

	//persist transaction that is the
	// transaction that will be saved
	tx := &models.Transaction{
		ID:        uuid.New(),
		User_ID:   userID,
		Symbol:    symbol,
		Side:      models.SideSell,
		Price:     price,
		Quantity:  qty,
		Total:     total,
		CreatedAt: time.Now().UTC(),
	}

	if err := s.transactionRepo.AddTransaction(tx); err != nil {
		return err
	}

	//we use goroutine here to recalculate the networth
	// in the background its executes successfully
	go s.networthService.RecalculateNetworth(ctx, userID)

	return nil
}

func (s *TransactionService) GetTransactions(
	ctx context.Context,
	userID uuid.UUID,
) ([]models.Transaction, error) {
	return s.transactionRepo.GetTransaction(userID)
}

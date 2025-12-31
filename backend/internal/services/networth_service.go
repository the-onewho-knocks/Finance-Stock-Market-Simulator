package services

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/interfaces"
)

type NetworthService struct {
	networthRepo interfaces.NetworthRepository
	userRepo     interfaces.UserRepository
	portfolioSvc *PortfolioService
	expenseSvc   *ExpenseService
}

func NewNetworthService(
	networthRepo interfaces.NetworthRepository,
	userRepo interfaces.UserRepository,
	portfolioSvc *PortfolioService,
	expenseSvc *ExpenseService,
) *NetworthService {
	return &NetworthService{
		networthRepo: networthRepo,
		userRepo:     userRepo,
		portfolioSvc: portfolioSvc,
		expenseSvc:   expenseSvc,
	}
}

// this is the core aggregation here
func (s *NetworthService) RecalculateNetworth(
	ctx context.Context,
	userID uuid.UUID,
) (*models.NetWorthBreakdown, error) {

	user, err := s.userRepo.GetUserByEmail(userID.String())
	if err != nil {
		return nil, err
	}

	cash := decimal.NewFromFloat(float64(user.Fake_Balance))

	portfolioValue, TotalInvested, err :=
		s.portfolioSvc.GetPortfolioMetrics(ctx, userID)
	if err != nil {
		return nil, err
	}

	totalExpenses, err :=
		s.expenseSvc.GetTotalExpenses(ctx, userID)
	if err != nil {
		return nil, err
	}

	current := portfolioValue.Add(cash).Sub(totalExpenses)
	now := time.Now().UTC()

	breakdown := &models.NetWorthBreakdown{
		UserID:          userID,
		PortfolioValue:  portfolioValue,
		CashBalance:     cash,
		TotalExpenses:   totalExpenses,
		TotalInvested:   TotalInvested,
		CurrentNetWorth: current,
		UpdatedAt:       now,
	}

	if err := s.networthRepo.SaveBreakdown(breakdown); err != nil {
		return nil, err
	}

	if err := s.networthRepo.SaveNetworth(&models.Networth{
		UserID: userID,
		Total:  current.InexactFloat64(),
	}); err != nil {
		return nil, err
	}

	if err := s.networthRepo.SaveNetWorthHistory(&models.NetWorthHistory{
		UserID:    userID,
		NetWorth:  current,
		Timestamp: now,
	}); err != nil {
		return nil, err
	}

	return breakdown, nil
}

func (s *NetworthService) GetLatestNetworth(
	ctx context.Context,
	userID uuid.UUID,
) (*models.Networth, error) {
	return s.networthRepo.GetLatestNetworth(userID)
}

func (s *NetworthService) GetNetworthHistory(
	ctx context.Context,
	userID uuid.UUID,
) ([]models.Networth, error) {
	return s.networthRepo.GetNetworthHistory(userID)
}

func (s *NetworthService) GetNetworthBreakdown(
	ctx context.Context,
	userID uuid.UUID,
) (*models.NetWorthBreakdown, error) {
	return s.networthRepo.GetBreakdown(userID)
}

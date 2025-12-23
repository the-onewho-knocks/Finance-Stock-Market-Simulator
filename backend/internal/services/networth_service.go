package services

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
	repo "github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/interfaces"
)

type NetworthService struct {
	networthRepo    repo.NetworthRepository
	userRepo        repo.UserRepository
	portfolioSvc    *PortfolioService
	expenseSvc      *ExpenseService
}

func NewNetworthService(
	networthRepo repo.NetworthRepository,
	userRepo repo.UserRepository,
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

//
// ----------------------------------------------------
// CORE AGGREGATION LOGIC
// ----------------------------------------------------
//

// RecalculateNetworth recomputes net worth and persists snapshots
func (s *NetworthService) RecalculateNetworth(
	ctx context.Context,
	userID string,
) (*models.NetWorthBreakdown, error) {

	uid, err := uuid.Parse(userID)
	if err != nil {
		return nil, err
	}

	// 1️⃣ Cash balance
	user, err := s.userRepo.GetUserByID(userID)
	if err != nil {
		return nil, err
	}
	cash := decimal.NewFromFloat(float64(user.Fake_Balance))

	// 2️⃣ Portfolio value + invested
	portfolioValueFloat, totalInvestedFloat, err :=
		s.portfolioSvc.GetPortfolioMetrics(ctx, userID)
	if err != nil {
		return nil, err
	}

	portfolioValue := decimal.NewFromFloat(portfolioValueFloat)
	totalInvested := decimal.NewFromFloat(totalInvestedFloat)

	// 3️⃣ Total expenses
	expensesFloat, err := s.expenseSvc.GetTotalExpenses(ctx, userID)
	if err != nil {
		return nil, err
	}
	totalExpenses := decimal.NewFromFloat(expensesFloat)

	// 4️⃣ Net worth formula
	netWorth := portfolioValue.
		Add(cash).
		Sub(totalExpenses)

	// 5️⃣ Build breakdown
	breakdown := &models.NetWorthBreakdown{
		UserID:          uid,
		PortfolioValue:  portfolioValue,
		CashBalance:     cash,
		TotalExpenses:   totalExpenses,
		TotalInvested:   totalInvested,
		CurrentNetWorth: netWorth,
		UpdatedAt:       time.Now().UTC(),
	}

	// 6️⃣ Persist breakdown
	_ = s.networthRepo.SaveBreakdown(breakdown)

	// 7️⃣ Persist snapshot (simple)
	_ = s.networthRepo.SaveNetworth(&models.Networth{
		UserID: userID,
		Total:  netWorth.InexactFloat64(),
	})

	// 8️⃣ Persist history
	_ = s.networthRepo.SaveNetWorthHistory(&models.NetWorthHistory{
		UserID:    uid,
		NetWorth: netWorth,
		Timestamp: time.Now().UTC(),
	})

	return breakdown, nil
}

//
// ----------------------------------------------------
// READ OPERATIONS
// ----------------------------------------------------
//

// GetLatestNetworth returns last computed net worth
func (s *NetworthService) GetLatestNetworth(
	ctx context.Context,
	userID string,
) (*models.Networth, error) {
	return s.networthRepo.GetLatestNetworth(userID)
}

// GetNetworthHistory returns net worth timeline
func (s *NetworthService) GetNetworthHistory(
	ctx context.Context,
	userID string,
) ([]models.Networth, error) {
	return s.networthRepo.GetNetworthHistory(userID)
}

// GetNetworthBreakdown returns latest breakdown
func (s *NetworthService) GetNetworthBreakdown(
	ctx context.Context,
	userID string,
) (*models.NetWorthBreakdown, error) {
	return s.networthRepo.GetBreakdown(userID)
}

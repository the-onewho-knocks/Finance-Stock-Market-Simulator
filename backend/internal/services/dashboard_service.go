package services

import (
	"context"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
)

type DashboardService struct {
	networthService  *NetworthService
	portfolioService *PortfolioService
	expenseService   *ExpenseService
	cache            *cache.DashboardCache
}

func NewDashboardService(
	networthService *NetworthService,
	portfolioService *PortfolioService,
	expenseService *ExpenseService,
	cache *cache.DashboardCache,
) *DashboardService {
	return &DashboardService{
		networthService:  networthService,
		portfolioService: portfolioService,
		expenseService:   expenseService,
		cache:            cache,
	}
}

func (s *DashboardService) AggregateDashboard(
	ctx context.Context,
	userID uuid.UUID,
) (
	*models.NetWorthBreakdown,
	decimal.Decimal,
	[]models.Expense,
	error,
) {

	userKey := userID.String()

	// ================= NET WORTH =================
	var networth *models.NetWorthBreakdown

	if val, ok := s.cache.GetNetworth(ctx, userKey); ok {
		networth = &models.NetWorthBreakdown{
			UserID:          userID,
			CurrentNetWorth: decimal.NewFromFloat(val),
		}
	} else {
		nw, err := s.networthService.RecalculateNetworth(ctx, userID)
		if err == nil && nw != nil {
			networth = nw
			_ = s.cache.SetNetworth(ctx, userKey, nw.CurrentNetWorth.InexactFloat64())
		}
	}

	// ================= PORTFOLIO =================
	portfolioValue := decimal.Zero

	if val, ok := s.cache.GetPortfolioValue(ctx, userKey); ok {
		portfolioValue = decimal.NewFromFloat(val)
	} else {
		value, _, err := s.portfolioService.GetPortfolioMetrics(ctx, userID)
		if err == nil {
			portfolioValue = value
			_ = s.cache.SetPortfolioValue(ctx, userKey, value.InexactFloat64())
		}
	}

	// ================= EXPENSES =================
	expenses, _ := s.expenseService.ListExpenses(ctx, userID)

	return networth, portfolioValue, expenses, nil
}

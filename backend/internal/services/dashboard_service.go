package services

import (
	"context"
	"sync"

	"github.com/shopspring/decimal"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
)

type DashboardService struct {
	networthService  *NetworthService
	portfolioService *PortfolioService
	heatmapService   *HeatmapService
	expenseService   *ExpenseService
}

func NewDashboardService(
	networthService *NetworthService,
	portfolioService *PortfolioService,
	heatmapService *HeatmapService,
	expenseService *ExpenseService,
) *DashboardService {
	return &DashboardService{
		networthService:  networthService,
		portfolioService: portfolioService,
		heatmapService:   heatmapService,
		expenseService:   expenseService,
	}
}

// AggregateDashboardData ONLY aggregates domain data
func (s *DashboardService) AggregateDashboardData(
	ctx context.Context,
	userID string,
	symbols []string,
) (
	*models.NetWorthBreakdown,
	decimal.Decimal,
	*models.HeatmapResult,
	[]models.Expense,
	error,
) {

	var (
		networth       *models.NetWorthBreakdown
		portfolioValue decimal.Decimal
		heatmap        *models.HeatmapResult
		expenses       []models.Expense
	)

	wg := sync.WaitGroup{}
	wg.Add(4)

	// Networth
	go func() {
		defer wg.Done()
		nw, err := s.networthService.RecalculateNetworth(ctx, userID)
		if err == nil {
			networth = nw
		}
	}()

	// Portfolio value (read-only)
	go func() {
		defer wg.Done()
		val, err := s.portfolioService.GetPortfolioValue(ctx, userID)
		if err == nil {
			portfolioValue = decimal.NewFromFloat(val)
		}
	}()

	// Heatmap
	go func() {
		defer wg.Done()
		hm, err := s.heatmapService.BuildHeatmap(ctx, symbols)
		if err == nil {
			heatmap = hm
		}
	}()

	// Recent expenses (read-only)
	go func() {
		defer wg.Done()
		exp, err := s.expenseService.GetRecentExpenses(ctx, userID, 5)
		if err == nil {
			expenses = exp
		}
	}()

	wg.Wait()

	return networth, portfolioValue, heatmap, expenses, nil
}

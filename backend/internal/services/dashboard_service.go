package services

import (
	"context"
	"sync"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
)

type DashboardService struct {
	networthService  *NetworthService
	portfolioService *PortfolioService
	expenseService   *ExpenseService
	heatmapService   *HeatmapService
}

func NewDashboardService(
	networthService *NetworthService,
	portfolioService *PortfolioService,
	expenseService *ExpenseService,
	heatmapService *HeatmapService,
) *DashboardService {
	return &DashboardService{
		networthService:  networthService,
		portfolioService: portfolioService,
		expenseService:   expenseService,
		heatmapService:   heatmapService,
	}
}


func (s *DashboardService) AggregateDashboard(
	ctx context.Context,
	userID uuid.UUID,
	symbols []string,
) (
	*models.NetWorthBreakdown,
	decimal.Decimal,
	[]models.Expense,
	*models.HeatmapResult,
	error,
) {

	var (
		networth       *models.NetWorthBreakdown
		portfolioValue decimal.Decimal
		expenses       []models.Expense
		heatmap        *models.HeatmapResult
	)

	wg := sync.WaitGroup{}
	wg.Add(4)

	// Networth (heavy aggregation)
	go func() {
		defer wg.Done()
		nw, err := s.networthService.RecalculateNetworth(ctx, userID)
		if err == nil {
			networth = nw
		}
	}()

	// Portfolio value (light read)
	go func() {
		defer wg.Done()
		value, _, err := s.portfolioService.GetPortfolioMetrics(ctx, userID)
		if err == nil {
			portfolioValue = value
		}
	}()

	// Recent expenses (read-only)
	go func() {
		defer wg.Done()
		exp, err := s.expenseService.ListExpenses(ctx, userID)
		if err == nil {
			expenses = exp
		}
	}()

	// Heatmap (cached + external)
	go func() {
		defer wg.Done()
		hm, err := s.heatmapService.BuildHeatmap(ctx, symbols)
		if err == nil {
			heatmap = hm
		}
	}()

	wg.Wait()

	return networth, portfolioValue, expenses, heatmap, nil
}

package services

import (
	"context"
	"sync"

	"github.com/shopspring/decimal"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/interfaces"
)

type NetworthService struct {
	portfolioRepo interfaces.PortfolioRepository
	expenseRepo   interfaces.ExpenseRepository
	networthRepo  interfaces.NetworthRepository

	stockCache     *cache.StockCache
	dashboardCache *cache.DashBoardCache
}

//dependencys
func NewNetworthService(
	portfolioRepo interfaces.PortfolioRepository,
	expenseRepo interfaces.ExpenseRepository,
	networthRepo interfaces.NetworthRepository,

	stockCache *cache.StockCache,
	dashboardCache *cache.DashBoardCache,
) *NetworthService {
	return &NetworthService{
		portfolioRepo:  portfolioRepo,
		expenseRepo:    expenseRepo,
		networthRepo:   networthRepo,
		stockCache:     stockCache,
		dashboardCache: dashboardCache,
	}
}

//public api

// this function computes users net worth using concrrency
func (s *NetworthService) RecalculateNetworth(
	ctx context.Context,
	userID string,
) (*models.NetWorthBreakdown, error) {

	var(
		cashBalance decimal.Decimal
		portfolioVal decimal.Decimal
		totalExpenses decimal.Decimal
	)


	wg := sync.WaitGroup{}
	wg.Add(3) //that is we are executing 3 goroutines here

	//channel-based parallel computation
	errCh := make(chan error , 3)

	go func(){
		defer wg.Done()
		p , err := s.portfolioRepo.GetPortfolio()
	}
}

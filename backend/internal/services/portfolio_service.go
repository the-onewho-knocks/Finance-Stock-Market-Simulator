package services

import (
	"context"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/interfaces"
)

type PortfolioService struct {
	protfolioRepo interfaces.PortfolioRepository
	stockCache    *cache.StockCache
}

func NewPortfolioRepository(
	protfolioRepo interfaces.PortfolioRepository,
	stockCache *cache.StockCache,
) *PortfolioService {
	return &PortfolioService{
		protfolioRepo: protfolioRepo,
		stockCache:    stockCache,
	}
}

// this is for listing just uses the code in the pgx portfolioRepo
func (s *PortfolioService) GetPortfolio(
	ctx context.Context,
	userID uuid.UUID) ([]models.PortfolioItem, error) {
	return s.protfolioRepo.GetPortfolio(userID)
}

//aggregation function
//getPortfolioMetrics calculates market value and invested amount

func (s *PortfolioService) GetPortfolioMetrics(
	ctx context.Context,
	userID uuid.UUID,
) (portfolioValue decimal.Decimal, totalInvested decimal.Decimal, err error) {

	items, err := s.protfolioRepo.GetPortfolio(userID)
	if err != nil {
		return decimal.Zero, decimal.Zero, err
	}

	for _, item := range items {
		price, err := s.stockCache.GetPrice(item.StockSymbol)
		if err != nil {
			continue
		}

		qty := decimal.NewFromInt(int64(item.Quantity))
		marketValue := qty.Mul(decimal.NewFromFloat(price))
		invested := qty.Mul(decimal.NewFromFloat(item.AvgPrice))

		portfolioValue = portfolioValue.Add(marketValue)
		totalInvested = totalInvested.Add(invested)
	}
	return portfolioValue, totalInvested, nil
}

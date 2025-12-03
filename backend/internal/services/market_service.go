package services

import (
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
)

type MarketService struct {
	api        stockapi.Client
	stockCache *cache.StockCache
}

func NewMarketService(api stockapi.Client, stockCache *cache.StockCache) *MarketService {
	return &MarketService{
		api:        api,
		stockCache: stockCache,
	}
}

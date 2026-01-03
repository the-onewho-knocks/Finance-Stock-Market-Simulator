package services

import (
	"context"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
)

type HistoryService struct {
	api   stockapi.RapidApiClient
	cache *cache.HistoryCache
}

func NewHistoryService(
	api stockapi.RapidApiClient,
	cache *cache.HistoryCache,
) *HistoryService {
	return &HistoryService{
		api:   api,
		cache: cache,
	}
}

func (s *HistoryService) GetHistoricalPrices(
	stock string,
	period string,
) ([]stockapi.HistoricalPrice, error) {

	ctx := context.Background()

	// 1. Check cache
	if data, ok := s.cache.GetHistory(ctx, stock, period); ok {
		return data, nil
	}

	// 2. Fetch from API
	data, err := s.api.GetHistoricalPrices(stock, period)
	if err != nil {
		return nil, err
	}

	//3. Store in cache (fire-and-forget)
	_ = s.cache.SetHistory(ctx, stock, period, data)

	return data, nil
}

func (s *HistoryService) GetHistoricalStats(
	stock string,
	stats string,
) (stockapi.HistoricalStats, error) {

	ctx := context.Background()

	// Cache first
	if data, ok := s.cache.GetHistoryStats(ctx, stock, stats); ok {
		return data, nil
	}

	// API call
	data, err := s.api.GetHistoricalStats(stock, stats)
	if err != nil {
		return nil, err
	}

	// Cache result
	_ = s.cache.SetHistoryStats(ctx, stock, stats, data)

	return data, nil
}

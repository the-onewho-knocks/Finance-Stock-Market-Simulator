package services

import (
	"context"
	"time"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
)

type HistoryService struct {
	api stockapi.Client
}

func NewHistoryService(api stockapi.Client) *HistoryService {
	return &HistoryService{
		api: api,
	}
}

func (s *HistoryService) GetHistoricalPrices(
	ctx context.Context,
	symbol string,
	start time.Time,
	end time.Time,
	interval string,
) ([]stockapi.PriceData, error) {

	if symbol == "" {
		return nil, ErrInvalidSymbol
	}

	return s.api.GetHistoricalPrices(symbol, start, end, interval)
}

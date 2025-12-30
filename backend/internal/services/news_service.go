package services

import (
	"context"
	"errors"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
)

// NewsService handles all news-related business logic
type NewsService struct {
	api stockapi.Client
}

// constructor
func NewNewsService(api stockapi.Client) *NewsService {
	return &NewsService{
		api: api,
	}
}

var ErrInvalidSymbol = errors.New("invalid stock symbol")

// GetMarketNews returns general market news
func (s *NewsService) GetMarketNews(
	ctx context.Context,
) ([]stockapi.NewsItem, error) {

	// context can be used later for timeout / tracing
	return s.api.GetMarketNews()
}

// GetSymbolNews returns news related to a specific stock symbol
func (s *NewsService) GetSymbolNews(
	ctx context.Context,
	symbol string,
) ([]stockapi.NewsItem, error) {

	if symbol == "" {
		return nil, ErrInvalidSymbol
	}

	return s.api.GetSymbolNews(symbol)
}

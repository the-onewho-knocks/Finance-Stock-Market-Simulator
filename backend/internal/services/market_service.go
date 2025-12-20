package services

import (
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
)

type MarketService struct {
	api        stockapi.Client
	stockCache *cache.StockCache
}

// constructor
func NewMarketService(api stockapi.Client, stockCache *cache.StockCache) *MarketService {
	return &MarketService{
		api:        api,
		stockCache: stockCache,
	}
}

// get a sigle stock price(uses redis and fallback api)
func (s *MarketService) GetPrice(symbol string) (*stockapi.PriceData, error) {
	price, err := s.stockCache.GetPrice(symbol)
	if err == nil && price > 0 {
		change, _ := s.stockCache.GetChange(symbol)
		return &stockapi.PriceData{
			Symbol: symbol,
			Price:  price,
			Change: change,
		}, nil
	}
}

func (s *MarketService) GetPrices(symbol []string) ([]stockapi.PriceData, error) {

}

func (s *MarketService) PriceStream(symbols []string) (<-chan PriceData, error) {

}

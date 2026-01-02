package services

import (
	"encoding/json"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
)

type IndianStockService struct {
	api *stockapi.IndianStockClient
}

func NewIndianStockService(api *stockapi.IndianStockClient) *IndianStockService {
	return &IndianStockService{api: api}
}

func (s *IndianStockService) GetStockByNameRaw(name string) (json.RawMessage, error) {
	return s.api.GetStockByNameRaw(name)
}

package services

import (
	"context"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
)

type CompanyService struct {
	api stockapi.Client
}

func NewCompanyService(api stockapi.Client) *CompanyService {
	return &CompanyService{
		api: api,
	}
}

func (s *CompanyService) GetCompanyProfile(
	ctx context.Context,
	symbol string,
) (*stockapi.CompanyProfile, error) {

	if symbol == "" {
		return nil, ErrInvalidSymbol
	}

	return s.api.GetCompanyProfile(symbol)
}

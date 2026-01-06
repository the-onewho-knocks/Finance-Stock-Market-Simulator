package stockapi

import (
	"fmt"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
)

func (c *RapidApiClient) GetMarketTickersRaw(
	page int,
) (*models.MarketTickersResponse, error) {

	path := fmt.Sprintf(
		"/api/v2/markets/tickers?page=%d&type=STOCKS",
		page,
	)

	var resp models.MarketTickersResponse
	if err := c.doRequest(path, &resp); err != nil {
		return nil, err
	}

	return &resp, nil
}

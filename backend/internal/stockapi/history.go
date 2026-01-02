package stockapi

import "fmt"

func (c *RapidApiClient) GetHistoricalPrices(stock, period string) ([]HistoricalPrice, error) {
	var resp struct {
		Data []HistoricalPrice `json:"data"`
	}

	path := fmt.Sprintf(
		"/historical_data?stock_name=%s&period=%s&filter=price",
		stock, period,
	)

	err := c.doRequest(path, &resp)
	return resp.Data, err
}

func (c *RapidApiClient) GetHistoricalStats(stock, stats string) ([]HistoricalStat, error) {
	var resp struct {
		Data []HistoricalStat `json:"data"`
	}

	path := fmt.Sprintf(
		"/historical_stats?stock_name=%s&stats=%s",
		stock, stats,
	)

	err := c.doRequest(path, &resp)
	return resp.Data, err
}

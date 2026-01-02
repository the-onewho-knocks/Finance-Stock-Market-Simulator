package stockapi

import "fmt"

func (c *RapidApiClient) GetStockForecast(
	stockID string,
	measureCode string,
	periodType string,
	dataType string,
	age string,
) ([]Forecast, error) {

	var resp struct {
		Data []Forecast `json:"data"`
	}

	path := fmt.Sprintf(
		"/stock_forecasts?stock_id=%s&measure_code=%s&period_type=%s&data_type=%s&age=%s",
		stockID, measureCode, periodType, dataType, age,
	)

	err := c.doRequest(path, &resp)
	return resp.Data, err
}

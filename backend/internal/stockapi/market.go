package stockapi

func (c *RapidApiClient) GetCommodities() ([]Commodity, error) {
	var resp struct {
		Data []Commodity `json:"data"`
	}

	err := c.doRequest("/commodities", &resp)
	return resp.Data, err
}

func (c *RapidApiClient) GetTrendingStocks() ([]TrendingStock, error) {
	var resp struct {
		Data []TrendingStock `json:"data"`
	}

	err := c.doRequest("/trending", &resp)
	return resp.Data, err
}

func (c *RapidApiClient) GetPriceShockers() ([]PriceShocker, error) {
	var resp struct {
		Data []PriceShocker `json:"data"`
	}

	err := c.doRequest("/price_shockers", &resp)
	return resp.Data, err
}

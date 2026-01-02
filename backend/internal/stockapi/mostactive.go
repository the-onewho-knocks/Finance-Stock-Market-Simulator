package stockapi

func (c *RapidApiClient) GetNSEMostActive() ([]ActiveStock, error) {
	var resp struct {
		Data []ActiveStock `json:"data"`
	}

	err := c.doRequest("/NSE_most_active", &resp)
	return resp.Data, err
}

func (c *RapidApiClient) GetBSEMostActive() ([]ActiveStock, error) {
	var resp struct {
		Data []ActiveStock `json:"data"`
	}

	err := c.doRequest("/BSE_most_active", &resp)
	return resp.Data, err
}

func (c *RapidApiClient) GetStockTargetPrice(stockID string) ([]TargetPrice, error) {
	var resp struct {
		Data []TargetPrice `json:"data"`
	}

	err := c.doRequest("/stock_target_price?stock_id="+stockID, &resp)
	return resp.Data, err
}

func (c *RapidApiClient) GetCorporateActions(stock string) ([]CorporateAction, error) {
	var resp struct {
		Data []CorporateAction `json:"data"`
	}

	err := c.doRequest("/corporate_actions?stock_name="+stock, &resp)
	return resp.Data, err
}

package stockapi

func (c *RapidApiClient) SearchIndustry(query string) ([]Industry, error) {
	var resp struct {
		Data []Industry `json:"data"`
	}

	err := c.doRequest("/industry_search?query="+query, &resp)
	return resp.Data, err
}

func (c *RapidApiClient) SearchMutualFund(query string) ([]MutualFund, error) {
	var resp struct {
		Data []MutualFund `json:"data"`
	}

	err := c.doRequest("/mutual_fund_search?query="+query, &resp)
	return resp.Data, err
}

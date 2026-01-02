package stockapi

func (c *RapidApiClient) GetIPOList() ([]IPO, error) {
	var resp struct {
		Data []IPO `json:"data"`
	}

	err := c.doRequest("/ipo", &resp)
	return resp.Data, err
}

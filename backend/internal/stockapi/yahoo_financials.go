package stockapi

import (
	"encoding/json"
	"fmt"
)

func (y *YahooClient) GetCompanyProfile(symbol string) (*CompanyProfile, error) {
	if symbol == "" {
		return nil, fmt.Errorf("Symbol cannot be empty")
	}

	url := fmt.Sprintf(
		"https://%s/api/yahoo/qu/quote/%s/asset-profile",
		y.apiHost,
		symbol,
	)

	resp, err := y.doRequest(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var profile CompanyProfile
	if err := json.NewDecoder(resp.Body).Decode(&profile); err != nil {
		return nil, err
	}
	return &profile, nil
}

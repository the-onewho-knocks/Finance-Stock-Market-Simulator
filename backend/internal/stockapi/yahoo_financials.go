package stockapi

import (
	"encoding/json"
	"fmt"
)

func (y *YahooClient) GetFinancials(symbol string) (*FinancialReport, error) {
	if symbol == "" {
		return nil, fmt.Errorf("the symbol field is empty")
	}

	url := fmt.Sprintf(
		"https://%s/api/yahoo/qu/quote/%s/financials",
		y.apiHost,
		symbol,
	)

	resp, err := y.doRequest(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var report FinancialReport
	if err := json.NewDecoder(resp.Body).Decode(&report); err != nil {
		return nil, err
	}

	return &report, nil
}

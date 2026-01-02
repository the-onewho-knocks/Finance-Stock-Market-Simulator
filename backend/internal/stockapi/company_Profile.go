package stockapi

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"net/url"
	"time"
)

type IndianStockClient struct {
	apiKey string
	client *http.Client
}

func NewIndianStockClient(apiKey string) *IndianStockClient {
	return &IndianStockClient{
		apiKey: apiKey,
		client: &http.Client{Timeout: 10 * time.Second},
	}
}

// RAW response (no struct)
func (c *IndianStockClient) GetStockByNameRaw(name string) (json.RawMessage, error) {
	if name == "" {
		return nil, errors.New("stock name required")
	}

	req, err := http.NewRequest(
		http.MethodGet,
		"https://indian-stock-exchange-api2.p.rapidapi.com/stock?name="+url.QueryEscape(name),
		nil,
	)
	if err != nil {
		return nil, err
	}

	req.Header.Set("x-rapidapi-host", "indian-stock-exchange-api2.p.rapidapi.com")
	req.Header.Set("x-rapidapi-key", c.apiKey)

	resp, err := c.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	// Validate JSON (optional but recommended)
	var raw json.RawMessage
	if err := json.Unmarshal(body, &raw); err != nil {
		return nil, err
	}

	return raw, nil
}

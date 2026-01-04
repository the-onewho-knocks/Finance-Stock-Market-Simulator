package stockapi

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"
)

type IndianRapidApiClient struct {
	httpClient *http.Client
	apiKey     string
	baseUrl    string
}

func NewRapidAPIClient(apiKey string) *IndianRapidApiClient {
	return &IndianRapidApiClient{
		httpClient: &http.Client{Timeout: 10 * time.Second},
		apiKey:     apiKey,
		baseUrl:    "https://indian-stock-exchange-api2.p.rapidapi.com",
	}
}

func (c *IndianRapidApiClient) doRequest(path string, result interface{}) error {
	req, err := http.NewRequest("GET", c.baseUrl+path, nil)
	if err != nil {
		return err
	}

	req.Header.Set("x-rapidapi-key", c.apiKey)
	req.Header.Set("x-rapidapi-host", "indian-stock-exchange-api2.p.rapidapi.com")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return errors.New("rapidapi request failed")
	}

	return json.NewDecoder(resp.Body).Decode(result)
}

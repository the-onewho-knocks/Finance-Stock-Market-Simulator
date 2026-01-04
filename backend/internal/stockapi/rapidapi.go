package stockapi

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

type RapidApiClient struct {
	apiKey  string
	apiHost string
	client  *http.Client
}

func NewRapidApiClient(apiKey, apiHost string) *RapidApiClient {
	return &RapidApiClient{
		apiKey:  apiKey,
		apiHost: apiHost,
		client: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

func (c *RapidApiClient) doRequest(path string, out any) error {
	url := fmt.Sprintf("https://%s%s", c.apiHost, path)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return err
	}

	// 🔴 THESE HEADERS MUST BE EXACT
	req.Header.Set("X-RapidAPI-Key", c.apiKey)
	req.Header.Set("X-RapidAPI-Host", c.apiHost)

	resp, err := c.client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	bodyBytes, _ := io.ReadAll(resp.Body)

	// 🔴 LOG REAL RAPIDAPI ERROR
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf(
			"rapidapi error: status=%d body=%s",
			resp.StatusCode,
			string(bodyBytes),
		)
	}

	return json.Unmarshal(bodyBytes, out)
}

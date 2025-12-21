package stockapi

import (
	"encoding/json"
	"fmt"
	"net/url"
)

type yahooSearchResponse struct {
	Qoutes []struct {
		Symbol string `json:"symbol"`
	} `json:"qoutes"`
}

func (y *YahooClient) SearchSymbol(query string) ([]string, error) {
	if query == "" {
		return nil, fmt.Errorf("search query cannot be empty")
	}

	safeQuery := url.PathEscape(query)

	url := fmt.Sprintf(
		"http://%s/api/yahoo/sa/search/%s", y.apiHost, safeQuery,
	)

	resp, err := y.doRequest(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var res yahooSearchResponse
	if err := json.NewDecoder(resp.Body).Decode(&res); err != nil {
		return nil, err
	}

	symbols := make([]string, 0, len(res.Qoutes))
	for _, q := range res.Qoutes {
		//if empty then skip it
		if q.Symbol == "" {
			continue
		}
		symbols = append(symbols, q.Symbol)
	}
	return symbols, nil
}

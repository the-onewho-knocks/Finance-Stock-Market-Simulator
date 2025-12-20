package stockapi

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"
)

type YahooClient struct {
	httpClient *http.Client
	apiKey     string
	apiHost    string
}

func NewYahooClient(apiKey, apiHost string) *YahooClient {
	return &YahooClient{
		httpClient: &http.Client{Timeout: 6 * time.Second},
		apiKey:     apiKey,
		apiHost:    apiHost,
	}
}

/* ============================
   RESPONSE STRUCTURE
============================ */

type yahooResponse struct {
	QuoteResponse struct {
		Result []struct {
			Symbol                     string  `json:"symbol"`
			QuoteSourceName            string  `json:"quoteSourceName"`
			RegularMarketPrice         float64 `json:"regularMarketPrice"`
			RegularMarketChangePercent float64 `json:"regularMarketChangePercent"`
			RegularMarketVolume        int64   `json:"regularMarketVolume"`
		} `json:"result"`
	} `json:"quoteResponse"`
}

/* ============================
   HTTP HELPER
============================ */

func (y *YahooClient) doRequest(url string) (*http.Response, error) {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("X-RapidAPI-Key", y.apiKey)
	req.Header.Set("X-RapidAPI-Host", y.apiHost)

	return y.httpClient.Do(req)
}

/* ============================
   SINGLE PRICE
============================ */

func (y *YahooClient) GetPrice(symbol string) (*PriceData, error) {
	url := fmt.Sprintf(
		"https://%s/api/yahoo/qu/quote?symbols=%s",
		y.apiHost,
		symbol,
	)

	resp, err := y.doRequest(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var data yahooResponse
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, err
	}

	if len(data.QuoteResponse.Result) == 0 {
		return nil, errors.New("symbol not found")
	}

	q := data.QuoteResponse.Result[0]

	return &PriceData{
		Symbol:    q.Symbol,
		Price:     q.RegularMarketPrice,
		Change:    q.RegularMarketChangePercent,
		Volume:    q.RegularMarketVolume,
		Sector:    q.QuoteSourceName,
		Timestamp: time.Now().UTC(),
	}, nil
}

/* ============================
   MULTIPLE PRICES
============================ */

func (y *YahooClient) GetPrices(symbols []string) ([]PriceData, error) {
	if len(symbols) == 0 {
		return []PriceData{}, nil
	}

	joined := strings.Join(symbols, ",")

	url := fmt.Sprintf(
		"https://%s/api/yahoo/qu/quote?symbols=%s",
		y.apiHost,
		joined,
	)

	resp, err := y.doRequest(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var data yahooResponse
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, err
	}

	results := make([]PriceData, 0, len(data.QuoteResponse.Result))
	for _, q := range data.QuoteResponse.Result {
		results = append(results, PriceData{
			Symbol:    q.Symbol,
			Price:     q.RegularMarketPrice,
			Change:    q.RegularMarketChangePercent,
			Volume:    q.RegularMarketVolume,
			Sector:    q.QuoteSourceName,
			Timestamp: time.Now().UTC(),
		})
	}

	return results, nil
}

/* ============================
   STREAMING (POLLING)
============================ */

func (y *YahooClient) PriceStream(symbols []string) (<-chan PriceData, error) {
	ch := make(chan PriceData)

	go func() {
		ticker := time.NewTicker(1 * time.Second)
		defer ticker.Stop()

		for range ticker.C {
			prices, err := y.GetPrices(symbols)
			if err != nil {
				continue
			}
			for _, p := range prices {
				ch <- p
			}
		}
	}()

	return ch, nil
}

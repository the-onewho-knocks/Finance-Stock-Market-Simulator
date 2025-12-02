package stockapi

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"
)

type YahooClient struct {
	httpClient *http.Client
}

func NewYahooClient() *YahooClient {
	return &YahooClient{
		httpClient: &http.Client{
			Timeout: 5 * time.Second,
		},
	}
}

type yahooResponse struct {
	QuoteResponse struct {
		Result []struct {
			Symbol                     string  `json:"symbol"`
			QuoteSourceName            string  `json:"quoteSourceName"`
			RegularMarketPrice         float64 `json:"regularMarketPrice"`
			RegularMarketChangePercent float64 `json:"regularMarketChangePercent"`
			RegularMarketVolume        int64   `json:"regulatMarketVolume"`
		} `json:"result"`
	} `json:"quoteResponse"`
}

// 1. Fetch Single Symbol
func (y *YahooClient) GetPrice(symbol string) (*PriceData, error) {
	url := fmt.Sprintf("https://query1.finance.yahoo.com/v7/finance/quote?symbols=%s", symbol)
	resp, err := y.httpClient.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var data yahooResponse
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
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

// fetch multiple symbols
func (y *YahooClient) GetPrices(symbol []string) ([]PriceData, error) {
	if len(symbol) == 0 {
		return []PriceData{}, nil
	}

	joined := ""
	for i, s := range symbol {
		if i != 0 {
			joined += ","
		}
		joined = joined + s
	}

	url := fmt.Sprintf("https://query1.finance.yahoo.com/v7/finance/quote?symbols=%s", joined)
	resp, err := y.httpClient.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var data yahooResponse
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, err
	}

	results := []PriceData{}
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

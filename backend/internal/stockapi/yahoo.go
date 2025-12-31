package stockapi

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"
)

/* ============================
   CLIENT
============================ */

type YahooClient struct {
	httpClient *http.Client
	apiKey     string
	apiHost    string
}

func NewYahooClient(apiKey, apiHost string) *YahooClient {
	return &YahooClient{
		httpClient: &http.Client{
			Timeout: 6 * time.Second,
		},
		apiKey:  apiKey,
		apiHost: apiHost,
	}
}

/* ============================
   RAPIDAPI RESPONSE STRUCTURE
============================ */

type yahooQuoteResponse struct {
	Body struct {
		Symbol string `json:"symbol"`

		RegularMarketPrice struct {
			Raw float64 `json:"raw"`
		} `json:"regularMarketPrice"`

		RegularMarketChangePercent struct {
			Raw float64 `json:"raw"`
		} `json:"regularMarketChangePercent"`

		RegularMarketVolume struct {
			Raw int64 `json:"raw"`
		} `json:"regularMarketVolume"`
	} `json:"body"`
}

/* ============================
   HTTP HELPER
============================ */

func (y *YahooClient) doRequest(url string) (*http.Response, error) {
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("X-RapidAPI-Key", y.apiKey)
	req.Header.Set("X-RapidAPI-Host", y.apiHost)

	resp, err := y.httpClient.Do(req)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != http.StatusOK {
		resp.Body.Close()
		return nil, fmt.Errorf("yahoo api error: %s", resp.Status)
	}

	return resp, nil
}

/*
	============================
	  SINGLE PRICE

============================
*/
func (y *YahooClient) GetPrice(symbol string) (*PriceData, error) {
	if symbol == "" {
		return nil, errors.New("symbol is empty")
	}

	url := fmt.Sprintf(
		"https://%s/api/yahoo/qu/quoteSummary/%s?modules=price",
		y.apiHost,
		symbol,
	)

	resp, err := y.doRequest(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var raw struct {
		QuoteSummary struct {
			Result []struct {
				Price struct {
					Symbol             string `json:"symbol"`
					RegularMarketPrice struct {
						Raw float64 `json:"raw"`
					} `json:"regularMarketPrice"`
					RegularMarketChangePercent struct {
						Raw float64 `json:"raw"`
					} `json:"regularMarketChangePercent"`
					RegularMarketVolume struct {
						Raw int64 `json:"raw"`
					} `json:"regularMarketVolume"`
				} `json:"price"`
			} `json:"result"`
		} `json:"quoteSummary"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&raw); err != nil {
		return nil, err
	}

	if len(raw.QuoteSummary.Result) == 0 {
		return nil, errors.New("symbol not found")
	}

	p := raw.QuoteSummary.Result[0].Price

	return &PriceData{
		Symbol:    p.Symbol,
		Price:     p.RegularMarketPrice.Raw,
		Change:    p.RegularMarketChangePercent.Raw,
		Volume:    p.RegularMarketVolume.Raw,
		Timestamp: time.Now().UTC(),
	}, nil
}

/* ============================
   MULTIPLE PRICES
============================ */

func (y *YahooClient) GetPrices(symbols []string) ([]PriceData, error) {
	results := make([]PriceData, 0, len(symbols))

	for _, sym := range symbols {
		p, err := y.GetPrice(sym)
		if err != nil {
			continue
		}
		results = append(results, *p)
	}

	return results, nil
}


/* ============================
   STREAMING (POLLING)
============================ */

func (y *YahooClient) PriceStream(symbols []string) (<-chan PriceData, error) {
	ch := make(chan PriceData)

	go func() {
		ticker := time.NewTicker(2 * time.Second)
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

/* ============================
   SEARCH (OPTIONAL)
============================ */

func (y *YahooClient) SearchSymbols(query string) ([]string, error) {
	return []string{}, nil
}

/* ============================
   FINANCIALS (NOT SUPPORTED)
============================ */

func (y *YahooClient) GetFinancials(symbol string) (*FinancialReport, error) {
	return nil, errors.New("financials not supported by yahoo rapidapi client")
}

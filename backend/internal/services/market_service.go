package services

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
)

type MarketService struct {
	client *http.Client
	apiKey string
	cache  *cache.MarketCache
}

func NewMarketService(
	apiKey string,
	cache *cache.MarketCache,
) *MarketService {
	return &MarketService{
		client: &http.Client{Timeout: 5 * time.Second},
		apiKey: apiKey,
		cache:  cache,
	}
}

func (s *MarketService) GetPrice(
	ctx context.Context,
	symbol string,
) (*stockapi.QuoteResponse, error) {

	if cached, ok := s.cache.GetPrice(ctx, symbol); ok {
		return cached, nil
	}

	url := fmt.Sprintf(
		"https://yahoo-finance15.p.rapidapi.com/api/v1/markets/quote?ticker=%s&type=STOCKS",
		symbol,
	)

	req, _ := http.NewRequestWithContext(ctx, "GET", url, nil)
	req.Header.Set("x-rapidapi-host", "yahoo-finance15.p.rapidapi.com")
	req.Header.Set("x-rapidapi-key", s.apiKey)

	resp, err := s.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var quote stockapi.QuoteResponse
	if err := json.NewDecoder(resp.Body).Decode(&quote); err != nil {
		return nil, err
	}

	s.cache.SetPrice(ctx, symbol, &quote)
	return &quote, nil
}

// func (s *MarketService) GetPrice(
// 	ctx context.Context,
// 	symbol string,
// ) (*stockapi.QuoteResponse, error) {

// 	// 1️⃣ Cache first
// 	if cached, ok := s.cache.GetPrice(ctx, symbol); ok {
// 		return cached, nil
// 	}

// 	// 2️⃣ Build request
// 	url := fmt.Sprintf(
// 		"https://yahoo-finance15.p.rapidapi.com/api/v1/markets/quote?ticker=%s&type=STOCKS",
// 		symbol,
// 	)

// 	req, _ := http.NewRequestWithContext(ctx, "GET", url, nil)
// 	req.Header.Set("x-rapidapi-host", "yahoo-finance15.p.rapidapi.com")
// 	req.Header.Set("x-rapidapi-key", s.apiKey)

// 	// 3️⃣ Execute request
// 	resp, err := s.client.Do(req)
// 	if err != nil {
// 		return nil, err
// 	}
// 	defer resp.Body.Close()

// 	// 4️⃣ READ RAW RESPONSE 🔥🔥🔥
// 	raw, _ := io.ReadAll(resp.Body)
// 	fmt.Println("RAW RESPONSE:", string(raw))

// 	// 5️⃣ Decode correctly
// 	var quote stockapi.QuoteResponse
// 	if err := json.Unmarshal(raw, &quote); err != nil {
// 		return nil, err
// 	}

// 	// 7️⃣ Cache & return
// 	s.cache.SetPrice(ctx, symbol, &quote)
// 	return &quote, nil
// }

func (s *MarketService) GetPrices(
	ctx context.Context,
	symbols []string,
) map[string]*stockapi.QuoteResponse {

	type result struct {
		symbol string
		quote  *stockapi.QuoteResponse
	}

	ch := make(chan result)

	for _, sym := range symbols {
		go func(symbol string) {
			q, err := s.GetPrice(ctx, symbol)
			if err != nil {
				ch <- result{symbol, nil}
				return
			}
			ch <- result{symbol, q}
		}(sym)
	}

	results := make(map[string]*stockapi.QuoteResponse)

	for range symbols {
		res := <-ch
		if res.quote != nil {
			results[res.symbol] = res.quote
		}
	}

	return results
}

func (s *MarketService) StartPriceStream(
	ctx context.Context,
	symbols []string,
	interval time.Duration,
) <-chan map[string]*stockapi.QuoteResponse {

	out := make(chan map[string]*stockapi.QuoteResponse)

	go func() {
		ticker := time.NewTicker(interval)
		defer ticker.Stop()
		defer close(out)

		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				prices := s.GetPrices(ctx, symbols)
				out <- prices
			}
		}
	}()

	return out
}

// func (s *MarketService) RunAutoUpdater(
// 	symbols []string,
// 	interval time.Duration,
// ) {

// 	go func() {
// 		ticker := time.NewTicker(interval)
// 		defer ticker.Stop()

// 		for range ticker.C {
// 			ctx := context.Background()

// 			for _, symbol := range symbols {
// 				quote, err := s.GetPrice(ctx, symbol)
// 				if err != nil {
// 					continue
// 				}
// 				s.cache.SetPrice(ctx, symbol, quote)
// 			}
// 		}
// 	}()
// }

func (s *MarketService) GetMarketNews(ctx context.Context, ticker string) (*stockapi.NewsResponse, error) {
	key := "news:" + ticker

	var cached stockapi.NewsResponse
	if s.cache.Get(ctx, key, &cached) {
		return &cached, nil
	}

	url := fmt.Sprintf(
		"https://yahoo-finance15.p.rapidapi.com/api/v2/markets/news?ticker=%s&type=ALL",
		ticker,
	)

	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("x-rapidapi-host", "yahoo-finance15.p.rapidapi.com")
	req.Header.Set("x-rapidapi-key", s.apiKey)

	resp, err := s.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var data stockapi.NewsResponse
	json.NewDecoder(resp.Body).Decode(&data)

	s.cache.Set(ctx, key, &data, 60*time.Second)
	return &data, nil
}

func (s *MarketService) GetQuote(ctx context.Context, ticker string) (*stockapi.MarketTickerResponse, error) {
	key := "quote:" + ticker

	var cached stockapi.MarketTickerResponse
	if s.cache.Get(ctx, key, &cached) {
		return &cached, nil
	}

	url := fmt.Sprintf(
		"https://yahoo-finance15.p.rapidapi.com/api/v1/markets/quote?ticker=%s&type=STOCKS",
		ticker,
	)

	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("x-rapidapi-host", "yahoo-finance15.p.rapidapi.com")
	req.Header.Set("x-rapidapi-key", s.apiKey)

	resp, err := s.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var data stockapi.MarketTickerResponse
	json.NewDecoder(resp.Body).Decode(&data)

	s.cache.Set(ctx, key, &data, 20*time.Second)
	return &data, nil
}

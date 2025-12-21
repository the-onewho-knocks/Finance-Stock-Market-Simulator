package stockapi

import (
	"math/rand"
	"time"
)

type MockClient struct{}

func NewMockClient() *MockClient {
	return &MockClient{}
}

func (m *MockClient) GetPrice(symbol string) (*PriceData, error) {
	return &PriceData{
		Symbol:    symbol,
		Price:     100 + rand.Float64()*20,
		Change:    rand.Float64()*4 - 2,
		Volume:    int64(rand.Intn(1_000_000)),
		Sector:    "Technology",
		Timestamp: time.Now(),
	}, nil
}

func (m *MockClient) GetPrices(symbols []string) ([]PriceData, error) {
	out := []PriceData{}
	for _, s := range symbols {
		p, _ := m.GetPrice(s)
		out = append(out, *p)
	}
	return out, nil
}

func (m *MockClient) PriceStream(symbols []string) (<-chan PriceData, error) {
	ch := make(chan PriceData)
	go func() {
		for {
			for _, s := range symbols {
				p, _ := m.GetPrice(s)
				ch <- *p
			}
			time.Sleep(time.Second)
		}
	}()
	return ch, nil
}

// News
func (m *MockClient) GetMarketNews() ([]NewsItem, error) {
	return []NewsItem{
		{
			Title:       "Mock Market News",
			Publisher:   "Mock",
			Summary:     "Market is stable",
			PublishedAt: time.Now(),
			Tickers:     []string{"AAPL", "TSLA"},
		},
	}, nil
}

func (m *MockClient) GetSymbolNews(symbol string) ([]NewsItem, error) {
	return []NewsItem{
		{
			Title:       symbol + " earnings",
			Publisher:   "Mock Finance",
			Summary:     "Strong growth",
			PublishedAt: time.Now(),
			Tickers:     []string{symbol},
		},
	}, nil
}

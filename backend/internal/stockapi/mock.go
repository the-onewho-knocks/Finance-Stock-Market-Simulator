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
		Price:     100 + rand.Float64()*4 - 2,
		Change:    rand.Float64()*4 - 2,
		Volume:    int64(rand.Intn(1000000)),
		Sector:    "Technology",
		Timestamp: time.Now().UTC(),
	}, nil
}

func (m *MockClient) GetPrices(symbol []string) ([]PriceData, error) {
	result := make([]PriceData, 0, len(symbol))
	for _, s := range symbol {
		p, err := m.GetPrice(s)
		if err != nil {
			return nil, err
		}
		result = append(result, *p)
	}
	return result, nil
}

func (m *MockClient) PriceStream(symbol []string) (<-chan PriceData, error) {
	ch := make(chan PriceData)
	go func() {
		for _, s := range symbol {
			p, _ := m.GetPrice(s)
			ch <- *p
		}
		time.Sleep(500 * time.Millisecond)
	}()
	return ch, nil
}

package stockapi

import "time"

type PriceData struct {
	Symbol    string
	Price     float64
	Change    float64
	Volume    int64
	Sector    string
	Timestamp time.Time
}

type Client interface {
	GetPrice(symbol string) (*PriceData, error)
	GetPrices(symbol []string) ([]PriceData, error)
	PriceStream(symbols []string) (<-chan PriceData, error)
}

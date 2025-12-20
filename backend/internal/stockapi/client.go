package stockapi

import "time"

// price data represents live stock data
type PriceData struct {
	Symbol    string
	Price     float64
	Change    float64
	Volume    int64
	Sector    string
	Timestamp time.Time
}

// newsitem represent a news article
type NewsItem struct {
	Title       string
	Publisher   string
	Link        string
	Summary     string
	PublishedAt time.Time
	Ticker      []string
}

type Client interface {
	//for prices
	GetPrice(symbol string) (*PriceData, error)
	GetPrices(symbols []string) ([]PriceData, error)
	PriceStream(symbols []string) (<-chan PriceData, error)

	//this functions are for news
	GetMarketNews() ([]NewsItem, error)
	GetSymbolNews(symbol string) ([]NewsItem, error)
}

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
	Tickers     []string
}

// CompanyProfile represents basic company information
type CompanyProfile struct {
	Symbol      string `json:"symbol"`
	Name        string `json:"longName"`
	ShortName   string `json:"shortName"`
	Sector      string `json:"sector"`
	Industry    string `json:"industry"`
	Description string `json:"longBusinessSummary"`
	Website     string `json:"website"`
	Country     string `json:"country"`
	Currency    string `json:"currency"`
	Employees   int64  `json:"fullTimeEmployees"`
	Exchange    string `json:"exchange"`
	MarketCap   int64  `json:"marketCap"`
}

// FinancialReport represents key financial metrics of a company
type FinancialReport struct {
	Symbol string `json:"symbol"`

	// Valuation
	MarketCap   int64   `json:"marketCap"`
	TrailingPE  float64 `json:"trailingPE"`
	ForwardPE   float64 `json:"forwardPE"`
	PriceToBook float64 `json:"priceToBook"`

	// Profitability
	Revenue          int64   `json:"totalRevenue"`
	RevenueGrowth    float64 `json:"revenueGrowth"`
	EarningsGrowth   float64 `json:"earningsGrowth"`
	ProfitMargins    float64 `json:"profitMargins"`
	OperatingMargins float64 `json:"operatingMargins"`
	ReturnOnEquity   float64 `json:"returnOnEquity"`

	// Balance sheet
	TotalCash    int64   `json:"totalCash"`
	TotalDebt    int64   `json:"totalDebt"`
	DebtToEquity float64 `json:"debtToEquity"`

	// Cash flow
	FreeCashFlow      int64 `json:"freeCashflow"`
	OperatingCashFlow int64 `json:"operatingCashflow"`
}

type Client interface {
	//for prices
	GetPrice(symbol string) (*PriceData, error)
	GetPrices(symbols []string) ([]PriceData, error)
	PriceStream(symbols []string) (<-chan PriceData, error)

	//this functions are for news
	GetMarketNews() ([]NewsItem, error)
	GetSymbolNews(symbol string) ([]NewsItem, error)

	// History
	GetHistoricalPrices(symbol string, start, end time.Time, interval string) ([]PriceData, error)

	// Search
	SearchSymbols(query string) ([]string, error)

	// Company
	GetCompanyProfile(symbol string) (*CompanyProfile, error)
	GetFinancials(symbol string) (*FinancialReport, error)
}

package stockapi

// // price data represents live stock data
// type PriceData struct {
// 	Symbol    string
// 	Price     float64
// 	Change    float64
// 	Volume    int64
// 	Sector    string
// 	Timestamp time.Time
// }

// // newsitem represent a news article
// type NewsItem struct {
// 	Title       string
// 	Publisher   string
// 	Link        string
// 	Summary     string
// 	PublishedAt time.Time
// 	Tickers     []string
// }

// // CompanyProfile represents basic company information
// type CompanyProfile struct {
// 	Symbol      string `json:"symbol"`
// 	Name        string `json:"longName"`
// 	ShortName   string `json:"shortName"`
// 	Sector      string `json:"sector"`
// 	Industry    string `json:"industry"`
// 	Description string `json:"longBusinessSummary"`
// 	Website     string `json:"website"`
// 	Country     string `json:"country"`
// 	Currency    string `json:"currency"`
// 	Employees   int64  `json:"fullTimeEmployees"`
// 	Exchange    string `json:"exchange"`
// 	MarketCap   int64  `json:"marketCap"`
// }

// // FinancialReport represents key financial metrics of a company
// type FinancialReport struct {
// 	Symbol string `json:"symbol"`

// 	// Valuation
// 	MarketCap   int64   `json:"marketCap"`
// 	TrailingPE  float64 `json:"trailingPE"`
// 	ForwardPE   float64 `json:"forwardPE"`
// 	PriceToBook float64 `json:"priceToBook"`

// 	// Profitability
// 	Revenue          int64   `json:"totalRevenue"`
// 	RevenueGrowth    float64 `json:"revenueGrowth"`
// 	EarningsGrowth   float64 `json:"earningsGrowth"`
// 	ProfitMargins    float64 `json:"profitMargins"`
// 	OperatingMargins float64 `json:"operatingMargins"`
// 	ReturnOnEquity   float64 `json:"returnOnEquity"`

// 	// Balance sheet
// 	TotalCash    int64   `json:"totalCash"`
// 	TotalDebt    int64   `json:"totalDebt"`
// 	DebtToEquity float64 `json:"debtToEquity"`

// 	// Cash flow
// 	FreeCashFlow      int64 `json:"freeCashflow"`
// 	OperatingCashFlow int64 `json:"operatingCashflow"`
// }

type Client interface {
	//for prices
	GetPrice(symbol string) (*PriceData, error)
	GetPrices(symbols []string) ([]PriceData, error)
	PriceStream(symbols []string) (<-chan PriceData, error)

	// Search
	SearchIndustry(query string) ([]Industry, error)
	SearchMutualFund(query string) ([]MutualFund, error)

	// Mutual funds
	GetAllMutualFunds() ([]MutualFund, error)

	// Market data
	GetCommodities() ([]Commodity, error)
	GetTrendingStocks() ([]TrendingStock, error)
	GetPriceShockers() ([]PriceShocker, error)

	// Active stocks
	GetNSEMostActive() ([]ActiveStock, error)
	GetBSEMostActive() ([]ActiveStock, error)

	// Stock intelligence
	GetStockTargetPrice(stockID string) ([]TargetPrice, error)
	GetCorporateActions(stock string) ([]CorporateAction, error)

	// Historical
	GetHistoricalPrices(stock string, period string) ([]HistoricalPrice, error)
	GetHistoricalStats(stock string, stats string) ([]HistoricalStat, error)

	// Forecast
	GetStockForecast(
		stockID string,
		measureCode string,
		periodType string,
		dataType string,
		age string,
	) ([]Forecast, error)

	// IPO
	GetIPOList() ([]IPO, error)

	// 52 week
	Get52WeekHighLow() ([]Week52Data, error)
}

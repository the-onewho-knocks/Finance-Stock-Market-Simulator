package stockapi

// type Industry map[string]interface{}
// type MutualFund map[string]interface{}
// type Commodity map[string]interface{}
// type TrendingStock map[string]interface{}
// type PriceShocker map[string]interface{}
// type ActiveStock map[string]interface{}
// type TargetPrice map[string]interface{}
// type CorporateAction map[string]interface{}
// type HistoricalPrice map[string]interface{}
// type HistoricalStat map[string]interface{}
// type Forecast map[string]interface{}
// type IPO map[string]interface{}
// type Week52Data map[string]interface{}

// type PriceData struct {
// 	Symbol    string
// 	Price     float64
// 	Change    float64
// 	Volume    int64
// 	Sector    string
// 	Timestamp time.Time
// }

type PriceData struct {
	Symbol        string  `json:"symbol"`
	CompanyName   string  `json:"companyName"`
	LastPrice     float64 `json:"lastPrice"`
	Change        float64 `json:"change"`
	PercentChange float64 `json:"percentChange"`
	Open          float64 `json:"open"`
	High          float64 `json:"high"`
	Low           float64 `json:"low"`
	PreviousClose float64 `json:"previousClose"`
	Volume        int64   `json:"volume"`
	Timestamp     string  `json:"timestamp"`
}

type Industry struct {
	Industry string `json:"industry"`
	Count    int    `json:"count"`
}

type MutualFund struct {
	SchemeCode string `json:"scheme_code"`
	SchemeName string `json:"scheme_name"`
	FundHouse  string `json:"fund_house"`
	Category   string `json:"category"`
}

type MutualFundDetail struct {
	SchemeCode string `json:"scheme_code"`
	SchemeName string `json:"scheme_name"`
	Nav        string `json:"nav"`
	Date       string `json:"date"`
}

type Commodity struct {
	Name          string  `json:"name"`
	LastPrice     float64 `json:"last_price"`
	Change        float64 `json:"change"`
	PercentChange float64 `json:"percent_change"`
}

type TrendingStock struct {
	Symbol      string `json:"symbol"`
	CompanyName string `json:"company_name"`
}

type PriceShocker struct {
	Symbol        string  `json:"symbol"`
	CompanyName   string  `json:"company_name"`
	LastPrice     float64 `json:"last_price"`
	PercentChange float64 `json:"percent_change"`
	Category      string  `json:"category"` // gainer / loser
}

type ActiveStock struct {
	Symbol      string  `json:"symbol"`
	CompanyName string  `json:"company_name"`
	Volume      int64   `json:"volume"`
	LastPrice   float64 `json:"last_price"`
}

type TargetPrice struct {
	BrokerName string  `json:"broker_name"`
	Rating     string  `json:"rating"`
	Target     float64 `json:"target_price"`
	Upside     string  `json:"upside"`
}

type CorporateAction struct {
	Company     string `json:"company"`
	ActionType  string `json:"action_type"`
	ExDate      string `json:"ex_date"`
	RecordDate  string `json:"record_date"`
	Description string `json:"description"`
}

type HistoricalPrice struct {
	Date   string  `json:"date"`
	Open   float64 `json:"open"`
	High   float64 `json:"high"`
	Low    float64 `json:"low"`
	Close  float64 `json:"close"`
	Volume int64   `json:"volume"`
}

type HistoricalStat struct {
	Period string `json:"period"`
	Metric string `json:"metric"`
	Value  string `json:"value"`
}

type Forecast struct {
	Year  string `json:"year"`
	Value string `json:"value"`
	Type  string `json:"type"` // Actual / Estimated
}

type IPO struct {
	CompanyName string `json:"company_name"`
	IssueSize   string `json:"issue_size"`
	PriceBand   string `json:"price_band"`
	OpenDate    string `json:"open_date"`
	CloseDate   string `json:"close_date"`
	Status      string `json:"status"`
}

type Week52Data struct {
	Symbol       string  `json:"symbol"`
	CompanyName  string  `json:"company_name"`
	High52Week   float64 `json:"high_52_week"`
	Low52Week    float64 `json:"low_52_week"`
	CurrentPrice float64 `json:"current_price"`
}

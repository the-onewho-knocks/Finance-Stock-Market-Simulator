package stockapi

type MarketMeta struct {
	Version     string `json:"version"`
	Status      int    `json:"status"`
	Copywrite   string `json:"copywrite"`
	TotalRecord int    `json:"totalrecords"`
}

type MarketTicker struct {
	Symbol    string `json:"symbol"`
	Name      string `json:"name"`
	LastSale  string `json:"lastsale"`
	NetChange string `json:"netchange"`
	PctChange string `json:"pctchange"`
	MarketCap string `json:"marketCap"`
}

type MarketTickerResponse struct {
	Meta MarketMeta     `json:"meta"`
	Body []MarketTicker `json:"body"`
}

// NEWS

type NewsResponse struct {
	Meta MarketMeta `json:"meta"`
	Data []struct {
		Title     string `json:"title"`
		Link      string `json:"link"`
		Publisher string `json:"publisher"`
		Summary   string `json:"summary"`
		PubDate   string `json:"pubDate"`
	} `json:"data"`
}

// type QuoteResponse struct {
// 	Meta struct {
// 		Version string `json:"version"`
// 		Status  int    `json:"status"`
// 	} `json:"meta"`

// 	Body struct {
// 		Symbol       string `json:"symbol"`
// 		CompanyName string `json:"companyName"`
// 		MarketStatus string `json:"marketStatus"`

// 		PrimaryData struct {
// 			LastSalePrice    string `json:"lastSalePrice"`
// 			NetChange        string `json:"netChange"`
// 			PercentageChange string `json:"percentageChange"`
// 			IsRealTime       bool   `json:"isRealTime"`
// 			Volume           string `json:"volume"`
// 		} `json:"primaryData"`
// 	} `json:"body"`
// }

type QuoteResponse struct {
	Meta Meta      `json:"meta"`
	Body QuoteBody `json:"body"`
}

type Meta struct {
	Version   string `json:"version"`
	Status    int    `json:"status"`
	Copywrite string `json:"copywrite"`
}

type QuoteBody struct {
	Symbol       string `json:"symbol"`
	CompanyName  string `json:"companyName"`
	MarketStatus string `json:"marketStatus"`

	PrimaryData PrimaryData `json:"primaryData"`
}

type PrimaryData struct {
	LastSalePrice    string `json:"lastSalePrice"`
	NetChange        string `json:"netChange"`
	PercentageChange string `json:"percentageChange"`
	IsRealTime       bool   `json:"isRealTime"`
	Volume           string `json:"volume"`
}

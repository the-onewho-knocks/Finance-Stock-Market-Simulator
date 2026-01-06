package models

type MarketTickersResponse struct {
	Meta    MetaInfo          `json:"meta"`
	Headers map[string]string `json:"headers"`
	Body    []MarketTicker   `json:"body"`
}

type MetaInfo struct {
	Version      string `json:"version"`
	Status       int    `json:"status"`
	Copywrite    string `json:"copywrite"`
	TotalRecords int    `json:"totalrecords"`
}

type MarketTicker struct {
	Symbol    string `json:"symbol"`
	Name      string `json:"name"`
	LastSale  string `json:"lastsale"`
	NetChange string `json:"netchange"`
	PctChange string `json:"pctchange"`
	MarketCap string `json:"marketCap"`
}

// ===== HEATMAP OUTPUT =====

type HeatmapBlock struct {
	Symbol    string  `json:"symbol"`
	Name      string  `json:"name"`
	Value     float64 `json:"value"`       // market cap
	ChangePct float64 `json:"change_pct"`  
	Color     string  `json:"color"` // color intensity
}

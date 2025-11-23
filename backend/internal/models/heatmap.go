package models

import (
	"time"

	"github.com/shopspring/decimal"
)

// Heatmap Item represents a single stock inside a sector
// used for visual heatmap data (e.g., color-coded gain/loss).
type HeatmapItem struct {
	Symbol    string          `json:"symbol"`
	Company   string          `json:"company"`
	ChangePct decimal.Decimal `json:"change_pct"` // + or - percentage
	MarketCap decimal.Decimal `json:"market_cap"`
}

// HeatmapSector groups stocks in a single sector
type HeatmapSector struct {
	Sector string        `json:"sector"`
	Items  []HeatmapItem `json:"items"`
}

// HeatmapSnapshot is the database-stored version of each entry.
// This keeps track of change % for a stock at a moment in time.
type HeatmapSnapshot struct {
	ID        int64           `json:"id" db:"id"`
	Sector    string          `json:"sector" db:"sector"`
	Symbol    string          `json:"symbol" db:"symbol"`
	ChangePct decimal.Decimal `json:"change_pct" db:"change_pct"`
	MarketCap decimal.Decimal `json:"market_cap" db:"market_cap"`

	Timestamp time.Time `json:"timestamp" db:"timestamp"`
}

// HeatmapResult is what your API returns to the frontend.
// It is built from aggregated HeatmapSnapshot + stock info.
type HeatmapResult struct {
	Sectors     []HeatmapSector `json:"sectors"`
	GeneratedAt time.Time       `json:"generated_at"`
}

// Optional: If you support multiple market indices
type MarketType string

const (
	MarketNifty  MarketType = "nifty"
	MarketSensex MarketType = "sensex"
	MarketNasdaq MarketType = "nasdaq"
	MarketSP500  MarketType = "sp500"
)

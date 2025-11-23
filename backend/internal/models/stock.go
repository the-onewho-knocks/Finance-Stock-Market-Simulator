package models

import "time"

type Stock struct {
	Symbol    string  `json:"symbol" db:"symbol"`
	Name      string  `json:"name" db:"name"`
	Exchange  string  `json:"exchange" db:"exchange"`
	Sector    string  `json:"sector" db:"sector"`
	Industry  string  `json:"industry" db:"industry"`
	MarketCap float64 `json:"market_cap" db:"market_cap"`

	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

package models

import (
	"time"

	"github.com/shopspring/decimal"
)

type StockPriceSnapshot struct {
	ID        int             `json:"id" db:"id"`
	Symbol    string          `json:"symbol" db:"symbol"`
	Price     decimal.Decimal `json:"price" db:"price"`
	Open      decimal.Decimal `json:"open" db:"open"`
	High      decimal.Decimal `json:"high" db:"high"`
	Low       decimal.Decimal `json:"low" db:"low"`
	PrevClose decimal.Decimal `json:"prev_close" db:"prev_close"`
	Volume    int             `json:"volume" db:"volume"`

	Timestamp time.Time `json:"timestamp" db:"timestamp"`
}

package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
)

type Portfolio struct {
	ID      uuid.UUID       `json:"id" db:"id"`
	UserID  uuid.UUID       `json:"user_id" db:"user_id"`
	Name    string          `json:"name" db:"name"`
	Balance decimal.Decimal `json:"balance" db:"balance"`

	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

// we using this one here but lets see if any changes further
type PortfolioItem struct {
	ID          uuid.UUID `json:"id"`
	UserID      uuid.UUID `json:"user_id"`
	StockSymbol string    `json:"stock_symbol"`
	Quantity    int       `json:"quantity"`
	AvgPrice    float64   `json:"avg_price"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
)

type Transaction struct {
	ID          uuid.UUID       `json:"id" db:"id"`
	PortfolioID uuid.UUID       `json:"portfolio_id" db:"portfolio_id"`
	Symbol      string          `json:"symbol" db:"symbol"`
	Side        OrderSide       `json:"side" db:"side"`
	Price       decimal.Decimal `json:"price" db:"price"`
	Quantity    decimal.Decimal `json:"quantity" db:"quantity"`
	Total       decimal.Decimal `json:"total" db:"total"`

	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
)

type Transaction struct {
	ID       uuid.UUID       `json:"id" db:"id"`
	User_ID  uuid.UUID       `json:"user_id" db:"user_id"`
	Symbol   string          `json:"symbol" db:"symbol"`
	Side     OrderSide       `json:"side" db:"side"`
	Price    decimal.Decimal `json:"price" db:"price"`
	Quantity decimal.Decimal `json:"quantity" db:"quantity"`
	Total    decimal.Decimal `json:"total" db:"total"`

	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
)

type Holding struct {
	ID          uuid.UUID       `json:"id" db:"id"`
	PortfolioID uuid.UUID       `json:"portfolio_id" db:"portfolio_id"`
	Symbol      string          `json:"symbol" db:"symbol"`
	Quantity    decimal.Decimal `json:"quantity" db:"quantity"`
	AvgBuyPrice decimal.Decimal `json:"avg_buy_price" db:"avg_buy_price"`

	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

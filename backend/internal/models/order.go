package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
)

type OrderType string
type OrderSide string
type OrderStatus string

const (
	OrderTypeMarket OrderType = "market"
	OrderTypeLimit  OrderType = "limit"
	OrderTypeStop   OrderType = "stop_loss"

	SideBuy  OrderSide = "buy"
	SideSell OrderSide = "sell"

	StatusPending   OrderStatus = "pending"
	StatusFilled    OrderStatus = "filled"
	StatusCancelled OrderStatus = "cancelled"
	StatusRejected  OrderStatus = "rejected"
)

type Order struct {
	ID          uuid.UUID        `json:"id" db:"id"`
	PortfolioID uuid.UUID        `json:"portfolio_id" db:"portfolio_id"`
	Symbol      string           `json:"symbol" db:"symbol"`
	Type        OrderType        `json:"type" db:"type"`
	Side        OrderSide        `json:"side" db:"side"`
	Price       *decimal.Decimal `json:"price" db:"price"`
	Status      OrderStatus      `json:"status" db:"status"`

	CreatedAt  time.Time `json:"created_at" db:"created_at"`
	ExecutedAt time.Time `json:"executed_at" db:"executed_at"`
}

package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
)

type MonthlySummary struct {
	ID      int64           `json:"id" db:"id"`
	UserID  uuid.UUID       `json:"user_id" db:"user_id"`
	Month   int             `json:"month" db:"month"`
	Year    int             `json:"year" db:"year"`
	Income  decimal.Decimal `json:"income" db:"income"`
	Expense decimal.Decimal `json:"expense" db:"expense"`
	Savings decimal.Decimal `json:"savings" db:"savings"`

	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

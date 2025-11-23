package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
)

type Expense struct {
	ID          uuid.UUID       `json:"id" db:"id"`
	UserID      uuid.UUID       `json:"user_id" db:"user_id"`
	Amount      decimal.Decimal `json:"amount" db:"amount"`
	Category    string          `json:"category" db:"category"`
	Description string          `json:"discription" db:"discriptione"`
	Date        time.Time       `json:"date" db:"date"`

	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

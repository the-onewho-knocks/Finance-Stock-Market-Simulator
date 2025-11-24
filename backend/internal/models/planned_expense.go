package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
)

type RecurrenceType string

const (
	RecurringDaily   RecurrenceType = "daily"
	RecurringWeekly  RecurrenceType = "weekly"
	RecurringMonthly RecurrenceType = "monthly"
	RecurringYearly  RecurrenceType = "yearly"
)

type PlannedExpense struct {
	ID     uuid.UUID       `json:"id" db:"id"`
	UserID uuid.UUID       `json:"user_id" db:"user_id"`
	Title  string          `json:"title" db:"title"`
	Amount decimal.Decimal `json:"amount" db:"amount"`
	Note   string          `json:"note" db:"note"`
	Date   time.Time       `json:"date" db:"date"`

	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

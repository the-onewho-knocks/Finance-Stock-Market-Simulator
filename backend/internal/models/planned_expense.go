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
	ID             uuid.UUID       `json:"id" db:"id"`
	UserID         uuid.UUID       `json:"user_id" db:"user_id"`
	Amount         decimal.Decimal `json:"amount" db:"amount"`
	Category       string          `json:"category" db:"category"`
	Note           string          `json:"note" db:"note"`
	Date           time.Time       `json:"date" db:"date"`
	IsRecurring    bool            `json:"is_recurring" db:"is_recurring"`
	RecurrenceType *RecurrenceType `json:"recurrence_type,omitempty" db:"recurrence_type"`

	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

package models

import (
	"time"

	"github.com/google/uuid"
)

type NotificationType string

const (
	PriceAlertNotification   NotificationType = "price_alert"
	ExpenseAlertNotification NotificationType = "expense_alert"
	SystemNotification       NotificationType = "system"
	PortfolioNotification    NotificationType = "portfolio"
)

type Notification struct {
	ID      uuid.UUID        `json:"id" db:"id"`
	UserID  uuid.UUID        `json:"user_id" db:"user_id"`
	Title   string           `json:"title" db:"title"`
	Message string           `json:"message" db:"message"`
	Type    NotificationType `json:"type" db:"type"`
	IsRead  bool             `json:"is_read" db:"is_read"`

	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

type PriceAlert struct {
	ID          uuid.UUID `json:"id" db:"id"`
	UserID      uuid.UUID `json:"user_id" db:"user_id"`
	Symbol      string    `json:"symbol" db:"symbol"`
	TriggerType string    `json:"trigger_type" db:"trigger_type"`
	TargetPrice float64   `json:"target_price" db:"target_price"`

	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

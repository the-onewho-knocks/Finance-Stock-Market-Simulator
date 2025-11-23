package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
)


type Networth struct {
	ID        string    `json:"id"`
	UserID    string    `json:"user_id"`
	Total     float64   `json:"total"`
	CreatedAt time.Time `json:"created_at"`
}


// NetWorthHistory stores snapshots of a user's total financial worth
// including portfolio value, cash balance, expenses impact, etc.
type NetWorthHistory struct {
	ID        int64           `json:"id" db:"id"`
	UserID    uuid.UUID       `json:"user_id" db:"user_id"`
	NetWorth  decimal.Decimal `json:"net_worth" db:"net_worth"`
	Timestamp time.Time       `json:"timestamp" db:"timestamp"`
}

// NetWorthBreakdown provides a richer view,
// useful for analytics or charts such as
// (Portfolio Value + Cash - Liabilities)
type NetWorthBreakdown struct {
	UserID          uuid.UUID       `json:"user_id"`
	PortfolioValue  decimal.Decimal `json:"portfolio_value"`
	CashBalance     decimal.Decimal `json:"cash_balance"`
	TotalExpenses   decimal.Decimal `json:"total_expenses"`
	TotalInvested   decimal.Decimal `json:"total_invested"`
	CurrentNetWorth decimal.Decimal `json:"current_net_worth"`
	UpdatedAt       time.Time       `json:"updated_at"`
}

package interfaces

import "github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"

type ExpenseRepository interface {
	BaseRepository

	AddExpense(e *models.Expense) error
	ListExpense(userID string) ([]models.Expense, error)
	DeleteExpense(id string, userID string) error
}

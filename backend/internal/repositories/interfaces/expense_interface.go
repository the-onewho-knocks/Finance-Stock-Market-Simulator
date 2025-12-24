package interfaces

import (
	"github.com/google/uuid"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
)

type ExpenseRepository interface {
	BaseRepository

	AddExpense(e *models.Expense) error
	ListExpense(userID uuid.UUID) ([]models.Expense, error)
	DeleteExpense(id string, userID uuid.UUID) error
}

package interfaces

import "github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"

type PlannedExpenseRepository interface {
	BaseRepository

	CreatePlan(plan *models.PlannedExpense)
	GetPlansByUser(userID string) ([]models.PlannedExpense, error)
	DeletePlan(planID string, userID string) error
}

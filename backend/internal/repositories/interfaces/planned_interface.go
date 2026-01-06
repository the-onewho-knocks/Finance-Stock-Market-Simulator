package interfaces

import (
	"github.com/google/uuid"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
)

type PlannedExpenseRepository interface {
	BaseRepository

	CreatePlan(plan *models.PlannedExpense) error
	GetPlansByUser(userID uuid.UUID) ([]models.PlannedExpense, error)
	DeletePlan(userID uuid.UUID, planID uuid.UUID) error
}

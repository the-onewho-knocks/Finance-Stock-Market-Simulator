package services

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/interfaces"
)

type PlannedExpenseService struct {
	plannedRepo interfaces.PlannedExpenseRepository
}

func NewPlannedExpenseService(
	plannedRepo interfaces.PlannedExpenseRepository,
) *PlannedExpenseService {
	return &PlannedExpenseService{
		plannedRepo: plannedRepo,
	}
}

func (s *PlannedExpenseService) CreatePlan(
	ctx context.Context,
	userID uuid.UUID,
	title string,
	amount decimal.Decimal,
	note string,
	date time.Time,
) error {
	plan := &models.PlannedExpense{
		ID:        uuid.New(),
		UserID:    userID,
		Title:     title,
		Amount:    amount,
		Note:      note,
		Date:      date,
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
	}

	return s.plannedRepo.CreatePlan(plan)
}

func (s *PlannedExpenseService) Getplans(
	ctx context.Context,
	userID uuid.UUID,
) ([]models.PlannedExpense, error) {
	return s.plannedRepo.GetPlansByUser(userID)
}

func (s *PlannedExpenseService) DeletePlan(
	ctx context.Context,
	planID string,
	userID uuid.UUID,
) error {
	return s.plannedRepo.DeletePlan(planID, userID)
}

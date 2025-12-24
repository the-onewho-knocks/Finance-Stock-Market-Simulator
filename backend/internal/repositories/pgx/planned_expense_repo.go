package pgx

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/interfaces"
)

type PlannedExpenseRepositoryPgx struct {
	DB *pgxpool.Pool
}

func NewPlannedExpenseRepsoitory(db *pgxpool.Pool) interfaces.PlannedExpenseRepository {
	return &PlannedExpenseRepositoryPgx{DB: db}
}

func (r *PlannedExpenseRepositoryPgx) GetDB() *pgxpool.Pool {
	return r.DB
}

func (r *PlannedExpenseRepositoryPgx) CreatePlan(plan *models.PlannedExpense) error {
	query := `
			Insert into planned_expenses (id , user_id , title , amount , note , date)
			values ($1,$2,$3,$4,$5,$6)
	`
	_, err := r.DB.Exec(context.Background(), query, plan.ID, plan.UserID, plan.Title, plan.Amount, plan.Note, plan.Date)
	return err
}

func (r *PlannedExpenseRepositoryPgx) GetPlansByUser(userID uuid.UUID) ([]models.PlannedExpense, error) {
	query := `
		select id , user_id , title , amount , note , date
		from planned_expenses where user_id = $1
	`
	rows, err := r.DB.Query(context.Background(), query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var res []models.PlannedExpense
	for rows.Next() {
		var p models.PlannedExpense
		err := rows.Scan(&p.ID, &p.UserID, &p.Title, &p.Amount, &p.Note, &p.Date)
		if err != nil {
			return nil, err
		}
		res = append(res, p)
	}
	return res, nil
}

func (r *PlannedExpenseRepositoryPgx) DeletePlan(planID string, userID uuid.UUID) error {
	query := `
		delete from planned_expenses where id=$1 and user_id = $2
	`
	_, err := r.DB.Exec(context.Background(), query, planID, userID)
	return err
}

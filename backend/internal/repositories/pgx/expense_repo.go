package pgx

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/interfaces"
)

type ExpenseRepositoryPgx struct {
	db *pgxpool.Pool
}

func NewExpenseRepository(db *pgxpool.Pool) interfaces.ExpenseRepository {
	return &ExpenseRepositoryPgx{db: db}
}

func (r *ExpenseRepositoryPgx) GetDB() *pgxpool.Pool {
	return r.db
}

func (r *ExpenseRepositoryPgx) AddExpense(e *models.Expense) error {
	query := `
		insert into expenses (id,user_ID,amount,category,discription,created_at )
		 values ($1 , $2 , $3 , $4 , $5 , $6)
	`
	_, err := r.db.Exec(context.Background(), query, e.ID, e.UserID, e.Amount, e.Category, e.Description, e.CreatedAt)
	return err

}

func (r *ExpenseRepositoryPgx) ListExpense(userID string) ([]models.Expense, error) {

}

func (r *ExpenseRepositoryPgx) DeleteExpense(id string, userID string) error {

}

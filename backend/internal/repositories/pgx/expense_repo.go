package pgx

import (
	"context"

	"github.com/google/uuid"
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
		insert into expenses (id,user_ID,amount,category,description,date,created_at )
		 values ($1 , $2 , $3 , $4 , $5 , $6, $7, now())
	`
	_, err := r.db.Exec(context.Background(), query, e.ID, e.UserID, e.Amount, e.Category, e.Description, e.Date, e.CreatedAt)
	return err

}

func (r *ExpenseRepositoryPgx) ListExpense(userID uuid.UUID) ([]models.Expense, error) {
	query := `
		select id , user_id , amount , category , description , date, created_at
		from expenses where user_id = $1
	`
	rows, err := r.db.Query(context.Background(), query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var res []models.Expense
	for rows.Next() {
		var e models.Expense
		_ = rows.Scan(&e.ID, &e.UserID, &e.Amount, &e.Category, &e.Description, &e.Date, &e.CreatedAt)
		res = append(res, e)
	}
	return res, nil
}

//error may occur here because of data type conflict
func (r *ExpenseRepositoryPgx) DeleteExpense(id string, userID uuid.UUID) error {
	query := `
		delete from expenses where id=$1 and user_id=$2
	`
	_, err := r.db.Exec(context.Background(), query, id, userID)
	return err
}

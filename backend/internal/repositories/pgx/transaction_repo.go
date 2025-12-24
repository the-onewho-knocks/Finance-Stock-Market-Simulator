package pgx

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/interfaces"
)

type TransactionRepositoryPgx struct {
	db *pgxpool.Pool
}

func NewTransactionRepository(db *pgxpool.Pool) interfaces.TransactionRepository {
	return &TransactionRepositoryPgx{db: db}
}

func (r *TransactionRepositoryPgx) GetDB() *pgxpool.Pool {
	return r.db
}

func (r *TransactionRepositoryPgx) AddTransaction(tx *models.Transaction) error {
	ctx := context.Background()
	query := `
		insert into transactions
	 	(id , user_id , symbol,side,price,quantity,total,created_at)
		values ($1,$2,$3,$4,$5,$6,$7,$8)
	`
	id := uuid.New()
	created := time.Now().UTC()
	_, err := r.db.Exec(ctx, query, id, tx.User_ID, tx.Symbol, tx.Side, tx.Price, tx.Quantity, tx.Total, created)
	if err != nil {
		return err
	}
	return nil

}

func (r *TransactionRepositoryPgx) GetTransaction(userID uuid.UUID) ([]models.Transaction, error) {
	ctx := context.Background()

	query := `
		select id , user_id , symbol , side , price , quantity , total , created_at
		from transactions
	 	where
		user_id = $1 order by created_at desc
	`
	rows, err := r.db.Query(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var res []models.Transaction
	for rows.Next() {
		var t models.Transaction
		if err := rows.Scan(&t.ID, &t.User_ID, &t.Symbol, &t.Side, &t.Price, &t.Quantity, &t.Total, &t.CreatedAt); err != nil {
			return nil, err
		}
		res = append(res, t)
	}

	return res, nil

}

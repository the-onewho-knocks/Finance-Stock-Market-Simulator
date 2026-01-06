package pgx

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/interfaces"
)

type NetworthRepositoryPgx struct {
	DB *pgxpool.Pool
}

func NewNetworthRepository(db *pgxpool.Pool) interfaces.NetworthRepository {
	return &NetworthRepositoryPgx{DB: db}
}

func (r *NetworthRepositoryPgx) GetDB() *pgxpool.Pool {
	return r.DB
}

func (r *NetworthRepositoryPgx) SaveNetworth(n *models.Networth) error {
	ctx := context.Background()

	query := `
		INSERT INTO networth (id, user_id, total, created_at)
		VALUES ($1, $2, $3, $4)
	`

	id := uuid.New().String()
	now := time.Now().UTC()

	_, err := r.DB.Exec(ctx, query, id, n.UserID, n.Total, now)
	if err != nil {
		return err
	}

	n.ID = id
	n.CreatedAt = now
	return nil
}

func (r *NetworthRepositoryPgx) GetLatestNetworth(userID uuid.UUID) (*models.Networth, error) {
	ctx := context.Background()

	query := `
		SELECT id, user_id, total, created_at
		FROM networth
		WHERE user_id = $1
		ORDER BY created_at DESC
		LIMIT 1
	`

	var n models.Networth
	err := r.DB.QueryRow(ctx, query, userID).
		Scan(&n.ID, &n.UserID, &n.Total, &n.CreatedAt)

	if err != nil {
		return nil, err
	}

	return &n, nil
}

func (r *NetworthRepositoryPgx) GetNetworthHistory(userID uuid.UUID) ([]models.Networth, error) {
	ctx := context.Background()

	query := `
		SELECT id, user_id, total, created_at
		FROM networth
		WHERE user_id = $1
		ORDER BY created_at DESC
	`

	rows, err := r.DB.Query(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var history []models.Networth

	for rows.Next() {
		var n models.Networth
		if err := rows.Scan(
			&n.ID,
			&n.UserID,
			&n.Total,
			&n.CreatedAt,
		); err != nil {
			return nil, err
		}
		history = append(history, n)
	}

	return history, nil
}

func (r *NetworthRepositoryPgx) SaveNetWorthHistory(h *models.NetWorthHistory) error {
	ctx := context.Background()

	query := `
		INSERT INTO networth_history (user_id, net_worth, timestamp)
		VALUES ($1, $2, $3)
		RETURNING id
	`

	return r.DB.QueryRow(
		ctx,
		query,
		h.UserID,
		h.NetWorth,
		h.Timestamp,
	).Scan(&h.ID)
}

func (r *NetworthRepositoryPgx) GetNetWorthHistoryRecords(userID uuid.UUID) ([]models.NetWorthHistory, error) {
	ctx := context.Background()

	query := `
		SELECT id, user_id, net_worth, timestamp
		FROM networth_history
		WHERE user_id = $1
		ORDER BY timestamp DESC
	`

	rows, err := r.DB.Query(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var res []models.NetWorthHistory

	for rows.Next() {
		var h models.NetWorthHistory
		if err := rows.Scan(
			&h.ID,
			&h.UserID,
			&h.NetWorth,
			&h.Timestamp,
		); err != nil {
			return nil, err
		}
		res = append(res, h)
	}

	return res, nil
}

func (r *NetworthRepositoryPgx) SaveBreakdown(b *models.NetWorthBreakdown) error {
	ctx := context.Background()

	query := `
		INSERT INTO networth_breakdown (
			user_id,
			portfolio_value,
			cash_balance,
			total_expenses,
			total_invested,
			current_net_worth,
			updated_at
		)
		VALUES ($1,$2,$3,$4,$5,$6,$7)
		ON CONFLICT (user_id)
		DO UPDATE SET
			portfolio_value = EXCLUDED.portfolio_value,
			cash_balance = EXCLUDED.cash_balance,
			total_expenses = EXCLUDED.total_expenses,
			total_invested = EXCLUDED.total_invested,
			current_net_worth = EXCLUDED.current_net_worth,
			updated_at = EXCLUDED.updated_at
	`

	_, err := r.DB.Exec(
		ctx,
		query,
		b.UserID,
		b.PortfolioValue,
		b.CashBalance,
		b.TotalExpenses,
		b.TotalInvested,
		b.CurrentNetWorth,
		b.UpdatedAt,
	)

	return err
}

func (r *NetworthRepositoryPgx) GetBreakdown(userID uuid.UUID) (*models.NetWorthBreakdown, error) {
	ctx := context.Background()

	query := `
		SELECT
			user_id,
			portfolio_value,
			cash_balance,
			total_expenses,
			total_invested,
			current_net_worth,
			updated_at
		FROM networth_breakdown
		WHERE user_id = $1
	`

	var b models.NetWorthBreakdown

	err := r.DB.QueryRow(ctx, query, userID).Scan(
		&b.UserID,
		&b.PortfolioValue,
		&b.CashBalance,
		&b.TotalExpenses,
		&b.TotalInvested,
		&b.CurrentNetWorth,
		&b.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &b, nil
}





// package pgx

// import (
// 	"context"
// 	"time"

// 	"github.com/google/uuid"
// 	"github.com/jackc/pgx/v5/pgxpool"
// 	"github.com/shopspring/decimal"
// 	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
// 	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/interfaces"
// )

// type NetworthRepositoryPgx struct {
// 	DB *pgxpool.Pool
// }

// func NewNetworthRepository(db *pgxpool.Pool) interfaces.NetworthRepository {
// 	return &NetworthRepositoryPgx{DB: db}
// }

// func (r *NetworthRepositoryPgx) GetDB() *pgxpool.Pool {
// 	return r.DB
// }

// func (r *NetworthRepositoryPgx) SaveNetworth(n *models.Networth) error {
// 	ctx := context.Background()
// 	query := `
// 		insert into networth (id , user_id , total , created_at)
// 		values ($1,$2,$3,$4)
// 	`
// 	id := uuid.New().String()
// 	created := time.Now().UTC()
// 	_, err := r.DB.Exec(ctx, query, id, n.UserID, n.Total, created)
// 	if err != nil {
// 		return err
// 	}
// 	n.ID = id
// 	n.CreatedAt = created
// 	return nil
// }

// func (r *NetworthRepositoryPgx) GetLatestNetworth(userID uuid.UUID) (*models.Networth, error) {
// 	ctx := context.Background()

// 	query := `
// 		select id , user_id , total , created_at
// 		from networth
// 		where user_id=$1
// 		order by created_at desc
// 		limit 1
// 	`
// 	var n models.Networth
// 	err := r.DB.QueryRow(ctx, query, userID).Scan(
// 		&n.ID, &n.UserID, &n.Total, &n.CreatedAt,
// 	)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return &n, nil
// }

// func (r *NetworthRepositoryPgx) GetNetworthHistory(userID uuid.UUID) ([]models.Networth, error) {
// 	ctx := context.Background()

// 	query := `
// 		select id , user_id , total , created_at
// 		from networth
// 		where user_id=$1 order by created_at desc
// 	`
// 	rows, err := r.DB.Query(ctx, query, userID)
// 	if err != nil {
// 		return nil, err
// 	}
// 	defer rows.Close()

// 	var history []models.Networth
// 	for rows.Next() {
// 		var n models.Networth
// 		if err := rows.Scan(&n.ID, &n.UserID,
// 			&n.Total, &n.CreatedAt); err != nil {
// 			return nil, err
// 		}
// 		history = append(history, n)
// 	}
// 	return history, nil
// }

// func (r *NetworthRepositoryPgx) SaveNetWorthHistory(h *models.NetWorthHistory) error {
// 	ctx := context.Background()

// 	query := `
// 		INSERT INTO networth_history (user_id, net_worth, timestamp)
// 		VALUES ($1, $2, $3)
// 		RETURNING id
// 	`

// 	var id int64

// 	err := r.DB.QueryRow(
// 		ctx,
// 		query,
// 		h.UserID,
// 		h.NetWorth.String(),
// 		h.Timestamp,
// 	).Scan(&id)

// 	if err != nil {
// 		return err
// 	}

// 	h.ID = id
// 	return nil

// }

// func (r *NetworthRepositoryPgx) GetNetWorthHistoryRecords(userID uuid.UUID) ([]models.NetWorthHistory, error) {
// 	ctx := context.Background()

// 	query := `
// 		SELECT id, user_id, net_worth, timestamp
// 		FROM networth_history
// 		WHERE user_id = $1
// 		ORDER BY timestamp DESC
// 	`

// 	rows, err := r.DB.Query(ctx, query, userID)
// 	if err != nil {
// 		return nil, err
// 	}
// 	defer rows.Close()

// 	var res []models.NetWorthHistory

// 	for rows.Next() {
// 		var h models.NetWorthHistory
// 		var netWorthStr string
// 		var uid uuid.UUID

// 		if err := rows.Scan(
// 			&h.ID,
// 			&uid,
// 			&netWorthStr,
// 			&h.Timestamp,
// 		); err != nil {
// 			return nil, err
// 		}

// 		h.UserID = uid
// 		h.NetWorth = decimal.RequireFromString(netWorthStr)

// 		res = append(res, h)
// 	}

// 	return res, nil
// }

// func (r *NetworthRepositoryPgx) SaveBreakdown(b *models.NetWorthBreakdown) error {
// 	ctx := context.Background()

// 	query := `
// 			INSERT INTO networth_breakdown
// 				(user_id, portfolio_value, cash_balance, total_expenses, total_invested, current_net_worth, updated_at)
// 			VALUES ($1, $2, $3, $4, $5, $6, $7)
// 		`

// 	_, err := r.DB.Exec(
// 		ctx,
// 		query,
// 		b.UserID,
// 		b.PortfolioValue.String(),
// 		b.CashBalance.String(),
// 		b.TotalExpenses.String(),
// 		b.TotalInvested.String(),
// 		b.CurrentNetWorth.String(),
// 		b.UpdatedAt,
// 	)

// 	return err
// }

// func (r *NetworthRepositoryPgx) GetBreakdown(userID uuid.UUID) (*models.NetWorthBreakdown, error) {
// 	ctx := context.Background()

// 	query := `
// 		SELECT
// 			user_id,
// 			portfolio_value,
// 			cash_balance,
// 			total_expenses,
// 			total_invested,
// 			current_net_worth,
// 			updated_at
// 		FROM networth_breakdown
// 		WHERE user_id = $1
// 		ORDER BY updated_at DESC
// 		LIMIT 1
// 	`

// 	var b models.NetWorthBreakdown
// 	var portfolio, cash, expenses, invested, current string
// 	var uid uuid.UUID

// 	err := r.DB.QueryRow(ctx, query, userID).Scan(
// 		&uid,
// 		&portfolio,
// 		&cash,
// 		&expenses,
// 		&invested,
// 		&current,
// 		&b.UpdatedAt,
// 	)

// 	if err != nil {
// 		return nil, err
// 	}

// 	b.UserID = uid
// 	b.PortfolioValue = decimal.RequireFromString(portfolio)
// 	b.CashBalance = decimal.RequireFromString(cash)
// 	b.TotalExpenses = decimal.RequireFromString(expenses)
// 	b.TotalInvested = decimal.RequireFromString(invested)
// 	b.CurrentNetWorth = decimal.RequireFromString(current)

// 	return &b, nil
// }

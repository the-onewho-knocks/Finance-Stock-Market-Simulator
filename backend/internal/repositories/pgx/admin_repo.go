package pgx

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/interfaces"
)

type AdminRepositoryPGX struct {
	db *pgxpool.Pool
}

func NewAdminRepository(db *pgxpool.Pool) interfaces.AdminRepository {
	return &AdminRepositoryPGX{db: db}
}

func (r *AdminRepositoryPGX) GetDB() *pgxpool.Pool {
	return r.db
}

func (r *AdminRepositoryPGX) GetAllUsers() ([]models.User, error) {
	ctx := context.Background()
	query := `SELECT id, email, full_name, avatar_url, google_id, created_at, updated_at FROM users ORDER BY created_at DESC`
	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var res []models.User
	for rows.Next() {
		var u models.User
		var id uuid.UUID
		var created time.Time
		var updated time.Time
		if err := rows.Scan(&id, &u.Email, &u.FullName, &u.AvatarURL, &u.GoogleID, &created, &updated); err != nil {
			return nil, err
		}
		u.ID = id
		u.CreatedAt = created
		u.UpdatedAt = updated
		res = append(res, u)
	}
	return res, nil
}

func (r *AdminRepositoryPGX) DeleteUser(id string) error {
	ctx := context.Background()
	query := `DELETE FROM users WHERE id=$1`
	_, err := r.db.Exec(ctx, query, id)
	return err
}

func (r *AdminRepositoryPGX) GetUserPortfolio(userID string) ([]models.PortfolioItem, error) {
	query := `SELECT id, user_id, stock_symbol, quantity, avg_price, created_at, updated_at FROM portfolio_items WHERE user_id=$1`
	ctx := context.Background()
	rows, err := r.db.Query(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var res []models.PortfolioItem
	for rows.Next() {
		var it models.PortfolioItem
		var id uuid.UUID
		var uid uuid.UUID
		var created time.Time
		var updated time.Time
		if err := rows.Scan(&id, &uid, &it.StockSymbol, &it.Quantity, &it.AvgPrice, &created, &updated); err != nil {
			return nil, err
		}
		it.ID = id.String()
		it.UserID = uid.String()
		it.CreatedAt = created
		it.UpdatedAt = updated
		res = append(res, it)
	}
	return res, nil
}

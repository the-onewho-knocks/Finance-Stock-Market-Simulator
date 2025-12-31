package pgx

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/interfaces"
)

type UserRepositoryPgx struct {
	db *pgxpool.Pool
}

func NewUserRepository(db *pgxpool.Pool) interfaces.UserRepository {
	return &UserRepositoryPgx{db: db}
}

func (r *UserRepositoryPgx) GetDB() *pgxpool.Pool {
	return r.db
}

func (r *UserRepositoryPgx) CreateUser(user *models.User) error {
	query := `
		INSERT INTO users (
			id,
			email,
			full_name,
			avatar_url,
			google_id,
			fake_balance,
			is_admin,
			created_at,
			updated_at
		)
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
	`

	_, err := r.db.Exec(
		context.Background(),
		query,
		user.ID,
		user.Email,
		user.FullName,
		user.AvatarURL,
		user.GoogleID,
		user.Fake_Balance,
		user.IsAdmin,
		user.CreatedAt,
		user.UpdatedAt,
	)

	return err
}

// im a but suspicious here to the id may cause data type conflict
func (r *UserRepositoryPgx) GetUserByID(id uuid.UUID) (*models.User, error) {
	user := models.User{}
	query := `
	select  id , email , full_name , avatar_url, google_id, fake_balance
	from users where id=$1
	`
	if err := r.db.QueryRow(context.Background(), query, id).Scan(
		&user.ID,
		&user.Email,
		&user.FullName,
		&user.AvatarURL,
		&user.GoogleID,
		&user.Fake_Balance,
	); err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *UserRepositoryPgx) GetUserByEmail(email string) (*models.User, error) {
	user := models.User{}
	query := `
		SELECT id, email, full_name, avatar_url, google_id, fake_balance
		FROM users WHERE email=$1
	`
	err := r.db.QueryRow(context.Background(), query, email).Scan(
		&user.ID,
		&user.Email,
		&user.FullName,
		&user.AvatarURL,
		&user.GoogleID,
		&user.Fake_Balance,
	)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *UserRepositoryPgx) UpdateUser(user *models.User) error {
	query := `
		UPDATE users SET full_name=$1, avatar_url=$2, fake_balance=$3
		WHERE id=$4
	`
	_, err := r.db.Exec(context.Background(), query, user.FullName, user.AvatarURL, user.Fake_Balance, user.ID)
	return err
}

func (r *UserRepositoryPgx) IncrementFakeBalance(userID uuid.UUID, amount float64) error {
	query := `
		update users set fake_balance = fake_balance + $1 where id=$2
	`
	_, err := r.db.Exec(context.Background(), query, amount, userID)
	return err
}

func (r *UserRepositoryPgx) DeductFakeBalance(userID uuid.UUID, amount float64) error {
	query := `
		update users set fake_balance = fake_balance - $1 where id=$2
	`
	_, err := r.db.Exec(context.Background(), query, amount, userID)
	return err
}

func (r *UserRepositoryPgx) getSingle(where string, value any) (*models.User, error) {
	query := `
		select id , email , full_name , avatar_url , google_id , fake_balance
		, is_admin , created_at , updated_at 
		from users where
	` + where

	var u models.User

	err := r.db.QueryRow(context.Background(), query, value).Scan(
		&u.ID,
		&u.Email,
		&u.FullName,
		&u.AvatarURL,
		&u.GoogleID,
		&u.Fake_Balance,
		&u.IsAdmin,
		&u.CreatedAt,
		&u.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &u, nil
}

func (r *UserRepositoryPgx) GetUserByGoogleID(googleID string) (*models.User, error) {
	return r.getSingle("google_id=$1", googleID)
}

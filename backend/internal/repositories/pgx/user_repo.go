package pgx

import (
	"context"

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
		insert into users (id,email,full_namename,avatar_url,google_id,fake_balance)
		values ($1,$2,$3,$4,$5,$6)
	`
	_, err := r.db.Exec(context.Background(), query, user.ID, user.Email, user.AvatarURL, user.GoogleID, user.Fake_Balance)
	return err
}

func (r *UserRepositoryPgx) GetUserByID(id string) (*models.User, error) {
	user := models.User{}
	query := `
	select  id , email , full_name , avatar_url, google_id, fake_balance
	from users where id=$1
	`
	err := r.db.QueryRow(context.Background(), query, id).Scan(&user.ID, &user.Email, &user.FullName, &user.AvatarURL, &user.Fake_Balance)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *UserRepositoryPgx) GetUserByEmail(email string) (*models.User, error) {
	user := models.User{}
	query := `
		select id , email , full_name , avatar_url, google_id, fake_balance
		from users where email=$1
	`
	err := r.db.QueryRow(context.Background(), query, email).Scan(&user.ID, &user.Email, &user.FullName, &user.AvatarURL, &user.Fake_Balance)
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

func (r *UserRepositoryPgx) IncrementFakeBalance(userID string, amount float64) error {
	query := `
		update users set fake_balance = fake_balance + $1 where id=$2
	`
	_, err := r.db.Exec(context.Background(), query, amount, userID)
	return err
}

func (r *UserRepositoryPgx) DeductFakeBalance(userID string, amount float64) error {
	query := `
		update users set fake_balance = fake_balance - $1 where id=$2
	`
	_, err := r.db.Exec(context.Background(), query, amount, userID)
	return err
}

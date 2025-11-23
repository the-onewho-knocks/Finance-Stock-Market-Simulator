package interfaces

import "github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"

type UserRepository interface {
	BaseRepository

	CreateUser(user *models.User) error
	GetUserByID(id string) (*models.User, error)
	GetUserByEmail(email string) (*models.User, error)
	UpdateUser(user *models.User) error

	IncrementFakeBalance(userID string, amount float64) error
	DeductFakeBalance(userID string, amount float64) error
}

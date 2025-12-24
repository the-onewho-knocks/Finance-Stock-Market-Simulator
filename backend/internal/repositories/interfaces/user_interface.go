package interfaces

import (
	"github.com/google/uuid"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
)

type UserRepository interface {
	BaseRepository

	CreateUser(user *models.User) error
	GetUserByID(id uuid.UUID) (*models.User, error)
	GetUserByEmail(email string) (*models.User, error)
	UpdateUser(user *models.User) error

	IncrementFakeBalance(userID uuid.UUID, amount float64) error
	DeductFakeBalance(userID uuid.UUID, amount float64) error
}

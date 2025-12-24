package interfaces

import (
	"github.com/google/uuid"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
)

type AdminRepository interface {
	BaseRepository

	GetAllUsers() ([]models.User, error)
	DeleteUser(id uuid.UUID) error
	GetUserPortfolio(userID uuid.UUID) ([]models.PortfolioItem, error)
}

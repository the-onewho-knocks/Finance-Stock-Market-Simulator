package interfaces

import "github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"

type AdminRepository interface {
	BaseRepository

	GetAllUsers() ([]models.User, error)
	DeleteUser(id string) error
	GetUserPortfolio(userID string) ([]models.PortfolioItem, error)
}

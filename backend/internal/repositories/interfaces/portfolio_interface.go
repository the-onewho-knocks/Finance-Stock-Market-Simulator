package interfaces

import (
	"github.com/google/uuid"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
)

type PortfolioRepository interface {
	BaseRepository

	GetPortfolio(userID uuid.UUID) ([]models.PortfolioItem, error)
	BuyStock(item *models.PortfolioItem) error
	SellStock(userID uuid.UUID, stockSymbol string, quantity int) error
	GetStockHolding(userID uuid.UUID, stockSymbol string) (*models.PortfolioItem, error)
}

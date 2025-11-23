package interfaces

import "github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"

type PortfolioRepository interface {
	BaseRepository

	GetPortfolio(userID string) ([]models.PortfolioItem,error)
	BuyStock(item *models.PortfolioItem) error
	SellStock(userID string , stockSymbol string , quantity int) error
	GetStockHolding(userID string , stockSymbol string) (*models.PortfolioItem , error)
}
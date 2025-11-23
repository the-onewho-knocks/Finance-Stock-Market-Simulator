package interfaces

import "github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"

type TransactionRepository interface {
	BaseRepository

	AddTransaction(tx *models.Transaction) error
	GetTransaction(userID string) ([]models.Transaction, error)
}

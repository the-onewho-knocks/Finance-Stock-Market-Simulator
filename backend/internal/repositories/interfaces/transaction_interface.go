package interfaces

import (
	"github.com/google/uuid"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
)

type TransactionRepository interface {
	BaseRepository

	AddTransaction(tx *models.Transaction) error
	GetTransaction(userID uuid.UUID) ([]models.Transaction, error)
}

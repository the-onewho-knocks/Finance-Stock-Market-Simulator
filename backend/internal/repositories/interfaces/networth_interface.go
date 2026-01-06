package interfaces

import (
	"github.com/google/uuid"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
)

type NetworthRepository interface {
	BaseRepository

	// snapshots
	SaveNetworth(n *models.Networth) error
	GetLatestNetworth(userID uuid.UUID) (*models.Networth, error)
	GetNetworthHistory(userID uuid.UUID) ([]models.Networth, error)

	// history
	SaveNetWorthHistory(h *models.NetWorthHistory) error
	GetNetWorthHistoryRecords(userID uuid.UUID) ([]models.NetWorthHistory, error)

	// breakdown
	SaveBreakdown(b *models.NetWorthBreakdown) error
	GetBreakdown(userID uuid.UUID) (*models.NetWorthBreakdown, error)
}

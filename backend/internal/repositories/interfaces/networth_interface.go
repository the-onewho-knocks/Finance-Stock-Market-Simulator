package interfaces

import "github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"

type NetworthRepository interface {
	BaseRepository

	SaveNetworth(n *models.Networth) error
	GetLatestNetworth(userID string) (*models.Networth,error)
	GetNetworthHistory(userID string) ([]models.Networth,error)

		// Advanced analytics models
	SaveNetWorthHistory(h *models.NetWorthHistory) error
	GetNetWorthHistoryRecords(userID string) ([]models.NetWorthHistory, error)

	SaveBreakdown(b *models.NetWorthBreakdown) error
	GetBreakdown(userID string) (*models.NetWorthBreakdown, error)
}
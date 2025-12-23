package services

import (
	"context"
	"time"

	"github.com/shopspring/decimal"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
)

type HeatmapService struct {
	stockCache   *cache.StockCache
	heatmapCache *cache.HeatmapCache
	stockAPI     stockapi.Client
}

func NewHeatmapService(
	stockCache *cache.StockCache,
	heatmapCache *cache.HeatmapCache,
	stockAPI stockapi.Client,
) *HeatmapService {
	return &HeatmapService{
		stockCache:   stockCache,
		heatmapCache: heatmapCache,
		stockAPI:     stockAPI,
	}
}

// build Heatmap builds sector wise heatmap data for symbols
func (s *HeatmapService) BuildHeatmap(
	ctx context.Context,
	symbols []string,
) (*models.HeatmapResult, error) {

	sectorMap := make(map[string][]models.HeatmapItem)
	sectorChangeSum := make(map[string]decimal.Decimal)
	sectorCount := make(map[string]int)

	for _, symbol := range symbols {

		//change from redis
		changeFloat, err := s.stockCache.GetChange(symbol)
		if err != nil {
			return nil, err
		}

		changePct := decimal.NewFromFloat(changeFloat)

		profile, err := s.stockAPI.GetCompanyProfile(symbol)
		if err != nil {
			continue
		}

		sector := profile.Sector
		if sector == "" {
			sector = "Others"
		}

		item := models.HeatmapItem{
			Symbol:    symbol,
			Company:   profile.Name,
			ChangePct: changePct,
			MarketCap: decimal.NewFromInt(profile.MarketCap),
		}

		sectorMap[sector] = append(sectorMap[sector], item)
		sectorChangeSum[sector] = sectorChangeSum[sector].Add(changePct)
		sectorCount[sector]++

		symbolColor := mapChangeToColor(changeFloat)
		if err := s.heatmapCache.SetColor(symbol, symbolColor); err != nil {
			return nil, err
		}
	}

	for sector, totalChange := range sectorChangeSum {
		avg := totalChange.Div(decimal.NewFromInt(int64(sectorCount[sector])))
		_ = s.heatmapCache.SetSectorColor(
			sector,
			mapChangeToColor(avg.InexactFloat64()),
		)
	}

	sectors := make([]models.HeatmapSector, 0, len(sectorMap))
	for sector, items := range sectorMap {
		sectors = append(sectors, models.HeatmapSector{
			Sector: sector,
			Items:  items,
		})
	}

	return &models.HeatmapResult{
		Sectors:     sectors,
		GeneratedAt: time.Now().UTC(),
	}, nil
}

func mapChangeToColor(change float64) string {
	switch {
	case change >= 5:
		return "dark-green"
	case change >= 2:
		return "green"
	case change > 0:
		return "light-green"
	case change == 0:
		return "neutral"
	case change > -2:
		return "light-red"
	case change > -5:
		return "red"
	default:
		return "dark-red"
	}
}

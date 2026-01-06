package services

import (
	"context"
	"strconv"
	"strings"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
)

type HeatmapService struct {
	client *stockapi.RapidApiClient
	cache  *cache.HeatmapCache
}

func NewHeatmapService(
	client *stockapi.RapidApiClient,
	cache *cache.HeatmapCache,
) *HeatmapService {
	return &HeatmapService{client: client, cache: cache}
}

func parseNumber(s string) float64 {
	s = strings.ReplaceAll(s, "$", "")
	s = strings.ReplaceAll(s, ",", "")
	s = strings.ReplaceAll(s, "%", "")
	v, _ := strconv.ParseFloat(s, 64)
	return v
}

func (s *HeatmapService) GetMarketHeatmap(
	ctx context.Context,
	page int,
) ([]models.HeatmapBlock, error) {

	var cached []models.HeatmapBlock
	if ok, _ := s.cache.Get(ctx, page, &cached); ok {
		return cached, nil
	}

	resp, err := s.client.GetMarketTickersRaw(page)
	if err != nil {
		return nil, err
	}

	heatmap := make([]models.HeatmapBlock, 0, len(resp.Body))
	for _, t := range resp.Body {
		change := parseNumber(t.PctChange)
		heatmap = append(heatmap, models.HeatmapBlock{
			Symbol:    t.Symbol,
			Name:      t.Name,
			Value:     parseNumber(t.MarketCap),
			ChangePct: parseNumber(t.PctChange),
			Color:     heatmapColor(change),
		})
	}

	_ = s.cache.Set(ctx, page, heatmap)
	return heatmap, nil
}

func heatmapColor(change float64) string {
	switch {
	case change >= 3:
		return "#006400" // dark green
	case change >= 1:
		return "#00a000" // green
	case change > 0:
		return "#7CFC00" // light green
	case change == 0:
		return "#808080" // grey
	case change > -1:
		return "#FF7F7F" // light red
	case change > -3:
		return "#ff0000" // red
	default:
		return "#8B0000" // dark red
	}
}

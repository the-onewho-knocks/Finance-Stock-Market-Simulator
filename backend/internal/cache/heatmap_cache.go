package cache

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
)

type HeatmapCache struct {
	client *redis.Client
	ttl    time.Duration
}

func NewHeatMapCache(
	client *redis.Client,
) *HeatmapCache {
	return &HeatmapCache{
		client: client,
		ttl:    5 * time.Second,
	}
}

func (c *HeatmapCache) Get(
	ctx context.Context,
	page int,
	result *[]models.HeatmapBlock,
) (bool, error) {
	key := fmt.Sprintf("heatmap:market:page:%d", page)
	return GetJSON(ctx, c.client, key, result)
}

func (c *HeatmapCache) Set(
	ctx context.Context,
	page int,
	data []models.HeatmapBlock,
) error {
	key := fmt.Sprintf("heatmap:market:page:%d", page)
	return SetJSON(ctx, c.client, key, data, c.ttl)
}

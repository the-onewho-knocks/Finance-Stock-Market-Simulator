package cache

import (
	"context"
	"fmt"

	"github.com/redis/go-redis/v9"
)

type HeatmapCache struct {
	client *redis.Client
}

func NewHeatmapCache() *HeatmapCache {
	return &HeatmapCache{
		client: RedisClient,
	}
}

func (c *HeatmapCache) SetColor(symbol string, color string) error {
	ctx := context.Background()
	key := fmt.Sprintf("heatmap:%s", symbol)
	return c.client.Set(ctx, key, color, 0).Err()
}

func (c *HeatmapCache) SetSectorColor(sector string, color string) error {
	ctx := context.Background()
	key := fmt.Sprintf("heatmap:%s", sector)
	return c.client.Set(ctx, key, color, 0).Err()
}

func (c *HeatmapCache) GetFullHeatmap() (map[string]string, error) {
	ctx := context.Background()
	pattern := "heatmap:*"

	iter := c.client.Scan(ctx, 0, pattern, 0).Iterator()
	result := make(map[string]string)

	for iter.Next(ctx) {
		key := iter.Val()
		color, _ := c.client.Get(ctx, key).Result()
		trimmedKey := key[8:]
		result[trimmedKey] = color
	}
	return result, iter.Err()
}

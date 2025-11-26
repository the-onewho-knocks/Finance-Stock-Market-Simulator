package cache

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

type DashBoardCache struct {
	client *redis.Client
}

func NewDashBoardCache() *DashBoardCache {
	return &DashBoardCache{
		client: RedisClient,
	}
}

func (c *DashBoardCache) SetNetworth(userID string, value float64) error {
	ctx := context.Background()
	key := fmt.Sprintf("dashboard: %s:networth", userID)
	return c.client.Set(ctx, key, value, 1*time.Minute).Err()
}

func (c *DashBoardCache) GetNetworth(userID string) (float64, error) {
	ctx := context.Background()
	key := fmt.Sprintf("dashboard:%s:networth", userID)
	return c.client.Get(ctx, key).Float64()
}

func (c *DashBoardCache) SetPortFolioValue(userID string, value float64) error {
	ctx := context.Background()
	key := fmt.Sprintf("dashboard:%s:portfolio", userID)
	return c.client.Set(ctx, key, value, 1*time.Minute).Err()
}

func (c *DashBoardCache) GetPortfolioValue(userID string) (float64, error) {
	ctx := context.Background()
	key := fmt.Sprintf("dashboard:%s:portfolio", userID)
	return c.client.Get(ctx, key).Float64()
}

func (c *DashBoardCache) SetDailyExpense(userID string, value float64) error {
	ctx := context.Background()
	key := fmt.Sprintf("dashboard:%s:daily_expense", userID)
	return c.client.Set(ctx, key, value, 2*time.Minute).Err()
}

func (c *DashBoardCache) GetDailyExpense(userID string) (float64, error) {
	ctx := context.Background()
	key := fmt.Sprintf("dashboard:%s:daily_expense", userID)
	return c.client.Get(ctx, key).Float64()
}

func (c *DashBoardCache) SetMarketSentiment(value float64) error {
	ctx := context.Background()
	return c.client.Set(ctx, "dashboard:market:sentiment", value, 1*time.Minute).Err()
}

func (c *DashBoardCache) GetMarketSentiment() (float64, error) {
	ctx := context.Background()
	return c.client.Get(ctx, "dashboard:market:sentiment").Float64()
}

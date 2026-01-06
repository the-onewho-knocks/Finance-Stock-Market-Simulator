package cache

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

type DashboardCache struct {
	client *redis.Client
}

func NewDashboardCache() *DashboardCache {
	return &DashboardCache{
		client: RedisClient,
	}
}

// ================= NET WORTH =================

func (c *DashboardCache) SetNetworth(ctx context.Context, userID string, value float64) error {
	key := fmt.Sprintf("dashboard:%s:networth", userID)
	return c.client.Set(ctx, key, value, time.Minute).Err()
}

func (c *DashboardCache) GetNetworth(ctx context.Context, userID string) (float64, bool) {
	key := fmt.Sprintf("dashboard:%s:networth", userID)
	val, err := c.client.Get(ctx, key).Float64()
	if err == redis.Nil {
		return 0, false
	}
	return val, err == nil
}

// ================= PORTFOLIO =================

func (c *DashboardCache) SetPortfolioValue(ctx context.Context, userID string, value float64) error {
	key := fmt.Sprintf("dashboard:%s:portfolio", userID)
	return c.client.Set(ctx, key, value, time.Minute).Err()
}

func (c *DashboardCache) GetPortfolioValue(ctx context.Context, userID string) (float64, bool) {
	key := fmt.Sprintf("dashboard:%s:portfolio", userID)
	val, err := c.client.Get(ctx, key).Float64()
	if err == redis.Nil {
		return 0, false
	}
	return val, err == nil
}

// ================= DAILY EXPENSE =================

func (c *DashboardCache) SetDailyExpense(ctx context.Context, userID string, value float64) error {
	key := fmt.Sprintf("dashboard:%s:daily_expense", userID)
	return c.client.Set(ctx, key, value, 2*time.Minute).Err()
}

func (c *DashboardCache) GetDailyExpense(ctx context.Context, userID string) (float64, bool) {
	key := fmt.Sprintf("dashboard:%s:daily_expense", userID)
	val, err := c.client.Get(ctx, key).Float64()
	if err == redis.Nil {
		return 0, false
	}
	return val, err == nil
}

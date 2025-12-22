package cache

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

type StockCache struct {
	client *redis.Client
}

func NewStockCache() *StockCache {
	return &StockCache{
		client: RedisClient,
	}
}

// setters
func (c *StockCache) SetPrice(symbol string, price float64) error {
	ctx := context.Background()
	key := fmt.Sprintf("stock:%s", symbol)
	return c.client.HSet(ctx, key, map[string]interface{}{
		"price":      price,
		"updated_at": time.Now().UTC().Format(time.RFC3339),
	}).Err()
}

func (c *StockCache) SetChange(symbol string, changePercent float64) error {
	ctx := context.Background()
	key := fmt.Sprintf("stock:%s", symbol)
	return c.client.HSet(ctx, key, map[string]interface{}{
		"change":     changePercent,
		"updated_at": time.Now().UTC().Format(time.RFC3339),
	}).Err()
}

func (c *StockCache) SetStockData(symbol string, price float64, change float64) error {
	ctx := context.Background()
	key := fmt.Sprintf("stock:%s", symbol)
	return c.client.HSet(ctx, key, map[string]interface{}{
		"price":      price,
		"change":     change,
		"updated_at": time.Now().UTC().Format(time.RFC3339),
	}).Err()
}

//getters

// this fuckin current stock price which is set
func (c *StockCache) GetPrice(symbol string) (float64, error) {
	ctx := context.Background()
	key := fmt.Sprintf("stock:%s", symbol)
	return c.client.HGet(ctx, key, "price").Float64()
}

// this fuckin function fetches the price of change of a stock
// (for example +1.25 or -0.80) from Redis cache.
func (c *StockCache) GetChange(symbol string) (float64, error) {
	ctx := context.Background()
	key := fmt.Sprintf("stock:%s", symbol)
	return c.client.HGet(ctx, key, "change").Float64()
}

func (c *StockCache) GetLastUpdated(symbol string) (string, error) {
	ctx := context.Background()
	key := fmt.Sprintf("stock:%s", symbol)
	return c.client.HGet(ctx, key, "updated_at").Result()
}

func (c *StockCache) GetStockData(symbol string) (map[string]string, error) {
	ctx := context.Background()
	key := fmt.Sprintf("stock:%s", symbol)
	return c.client.HGetAll(ctx, key).Result()
}

// bulk operations
func (c *StockCache) GetMultiple(ctx context.Context, symbols []string) (map[string]map[string]string, error) {
	pipe := c.client.Pipeline()

	cmds := make(map[string]*redis.MapStringStringCmd, len(symbols))

	for _, symbol := range symbols {
		key := fmt.Sprintf("stock:%s", symbol)
		cmds[symbol] = pipe.HGetAll(ctx, key)
	}

	if _, err := pipe.Exec(ctx); err != nil {
		return nil, err
	}

	result := make(map[string]map[string]string, len(symbols))

	for symbol, cmd := range cmds {
		data, err := cmd.Result()
		if err == nil && len(data) > 0 {
			result[symbol] = data
		}
	}

	return result, nil
}

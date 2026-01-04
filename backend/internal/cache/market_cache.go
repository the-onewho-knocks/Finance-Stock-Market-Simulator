package cache

import (
	"context"
	"encoding/json"
	"time"

	"github.com/redis/go-redis/v9"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
)

type MarketCache struct {
	rdb *redis.Client
}

func NewMarketCache(rdb *redis.Client) *MarketCache {
	return &MarketCache{rdb: rdb}
}

func (c *MarketCache) Get(ctx context.Context, key string, dest any) bool {
	val, err := c.rdb.Get(ctx, key).Result()
	if err != nil {
		return false
	}

	_ = json.Unmarshal([]byte(val), dest)
	return true
}

func (c *MarketCache) Set(ctx context.Context, key string, data any, ttl time.Duration) {
	bytes, _ := json.Marshal(data)
	c.rdb.Set(ctx, key, bytes, ttl)
}

func (c *MarketCache) GetPrice(
	ctx context.Context,
	symbol string,
) (*stockapi.QuoteResponse, bool) {

	key := "price:" + symbol

	val, err := c.rdb.Get(ctx, key).Result()
	if err != nil {
		return nil, false
	}

	var quote stockapi.QuoteResponse

	_ = json.Unmarshal([]byte(val), &quote)
	return &quote, true
}

func (c *MarketCache) SetPrice(
	ctx context.Context,
	symbol string,
	quote *stockapi.QuoteResponse,
) {
	key := "price:" + symbol
	bytes, _ := json.Marshal(quote)
	c.rdb.Set(ctx, key, bytes, 15*time.Second)
}

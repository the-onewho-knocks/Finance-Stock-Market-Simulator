package cache

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
)

const (
	historyTTL      = 10 * time.Minute
	historyStatsTTL = 30 * time.Minute
)

type HistoryCache struct{}

func NewHistoryCache() *HistoryCache {
	return &HistoryCache{}
}

func (c *HistoryCache) historyKey(stock, period string) string {
	return fmt.Sprintf("history:price:%s:%s", stock, period)
}

func (c *HistoryCache) statsKey(stock, stats string) string {
	return fmt.Sprintf("history:stats:%s:%s", stock, stats)
}

func (c *HistoryCache) GetHistory(
	ctx context.Context,
	stock string,
	period string,
) ([]stockapi.HistoricalPrice, bool) {

	val, err := RedisClient.Get(ctx, c.historyKey(stock, period)).Result()
	if err != nil {
		if err == redis.Nil {
			return nil, false // cache miss
		}
		return nil, false
	}

	var data []stockapi.HistoricalPrice
	if err := json.Unmarshal([]byte(val), &data); err != nil {
		return nil, false
	}

	return data, true
}

func (c *HistoryCache) SetHistory(
	ctx context.Context,
	stock string,
	period string,
	data []stockapi.HistoricalPrice,
) error {

	bytes, err := json.Marshal(data)
	if err != nil {
		return err
	}

	return RedisClient.Set(
		ctx,
		c.historyKey(stock, period),
		bytes,
		historyTTL,
	).Err()
}

func (c *HistoryCache) GetHistoryStats(
	ctx context.Context,
	stock string,
	stats string,
) (stockapi.HistoricalStats, bool) {

	val, err := RedisClient.Get(ctx, c.statsKey(stock, stats)).Result()
	if err != nil {
		if err == redis.Nil {
			return stockapi.HistoricalStats{}, false // cache miss
		}
		return stockapi.HistoricalStats{}, false
	}

	var data stockapi.HistoricalStats
	if err := json.Unmarshal([]byte(val), &data); err != nil {
		return stockapi.HistoricalStats{}, false
	}

	return data, true
}

func (c *HistoryCache) SetHistoryStats(
	ctx context.Context,
	stock string,
	stats string,
	data stockapi.HistoricalStats,
) error {

	bytes, err := json.Marshal(data)
	if err != nil {
		return err
	}

	return RedisClient.Set(
		ctx,
		c.statsKey(stock, stats),
		bytes,
		historyStatsTTL,
	).Err()
}

package cache

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

type IndicatorCache struct {
	client *redis.Client
	ttl    time.Duration
}

func NewIndicatorCache(client *redis.Client) *IndicatorCache {
	return &IndicatorCache{
		client: client,
		ttl:    2 * time.Minute,
	}
}

func (c *IndicatorCache) key(parts ...any) string {
	return fmt.Sprintf("indicator:%v", parts)
}

func (c *IndicatorCache) Get(
	ctx context.Context,
	key string,
	dest any,
) (bool, error) {

	val, err := c.client.Get(ctx, key).Result()
	if err == redis.Nil {
		return false, nil
	}
	if err != nil {
		return false, err
	}

	return true, json.Unmarshal([]byte(val), dest)
}

func (c *IndicatorCache) Set(
	ctx context.Context,
	key string,
	value any,
) error {

	data, err := json.Marshal(value)
	if err != nil {
		return err
	}

	return c.client.Set(ctx, key, data, c.ttl).Err()
}

package cache

import (
	"context"
	"encoding/json"
	"time"

	"github.com/redis/go-redis/v9"
)

func SetJSON(
	ctx context.Context,
	client *redis.Client,
	key string,
	value any,
	ttl time.Duration,
)error{

	b , err := json.Marshal(value)
	if err != nil {
		return err
	}

	return client.Set(ctx , key , b , ttl).Err()
}

func GetJSON(
	ctx context.Context,
	client *redis.Client,
	key string,
	dest any,
) (bool , error){

	val , err := client.Get(ctx , key).Result()
	if err == redis.Nil {
		return false , nil
	}
	if err != nil {
		return false , nil
	}

	return true , json.Unmarshal([]byte(val),dest)
}
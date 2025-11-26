package cache

import (
	"context"
	"log"
	"time"

	"github.com/redis/go-redis/v9"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/config"
)

var RedisClient *redis.Client

func InitializeRedis(cfg *config.Config) {
	RedisClient = redis.NewClient(&redis.Options{
		Addr:     cfg.RedisHost,
		Password: cfg.RedisPassword,
		DB:       cfg.RedisDB,
	})

	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	if err := RedisClient.Ping(ctx).Err(); err != nil {
		log.Fatalf("failed to connect to redis murumai %v", err.Error())
	}

	log.Println("connected to redis successfully")
}

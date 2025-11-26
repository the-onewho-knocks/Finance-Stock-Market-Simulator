package config

import (
	"strconv"
)

type RedisConfig struct {
	Host     string
	Password string
	DB       int
}

func LoadRedisConfig() *RedisConfig {
	db, err := strconv.Atoi(getEnv("REDIS_DB", "0"))
	if err != nil {
		db = 0
	}
	return &RedisConfig{
		Host:     getEnv("REDIS_HOST", "localhost:6379"),
		Password: getEnv("REDIS_PASSWORD", ""),
		DB:       db,
	}
}

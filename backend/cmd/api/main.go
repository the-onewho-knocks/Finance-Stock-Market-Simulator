package main

import (
	"context"
	"log"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/config"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/routes"
)

func main() {
	// -------------------------------
	// 1. Load Configuration
	// -------------------------------
	cfg := config.LoadConfig()
	log.Println("Config loaded")

	// -------------------------------
	// 2. Connect to PostgreSQL (pgxpool)
	// -------------------------------
	dbpool, err := pgxpool.New(context.Background(), cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("❌ Failed to connect to PostgreSQL: %v", err)
	}

	// Ping DB
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	if err := dbpool.Ping(ctx); err != nil {
		log.Fatalf("❌ PostgreSQL ping failed: %v", err)
	}

	log.Println("PostgreSQL connected successfully")

	// -------------------------------
	// 3. Initialize Redis (Memurai)
	// -------------------------------
	cache.InitializeRedis(cfg)

	// -------------------------------
	// 4. Initialize Gin Router
	// -------------------------------
	router := gin.Default()

	// -------------------------------
	// 5. Register Routes
	// -------------------------------
	routes.RegisterRoutes(router, dbpool)

	log.Printf("Server running at http://localhost:%s", cfg.AppPort)

	// -------------------------------
	// 6. Start Server
	// -------------------------------
	if err := router.Run(":" + cfg.AppPort); err != nil {
		log.Fatalf("❌ Server failed: %v", err)
	}
}

package main

import (
	"context"
	"log"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/config"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/routes"
)

func main() {
	cfg := config.LoadConfig()

	dbpool, err := pgxpool.New(context.Background(), cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("unable to connect to database: %v", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := dbpool.Ping(ctx); err != nil {
		log.Fatalf("database connection failed: %v", err)
	}

	log.Println("connected to postgresql using pgxpool")

	router := gin.Default()

	routes.RegisterRoutes(router, dbpool)

	log.Printf("server started at port %s", cfg.AppPort)
	if err := router.Run(":" + cfg.AppPort); err != nil {
		log.Fatalf("server failed: %v", err)
	}
}

package main

import (
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/config"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/routes"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
)

func main() {
	cfg := config.LoadConfig()

	// Redis
	cache.InitializeRedis(cfg)

	// Router
	r := chi.NewRouter()

	// Middleware (industry standard)
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(15 * time.Second))

	// Stock API client
	stockClient := stockapi.NewRapidAPIClient(cfg.RapidAPIKey)

	// Cache
	historyCache := cache.NewHistoryCache()

	// Service
	historyService := services.NewHistoryService(
		*stockClient,
		historyCache,
	)

	// Handler
	historyHandler := handler.NewHistoryHandler(historyService)

	// Routes
	routes.RegisterHistoryRoutes(r, historyHandler)

	log.Println("Server running on port", cfg.AppPort)
	log.Fatal(http.ListenAndServe(":"+cfg.AppPort, r))
}

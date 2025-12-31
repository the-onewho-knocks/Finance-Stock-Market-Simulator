package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/config"
	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/pgx"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/routes"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	cfg := config.LoadConfig()

	// Database
	dbPool, err := pgxpool.New(context.Background(), cfg.DatabaseURL)
	if err != nil {
		log.Fatal("failed to connect to database:", err)
	}
	defer dbPool.Close()
	log.Println("connected to PostgreSQL successfully")

	// Redis
	cache.InitializeRedis(cfg)
	log.Println("connected to redis successfully")

	stockCache := cache.NewStockCache()
	heatmapCache := cache.NewHeatmapCache()

	// External API
	stockClient := stockapi.NewYahooClient(cfg.RapidAPIKey, cfg.RapidAPIHost)

	// Repositories
	userRepo := pgx.NewUserRepository(dbPool)
	adminRepo := pgx.NewAdminRepository(dbPool)
	portfolioRepo := pgx.NewPortfolioRepository(dbPool)
	transactionRepo := pgx.NewTransactionRepository(dbPool)
	expenseRepo := pgx.NewExpenseRepository(dbPool)
	plannedExpenseRepo := pgx.NewPlannedExpenseRepository(dbPool)
	networthRepo := pgx.NewNetworthRepository(dbPool)

	// Services
	userService := services.NewUserService(userRepo)
	authService := services.NewAuthService(userService)
	adminService := services.NewAdminService(adminRepo)

	expenseService := services.NewExpenseService(expenseRepo)
	plannedExpenseService := services.NewPlannedExpenseService(plannedExpenseRepo)

	portfolioService := services.NewPortfolioService(portfolioRepo, stockCache)

	networthService := services.NewNetworthService(
		networthRepo,
		userRepo,
		portfolioService,
		expenseService,
	)

	transactionService := services.NewTransactionService(
		userRepo,
		portfolioRepo,
		transactionRepo,
		stockCache,
		networthService,
	)

	marketService := services.NewMarketService(stockClient, stockCache)
	heatmapService := services.NewHeatmapService(stockCache, heatmapCache, stockClient)
	dashboardService := services.NewDashboardService(
		networthService,
		portfolioService,
		expenseService,
		heatmapService,
	)
	newsService := services.NewNewsService(stockClient)

	// Handlers
	authHandler := handler.NewAuthHandler(authService)
	userHandler := handler.NewUserHandler(userService)
	adminHandler := handler.NewAdminHandler(adminService)
	portfolioHandler := handler.NewPortfolioHandler(portfolioService)
	transactionHandler := handler.NewTransactionHandler(transactionService)
	marketHandler := handler.NewMarketHandler(marketService)
	expenseHandler := handler.NewExpenseHandler(expenseService)
	plannedExpenseHandler := handler.NewPlannedExpenseHandler(plannedExpenseService)
	networthHandler := handler.NewNetworthHandler(networthService)
	dashboardHandler := handler.NewDashboardHandler(dashboardService)
	heatmapHandler := handler.NewHeatmapHandler(heatmapService)
	newsHandler := handler.NewNewsHandler(newsService)

	// Router
	r := chi.NewRouter()

	// ✅ CORS (FIXED)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:5500",
			"http://127.0.0.1:5500",
		},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))

	r.Get("/health", func(w http.ResponseWriter, _ *http.Request) {
		w.Write([]byte("OK"))
	})

	routes.RegisterRoutes(
		r,
		authHandler,
		userHandler,
		adminHandler,
		portfolioHandler,
		transactionHandler,
		marketHandler,
		expenseHandler,
		plannedExpenseHandler,
		networthHandler,
		dashboardHandler,
		heatmapHandler,
		newsHandler,
	)

	log.Println("Server running on port", cfg.AppPort)
	log.Fatal(http.ListenAndServe(":"+cfg.AppPort, r))
}

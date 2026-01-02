// @title Finance Simulation API
// @version 1.0
// @description Backend API for Finance Stock Market Simulator
// @host localhost:8080
// @BasePath /

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

	httpSwagger "github.com/swaggo/http-swagger"
	_ "github.com/the-onewho-knocks/finance-Simulation/backend/docs"

	// Internal packages
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/config"
	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/pgx"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/routes"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
)

func main() {
	// =========================
	// Load ENV
	// =========================
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	cfg := config.LoadConfig()

	// =========================
	// Database (PostgreSQL)
	// =========================
	dbPool, err := pgxpool.New(context.Background(), cfg.DatabaseURL)
	if err != nil {
		log.Fatal("failed to connect to database:", err)
	}
	defer dbPool.Close()
	log.Println("connected to PostgreSQL successfully")

	// =========================
	// Redis
	// =========================
	cache.InitializeRedis(cfg)
	log.Println("connected to redis successfully")

	stockCache := cache.NewStockCache()
	heatmapCache := cache.NewHeatmapCache()

	// =========================
	// External APIs
	// =========================
	yahooClient := stockapi.NewYahooClient(
		cfg.RapidAPIKey,
		cfg.RapidAPIHost,
	)

	// =========================
	// Repositories
	// =========================
	userRepo := pgx.NewUserRepository(dbPool)
	adminRepo := pgx.NewAdminRepository(dbPool)
	portfolioRepo := pgx.NewPortfolioRepository(dbPool)
	transactionRepo := pgx.NewTransactionRepository(dbPool)
	expenseRepo := pgx.NewExpenseRepository(dbPool)
	plannedExpenseRepo := pgx.NewPlannedExpenseRepository(dbPool)
	networthRepo := pgx.NewNetworthRepository(dbPool)

	// =========================
	// Services
	// =========================
	userService := services.NewUserService(userRepo)
	adminService := services.NewAdminService(adminRepo)

	expenseService := services.NewExpenseService(expenseRepo)
	plannedExpenseService := services.NewPlannedExpenseService(plannedExpenseRepo)

	portfolioService := services.NewPortfolioService(
		portfolioRepo,
		stockCache,
	)

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

	marketService := services.NewMarketService(
		yahooClient,
		stockCache,
	)

	heatmapService := services.NewHeatmapService(
		stockCache,
		heatmapCache,
		yahooClient,
	)

	dashboardService := services.NewDashboardService(
		networthService,
		portfolioService,
		expenseService,
		heatmapService,
	)

	newsService := services.NewNewsService(yahooClient)

	// =========================
	// Handlers
	// =========================
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

	// =========================
	// Router
	// =========================
	r := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:5500",
			"http://127.0.0.1:5500",
		},
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))

	// =========================
	// Health Check
	// =========================
	r.Get("/health", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	// =========================
	// Swagger
	// =========================
	r.Get("/swagger/*", httpSwagger.WrapHandler)

	// =========================
	// API Routes
	// =========================
	routes.RegisterRoutes(
		r,
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

	// =========================
	// Start Server
	// =========================
	log.Println("Server running on port", cfg.AppPort)
	log.Fatal(http.ListenAndServe(":"+cfg.AppPort, r))
}

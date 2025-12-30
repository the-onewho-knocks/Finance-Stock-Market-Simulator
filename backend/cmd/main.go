package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/pgx"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/routes"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
)

func main() {
	// -------------------------
	// Config
	// -------------------------
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// -------------------------
	// Database
	// -------------------------
	dbPool, err := db.NewPGXPool()
	if err != nil {
		log.Fatal("failed to connect to database:", err)
	}
	defer dbPool.Close()

	// -------------------------
	// Cache (Redis)
	// -------------------------
	stockCache := cache.NewStockCache()

	// -------------------------
	// External APIs
	// -------------------------
	stockClient := stockapi.NewClient()

	// -------------------------
	// Repositories
	// -------------------------
	userRepo := pgx.NewUserRepository(dbPool)
	adminRepo := pgx.NewAdminRepository(dbPool)
	portfolioRepo := pgx.NewPortfolioRepository(dbPool)
	transactionRepo := pgx.NewTransactionRepository(dbPool)
	expenseRepo := pgx.NewExpenseRepository(dbPool)
	plannedExpenseRepo := pgx.NewPlannedExpenseRepository(dbPool)
	networthRepo := pgx.NewNetworthRepository(dbPool)

	// -------------------------
	// Services
	// -------------------------
	userService := services.NewUserService(userRepo)
	networthService := services.NewNetworthRepository(
		networthRepo,
		userRepo,
		portfolioSvc,
		expenseSvc,
	)
	transactionService := services.NewTransactionService(
		userRepo,
		portfolioRepo,
		transactionRepo,
		stockCache,
		networthService,
	)
	portfolioService := services.NewPortfolioService(
		portfolioRepo,
		stockCache,
		networthService,
	)
	expenseService := services.NewExpenseService(
		expenseRepo,
		networthService,
	)
	plannedExpenseService := services.NewPlannedExpenseService(plannedExpenseRepo)
	marketService := services.NewMarketService(stockClient, stockCache)
	heatmapService := services.NewHeatmapService(stockClient)
	dashboardService := services.NewDashboardService(
		networthService,
		portfolioService,
		expenseService,
		heatmapService,
	)

	// -------------------------
	// Handlers
	// -------------------------
	authHandler := handler.NewAuthHandler(userService)
	userHandler := handler.NewUserHandler(userService)
	adminHandler := handler.NewAdminHandler(adminRepo)
	portfolioHandler := handler.NewPortfolioHandler(portfolioService)
	transactionHandler := handler.NewTransactionHandler(transactionService)
	expenseHandler := handler.NewExpenseHandler(expenseService)
	plannedExpenseHandler := handler.NewPlannedExpenseHandler(plannedExpenseService)
	networthHandler := handler.NewNetworthHandler(networthService)
	marketHandler := handler.NewMarketHandler(marketService)
	dashboardHandler := handler.NewDashboardHandler(dashboardService)
	heatmapHandler := handler.NewHeatmapHandler(heatmapService)

	// -------------------------
	// Router
	// -------------------------
	r := chi.NewRouter()

	// global middleware
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))

	// health check
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	// -------------------------
	// Routes
	// -------------------------
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
	)

	// -------------------------
	// Server
	// -------------------------
	log.Println("Server running on port", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}

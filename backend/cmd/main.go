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
		log.Fatal("db connection failed:", err)
	}
	defer dbPool.Close()

	// -------------------------
	// Cache (Redis)
	// -------------------------
	stockCache := cache.NewStockCache()
	heatmapCache := cache.NewHeatmapCache()

	// -------------------------
	// External APIs
	// -------------------------
	stockClient := stockapi.NewYahooClient()

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

	// core services
	userService := services.NewUserService(userRepo)
	authService := services.NewAuthService(userService)
	adminService := services.NewAdminService(adminRepo)

	expenseService := services.NewExpenseService(expenseRepo)
	portfolioService := services.NewPortfolioRepository(portfolioRepo, stockCache)

	networthService := services.NewNetworthRepository(
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

	plannedExpenseService := services.NewPlannedExpenseService(plannedExpenseRepo)

	marketService := services.NewMarketService(stockClient, stockCache)

	heatmapService := services.NewHeatmapService(
		stockCache,
		heatmapCache,
		stockClient,
	)

	dashboardService := services.NewDashboardService(
		networthService,
		portfolioService,
		expenseService,
		heatmapService,
	)

	newsService := services.NewNewsService(stockClient)
	companyService := services.NewCompanyService(stockClient)
	indicatorService := services.NewIndiacatorService(stockClient)

	// -------------------------
	// Handlers
	// -------------------------
	authHandler := handler.NewAuthHandler(authService)
	userHandler := handler.NewUserHandler(userService)
	adminHandler := handler.NewAdminHandler(adminService)
	portfolioHandler := handler.NewPortfolioHandler(portfolioService)
	transactionHandler := handler.NewTransactionHandler(transactionService)
	expenseHandler := handler.NewExpenseHandler(expenseService)
	plannedExpenseHandler := handler.NewPlannedExpenseHandler(plannedExpenseService)
	networthHandler := handler.NewNetworthHandler(networthService)
	marketHandler := handler.NewMarketHandler(marketService)
	heatmapHandler := handler.NewHeatmapHandler(heatmapService)
	dashboardHandler := handler.NewDashboardHandler(dashboardService)
	newsHandler := handler.NewNewsHandler(newsService)
	companyHandler := handler.NewCompanyHandler(companyService)
	indicatorHandler := handler.NewIndicatorHandler(indicatorService)

	// -------------------------
	// Router
	// -------------------------
	r := chi.NewRouter()

	// middleware
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

	// extra feature routes
	routes.RegisterNewsRoutes(r, newsHandler)
	routes.RegisterCompanyRoutes(r, companyHandler)
	routes.RegisterIndicatorRoutes(r, indicatorHandler)

	// -------------------------
	// Server
	// -------------------------
	log.Println("Server started on port", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}

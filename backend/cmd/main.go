// package main

// import (
// 	"log"
// 	"net/http"
// 	"time"

// 	"github.com/go-chi/chi/v5"
// 	"github.com/go-chi/chi/v5/middleware"

// 	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
// 	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/config"
// 	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
// 	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/routes"
// 	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
// 	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
// )

// func main() {
// 	cfg := config.LoadConfig()

// 	// Redis
// 	cache.InitializeRedis(cfg)

// 	// Router
// 	r := chi.NewRouter()

// 	// Middleware (industry standard)
// 	r.Use(middleware.RequestID)
// 	r.Use(middleware.RealIP)
// 	r.Use(middleware.Logger)
// 	r.Use(middleware.Recoverer)
// 	r.Use(middleware.Timeout(15 * time.Second))

// 	// Stock API client
// 	stockClient := stockapi.NewRapidAPIClient(cfg.RapidAPIKey)

// 	// Cache
// 	historyCache := cache.NewHistoryCache()

// 	// Service
// 	historyService := services.NewHistoryService(
// 		*stockClient,
// 		historyCache,
// 	)

// 	// Handler
// 	historyHandler := handler.NewHistoryHandler(historyService)

// 	// Routes
// 	routes.RegisterHistoryRoutes(r, historyHandler)

// 	log.Println("Server running on port", cfg.AppPort)
// 	log.Fatal(http.ListenAndServe(":"+cfg.AppPort, r))
// }

// package main

// import (
// 	"fmt"
// 	"log"
// 	"net/http"
// 	"os"

// 	"github.com/go-chi/chi/v5"
// 	"github.com/joho/godotenv"
// 	"github.com/redis/go-redis/v9"

// 	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
// 	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
// 	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/routes"
// 	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
// )

// func main() {
// 	_ = godotenv.Load() // 🔥 REQUIRED

// 	fmt.Println("RAPIDAPI_KEY:", os.Getenv("RAPIDAPI_KEY"))
// 	fmt.Println("RAPIDAPI_HOST:", os.Getenv("RAPIDAPI_HOST"))

// 	r := chi.NewRouter()

// 	redisClient := redis.NewClient(&redis.Options{
// 		Addr: "localhost:6379",
// 	})

// 	cache := cache.NewMarketCache(redisClient)
// 	service := services.NewMarketService(
// 		os.Getenv("RAPIDAPI_KEY"),
// 		cache,
// 	)

// 	handler := handler.NewMarketHandler(service)
// 	routes.MarketRoutes(r, handler)

// 	log.Println("🚀 Market service running on :8080")
// 	http.ListenAndServe(":8080", r)
// }

// package main

// import (
// 	"fmt"
// 	"log"
// 	"net/http"
// 	"os"

// 	"github.com/go-chi/chi/v5"
// 	"github.com/joho/godotenv"
// 	"github.com/redis/go-redis/v9"

// 	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
// 	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
// 	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/routes"
// 	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
// 	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
// )

// func main() {

// 	_ = godotenv.Load(".env") // 🔥 REQUIRED

// 	fmt.Println("DEBUG RAPIDAPI_KEY =", os.Getenv("RAPIDAPI_KEY"))
// 	fmt.Println("DEBUG RAPIDAPI_HOST =", os.Getenv("RAPIDAPI_HOST"))

// 	fmt.Println("RAPIDAPI_KEY:", os.Getenv("RAPIDAPI_KEY"))
// 	fmt.Println("RAPIDAPI_HOST:", os.Getenv("RAPIDAPI_HOST"))

// 	r := chi.NewRouter()

// 	// ================= Redis =================

// 	redisClient := redis.NewClient(&redis.Options{
// 		Addr: "localhost:6379",
// 	})

// 	indicatorCache := cache.NewIndicatorCache(redisClient)

// 	// ================= API Client =================
// 	stockClient := stockapi.NewRapidApiClient(
// 		os.Getenv("RAPIDAPI_KEY"),
// 		os.Getenv("RAPIDAPI_HOST"),
// 	)

// 	// ================= Services =================

// 	indicatorService := services.NewIndicatorService(
// 		stockClient,
// 		indicatorCache,
// 	)

// 	// ================= Handlers =================

// 	indicatorHandler := handler.NewIndicatorHandler(
// 		indicatorService,
// 	)

// 	// ================= Routes =================

// 	routes.IndicatorRoutes(r, indicatorHandler)

// 	log.Println("🚀 Indicator service running on :8080")
// 	log.Fatal(http.ListenAndServe(":8080", r))
// }

package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/config"
	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/pgx"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/routes"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
)

func main() {
	// =========================
	// Load Config
	// =========================
	cfg := config.LoadConfig()

	// =========================
	// PostgreSQL
	// =========================
	dbPool, err := pgxpool.New(context.Background(), cfg.DatabaseURL)
	if err != nil {
		log.Fatal("❌ failed to connect to database:", err)
	}
	defer dbPool.Close()

	// =========================
	// Redis
	// =========================
	cache.InitializeRedis(cfg)

	stockCache := cache.NewStockCache()
	marketCache := cache.NewMarketCache(cache.RedisClient)

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
		cfg.RapidAPIKey,
		marketCache,
		stockCache,
	)

	// =========================
	// Handlers
	// =========================
	h := &routes.Handlers{
		User:           handler.NewUserHandler(userService),
		Admin:          handler.NewAdminHandler(adminService),
		Portfolio:      handler.NewPortfolioHandler(portfolioService),
		Transaction:    handler.NewTransactionHandler(transactionService),
		Expense:        handler.NewExpenseHandler(expenseService),
		PlannedExpense: handler.NewPlannedExpenseHandler(plannedExpenseService),
		Networth:       handler.NewNetworthHandler(networthService),
		Market:         handler.NewMarketHandler(marketService),
	}

	// =========================
	// Router
	// =========================
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))

	// Health check
	r.Get("/health", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	// Mount API routes
	r.Mount("/", routes.RegisterRoutes(h))

	// =========================
	// Start Server
	// =========================
	log.Println("🚀 Server running on port", cfg.AppPort)
	log.Fatal(http.ListenAndServe(":"+cfg.AppPort, r))
}

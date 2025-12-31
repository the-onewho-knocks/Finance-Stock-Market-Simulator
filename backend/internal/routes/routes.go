package routes

import (
	"github.com/go-chi/chi/v5"

	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
)

// RegisterRoutes is the single entry point for all API routes
func RegisterRoutes(
	r chi.Router,

	authHandler *handler.AuthHandler,
	userHandler *handler.UserHandler,
	adminHandler *handler.AdminHandler,
	portfolioHandler *handler.PortfolioHandler,
	transactionHandler *handler.TransactionHandler,
	marketHandler *handler.MarketHandler,
	expenseHandler *handler.ExpenseHandler,
	plannedExpenseHandler *handler.PlannedExpenseHandler,
	networthHandler *handler.NetworthHandler,
	dashboardHandler *handler.DashboardHandler,
	heatmapHandler *handler.HeatmapHandler,
	newsHandler *handler.NewsHandler,
) {

	// Auth
	RegisterAuthRoutes(r, authHandler)

	// Users
	RegisterUserRoutes(r, userHandler)

	// Admin
	RegisterAdminRoutes(r, adminHandler)

	// Portfolio
	RegisterPortfolioRoutes(r, portfolioHandler)

	// Transactions
	RegisterTransactionRoutes(r, transactionHandler)

	// Market
	RegisterMarketRoutes(r, marketHandler)

	// Expenses
	RegisterExpenseRoutes(r, expenseHandler)

	// Planned Expenses
	RegisterPlannedExpenseRoutes(r, plannedExpenseHandler)

	// Networth
	RegisterNetworthRoutes(r, networthHandler)

	// Dashboard
	RegisterDashboardRoutes(r, dashboardHandler)

	// Heatmap
	RegisterHeatmapRoutes(r, heatmapHandler)

	// News
	RegisterNewsRoutes(r, newsHandler)
}

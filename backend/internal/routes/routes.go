// package routes

// import (
// 	"github.com/go-chi/chi/v5"

// 	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
// )

// // RegisterRoutes is the single entry point for all API routes
// func RegisterRoutes(
// 	r chi.Router,

// //	authHandler *handler.AuthHandler,
// 	userHandler *handler.UserHandler,
// 	adminHandler *handler.AdminHandler,
// 	portfolioHandler *handler.PortfolioHandler,
// 	transactionHandler *handler.TransactionHandler,
// 	marketHandler *handler.MarketHandler,
// 	expenseHandler *handler.ExpenseHandler,
// 	plannedExpenseHandler *handler.PlannedExpenseHandler,
// 	networthHandler *handler.NetworthHandler,
// //	dashboardHandler *handler.DashboardHandler,
// //	heatmapHandler *handler.HeatmapHandler,
// 	indianStockHandler *handler.IndianStockHandler,
// 	historyHandler *handler.HistoryHandler,
// ) {

// 	// Users
// 	RegisterUserRoutes(r, userHandler)

// 	// Admin
// 	RegisterAdminRoutes(r, adminHandler)

// 	// Portfolio
// 	RegisterPortfolioRoutes(r, portfolioHandler)

// 	// Transactions
// 	RegisterTransactionRoutes(r, transactionHandler)

// 	// Market
// //	RegisterMarketRoutes(r, marketHandler)

// 	// Expenses
// 	RegisterExpenseRoutes(r, expenseHandler)

// 	// Planned Expenses
// 	RegisterPlannedExpenseRoutes(r, plannedExpenseHandler)

// 	// Networth
// 	RegisterNetworthRoutes(r, networthHandler)

// 	// Dashboard
// //	RegisterDashboardRoutes(r, dashboardHandler)

// 	// Heatmap
// //	RegisterHeatmapRoutes(r, heatmapHandler)

// 	// Indian Stocks
// 	RegisterIndianStockRoutes(r, indianStockHandler)

// 	RegisterHistoryRoutes(r , historyHandler)
// }

package routes

import (
	"github.com/go-chi/chi/v5"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
)

type Handlers struct {
	User           *handler.UserHandler
	Admin          *handler.AdminHandler
	Portfolio      *handler.PortfolioHandler
	Transaction    *handler.TransactionHandler
	Market         *handler.MarketHandler
	Expense        *handler.ExpenseHandler
	PlannedExpense *handler.PlannedExpenseHandler
	Networth       *handler.NetworthHandler
}

func RegisterRoutes(h *Handlers) chi.Router {
	r := chi.NewRouter()

	RegisterUserRoutes(r, h.User)
	RegisterAdminRoutes(r, h.Admin)
	RegisterPortfolioRoutes(r, h.Portfolio)
	RegisterTransactionRoutes(r, h.Transaction)
	RegisterExpenseRoutes(r, h.Expense)
	RegisterPlannedExpenseRoutes(r, h.PlannedExpense)
	RegisterNetworthRoutes(r, h.Networth)
	RegisterMarketRoutes(r, h.Market)

	return r
}

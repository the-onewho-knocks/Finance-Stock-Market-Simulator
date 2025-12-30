package routes

import (
	"github.com/go-chi/chi/v5"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
)

// RegisterTransactionRoutes registers all transaction-related routes
func RegisterTransactionRoutes(
	r chi.Router,
	transactionHandler *handler.TransactionHandler,
) {
	r.Route("/transactions", func(r chi.Router) {
		r.Post("/buy", transactionHandler.Buy)
		r.Post("/sell", transactionHandler.Sell)
		r.Get("/{user_id}", transactionHandler.GetTransactions)
	})
}

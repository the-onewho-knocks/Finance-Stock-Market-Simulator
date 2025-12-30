package routes

import (
	"github.com/go-chi/chi/v5"

	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
)

func RegisterHistoryRoutes(
	r chi.Router,
	historyHandler *handler.HistoryHandler,
) {
	r.Route("/history", func(r chi.Router) {

		// GET /history/{symbol}
		r.Get("/{symbol}", historyHandler.GetHistoricalPrices)
	})
}

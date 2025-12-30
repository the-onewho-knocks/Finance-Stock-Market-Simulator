package routes

import (
	"github.com/go-chi/chi/v5"

	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
)

// RegisterNewsRoutes registers news-related routes
func RegisterNewsRoutes(
	r chi.Router,
	newsHandler *handler.NewsHandler,
) {
	r.Route("/news", func(r chi.Router) {

		// GET /news/market
		r.Get("/market", newsHandler.GetMarketNews)

		// GET /news/{symbol}
		r.Get("/{symbol}", newsHandler.GetSymbolNews)
	})
}

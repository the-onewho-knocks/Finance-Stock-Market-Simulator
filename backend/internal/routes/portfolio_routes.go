package routes

import (
	"github.com/go-chi/chi/v5"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
)

func RegisterPortfolioRoutes(
	r chi.Router,
	h *handlers.PortfolioHandler,
) {
	r.Route("/portfolio", func(r chi.Router) {

		// portfolio listing
		r.Get("/{user_id}", h.GetPortfolio)

		// portfolio metrics (market value, invested amount)
		r.Get("/{user_id}/metrics", h.GetPortfolioMetrics)

		// trading actions
		r.Post("/buy", h.BuyStock)
		r.Post("/sell", h.SellStock)
	})
}

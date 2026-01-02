package routes

import (
	"github.com/go-chi/chi/v5"
	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
)

func RegisterIndianStockRoutes(
	r chi.Router,
	h *handler.IndianStockHandler,
) {
	r.Route("/stocks", func(r chi.Router) {
		r.Get("/indian", h.GetStockByName)
	})
}

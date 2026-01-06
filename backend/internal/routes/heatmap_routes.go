package routes

import (
	"github.com/go-chi/chi/v5"
	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
)

func RegisterHeatmapRoutes(
	r chi.Router,
	heatmapHandler *handler.HeatmapHandler,
) {
	r.Route("/heatmap", func(r chi.Router) {
		r.Get("/market", heatmapHandler.GetMarketHeatmap)
	})
}

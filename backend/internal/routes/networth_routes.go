package routes

import (
	"github.com/go-chi/chi/v5"
	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
)

// RegisterNetworthRoutes registers all networth-related endpoints
func RegisterNetworthRoutes(
	r chi.Router,
	h *handler.NetworthHandler,
) {
	r.Route("/users/{userID}/networth", func(r chi.Router) {

		//  recompute everything
		r.Post("/recalculate", h.RecalculateNetworth)

		//  current networth
		r.Get("/latest", h.GetLatestNetworth)

		// historical snapshots
		r.Get("/history", h.GetNetworthHistory)

		// full breakdown
		r.Get("/breakdown", h.GetNetworthBreakdown)
	})
}

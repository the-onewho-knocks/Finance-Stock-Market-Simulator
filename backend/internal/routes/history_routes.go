package routes

import (
	"github.com/go-chi/chi/v5"
	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
)

func RegisterHistoryRoutes(
	r chi.Router,
	handler *handler.HistoryHandler,
) {
	r.Route("/history", func(r chi.Router) {
		r.Get("/{stock}", handler.GetHistory)
		r.Get("/{stock}/stats", handler.GetHistoryStats)
	})
}

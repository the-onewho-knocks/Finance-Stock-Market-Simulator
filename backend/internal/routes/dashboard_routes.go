package routes

import (
	"github.com/go-chi/chi/v5"
	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
)

func RegisterDashboardRoutes(
	r chi.Router,
	h *handler.DashboardHandler,
) {
	r.Route("/dashboard", func(r chi.Router) {
		r.Get("/{userID}", h.GetDashboard)
	})
}

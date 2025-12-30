package routes

import (
	"github.com/go-chi/chi/v5"

	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
)

// RegisterDashboardRoutes binds dashboard endpoints
func RegisterDashboardRoutes(
	r chi.Router,
	handler *handler.DashboardHandler,
) {
	r.Route("/dashboard", func(r chi.Router) {
		r.Post("/{userID}", handler.GetDashboard)
	})
}

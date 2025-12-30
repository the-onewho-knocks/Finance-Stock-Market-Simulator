package routes

import (
	"github.com/go-chi/chi/v5"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
)

// RegisterPlannedExpenseRoutes binds planned expense endpoints
func RegisterPlannedExpenseRoutes(
	r chi.Router,
	handler *handler.PlannedExpenseHandler,
) {
	r.Route("/users/{userID}/planned-expenses", func(r chi.Router) {

		// Create planned expense
		r.Post("/", handler.CreatePlan)

		// Get all planned expenses for a user
		r.Get("/", handler.GetPlans)

		// Delete a planned expense
		r.Delete("/{planID}", handler.DeletePlan)
	})
}

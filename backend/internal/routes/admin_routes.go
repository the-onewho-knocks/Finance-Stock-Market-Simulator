package routes

import (
	"github.com/go-chi/chi/v5"
	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
)

func RegisterAdminRoutes(
	r chi.Router,
	adminHandler *handler.AdminHandler,
) {
	r.Route("/admin", func(r chi.Router) {

		// users
		r.Get("/users", adminHandler.GetAllUsers)
		r.Delete("/users/{userID}", adminHandler.DeleteUser)

		// portfolio of a specific user
		r.Get("/users/{userID}/portfolio", adminHandler.GetUserPortfolio)
	})
}

package routes

import (
	"github.com/go-chi/chi/v5"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
)

func RegisterUserRoutes(r chi.Router, h *handler.UserHandler) {
	r.Post("/users", h.CreateUser)

	r.Get("/users/{id}", h.GetUserByID)
	r.Get("/users/email/{email}", h.GetUserByEmail)
	//	r.Get("/users/google/{google_id}", h.GetUserByGoogleID)

	r.Patch("/users/{id}", h.UpdateUser)

	r.Post("/users/{id}/balance/add", h.IncrementFakeBalance)
	r.Post("/users/{id}/balance/deduct", h.DeductFakeBalance)
}

package routes

import (
	"github.com/go-chi/chi/v5"

	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
)

func RegisterCompanyRoutes(
	r chi.Router,
	companyHandler *handler.CompanyHandler,
) {
	r.Route("/company", func(r chi.Router) {

		// GET /company/{symbol}
		r.Get("/{symbol}", companyHandler.GetCompanyProfile)
	})
}

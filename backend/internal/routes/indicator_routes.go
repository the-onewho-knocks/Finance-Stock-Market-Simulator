package routes

import (
	"github.com/go-chi/chi/v5"
	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
)

func IndicatorRoutes(
	r chi.Router,
	handler *handler.IndicatorHandler,
) {
	r.Route("/indicators", func(r chi.Router) {
		r.Get("/sma/{symbol}", handler.GetSMA)
		r.Get("/rsi/{symbol}", handler.GetRSI)
	})
}

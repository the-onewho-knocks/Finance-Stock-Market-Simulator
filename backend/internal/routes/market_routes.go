package routes

import (
	"github.com/go-chi/chi/v5"

	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
)

func RegisterMarketRoutes(r chi.Router, h *handler.MarketHandler) {

	r.Route("/market", func(r chi.Router) {

		// prices
		r.Get("/price/{symbol}", h.GetPrice)
		r.Get("/prices", h.GetPrices)

		// streaming
		r.Get("/stream", h.PriceStream)

		// quotes & news
		r.Get("/quote/{ticker}", h.GetQuote)
		r.Get("/news/{ticker}", h.GetMarketNews)
	})
}

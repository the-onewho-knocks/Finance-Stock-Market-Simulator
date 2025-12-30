package handler

import (
	"net/http"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
)

// MarketHandler handles market-related HTTP requests
type MarketHandler struct {
	marketService *services.MarketService
}

// constructor
func NewMarketHandler(marketService *services.MarketService) *MarketHandler {
	return &MarketHandler{
		marketService: marketService,
	}
}

// GET /market/price/{symbol}
// Fetch single stock price (cache + API fallback)
func (h *MarketHandler) GetPrice(w http.ResponseWriter, r *http.Request) {
	symbol := chi.URLParam(r, "symbol")
	if symbol == "" {
		http.Error(w, "symbol is required", http.StatusBadRequest)
		return
	}

	data, err := h.marketService.GetPrice(strings.ToUpper(symbol))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, data)
}

// GET /market/prices?symbols=AAPL,MSFT,GOOG
// Fetch multiple stock prices
func (h *MarketHandler) GetPrices(w http.ResponseWriter, r *http.Request) {
	symbolsParam := r.URL.Query().Get("symbols")
	if symbolsParam == "" {
		http.Error(w, "symbols query param is required", http.StatusBadRequest)
		return
	}

	symbols := strings.Split(symbolsParam, ",")
	for i := range symbols {
		symbols[i] = strings.ToUpper(strings.TrimSpace(symbols[i]))
	}

	data, err := h.marketService.GetPrices(symbols)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, data)
}

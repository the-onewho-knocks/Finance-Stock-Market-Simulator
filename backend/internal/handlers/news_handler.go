package handler

import (
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
)

// NewsHandler handles HTTP requests related to news
type NewsHandler struct {
	service *services.NewsService
}

func NewNewsHandler(service *services.NewsService) *NewsHandler {
	return &NewsHandler{
		service: service,
	}
}

// GET /news/market
func (h *NewsHandler) GetMarketNews(
	w http.ResponseWriter,
	r *http.Request,
) {
	news, err := h.service.GetMarketNews(r.Context())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, news)
}

// GET /news/{symbol}
func (h *NewsHandler) GetSymbolNews(
	w http.ResponseWriter,
	r *http.Request,
) {
	symbol := chi.URLParam(r, "symbol")
	if symbol == "" {
		http.Error(w, "symbol is required", http.StatusBadRequest)
		return
	}

	news, err := h.service.GetSymbolNews(r.Context(), symbol)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, news)
}

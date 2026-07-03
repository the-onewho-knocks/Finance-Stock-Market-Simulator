package handler

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
)

type HistoryHandler struct {
	service *services.HistoryService
}

func NewHistoryHandler(service *services.HistoryService) *HistoryHandler {
	return &HistoryHandler{service: service}
}

/*
GET /history/{stock}?period=1m
*/
func (h *HistoryHandler) GetHistory(w http.ResponseWriter, r *http.Request) {
	stock := chi.URLParam(r, "stock")
	period := r.URL.Query().Get("period")
	if period == "" {
		period = "1m"
	}

	data, err := h.service.GetHistoricalPrices(stock, period)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(data)
}

/*
GET /history/{stock}/stats?stats=quarter_results
*/
func (h *HistoryHandler) GetHistoryStats(w http.ResponseWriter, r *http.Request) {
	stock := chi.URLParam(r, "stock")
	stats := r.URL.Query().Get("stats")

	if stats == "" {
		http.Error(w, "stats query param is required", http.StatusBadRequest)
		return
	}

	data, err := h.service.GetHistoricalStats(stock, stats)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(data)
}

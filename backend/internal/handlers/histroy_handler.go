package handler

import (
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
)

type HistoryHandler struct {
	service *services.HistoryService
}

func NewHistoryHandler(service *services.HistoryService) *HistoryHandler {
	return &HistoryHandler{service: service}
}

// GET /history/{symbol}?start=...&end=...&interval=1d
func (h *HistoryHandler) GetHistoricalPrices(
	w http.ResponseWriter,
	r *http.Request,
) {
	symbol := chi.URLParam(r, "symbol")
	interval := r.URL.Query().Get("interval")

	startStr := r.URL.Query().Get("start")
	endStr := r.URL.Query().Get("end")

	startUnix, err := strconv.ParseInt(startStr, 10, 64)
	if err != nil {
		http.Error(w, "invalid start timestamp", http.StatusBadRequest)
		return
	}

	endUnix, err := strconv.ParseInt(endStr, 10, 64)
	if err != nil {
		http.Error(w, "invalid end timestamp", http.StatusBadRequest)
		return
	}

	data, err := h.service.GetHistoricalPrices(
		r.Context(),
		symbol,
		time.Unix(startUnix, 0),
		time.Unix(endUnix, 0),
		interval,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, data)
}

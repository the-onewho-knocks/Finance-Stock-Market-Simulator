package handler

import (
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
)

type IndicatorHandler struct {
	service *services.IndicatorService
}

func NewIndicatorHandler(service *services.IndicatorService) *IndicatorHandler {
	return &IndicatorHandler{service: service}
}

func (h *IndicatorHandler) GetSMA(w http.ResponseWriter, r *http.Request) {
	symbol := chi.URLParam(r, "symbol")

	interval := r.URL.Query().Get("interval")
	if interval == "" {
		interval = "5m"
	}

	period, _ := strconv.Atoi(r.URL.Query().Get("period"))
	if period == 0 {
		period = 50
	}

	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	if limit == 0 {
		limit = 50
	}

	data, err := h.service.GetSMA(
		r.Context(),
		symbol,
		interval,
		period,
		limit,
	)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}

	writeJSON(w, http.StatusOK, data)
}

func (h *IndicatorHandler) GetRSI(w http.ResponseWriter, r *http.Request) {
	symbol := chi.URLParam(r, "symbol")

	interval := r.URL.Query().Get("interval")
	if interval == "" {
		interval = "5m"
	}

	period, _ := strconv.Atoi(r.URL.Query().Get("period"))
	if period == 0 {
		period = 50
	}

	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	if limit == 0 {
		limit = 50
	}

	data, err := h.service.GetRSI(
		r.Context(),
		symbol,
		interval,
		period,
		limit,
	)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}

	writeJSON(w, http.StatusOK, data)
}

// writeError sends a standardized error response
func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{
		"error": message,
	})
}

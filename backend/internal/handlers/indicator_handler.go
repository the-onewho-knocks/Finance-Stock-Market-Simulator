package handler

import (
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
)

type IndicatorHandler struct {
	service *services.IndicatorService
}

func NewIndicatorHandler(service *services.IndicatorService) *IndicatorHandler {
	return &IndicatorHandler{
		service: service,
	}
}

// GET /indicators/sma/{symbol}?period=14&start=...&end=...&interval=1d
func (h *IndicatorHandler) GetSMA(
	w http.ResponseWriter,
	r *http.Request,
) {
	h.handleIndicator(w, r, "sma")
}

// GET /indicators/rsi/{symbol}?period=14&start=...&end=...&interval=1d
func (h *IndicatorHandler) GetRSI(
	w http.ResponseWriter,
	r *http.Request,
) {
	h.handleIndicator(w, r, "rsi")
}

// shared logic
func (h *IndicatorHandler) handleIndicator(
	w http.ResponseWriter,
	r *http.Request,
	indicator string,
) {
	symbol := chi.URLParam(r, "symbol")
	if symbol == "" {
		http.Error(w, "symbol is required", http.StatusBadRequest)
		return
	}

	periodStr := r.URL.Query().Get("period")
	startStr := r.URL.Query().Get("start")
	endStr := r.URL.Query().Get("end")
	interval := r.URL.Query().Get("interval")

	period, err := strconv.Atoi(periodStr)
	if err != nil || period <= 0 {
		http.Error(w, "invalid period", http.StatusBadRequest)
		return
	}

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

	start := time.Unix(startUnix, 0)
	end := time.Unix(endUnix, 0)

	var result []float64

	switch indicator {
	case "sma":
		result, err = h.service.GetSMA(
			r.Context(),
			symbol,
			period,
			start,
			end,
			interval,
		)
	case "rsi":
		result, err = h.service.GetRSI(
			r.Context(),
			symbol,
			period,
			start,
			end,
			interval,
		)
	default:
		http.Error(w, "unsupported indicator", http.StatusBadRequest)
		return
	}

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{
		"symbol":    symbol,
		"indicator": indicator,
		"period":    period,
		"values":    result,
	})
}

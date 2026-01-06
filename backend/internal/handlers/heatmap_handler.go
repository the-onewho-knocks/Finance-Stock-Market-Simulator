package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
)

type HeatmapHandler struct {
	service *services.HeatmapService
}

func NewHeatmapHandler(service *services.HeatmapService) *HeatmapHandler {
	return &HeatmapHandler{service: service}
}

// GET /heatmap/market?page=1
func (h *HeatmapHandler) GetMarketHeatmap(
	w http.ResponseWriter,
	r *http.Request,
) {

	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	if page == 0 {
		page = 1
	}

	data, err := h.service.GetMarketHeatmap(r.Context(), page)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

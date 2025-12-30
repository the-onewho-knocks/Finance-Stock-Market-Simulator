package handler

import (
	"encoding/json"
	"net/http"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
)

type HeatmapHandler struct {
	service *services.HeatmapService
}

func NewHeatmapHandler(
	service *services.HeatmapService,
) *HeatmapHandler {
	return &HeatmapHandler{
		service: service,
	}
}

func (h *HeatmapHandler) BuildHeatmap(
	w http.ResponseWriter,
	r *http.Request,
) {
	defer r.Body.Close()

	var req struct {
		Symbols []string `json:"symbols"`
	}

	if err := json.NewDecoder(r.Body).Decode(req); err != nil || len(req.Symbols) == 0 {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	result, err := h.service.BuildHeatmap(r.Context(), req.Symbols)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, result)
}

func (h *HeatmapHandler) GetHeatmapColors(w http.ResponseWriter, r *http.Request) {
	data, err := h.service.GetHeatmapColors()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, data)
}

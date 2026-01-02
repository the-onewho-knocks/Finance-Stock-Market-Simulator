package handler

import (
	"net/http"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
)

type IndianStockHandler struct {
	service *services.IndianStockService
}

func NewIndianStockHandler(service *services.IndianStockService) *IndianStockHandler {
	return &IndianStockHandler{service: service}
}

// GET /stocks/indian?name=tata steel
func (h *IndianStockHandler) GetStockByName(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	if name == "" {
		http.Error(w, "name query param required", http.StatusBadRequest)
		return
	}

	raw, err := h.service.GetStockByNameRaw(name)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(raw) // 👈 RAW RESPONSE
}

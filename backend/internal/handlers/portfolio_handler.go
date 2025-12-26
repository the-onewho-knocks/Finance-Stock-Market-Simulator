package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
)

type PortfolioHandler struct {
	portfolioService *services.PortfolioService
}

func NewPortfolioHandler(
	portfolioService *services.PortfolioService,
) *PortfolioHandler {
	return &PortfolioHandler{
		portfolioService: portfolioService,
	}
}

// helper function
func writeJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(data)
}

func (h *PortfolioHandler) GetPortfolio(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	userIDParam := chi.URLParam(r, "user_id")

	userID, err := uuid.Parse(userIDParam)
	if err != nil {
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}

	items, err := h.portfolioService.GetPortfolio(r.Context(), userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, items)

}

func (h *PortfolioHandler) GetPortfolioMetrics(w http.ResponseWriter, r *http.Request) {
	userIDParam := chi.URLParam(r, "user_id")

	userID, err := uuid.Parse(userIDParam)
	if err != nil {
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}

	value, invested, err := h.portfolioService.GetPortfolioMetrics(
		r.Context(),
		userID,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	resp := map[string]interface{}{
		"portfolio_value": value,
		"total_invested":  invested,
	}

	writeJSON(w, http.StatusOK, resp)

}

func (h *PortfolioHandler) BuyStock(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	var req models.PortfolioItem
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	//checking validating
	if req.UserID == uuid.Nil || req.StockSymbol == "" || req.Quantity <= 0 {
		http.Error(w, "invalid or missing body", http.StatusBadRequest)
		return
	}

	// BUY STOCK (real operation)
	err := h.portfolioService.BuyStock(r.Context() , &req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusCreated, map[string]string{
		"message": "stock bought successfully",
	})
}

func (h *PortfolioHandler) SellStock(w http.ResponseWriter , r *http.Request){
	defer r.Body.Close()

	var req struct{
		UserID uuid.UUID `json:"user_id"`
		StockSymbol string `json:"stock_symbol"`
		Quantity int `json:"quantity"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if req.UserID == uuid.Nil || req.StockSymbol == "" || req.Quantity <= 0 {
		http.Error(w, "invalid or missing fields", http.StatusBadRequest)
		return
	}

	if err := h.portfolioService.
		SellStock(r.Context(), req.UserID, req.StockSymbol, req.Quantity); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{
		"message": "stock sold successfully",
	})
}

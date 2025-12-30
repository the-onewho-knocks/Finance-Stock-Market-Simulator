package handler

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
)

// DashboardHandler handles dashboard-related endpoints
type DashboardHandler struct {
	dashboardService *services.DashboardService
}

// constructor
func NewDashboardHandler(
	dashboardService *services.DashboardService,
) *DashboardHandler {
	return &DashboardHandler{
		dashboardService: dashboardService,
	}
}

// request body for dashboard aggregation
type dashboardRequest struct {
	Symbols []string `json:"symbols"` // stocks to build heatmap for
}

// response shape (aggregated dashboard)
type dashboardResponse struct {
	NetWorth       interface{} `json:"networth"`
	PortfolioValue interface{} `json:"portfolio_value"`
	Expenses       interface{} `json:"expenses"`
	Heatmap        interface{} `json:"heatmap"`
}

// GET /dashboard/{userID}
func (h *DashboardHandler) GetDashboard(
	w http.ResponseWriter,
	r *http.Request,
) {
	defer r.Body.Close()

	// read user id from URL
	userIDParam := chi.URLParam(r, "userID")
	userID, err := uuid.Parse(userIDParam)
	if err != nil {
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}

	// decode optional request body (symbols for heatmap)
	var req dashboardRequest
	if r.Body != nil {
		_ = json.NewDecoder(r.Body).Decode(&req)
	}

	// call service
	networth, portfolioValue, expenses, heatmap, err :=
		h.dashboardService.AggregateDashboard(
			r.Context(),
			userID,
			req.Symbols,
		)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	resp := dashboardResponse{
		NetWorth:       networth,
		PortfolioValue: portfolioValue,
		Expenses:       expenses,
		Heatmap:        heatmap,
	}

	writeJSON(w, http.StatusOK, resp)
}

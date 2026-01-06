package handler

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
)

type DashboardHandler struct {
	dashboardService *services.DashboardService
}

func NewDashboardHandler(
	dashboardService *services.DashboardService,
) *DashboardHandler {
	return &DashboardHandler{
		dashboardService: dashboardService,
	}
}

type dashboardResponse struct {
	NetWorth       interface{} `json:"networth"`
	PortfolioValue string      `json:"portfolio_value"`
	Expenses       interface{} `json:"expenses"`
}

func (h *DashboardHandler) GetDashboard(
	w http.ResponseWriter,
	r *http.Request,
) {
	userIDParam := chi.URLParam(r, "userID")
	userID, err := uuid.Parse(userIDParam)
	if err != nil {
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}

	networth, portfolioValue, expenses, err :=
		h.dashboardService.AggregateDashboard(r.Context(), userID)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, dashboardResponse{
		NetWorth:       networth,
		PortfolioValue: portfolioValue.String(),
		Expenses:       expenses,
	})
}

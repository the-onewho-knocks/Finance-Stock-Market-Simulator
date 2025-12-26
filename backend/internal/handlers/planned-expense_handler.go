package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"github.com/shopspring/decimal"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
)

// Handler struct
type PlannedExpenseHandler struct {
	service *services.PlannedExpenseService
}

// Constructor
func NewPlannedExpenseHandler(
	service *services.PlannedExpenseService,
) *PlannedExpenseHandler {
	return &PlannedExpenseHandler{
		service: service,
	}
}


type createPlanRequest struct {
	Title  string          `json:"title"`
	Amount decimal.Decimal `json:"amount"`
	Note   string          `json:"note"`
	Date   time.Time       `json:"date"`
}

// POST /users/{userID}/planned-expenses
func (h *PlannedExpenseHandler) CreatePlan(
	w http.ResponseWriter,
	r *http.Request,
) {
	defer r.Body.Close()

	userIDParam := chi.URLParam(r, "userID")
	userID, err := uuid.Parse(userIDParam)
	if err != nil {
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}

	var req createPlanRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	// basic validation
	if req.Title == "" || req.Amount.LessThanOrEqual(decimal.Zero) {
		http.Error(w, "title and valid amount are required", http.StatusBadRequest)
		return
	}

	err = h.service.CreatePlan(
		r.Context(),
		userID,
		req.Title,
		req.Amount,
		req.Note,
		req.Date,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "planned expense created successfully",
	})
}

// GET /users/{userID}/planned-expenses
func (h *PlannedExpenseHandler) GetPlans(
	w http.ResponseWriter,
	r *http.Request,
) {
	userIDParam := chi.URLParam(r, "userID")
	userID, err := uuid.Parse(userIDParam)
	if err != nil {
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}

	plans, err := h.service.Getplans(r.Context(), userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(plans)
}

// DELETE /users/{userID}/planned-expenses/{planID}
func (h *PlannedExpenseHandler) DeletePlan(
	w http.ResponseWriter,
	r *http.Request,
) {
	userIDParam := chi.URLParam(r, "userID")
	planID := chi.URLParam(r, "planID")

	userID, err := uuid.Parse(userIDParam)
	if err != nil {
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}

	if planID == "" {
		http.Error(w, "plan id is required", http.StatusBadRequest)
		return
	}

	err = h.service.DeletePlan(
		r.Context(),
		planID,
		userID,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"message": "planned expense deleted successfully",
	})
}

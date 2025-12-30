package handler

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"github.com/shopspring/decimal"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
)

type ExpenseHandler struct {
	expenseService *services.ExpenseService
}

func NewExpenseHandler(
	expenseService *services.ExpenseService,
) *ExpenseHandler {
	return &ExpenseHandler{
		expenseService: expenseService,
	}
}

type createExpenseRequest struct {
	Amount      decimal.Decimal `json:"amount"`
	Category    string          `json:"category"`
	Description string          `json:"description"`
	Date        time.Time       `json:"date"`
}

// post request we have to perform
func (h *ExpenseHandler) AddExpense(
	w http.ResponseWriter,
	r *http.Request,
) {
	userIDParam := chi.URLParam(r, "userID")

	userID, err := uuid.Parse(userIDParam)
	if err != nil {
		http.Error(w, "invalid userID", http.StatusBadRequest)
		return
	}

	var req createExpenseRequest
	if err := json.NewDecoder(r.Body).Decode(req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	//validatiob
	if req.Amount.LessThanOrEqual(decimal.Zero) || req.Category == "" {
		http.Error(w, "amount and category are required", http.StatusBadRequest)
		return
	}

	err = h.expenseService.AddExpense(
		r.Context(),
		userID,
		req.Amount,
		req.Category,
		req.Description,
		req.Date,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusCreated, map[string]string{
		"message": "expense added successfully",
	})
}

func (h *ExpenseHandler) ListExpenses(
	w http.ResponseWriter,
	r *http.Request,
) {
	userIDParam := chi.URLParam(r, "userID")
	userID, err := uuid.Parse(userIDParam)
	if err != nil {
		http.Error(w, "invalid userID", http.StatusBadRequest)
		return
	}

	expenses, err := h.expenseService.ListExpenses(r.Context(), userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, expenses)
}

func (h *ExpenseHandler) DeleteExpense(
	w http.ResponseWriter,
	r *http.Request,
) {
	userIDParam := chi.URLParam(r, "userID")
	expenseID := chi.URLParam(r, "expenseID")

	userID, err := uuid.Parse(userIDParam)
	if err != nil {
		http.Error(w, "invalid userID", http.StatusBadRequest)
	}

	if expenseID == "" {
		http.Error(w, "expense id required", http.StatusBadRequest)
		return
	}

	err = h.expenseService.DeleteExpense(r.Context(), expenseID, userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{
		"message": "expense deleted successfully",
	})

}

func (h *ExpenseHandler) GetTotalExpenses(
	w http.ResponseWriter,
	r *http.Request,
) {
	userIDParam := chi.URLParam(r, "userID")
	userID, err := uuid.Parse(userIDParam)
	if err != nil {
		http.Error(w, "invalid userID", http.StatusBadRequest)
		return
	}

	total,err:= h.expenseService.GetTotalExpenses(r.Context(), userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{
		"total_expenses": total.String(),
	})
}
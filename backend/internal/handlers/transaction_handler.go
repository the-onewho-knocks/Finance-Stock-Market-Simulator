package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"github.com/shopspring/decimal"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
)

type TransactionHandler struct {
	transactionService *services.TransactionService
}

func NewTransactionHandler(
	transactionService *services.TransactionService,
) *TransactionHandler {
	return &TransactionHandler{
		transactionService: transactionService,
	}
}

type transactionRequest struct {
	UserID   string `json:"user_id"`
	Symbol   string `json:"symbol"`
	Quantity string `json:"quantity"` //decimal as string
}

//Handlers

// buy stock
func (h *TransactionHandler) Buy(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	var req transactionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	userID, err := uuid.Parse(req.UserID)
	if err != nil {
		http.Error(w, "invalid user_id", http.StatusBadRequest)
	}

	qty, err := decimal.NewFromString(req.Quantity)
	if err != nil {
		http.Error(w, "invalid quantity", http.StatusBadRequest)
	}

	if err := h.transactionService.Buy(
		r.Context(),
		userID,
		req.Symbol,
		qty,
	); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"status": "buy order executed successfully",
	})
}

func (h *TransactionHandler) Sell(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	var req transactionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid transaction request", http.StatusBadRequest)
	}

	userID, err := uuid.Parse(req.UserID)
	if err != nil {
		http.Error(w, "invalid user_ID", http.StatusBadRequest)
	}

	qty, err := decimal.NewFromString(req.Quantity)
	if err != nil {
		http.Error(w, "invalid quantity", http.StatusBadRequest)
	}

	if err := h.transactionService.Sell(r.Context(), userID, req.Symbol, qty); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"status": "sale order executed successfully",
	})

}

func(h *TransactionHandler) GetTransactions(w http.ResponseWriter , r *http.Request){
	userIDParam := chi.URLParam(r , "user_id")

	userID , err := uuid.Parse(userIDParam)
	if err != nil{
		http.Error(w , "invalid user_id" , http.StatusBadRequest)
	}

	transactions , err := h.transactionService.GetTransactions(
		r.Context(),
		userID,
	) 
	if err !=nil{
		http.Error(w , err.Error() , http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type","application/json")
	json.NewEncoder(w).Encode(transactions)
}
package handler

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
)

type NetworthHandler struct {
	networthService *services.NetworthService
}

func NewNetworthHandler(
	networthService *services.NetworthService,
) *NetworthHandler {
	return &NetworthHandler{
		networthService: networthService,
	}
}

// POST /users/{userID}/networth/recalculate
func (h *NetworthHandler) RecalculateNetworth(
	w http.ResponseWriter,
	r *http.Request,
) {
	userIDParam := chi.URLParam(r, "userID")

	userID, err := uuid.Parse(userIDParam)
	if err != nil {
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}

	breakdown, err := h.networthService.RecalculateNetworth(
		r.Context(),
		userID,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, breakdown)
}

// GET /users/{userID}/networth/latest
func (h *NetworthHandler) GetLatestNetworth(
	w http.ResponseWriter,
	r *http.Request,
) {
	userIDParam := chi.URLParam(r, "userID")

	userID, err := uuid.Parse(userIDParam)
	if err != nil {
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}

	networth, err := h.networthService.GetLatestNetworth(
		r.Context(),
		userID,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, networth)
}

// GET /users/{userID}/networth/history
func (h *NetworthHandler) GetNetworthHistory(
	w http.ResponseWriter,
	r *http.Request,
) {
	userIDParam := chi.URLParam(r, "userID")

	userID, err := uuid.Parse(userIDParam)
	if err != nil {
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}

	history, err := h.networthService.GetNetworthHistory(
		r.Context(),
		userID,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, history)
}

// GET /users/{userID}/networth/breakdown
func (h *NetworthHandler) GetNetworthBreakdown(
	w http.ResponseWriter,
	r *http.Request,
) {
	userIDParam := chi.URLParam(r, "userID")

	userID, err := uuid.Parse(userIDParam)
	if err != nil {
		http.Error(w, "invalid user id", http.StatusBadRequest)
		return
	}

	breakdown, err := h.networthService.GetNetworthBreakdown(
		r.Context(),
		userID,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, breakdown)
}

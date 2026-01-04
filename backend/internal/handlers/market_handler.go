package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
)

type MarketHandler struct {
	service *services.MarketService
}

func NewMarketHandler(service *services.MarketService) *MarketHandler {
	return &MarketHandler{service: service}
}

/* =========================
   GET PRICE (single symbol)
========================= */

func (h *MarketHandler) GetPrice(w http.ResponseWriter, r *http.Request) {
	symbol := chi.URLParam(r, "symbol")

	data, err := h.service.GetPrice(r.Context(), symbol)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(data)
}

/* =========================
   GET PRICES (multiple)
   /market/prices?symbols=AAPL,MSFT
========================= */

func (h *MarketHandler) GetPrices(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("symbols")
	if query == "" {
		http.Error(w, "symbols query param required", http.StatusBadRequest)
		return
	}

	symbols := strings.Split(query, ",")
	data := h.service.GetPrices(r.Context(), symbols)

	json.NewEncoder(w).Encode(data)
}

/* =========================
   PRICE STREAM (SSE-style)
========================= */

func (h *MarketHandler) PriceStream(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("symbols")
	if query == "" {
		http.Error(w, "symbols query param required", http.StatusBadRequest)
		return
	}

	symbols := strings.Split(query, ",")

	// 🔥 REQUIRED HEADERS FOR STREAMING
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "streaming unsupported", http.StatusInternalServerError)
		return
	}

	stream := h.service.StartPriceStream(
		r.Context(),
		symbols,
		2*time.Second,
	)

	for prices := range stream {
		// SSE format
		fmt.Fprintf(w, "data: %s\n\n", mustJSON(prices))
		flusher.Flush()
	}
}

/* =========================
   MARKET NEWS
========================= */

func (h *MarketHandler) GetMarketNews(w http.ResponseWriter, r *http.Request) {
	ticker := chi.URLParam(r, "ticker")

	data, err := h.service.GetMarketNews(r.Context(), ticker)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(data)
}

/* =========================
   QUOTE (raw quote response)
========================= */

func (h *MarketHandler) GetQuote(w http.ResponseWriter, r *http.Request) {
	ticker := chi.URLParam(r, "ticker")

	data, err := h.service.GetQuote(r.Context(), ticker)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(data)
}

func mustJSON(v any) string {
	b, _ := json.Marshal(v)
	return string(b)
}

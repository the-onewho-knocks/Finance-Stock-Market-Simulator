package handler

// import (
// 	"encoding/json"
// 	"net/http"

// 	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/services"
// 	"github.com/the-onewho-knocks/finance-Simulation/backend/pkg/utils"
// )

// type AuthHandler struct {
// 	authService *services.AuthService
// }

// func NewAuthHandler(authService *services.AuthService) *AuthHandler {
// 	return &AuthHandler{authService: authService}
// }

// func (h *AuthHandler) GoogleLogin(w http.ResponseWriter, r *http.Request) {
// 	var req struct {
// 		IDToken string `json:"id_token"`
// 	}

// 	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
// 		http.Error(w, "invalid request", http.StatusBadRequest)
// 		return
// 	}

// 	result, err := h.authService.GoogleLogin(r.Context(), req.IDToken)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusUnauthorized)
// 		return
// 	}

// 	token, err := utils.GenerateToken(
// 		result.UserID,
// 		result.Email,
// 		result.IsAdmin,
// 	)
// 	if err != nil {
// 		http.Error(w, "token error", http.StatusInternalServerError)
// 		return
// 	}

// 	json.NewEncoder(w).Encode(map[string]any{
// 		"token": token,
// 		"user":  result,
// 	})
// }

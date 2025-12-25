package middleware

import (
	"context"
	"net/http"
	"strings"

	"github.com/the-onewho-knocks/finance-Simulation/backend/pkg/utils"
)

type ctxKey string

const (
	UserIDKey  ctxKey = "user_id"
	IsAdminKey ctxKey = "is_admin"
)

func Auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		h := r.Header.Get("Authorization")
		if h == "" {
			http.Error(w, "missing token", http.StatusUnauthorized)
			return
		}

		parts := strings.Split(h, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			http.Error(w, "invalid auth header", http.StatusUnauthorized)
			return
		}

		claims, err := utils.ValidateToken(parts[1])
		if err != nil {
			http.Error(w, "invalid token", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), UserIDKey, claims.UserID)
		ctx = context.WithValue(ctx, IsAdminKey, claims.IsAdmin)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

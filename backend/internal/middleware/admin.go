package middleware

import "net/http"

func Admin(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		isAdmin, ok := r.Context().Value(IsAdminKey).(bool)
		if !ok || !isAdmin {
			http.Error(w, "admin only", http.StatusForbidden)
			return
		}
		next.ServeHTTP(w, r)
	})
}

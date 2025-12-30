package routes

import (
	"github.com/go-chi/chi/v5"
	handler "github.com/the-onewho-knocks/finance-Simulation/backend/internal/handlers"
)

func RegisterExpenseRoutes(
	r chi.Router,
	expenseHandler *handler.ExpenseHandler,
) {
	r.Route("/users/{userID}/expenses", func(r chi.Router) {

		r.Post("/", expenseHandler.AddExpense)                 // add expense
		r.Get("/", expenseHandler.ListExpenses)                // list expenses
		r.Get("/total", expenseHandler.GetTotalExpenses)       // total expenses
		r.Delete("/{expenseID}", expenseHandler.DeleteExpense) // delete expense
	})
}

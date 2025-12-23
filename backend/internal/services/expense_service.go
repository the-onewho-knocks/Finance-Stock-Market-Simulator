package services

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/interfaces"
)

type ExpenseSevice struct {
	expenseRepo interfaces.ExpenseRepository
}

//this is the logic for adding values into the repo we just use the function from the pgx file here in service layer to 
//perform operations
func NewExpenseService(expenseRepo interfaces.ExpenseRepository) *ExpenseSevice {
	return &ExpenseSevice{
		expenseRepo: expenseRepo,
	}
}

func (s *ExpenseSevice) AddExpense(
	ctx context.Context,
	userID string,
	amount decimal.Decimal,
	category string,
	description string,
	date time.Time,
)error{

	uid , err := uuid.Parse(userID)
	if err != nil{
		return err
	}

	expense := &models.Expense{
		ID: uuid.New(),
		UserID: uid,
		Amount: amount,
		Category: category,
		Description: description,
		Date: date,
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
	}

	return s.expenseRepo.AddExpense(expense)
}

//reading all the expenses
func (s *ExpenseSevice) ListExpenses(
	ctx context.Context,
	userID string,
)([]models.Expense , error){
	return s.expenseRepo.ListExpense(userID)
}

//deleting the expenses
func(s *ExpenseSevice) DeleteExpense(
	ctx context.Context,
	expenseID string,
	userID string,
) error{
	return s.expenseRepo.DeleteExpense(userID , expenseID)
}

//expenses is a slice we are iterating through it and declared a initial value for a variable total 
//e.amount gets added to the total during the iteration 
func (s *ExpenseSevice) GetTotalExpenses(
	ctx context.Context,
	userID string,
)(decimal.Decimal , error){
	expenses , err := s.expenseRepo.ListExpense(userID)
	if err != nil{
		return decimal.Zero , err
	}

	total := decimal.Zero
	for _ , e := range expenses{
		total = total.Add(e.Amount)
	}

	return total , nil
}
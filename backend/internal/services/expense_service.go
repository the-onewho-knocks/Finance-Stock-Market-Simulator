package services

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/interfaces"
)

type ExpenseService struct {
	expenseRepo interfaces.ExpenseRepository
}

//this is the logic for adding values into the repo we just use the function from the pgx file here in service layer to 
//perform operations
func NewExpenseService(expenseRepo interfaces.ExpenseRepository) *ExpenseService {
	return &ExpenseService{
		expenseRepo: expenseRepo,
	}
}

func (s *ExpenseService) AddExpense(
	ctx context.Context,
	userID uuid.UUID,
	amount decimal.Decimal,
	category string,
	description string,
	date time.Time,
)error{


	expense := &models.Expense{
		ID: uuid.New(),
		UserID: userID,
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
func (s *ExpenseService) ListExpenses(
	ctx context.Context,
	userID uuid.UUID,
)([]models.Expense , error){
	return s.expenseRepo.ListExpense(userID)
}

//deleting the expenses
func(s *ExpenseService) DeleteExpense(
	ctx context.Context,
	expenseID string,
	userID uuid.UUID,
) error{
	return s.expenseRepo.DeleteExpense( expenseID , userID)
}

//expenses is a slice we are iterating through it and declared a initial value for a variable total 
//e.amount gets added to the total during the iteration 
func (s *ExpenseService) GetTotalExpenses(
	ctx context.Context,
	userID uuid.UUID,
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
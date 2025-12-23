package services

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/interfaces"
)

type UserService struct {
	userRepo interfaces.UserRepository
}

func NewUserService(
	userRepo interfaces.UserRepository,
) *UserService {
	return &UserService{
		userRepo: userRepo,
	}
}

// fake balance every user will initially have
const InitialFakeBalance = 1000

//user life cycle that performing different operations for the users

// createUser this creates a new user with initial fake balance
func (s *UserService) CreateUser(
	ctx context.Context,
	email string,
	fullName string,
	avatarUrl string,
	googleID string,
) (*models.User, error) {

	//checking is user already exists
	existing, err := s.userRepo.GetUserByEmail(email)
	if err == nil && existing != nil {
		return existing, nil
	}

	user := &models.User{
		ID:           uuid.New(),
		Email:        email,
		FullName:     fullName,
		AvatarURL:    avatarUrl,
		GoogleID:     googleID,
		Fake_Balance: InitialFakeBalance,
	}

	if err := s.userRepo.CreateUser(user); err != nil {
		return nil, err
	}

	return user, err
}

func (s *UserService) GetUserByID(
	ctx context.Context,
	userID string,
) (*models.User, error) {
	return s.userRepo.GetUserByID(userID)
}

func (s *UserService) GetUserByEmail(
	ctx context.Context,
	email string,
) (*models.User, error) {
	return s.userRepo.GetUserByEmail(email)
}

func (s *UserService) DeductFakeBalance(
	ctx context.Context,
	userID string,
	amount float64,
) error {
	if amount <= 0 {
		return errors.New("invalid amount")
	}
	return s.userRepo.DeductFakeBalance(userID, amount)
}

func (s *UserService) IncrementFakeBalance(
	ctx context.Context,
	userID string,
	amount float64,
) error {
	if amount <= 0 {
		return errors.New("invalid amount")
	}

	return s.userRepo.IncrementFakeBalance(userID, amount)
}

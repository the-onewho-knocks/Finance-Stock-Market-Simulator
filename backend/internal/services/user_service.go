package services

import (
	"context"
	"errors"
	"time"

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
	// existing, err := s.userRepo.GetUserByGoogleID(googleID)
	// if err == nil && existing != nil {
	// 	return existing, nil
	// }

	now := time.Now().UTC()

	user := &models.User{
		ID:           uuid.New(),
		Email:        email,
		FullName:     fullName,
		AvatarURL:    avatarUrl,
	//	GoogleID:     googleID,
		Fake_Balance: InitialFakeBalance,
		IsAdmin:      false,
		CreatedAt:    now,
		UpdatedAt:    now,
	} 
	// we are calling the function in the pgx query folder here after assigining the values
	// to user variable and of type models.User{} so yeahh its kinda easy but having errors in the
	// pgx folder will break everything so it is the most important folder

	if err := s.userRepo.CreateUser(user); err != nil {
		return nil, err
	}

	return user, nil
}

func (s *UserService) GetUserByID(
	ctx context.Context,
	userID uuid.UUID,
) (*models.User, error) {
	return s.userRepo.GetUserByID(userID)
}

func (s *UserService) GetUserByEmail(
	ctx context.Context,
	email string,
) (*models.User, error) {
	return s.userRepo.GetUserByEmail(email)
}

// func (s *UserService) GetUserByGoogleID(
// 	ctx context.Context,
// 	googleID string,
// ) (*models.User, error) {
// 	return s.userRepo.GetUserByGoogleID(googleID)
// }

func (s *UserService) DeductFakeBalance(
	ctx context.Context,
	userID uuid.UUID,
	amount float64,
) error {
	if amount <= 0 {
		return errors.New("invalid amount")
	}
	return s.userRepo.DeductFakeBalance(userID, amount)
}

func (s *UserService) IncrementFakeBalance(
	ctx context.Context,
	userID uuid.UUID,
	amount float64,
) error {
	if amount <= 0 {
		return errors.New("invalid amount")
	}

	return s.userRepo.IncrementFakeBalance(userID, amount)
}

func (s *UserService) UpdateUser(
	ctx context.Context,
	user *models.User,
) (*models.User, error) {


	existing, err := s.userRepo.GetUserByID(user.ID)
	if err != nil {
		return nil, errors.New("user not found")
	}

	if user.FullName != "" {
		existing.FullName = user.FullName
	}
	if user.AvatarURL != "" {
		existing.AvatarURL = user.AvatarURL
	}

	if existing.FullName == "" {
		return nil, errors.New("full name cannot be empty")
	}

	existing.UpdatedAt = time.Now().UTC()

	if err := s.userRepo.UpdateUser(existing); err != nil {
		return nil, err
	}

	return existing, nil
}


package services

import (
	"context"
	"errors"
	"os"

	"github.com/google/uuid"
	"google.golang.org/api/idtoken"
)

type AuthService struct {
	userService *UserService
	googleCID   string
}

func NewAuthService(userService *UserService) *AuthService {
	return &AuthService{
		userService: userService,
		googleCID:   os.Getenv("GOOGLE_CLIENT_ID"),
	}
}

type AuthResult struct {
	UserID  uuid.UUID
	Email   string
	Name    string
	Avatar  string
	IsAdmin bool
}

func (s *AuthService) GoogleLogin(
	ctx context.Context,
	idToken string,
) (*AuthResult, error) {
	if idToken == "" {
		return nil, errors.New("missing id token")
	}

	payload, err := idtoken.Validate(ctx, idToken, s.googleCID)
	if err != nil {
		return nil, errors.New("invalid google token")
	}

	email := payload.Claims["email"].(string)
	name := payload.Claims["name"].(string)
	picture := payload.Claims["picture"].(string)
	sub := payload.Claims["sub"].(string)

	user, err := s.userService.CreateUser(ctx, email, name, picture, sub)
	if err != nil {
		return nil, err
	}

	return &AuthResult{
		UserID:  user.ID,
		Email:   user.Email,
		Name:    user.FullName,
		Avatar:  user.AvatarURL,
		IsAdmin: user.IsAdmin,
	}, nil
}

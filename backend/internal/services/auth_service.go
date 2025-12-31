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
}

func NewAuthService(userService *UserService) *AuthService {
	return &AuthService{
		userService: userService,
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

	clientID := os.Getenv("GOOGLE_CLIENT_ID")
	if clientID == "" {
		return nil, errors.New("google client id not configured")
	}

	payload, err := idtoken.Validate(ctx, idToken, clientID)
	if err != nil {
		return nil, errors.New("invalid google token")
	}

	email, _ := payload.Claims["email"].(string)
	name, _ := payload.Claims["name"].(string)
	picture, _ := payload.Claims["picture"].(string)
	sub, _ := payload.Claims["sub"].(string)

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

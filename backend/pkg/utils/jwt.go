package utils

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

type Claims struct{
	UserID uuid.UUID `json:"user_id"`
	Email string `json:"email"`
	IsAdmin bool `json:"is_admin"`
	jwt.RegisteredClaims
}

func GenerateToken(
	userID uuid.UUID,
	email string,
	isAdmin bool,
) (string , error){
	Claims := Claims{
		UserID: userID,
		Email: email,
		IsAdmin: isAdmin,
		RegisteredClaims: jwt.RegisteredClaims{
			IssuedAt: jwt.NewNumericDate(time.Now()),
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24*time.Hour)),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodES256 , Claims)
	return token.SignedString(jwtSecret)
}

func ValidateToken(tokenStr string)(*Claims , error){
	token , err := jwt.ParseWithClaims(tokenStr , &Claims{},func(t *jwt.Token) (interface{} , error){
		return jwtSecret , nil 
	})
	if err != nil{
		return nil , err
	}

	Claims , ok := token.Claims.(*Claims)
	if !ok || !token.Valid{
		return nil , errors.New("invalid token")
	}

	return Claims , nil
}
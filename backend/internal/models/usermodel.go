package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID           uuid.UUID `json:"id" db:"id"`
	Email        string    `json:"email" db:"email"`
	FullName     string    `json:"full_name" db:"full_name"`
	AvatarURL    string    `json:"avatar_url" db:"avatar_url"`
	GoogleID     string    `json:"google_id" db:"google_id"`
	Fake_Balance float64   `json:"fake_balance" db:"fake_balance"`

	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

package model

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID            uuid.UUID `json:"id"`
	Email         string    `json:"email"`
	Password_hash string    `json:"-"`
	First_name    string    `json:"first_name"`
	Last_name     string    `json:"last_name"`
	Year          string    `json:"year"`
	College       string    `json:"college"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

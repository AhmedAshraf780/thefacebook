package repositories

import (
	"context"

	"github.com/AhmedAshraf780/thefacebook/internals/model"
	"github.com/AhmedAshraf780/thefacebook/internals/server"
)

type IUserRepository interface {
	GetUserByID(ctx context.Context, id uint) (*model.User, error)
	GetUserByEmail(ctx context.Context, email string) (*model.User, error)
	CreateUser(ctx context.Context, user *model.User) (*model.User, error)
}

type UserRepository struct {
	server *server.Server
}

func NewUserRepository(server *server.Server) *UserRepository {
	return &UserRepository{
		server: server,
	}
}

func (ur *UserRepository) CreateUser(ctx context.Context, user *model.User) (*model.User, error) {
	query := `
		INSERT INTO users (first_name, last_name, email,password_hash,year,college)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id
	`
	row := ur.server.Db.QueryRow(ctx, query, user.First_name, user.Last_name, user.Email, user.Password_hash, user.Year, user.College)
	err := row.Scan(&user.ID)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (ur *UserRepository) GetUserByID(ctx context.Context, id uint) (*model.User, error) {
	query := `
		SELECT id, first_name, last_name, email, created_at, updated_at
		FROM users
		WHERE id = $1
	`
	var user model.User
	err := ur.server.Db.QueryRow(ctx, query, id).Scan(&user.ID, &user.First_name, &user.Last_name, &user.Email, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (ur *UserRepository) GetUserByEmail(ctx context.Context, email string) (*model.User, error) {
	query := `
		SELECT id , first_name, last_name, email, password_hash,year,college
		FROM users
		WHERE email = $1
	`
	var user model.User
	err := ur.server.Db.QueryRow(ctx, query, email).Scan(&user.ID, &user.First_name, &user.Last_name, &user.Email, &user.Password_hash, &user.Year, &user.College)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

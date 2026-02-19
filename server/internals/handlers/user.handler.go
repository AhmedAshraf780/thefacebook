package handlers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/AhmedAshraf780/thefacebook/internals/model"
	"github.com/AhmedAshraf780/thefacebook/internals/repositories"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"

	"github.com/golang-jwt/jwt/v5"
)

type UserHandler struct {
	UserRepo repositories.IUserRepository
}

type CreateUserRequest struct {
	FirstName string `json:"first_name" validate:"required"`
	LastName  string `json:"last_name" validate:"required"`
	Email     string `json:"email" validate:"required,email"`
	Password  string `json:"password" validate:"required,min=8,max=100"`
	Year      string `json:"year" validate:"required"`
	College   string `json:"college" validate:"required"`
}

type ValidateUserRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=100"`
}

func (h *UserHandler) CreateUser(c echo.Context) error {
	// parse the request body
	var req CreateUserRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, "invalid json format")
	}

	if err := c.Validate(&req); err != nil {
		errors := err.(validator.ValidationErrors)

		out := make(map[string]string)
		for _, e := range errors {
			out[e.Field()] = e.Tag()
		}

		return c.JSON(http.StatusBadRequest, out)
	}

	// hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, "failed to hash password")
	}

	user := &model.User{
		First_name:    req.FirstName,
		Last_name:     req.LastName,
		Email:         req.Email,
		Password_hash: string(hashedPassword),
		Year:          req.Year,
		College:       req.College,
	}

	user, err = h.UserRepo.CreateUser(c.Request().Context(), user)

	if err != nil {
		fmt.Print(err)
		return c.JSON(http.StatusInternalServerError, "failed to create user")
	}

	return c.JSON(http.StatusCreated, user)
}

func (h *UserHandler) ValidateUser(ctx echo.Context) error {

	var req ValidateUserRequest
	if err := ctx.Bind(&req); err != nil {
		return ctx.JSON(http.StatusBadRequest, "invalid json format")
	}

	if err := ctx.Validate(&req); err != nil {
		errors := err.(validator.ValidationErrors)

		out := make(map[string]string)
		for _, e := range errors {
			out[e.Field()] = e.Tag()
		}

		return ctx.JSON(http.StatusBadRequest, out)
	}

	user, err := h.UserRepo.GetUserByEmail(ctx.Request().Context(), req.Email)

	if user == nil {
		fmt.Println(err)
		return ctx.JSON(http.StatusInternalServerError, "User not found")
	}

	passwordComapred := bcrypt.CompareHashAndPassword([]byte(user.Password_hash), []byte(req.Password))
	if passwordComapred != nil {
		return ctx.JSON(http.StatusUnauthorized, "invalid password")
	}

	// generate jwt token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})

	// add secret key to .env
	tokenString, err := token.SignedString([]byte("mysecretkey"))
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, "failed to generate token")
	}

	cookie := &http.Cookie{
		Name:     "access-token",
		Value:    tokenString,
		HttpOnly: true,
		Path:     "/",
		SameSite: http.SameSiteStrictMode,
		Secure:   true,
		Expires:  time.Now().Add(24 * time.Hour),
	}

	ctx.SetCookie(cookie)

	return ctx.JSON(http.StatusOK, user)
}

func (h *UserHandler) GetUserByID(c echo.Context) error {
	return nil
}

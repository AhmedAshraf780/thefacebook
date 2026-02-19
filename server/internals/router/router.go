package router

import (
	"net/http"

	"github.com/AhmedAshraf780/thefacebook/internals/handlers"
	"github.com/AhmedAshraf780/thefacebook/internals/server"
	"github.com/AhmedAshraf780/thefacebook/internals/validation"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

// router needs to control on the layers below which are (handlers , services )
func NewRouter(s *server.Server, h *handlers.Handlers) *echo.Echo {
	router := echo.New()

	router.Validator = &validation.CustomValidator{
		Validator: validator.New(),
	}

	// declare all the endpoints
	router.GET("/healthz", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "ok")
	})
	router.POST("/auth/signup", h.UserHandler.CreateUser)

	router.POST("/auth/signin", h.UserHandler.ValidateUser)

	router.GET("/profile/", h.UserHandler.GetUserByID)

	router.GET("/feed", h.PostHandler.GetPostsOfUserCollege)

	router.GET("/users/:id/posts", h.PostHandler.GetPostsOfUser)

	return router
}

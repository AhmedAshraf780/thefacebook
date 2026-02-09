package router

import (
	"net/http"

	"github.com/AhmedAshraf780/thefacebook/internals/server"
	"github.com/labstack/echo/v4"
)

// router needs to control on the layers below which are (handlers , services )
func NewRouter(s *server.Server) *echo.Echo {
	router := echo.New()

	// declare all the endpoints
	router.GET("/healthz", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "ok")
	})
	router.POST("/auth/signup", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "signup")
	})

	router.POST("/auth/signin", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "signin")
	})

	router.GET("/users", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "users")
	})

	router.GET("/users/:id", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "users")
	})

	router.Group("/api/v1")
	return router
}

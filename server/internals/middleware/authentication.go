package middleware

import (
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

func CookieMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		cookie, err := c.Cookie("access-token")
		if err != nil {
			return c.JSON(http.StatusUnauthorized, "missing cookie")
		}

		tokenString := cookie.Value

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return "mysecretkey", nil
		})

		if err != nil || !token.Valid {
			return c.JSON(http.StatusUnauthorized, "invalid token")
		}

		claims := token.Claims.(jwt.MapClaims)
		userID := claims["user_id"].(string)

		if userID == "" {
			return c.JSON(http.StatusUnauthorized, "user not found")
		}

		c.Set("user_id", userID)

		return next(c)
	}

}

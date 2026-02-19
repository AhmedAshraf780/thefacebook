package handlers

import (
	"github.com/AhmedAshraf780/thefacebook/internals/repositories"
	"github.com/labstack/echo/v4"
)

type PostHandler struct {
	PostRepo repositories.IPostRepository
}

func (h *PostHandler) GetPostsOfUserCollege(c echo.Context) error {
	return nil
}

func (h *PostHandler) GetPostsOfUser(c echo.Context) error {
	return nil
}

func (h *PostHandler) CreatePost(c echo.Context) error {
	return nil
}

package handlers

import "github.com/AhmedAshraf780/thefacebook/internals/repositories"

type Handlers struct {
	UserHandler *UserHandler
	PostHandler *PostHandler
}

func NewHandler(repos *repositories.Repositories) *Handlers {
	return &Handlers{
		UserHandler: &UserHandler{repos.UserRepository},
		PostHandler: &PostHandler{repos.PostRepository},
	}
}

package repositories

import (
	"github.com/AhmedAshraf780/thefacebook/internals/server"
)

type Repositories struct {
	UserRepository IUserRepository
	PostRepository IPostRepository
}

func NewRepositories(server *server.Server) *Repositories {
	return &Repositories{
		UserRepository: NewUserRepository(server),
		PostRepository: NewPostRepository(server),
	}
}

package repositories

import (
	"context"

	"github.com/AhmedAshraf780/thefacebook/internals/model"
	"github.com/AhmedAshraf780/thefacebook/internals/server"
)

type IPostRepository interface {
	CreatePost(ctx context.Context, post *model.Post) (*model.Post, error)
	GetPostByID(ctx context.Context, id uint) (*model.Post, error)
	GetCollegePosts(ctx context.Context, userID uint) (*[]model.Post, error)
	GetUserPosts(ctx context.Context, userID uint) (*[]model.Post, error)
}

type PostRepository struct {
	server *server.Server
}

func NewPostRepository(server *server.Server) *PostRepository {
	return &PostRepository{
		server: server,
	}
}

func (pr *PostRepository) CreatePost(ctx context.Context, post *model.Post) (*model.Post, error) {
	query := `
	INSERT INTO posts (user_id, content, created_at)
	VALUES ($1, $2, $3)
	RETURNING id, user_id, content, created_at
	`

	row := pr.server.Db.QueryRow(ctx, query, post.UserID, post.Content, post.CreatedAt)

	var createdPost model.Post
	err := row.Scan(&createdPost.ID, &createdPost.UserID, &createdPost.Content, &createdPost.CreatedAt)
	if err != nil {
		return nil, err
	}

	return &createdPost, nil
}

func (pr *PostRepository) GetPostByID(ctx context.Context, id uint) (*model.Post, error) {
	query := `
	SELECT id, user_id, content, created_at
	FROM posts
	WHERE id = $1
	`

	row := pr.server.Db.QueryRow(ctx, query, id)

	var post model.Post
	err := row.Scan(&post.ID, &post.UserID, &post.Content, &post.CreatedAt)
	if err != nil {
		return nil, err
	}

	return &post, nil
}

func (pr *PostRepository) GetCollegePosts(ctx context.Context, userID uint) (*[]model.Post, error) {
	query := `
	SELECT id , user_id, content , created_at
	FROM posts
	WHERE college = (
	SELECT college from users where id = $1
	)
	`

	rows, err := pr.server.Db.Query(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []model.Post
	for rows.Next() {
		var post model.Post
		err := rows.Scan(&post.ID, &post.UserID, &post.Content, &post.CreatedAt)
		if err != nil {
			return nil, err
		}
		posts = append(posts, post)
	}
	return &posts, nil
}

func (pr *PostRepository) GetUserPosts(ctx context.Context, userID uint) (*[]model.Post, error) {
	query := `
	SELECT id , user_id, content , created_at
	FROM posts
	WHERE user_id = $1
	`

	rows, err := pr.server.Db.Query(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []model.Post
	for rows.Next() {
		var post model.Post
		err := rows.Scan(&post.ID, &post.UserID, &post.Content, &post.CreatedAt)
		if err != nil {
			return nil, err
		}
		posts = append(posts, post)
	}
	return &posts, nil
}

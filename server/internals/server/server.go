package server

import (
	"context"
	"errors"
	"net/http"
	"time"

	"github.com/AhmedAshraf780/thefacebook/internals/config"
)

type Server struct {
	HttpServer *http.Server
	Config     *config.Config
}

func New(cfg *config.Config) *Server {
	return &Server{
		Config: cfg,
	}
}

func (s *Server) SetupHttpServer(handler http.Handler) {
	s.HttpServer = &http.Server{
		Addr:         ":" + s.Config.Server.Port,
		Handler:      handler,
		ReadTimeout:  time.Duration(s.Config.Server.ReadTimeout) * time.Second,
		WriteTimeout: time.Duration(s.Config.Server.WriteTimeout) * time.Second,
		IdleTimeout:  time.Duration(s.Config.Server.IdleTimeout) * time.Second,
	}
}

func (s *Server) Start() error {
	if s.HttpServer == nil {
		return errors.New("http server is not initialized")
	}

	// TODO: log it
	return s.HttpServer.ListenAndServe()
}

func (s *Server) Shutdown(ctx context.Context) error {
	if err := s.HttpServer.Shutdown(ctx); err != nil {
		// TODO: log it
		return errors.New("failed to shutdown http server")
	}

	return nil
}

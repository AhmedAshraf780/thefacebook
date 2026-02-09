package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/AhmedAshraf780/thefacebook/internals/config"
	"github.com/AhmedAshraf780/thefacebook/internals/database"
	"github.com/AhmedAshraf780/thefacebook/internals/router"
	"github.com/AhmedAshraf780/thefacebook/internals/server"
)

func main() {
	// 1. Load Configuration
	cfg, err := config.Load("./../../.env") // Assuming config is loaded from env or file
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// 2. Initialize Database
	db, err := database.New(&cfg.Database)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	log.Println("Successfully connected to the database")

	// 3. Initialize Server
	srv := server.New(cfg)

	// 4. Initialize Router
	r := router.NewRouter(srv) // TODO: Pass db to router or services
	srv.SetupHttpServer(r)

	// 5. Start Server
	go func() {
		log.Printf("Starting server on port %s", cfg.Server.Port)
		if err := srv.Start(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server failed: %v", err)
		}
	}()

	// 6. Graceful Shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server exiting")
}

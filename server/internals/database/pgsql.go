package database

import (
	"context"
	"fmt"
	"time"

	"github.com/AhmedAshraf780/thefacebook/internals/config"
	"github.com/jackc/pgx/v5/pgxpool"
)

func New(cfg *config.DatabaseConfig) (*pgxpool.Pool, error) {
	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.Name, cfg.SSLMode)

	poolConfig, err := pgxpool.ParseConfig(dsn)
	if err != nil {
		return nil, fmt.Errorf("failed to parse database config: %w", err)
	}

	// Set some reasonable defaults for the pool
	poolConfig.MaxConns = 10
	poolConfig.MinConns = 2
	poolConfig.MaxConnLifetime = time.Hour
	poolConfig.MaxConnIdleTime = 30 * time.Minute

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	pool, err := pgxpool.NewWithConfig(ctx, poolConfig)
	if err != nil {
		return nil, fmt.Errorf("failed to create database pool: %w", err)
	}

	if err := pool.Ping(ctx); err != nil {
		fmt.Println(cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.Name, cfg.SSLMode)
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	return pool, nil
}

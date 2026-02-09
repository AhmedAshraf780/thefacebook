package config

import (
	"strings"

	_ "github.com/joho/godotenv/autoload"
	"github.com/knadh/koanf/providers/env"
	"github.com/knadh/koanf/v2"
)

type Config struct {
	Server   ServerConfig   `koanf:"server"`
	Database DatabaseConfig `koanf:"database"`
}

type ServerConfig struct {
	Port         string `koanf:"port"`
	ReadTimeout  int    `koanf:"readtimeout"`
	WriteTimeout int    `koanf:"writetimeout"`
	IdleTimeout  int    `koanf:"idletimeout"`
	// CORSAllowedOrigins []string
}

type DatabaseConfig struct {
	Host     string `koanf:"host"`
	Port     int    `koanf:"port"`
	User     string `koanf:"user"`
	Password string `koanf:"password"`
	Name     string `koanf:"name"`
	SSLMode  string `koanf:"sslmode"`
}

func Load(path string) (*Config, error) {
	k := koanf.New(".")

	_ = k.Load(env.Provider("APP_", ".", func(s string) string {
		return strings.ToLower(strings.ReplaceAll(
			strings.TrimPrefix(s, "APP_"), "_", ".",
		))
	}), nil)

	var cfg Config
	if err := k.Unmarshal("", &cfg); err != nil {
		return nil, err
	}

	return &cfg, nil
}

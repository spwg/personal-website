package main

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/gin-gonic/gin"
)

func init() {
	gin.SetMode(gin.TestMode)
}

func TestDefaultBindAddr(t *testing.T) {
	tests := []struct {
		name     string
		envValue string
		want     string
	}{
		{
			name:     "uses env var when set",
			envValue: "0.0.0.0:3000",
			want:     "0.0.0.0:3000",
		},
		{
			name:     "uses default when env var empty",
			envValue: "",
			want:     "localhost:8080",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			originalValue := os.Getenv("BIND_ADDR")
			defer os.Setenv("BIND_ADDR", originalValue)

			os.Setenv("BIND_ADDR", tt.envValue)
			got := defaultBindAddr()
			if got != tt.want {
				t.Errorf("defaultBindAddr() = %q, want %q", got, tt.want)
			}
		})
	}
}

func TestSetupTrustedProxies(t *testing.T) {
	r := gin.New()
	err := setupTrustedProxies(r)
	if err != nil {
		t.Errorf("setupTrustedProxies() returned error: %v", err)
	}
}

func TestInstallMiddleware(t *testing.T) {
	r := gin.New()
	err := installMiddleware(r)
	if err != nil {
		t.Errorf("installMiddleware() returned error: %v", err)
	}
}

func TestSecureMiddleware_AllowedHosts(t *testing.T) {
	tests := []struct {
		name           string
		host           string
		wantStatusCode int
	}{
		{
			name:           "allows spencergreene.com",
			host:           "spencergreene.com",
			wantStatusCode: http.StatusOK,
		},
		{
			name:           "allows www.spencergreene.com",
			host:           "www.spencergreene.com",
			wantStatusCode: http.StatusOK,
		},
		{
			name:           "allows spencergreene.fly.dev",
			host:           "spencergreene.fly.dev",
			wantStatusCode: http.StatusOK,
		},
		{
			name:           "blocks unknown host",
			host:           "evil.com",
			wantStatusCode: http.StatusInternalServerError,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			gin.SetMode(gin.ReleaseMode)
			defer gin.SetMode(gin.TestMode)

			r := gin.New()
			setupSecureMiddleware(r)
			r.GET("/", func(c *gin.Context) {
				c.String(http.StatusOK, "OK")
			})

			req := httptest.NewRequest(http.MethodGet, "/", nil)
			req.Host = tt.host
			w := httptest.NewRecorder()

			r.ServeHTTP(w, req)

			if w.Code != tt.wantStatusCode {
				t.Errorf("got status %d, want %d", w.Code, tt.wantStatusCode)
			}
		})
	}
}

func TestSecureMiddleware_FrameDeny(t *testing.T) {
	gin.SetMode(gin.ReleaseMode)
	defer gin.SetMode(gin.TestMode)

	r := gin.New()
	setupSecureMiddleware(r)
	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "OK")
	})

	req := httptest.NewRequest(http.MethodGet, "/", nil)
	req.Host = "spencergreene.com"
	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)

	frameOptions := w.Header().Get("X-Frame-Options")
	if frameOptions != "DENY" {
		t.Errorf("X-Frame-Options = %q, want %q", frameOptions, "DENY")
	}
}

func TestSecureMiddleware_DevModeAllowsAnyHost(t *testing.T) {
	gin.SetMode(gin.DebugMode)
	defer gin.SetMode(gin.TestMode)

	r := gin.New()
	setupSecureMiddleware(r)
	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "OK")
	})

	req := httptest.NewRequest(http.MethodGet, "/", nil)
	req.Host = "localhost:8080"
	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("got status %d, want %d in dev mode", w.Code, http.StatusOK)
	}
}

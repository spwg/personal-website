# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Run Commands

```bash
# Run locally (default: localhost:8080)
go run main.go

# Run with live reloading (requires Air)
air

# Build binary
go build -o ./tmp/main .

# Deploy to Fly.io
fly deploy
```

## Architecture

This is a Go web server using the Gin framework that serves a personal website with an embedded Wordle game.

**Request flow in production:** DNS (Cloudflare) → CDN (Cloudflare) → Fly.io → Gin server

**Key architectural decisions:**
- Static files are embedded into the binary using Go's `embed` directive (`//go:embed static/*`)
- Cloudflare IP ranges are embedded for trusted proxy configuration
- Security middleware restricts allowed hosts to `spencergreene.com`, `www.spencergreene.com`, and `spencergreene.fly.dev`

**Code structure:**
- `main.go`: Server setup, middleware configuration, embedded assets
- `internal/handlers/handlers.go`: Route handlers for `/`, `/css/:path`, `/js/:path`, `/data/:path`, `/wordle`
- `static/`: Frontend files (HTML, CSS, JS) and data files for Wordle

**Version sync requirement:** When updating Go version, change both `go.mod` and `Dockerfile` to match.

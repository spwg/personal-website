# Spencer Greene - Personal Website

This website exists because I wanted to buy my name's domain name. Just hacking around on it.

## Tech Stack
- **Go**: Backend server using Gin.
- **Vanilla JS/CSS**: Frontend implementation.
- **Cloudflare (DNS & CDN)**: Handles DNS resolution and proxies traffic through its global CDN. Caching ensures fast delivery of static assets and minimizes origin requests.
- **Fly.io (Hosting)**: Deploys the application with "scale to zero" support. The server stays offline (at zero cost) until a request is received, at which point it's often already being served from the Cloudflare cache.

## Getting Started

### Prerequisites
- Go 1.25+
- [Air](https://github.com/cosmtrek/air) for live reloading (optional)

### Running Locally
```bash
go run main.go
```
Or with Air:
```bash
air
```
The site will be available at [http://localhost:8080](http://localhost:8080).

## Project Structure
- `main.go`: Server entry point.
- `internal/handlers/`: Route handlers.
- `static/`: Frontend assets (HTML, CSS, JS, data).

## Wordle Side Project
The `/wordle` route serves a custom-built Wordle game. 

### Key Features
- **Daily Word Logic**: The game selects a unique word for each day deterministically.
- **Vibe-Coded Architecture**: Built primarily using AI-driven development tools to explore efficient prototyping.
- **On-Screen Keyboard**: Fully functional interactive keyboard for browser-based play.
- **Date-Based State**: Supports playing specific historical Wordle games via query parameters (e.g., `?date=2025-12-25`).

### Implementation Details
- **Frontend**: CSS-based grid layout and vanilla JavaScript for game logic in `static/wordle.js`.
- **Backend**: The Go server serves the static `wordle.html` and handles routing for the game assets.
- **Data**: Word lists and game states are managed client-side.

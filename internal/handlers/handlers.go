// Package handlers provides functionality for endpoints that should be
// installed on the server.
package handlers

import (
	"errors"
	"io/fs"
	"net/http"
	"path"

	"github.com/gin-gonic/gin"
)

// Server holds a collection of service endpoints.
type Server struct {
	static fs.FS
}

func (s *Server) handleRoot(c *gin.Context) {
	c.FileFromFS(c.Request.URL.Path, http.FS(s.static))
}

func (s *Server) handleJS(c *gin.Context) {
	c.FileFromFS(path.Base(c.Request.URL.Path), http.FS(s.static))
}

func (s *Server) handleCSS(c *gin.Context) {
	c.FileFromFS(c.Params.ByName("path"), http.FS(s.static))
}

// InstallRoutes registers the server's routes on the given [*gin.Engine].
func InstallRoutes(static fs.FS, engine *gin.Engine) error {
	if static == nil {
		return errors.New("static fs cannot be nil")
	}
	if engine == nil {
		return errors.New("engine cannot be nil")
	}
	s := &Server{
		static: static,
	}
	engine.GET("/", s.handleRoot)
	engine.GET("/css/:path", s.handleCSS)
	engine.GET("/js/:path", s.handleJS)
	return nil
}

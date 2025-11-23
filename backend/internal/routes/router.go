package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

func RegisterRoutes(r *gin.Engine , db *pgxpool.Pool){
	api := r.Group("/api/v1")
	api.GET("/health",func(c *gin.Context){
		c.JSON(200 , gin.H{"status":"ok"})
	})
}
package main

import (
	"bangbangfang/internal/handlers"
	"bangbangfang/pkg/database"
	"github.com/gin-gonic/gin"
	"log"
)

func main() {
	// 初始化数据库连接
	db, err := database.InitDB()
	if err != nil {
		log.Fatal("数据库初始化失败:", err)
	}
	defer db.Close()

	// 创建Gin引擎
	r := gin.Default()

	// 注册路由
	r.POST("/api/login", handlers.LoginHandler)
	r.GET("/api/properties", handlers.GetPropertiesHandler)
	r.GET("/api/matches", handlers.GetMatchesHandler)
	r.POST("/api/upload", handlers.UploadHandler)
	r.POST("/api/generate-video", handlers.GenerateVideoHandler)
	r.POST("/api/match", handlers.MatchHandler)
	r.POST("/api/property-report", handlers.GeneratePropertyReportHandler)
	r.PUT("/api/messages/update-status", handlers.MessageStatusHandler)
	r.POST("/api/contract/sublease", handlers.SubleaseHandler)
	r.POST("/api/contract/terminate", handlers.TerminateLeaseHandler)
	r.GET("/api/ws", handlers.WebSocketHandler)

	// 启动服务
	if err := r.Run(":8080"); err != nil {
		log.Fatal("服务启动失败:", err)
	}
}
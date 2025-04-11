package main

import (
	"log"
	"net/http"

	"code.byted.org/bytedance/bangbangfang/internal/handlers"
	"code.byted.org/bytedance/bangbangfang/pkg/ark"
	"code.byted.org/bytedance/bangbangfang/pkg/database"
	"github.com/gin-gonic/gin"
)

const (
	StaticDir = "./assets"
)

func main() {
	// 初始化数据库连接
	_, err := database.InitDB()
	if err != nil {
		log.Fatal("数据库初始化失败:", err)
	}
	defer database.Close()

	// 初始化方舟client
	ark.InitClient()
	// 初始化日志

	// 创建Gin引擎
	r := gin.Default()

	// 静态资源
	r.Static("/assets", "./static/assets")
	// 前端模块
	r.LoadHTMLFiles("./static/index.html")
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{})
	})

	// 优先注册API路由
	r.POST("/api/property/register", handlers.RegisterPropertyHandler)
	r.POST("/api/property/match", handlers.MatchPropertyHandler)
	r.POST("/api/report", handlers.GeneratePropertyReportHandler)
	r.POST("/api/chat/stream", handlers.StreamChatHandler)
	r.POST("/api/simulate-scenario", handlers.SimulateScenarioHandler)

	// 前端路由处理（必须放在最后）
	r.NoRoute(func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{})
	})
	// 启动服务
	if err := r.Run(":8080"); err != nil {
		log.Fatal("服务启动失败:", err)
	}

}

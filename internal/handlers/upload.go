package handlers

import (
	"net/http"
	"os"
	"path/filepath"
	"github.com/gin-gonic/gin"
)

const (
	maxUploadSize = 5 << 20 // 5MB
	allowedTypes = "image/jpeg,image/png,application/pdf,video/mp4"
	uploadDir = "./uploads"
	aliyunEndpoint = "https://imm.cn-shanghai.aliyuncs.com"
)

func UploadHandler(c *gin.Context) {
	// 创建上传目录
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "无法创建上传目录"})
		return
	}

	// 解析多部分表单
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的文件上传"})
		return
	}

	// 验证文件类型和大小
	if file.Size > maxUploadSize {
		c.JSON(http.StatusBadRequest, gin.H{"error": "文件大小超过5MB限制"})
		return
	}

	// 生成唯一文件名
	fileExt := filepath.Ext(file.Filename)
	savePath := filepath.Join(uploadDir, "upload_"+uuid.New().String()+fileExt)

	// 保存文件
	if err := c.SaveUploadedFile(file, savePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "文件保存失败"})
		return
	}

	// 异步启动视频生成
	go func() {
		photos := []string{savePath}
		var prop models.Property
if err := db.Where("photos LIKE ?", "%"+savePath+"%").First(&prop).Error; err == nil {
  videoPath, err := video.GeneratePropertyVideo(photos, &prop)
  if err == nil {
    prop.VideoURL = videoPath
    db.Save(&prop)
  }
}
		db.Model(&models.Property{}).Where("photos LIKE ?", "%"+savePath+"%").Update("video_url", videoPath)
	}()

	c.JSON(http.StatusOK, gin.H{
		"message": "文件上传成功",
		"path": savePath,
		"video_pending": true
	})
}
package handlers

import (
	// "encoding/json"
	"fmt"
	"net/http"

	// "strings"

	"code.byted.org/bytedance/bangbangfang/pkg/ark"
	"code.byted.org/bytedance/bangbangfang/pkg/database"
	models "code.byted.org/bytedance/bangbangfang/pkg/model"
	"code.byted.org/bytedance/bangbangfang/pkg/utils"
	"github.com/gin-gonic/gin"
)

// func SubleaseHandler(c *gin.Context) {
// 	var subleaseData struct {
// 		ContractID string `json:"contract_id"`
// 		StartDate  string `json:"start_date"`
// 	}
// 	if err := c.ShouldBindJSON(&subleaseData); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求格式"})
// 		return
// 	}

// 	db.Model(&models.Contract{}).Where("id = ?", subleaseData.ContractID).Updates(map[string]interface{}{
// 		"status":     "转租中",
// 		"start_date": subleaseData.StartDate,
// 	})

// 	c.JSON(http.StatusOK, gin.H{
// 		"message": "转租申请已提交",
// 		// "success_rate": calculateSuccessRate(subleaseData.ContractID),
// 	})
// }

// func TerminateLeaseHandler(c *gin.Context) {
// 	var terminationData struct {
// 		ContractID string `json:"contract_id"`
// 		EndDate    string `json:"end_date"`
// 	}
// 	if err := c.ShouldBindJSON(&terminationData); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求格式"})
// 		return
// 	}

// 	penalty := 100.00
// 	db.Model(&models.Contract{}).Where("id = ?", terminationData.ContractID).Update("status", "退租审核中")

// 	c.JSON(http.StatusOK, gin.H{
// 		"message": "退租申请已提交",
// 		"penalty": penalty,
// 	})
// }

type PropertyReportReq struct {
	ID uint `json:"id" binding:"required"`
}

// 生成房屋出租报告接口处理函数
func GeneratePropertyReportHandler(c *gin.Context) {
	var reportReq PropertyReportReq
	if err := c.ShouldBindJSON(&reportReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求格式"})
		return
	}
	// 根据id查询房屋信息
	var property models.Property
	if err := database.DB.Where("id = ?", reportReq.ID).First(&property).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "房屋不存在"})
		return
	}
	// 封装当前房屋信息为字符串
	propertyData := fmt.Sprintf("房屋ID:%d 信息：%s %s %d层  是否有电梯：%s %s %.2f㎡ %.2f元/月\n", property.ID, property.District, property.Address, property.Floor, utils.IF(property.HasElevator, "是", "否"), property.Layout, property.Area, property.Rent)
	// 调用AI模型生成报告
	result, err := ark.CreateChatCompletion(ark.HOUSE_EVALUATION_PROMPT, propertyData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "报告生成失败"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "报告生成成功",
		"report":  result,
	})
}

// 新增房屋登记结构体
type PropertyRegistration struct {
	UserID      uint    `json:"user_id" binding:"required"`
	District    string  `json:"district" binding:"required"`
	Address     string  `json:"address" binding:"required"`
	Floor       int     `json:"floor" binding:"required"`
	Layout      string  `json:"layout" binding:"required"`
	HasElevator bool    `json:"has_elevator"`
	Rent        float64 `json:"rent" binding:"required"`
	Area        float64 `json:"area" binding:"required"`
}

// 新增房屋登记接口处理函数
func RegisterPropertyHandler(c *gin.Context) {
	var input PropertyRegistration
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的登记格式"})
		return
	}

	property := models.Property{
		UserID:      input.UserID,
		District:    input.District,
		Address:     input.Address,
		Floor:       input.Floor,
		Layout:      input.Layout,
		HasElevator: input.HasElevator,
		Rent:        input.Rent,
		Area:        input.Area,
		Photos:      nil,
	}

	if err := database.DB.Create(&property).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "房屋登记失败"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":    "房屋登记成功",
		"propertyID": property.ID,
	})
}

func StreamChatHandler(c *gin.Context) {
	// 设置SSE响应头
	c.Header("Content-Type", "text/event-stream")
	c.Header("Cache-Control", "no-cache")
	c.Header("Connection", "keep-alive")

	var reportReq PropertyReportReq
	if err := c.ShouldBindJSON(&reportReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求格式"})
		return
	}
	// 根据id查询房屋信息
	var property models.Property
	if err := database.DB.Where("id = ?", reportReq.ID).First(&property).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "房屋不存在"})
		return
	}
	// 封装当前房屋信息为字符串
	propertyData := fmt.Sprintf("房屋ID:%d 信息：%s %s %d层  是否有电梯：%s %s %.2f㎡ %.2f元/月\n", property.ID, property.District, property.Address, property.Floor, utils.IF(property.HasElevator, "是", "否"), property.Layout, property.Area, property.Rent)

	// 获取流式通道
	stream, err := ark.CreateChatCompletionWithStream(ark.HOUSE_EVALUATION_PROMPT, propertyData)
	if err != nil {
		c.SSEvent("error", gin.H{"message": "服务不可用"})
		return
	}

	// 流式传输
	for chunk := range stream { // 直接遍历通道
		c.SSEvent("message", gin.H{"report": chunk})
		c.Writer.Flush()
	}
	c.SSEvent("end", nil)
}

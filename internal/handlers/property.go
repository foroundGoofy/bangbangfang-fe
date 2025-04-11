package handlers

import (
	"bangbangfang/internal/models"
	"fmt"
	"net/http"
	"strings"
	"github.com/gin-gonic/gin"
)

func SubleaseHandler(c *gin.Context) {
	var subleaseData struct {
		ContractID  string `json:"contract_id"`
		StartDate   string `json:"start_date"`
	}
	if err := c.ShouldBindJSON(&subleaseData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求格式"})
		return
	}

	db.Model(&models.Contract{}).Where("id = ?", subleaseData.ContractID).Updates(map[string]interface{}{
		"status":      "转租中",
		"start_date": subleaseData.StartDate,
	})

	c.JSON(http.StatusOK, gin.H{
		"message": "转租申请已提交",
		"success_rate": calculateSuccessRate(subleaseData.ContractID),
	})
}

func TerminateLeaseHandler(c *gin.Context) {
	var terminationData struct {
		ContractID string `json:"contract_id"`
		EndDate    string `json:"end_date"`
	}
	if err := c.ShouldBindJSON(&terminationData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求格式"})
		return
	}

	// 违约金计算逻辑
	penalty := calculatePenalty(terminationData.ContractID, terminationData.EndDate)
	db.Model(&models.Contract{}).Where("id = ?", terminationData.ContractID).Update("status", "退租审核中")

	c.JSON(http.StatusOK, gin.H{
		"message": "退租申请已提交",
		"penalty": penalty,
	})
}

func GeneratePropertyReportHandler(c *gin.Context) {
	var propertyData models.Property
	if err := c.ShouldBindJSON(&propertyData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求格式"})
		return
	}

	// 调用Deepseek R1大模型
	prompt := fmt.Sprintf(`分析以下房屋特征并生成装修建议和出租预测：
房型：%s
面积：%.1f平米
装修：%s
设施：%v
交通：%s`, 
		propertyData.Layout, propertyData.Area, propertyData.Decoration, 
		propertyData.Amenities, propertyData.TransportInfo)

	modelResponse, err := llm.CallDeepseekR1(prompt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "AI模型服务不可用"})
		return
	}

	// 解析模型返回的结构化数据
	var aiResult struct {
		Recommendations []string `json:"recommendations"`
		Confidence      float64 `json:"confidence_score"`
	}
	json.Unmarshal(modelResponse, &aiResult)

	// 动态计算成功率（结合原有算法和模型置信度）
	baseSuccessRate := 70 + (len(propertyData.Amenities)*5 + strings.Count(propertyData.TransportInfo, ",")*3)*2
	dynamicRate := int(float64(baseSuccessRate)*0.7 + aiResult.Confidence*30)
	if dynamicRate > 95 {
		dynamicRate = 95
	}

	c.JSON(http.StatusOK, gin.H{
		"report": gin.H{
			"basic_info": propertyData,
			"ai_recommendations": aiResult.Recommendations,
			"success_rate":     fmt.Sprintf("%d天出租成功率%d%%", 3, dynamicRate),
			"model_confidence": aiResult.Confidence,
		},
	})
}
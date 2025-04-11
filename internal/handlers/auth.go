package handlers

import (
	"bangbangfang/internal/models"
	"net/http"
	"regexp"
	"strconv"
	"strings"
	"github.com/gin-gonic/gin"
)

func LoginHandler(c *gin.Context) {
	var creds models.User
	if err := c.ShouldBindJSON(&creds); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求格式"})
		return
	}

	// 验证管理员账户
	if creds.Username == "admin" && creds.Password == "888888" {
		c.JSON(http.StatusOK, gin.H{
			"message": "登录成功",
			"user":   "admin",
		})
		return
	}

	c.JSON(http.StatusUnauthorized, gin.H{"error": "用户名或密码错误"})
}

func MatchHandler(c *gin.Context) {
	var input struct {
		NaturalLanguage string `json:"natural_language"`
		models.MatchCriteria
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求格式"})
		return
	}

	// 自然语言处理
	if input.NaturalLanguage != "" {
		re := regexp.MustCompile(`(?i)(杨浦区|黄浦区|宝山区)|(\d+)元?.*预算|(一室一厅|两室一厅|三室一厅)`)
		matches := re.FindAllStringSubmatch(input.NaturalLanguage, -1)
		
		for _, m := range matches {
			switch {
			case m[1] != "":
				input.District = m[1]
			case m[2] != "":
				input.Budget, _ = strconv.Atoi(m[2])
			case m[3] != "":
				input.Layout = m[3]
			}
		}
	}
	
	criteria := input.MatchCriteria

	// 实际匹配逻辑
	var properties []models.Property
	db.Where("district = ? AND rent <= ?", criteria.District, criteria.Budget)
	   .Order("rent ASC")
	   .Find(&properties)

	// 计算匹配分数
	matchResults := make([]models.MatchResult, 0)
	for _, p := range properties {
		// 加权评分算法（预算40%+区域30%+楼层20%+设施10%）
		baseScore := (1 - math.Abs(float64(p.Rent - criteria.Budget))/float64(criteria.Budget)) * 0.4
		districtScore := 0.0
		if p.District == criteria.District {
			districtScore = 0.3
		}
		floorScore := (1 - math.Abs(float64(p.Floor - criteria.PreferFloor))/10.0) * 0.2
		facilityScore := 0.0
		if p.HasElevator == criteria.HasElevator {
			facilityScore += 0.05
		}
		if p.Furniture == criteria.Furniture {
			facilityScore += 0.05
		}
		score := (baseScore + districtScore + floorScore + facilityScore) * 10
		score = math.Max(1, math.Min(10, score))
		
		matchResults = append(matchResults, models.MatchResult{
			PropertyID: p.ID,
			MatchScore: int(score),
			Address:    p.Address,
			Floor:      p.Floor,
			Distance:   calculateDistance(criteria.WorkLocation, p.Address)
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"results": matchResults,
		"count":  len(matchResults),
	})
}

func WebSocketHandler(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Printf("WebSocket连接失败: %v", err)
		return
	}
	defer conn.Close()

	for {
		// 分阶段处理
		stages := []struct {
			name    string
			duration time.Duration
			extract  func(string) []string
		}{
			{
				name:     "正在分析房屋需求",
				duration: 3 * time.Second,
				extract: func(input string) []string {
					re := regexp.MustCompile(`(一室一厅|两室一厅|三室一厅|朝南|养宠|居住证)`)
					return re.FindAllString(input, -1)
				},
			},
			{
				name:     "正在查找合适房源",
				duration: 5 * time.Second,
				extract: func(input string) []string {
					re := regexp.MustCompile(`(杨浦|黄浦|宝山|\d+元)`)
					return re.FindAllString(input, -1)
				},
			},
			{
				name:     "正在生成匹配报告",
				duration: 2 * time.Second,
				extract: func(input string) []string {
					return []string{"优质房源", "地铁房", "精装修"}
				},
			},
		}

		totalDuration := 0
		for _, stage := range stages {
			totalDuration += int(stage.duration.Seconds())
		}

		var criteria models.MatchCriteria
		conn.ReadJSON(&criteria)

		for i, stage := range stages {
			for progress := 0; progress < 100; progress += rand.Intn(20) {
				err := conn.WriteJSON(gin.H{
					"progress": (i*100 + progress) / len(stages),
					"stage":   stage.name,
					"keywords": stage.extract(criteria.NaturalLanguage),
				})
				time.Sleep(stage.duration / 5)
			}
		}
		if err != nil {
			log.Printf("WebSocket通信失败: %v", err)
			break
		}
		time.Sleep(1 * time.Second)
	}
}

func MessageStatusHandler(c *gin.Context) {
	var updateRequest struct {
		MessageID int `json:"message_id"`
		IsRead    bool `json:"is_read"`
	}

	if err := c.ShouldBindJSON(&updateRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求格式"})
		return
	}

	db.Model(&models.UserMessage{}).Where("id = ?", updateRequest.MessageID).Update("is_read", updateRequest.IsRead)

	c.JSON(http.StatusOK, gin.H{
		"message": "消息状态更新成功",
		"message_id": updateRequest.MessageID,
	})
}

func GenerateReportHandler(c *gin.Context) {
	var reportData models.SWOTAnalysis
	if err := c.ShouldBindJSON(&reportData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求格式"})
		return
	}

	// SWOT加权评分逻辑
	strengthScore := calculateWeightedScore(reportData.Strengths, 0.4)
	weaknessScore := calculateWeightedScore(reportData.Weaknesses, 0.3)
	opportunityCount := len(reportData.Opportunities)
	threatCount := len(reportData.Threats)

	// 生成推荐策略
	recommendation := generateRecommendation(strengthScore, weaknessScore, opportunityCount, threatCount)

	analysisResult := struct {
		StrengthsScore   int `json:"strengths_score"`
		WeaknessesScore int `json:"weaknesses_score"`
		Opportunities    int `json:"opportunities"`
		Threats         int `json:"threats"`
	}{
		StrengthsScore:   strengthScore,
		WeaknessesScore: weaknessScore,
		Opportunities:    opportunityCount,
		Threats:         threatCount,
	}

	c.JSON(http.StatusOK, gin.H{
		"analysis": analysisResult,
		"recommendation": recommendation
	})
}

// 新增辅助函数
func calculateWeightedScore(items []string, weight float64) int {
	baseScore := len(items) * 10
	keywords := []string{"交通", "商圈", "学区"}
	keywordBonus := 0
	for _, item := range items {
		for _, kw := range keywords {
			if strings.Contains(item, kw) {
				keywordBonus += 5
			}
		}
	}
	return int(float64(baseScore + keywordBonus) * weight)
}

func generateRecommendation(strength, weakness, opp, threat int) string {
	if strength > 80 && threat < 3 {
		return "建议优先扩展优势资源，加大市场推广力度"
	}
	if weakness > 60 && opp > 5 {
		return "建议优化运营流程，建立风险应对机制"
	}
	return "建议保持当前运营策略，重点关注机会领域"
}

// 新增报告数据结构
type Report struct {
	ID         string    `json:"id"`
	Date       string    `json:"date"`
	SalesData  gin.H     `json:"sales_data"`
	SWOTAnalysis *SWOTAnalysis `json:"swot_analysis"`
}

// 新增自升级接口
func SelfUpgradeHandler(c *gin.Context) {
	// 生成SWOT分析数据
	swotData := models.SWOTAnalysis{
		Strengths:   []string{"房源资源丰富", "智能匹配算法优势"},
		Weaknesses: []string{"移动端体验不足", "支付流程复杂"},
		Opportunities: []string{"长三角租赁市场增长", "政策支持"},
		Threats:      []string{"竞争对手补贴策略", "政策风险"},
	}

	// 生成产品优化建议
	recommendation := generateRecommendation(
		calculateWeightedScore(swotData.Strengths, 0.4),
		calculateWeightedScore(swotData.Weaknesses, 0.3),
		len(swotData.Opportunities),
		len(swotData.Threats)),
	)

	// 生成初始报告数据
	reports := []Report{{
		ID:   "20250321",
		Date: "2025-03-21",
		SalesData: gin.H{
			"total_sales": 158,
			"amount":     2356000,
		},
		SWOTAnalysis: &swotData,
	}}

	c.JSON(http.StatusOK, gin.H{
		"message": "产品自升级完成",
		"reports": reports,
		"recommendation": recommendation,
	})
}
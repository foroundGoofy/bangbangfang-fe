package handlers

import (
	"fmt"
	"net/http"

	"code.byted.org/bytedance/bangbangfang/pkg/utils"

	"code.byted.org/bytedance/bangbangfang/pkg/ark"
	"code.byted.org/bytedance/bangbangfang/pkg/database"
	models "code.byted.org/bytedance/bangbangfang/pkg/model"
	"github.com/gin-gonic/gin"
	// "github.com/volcengine/volc-sdk-golang/service/codePipeline/models"
)

func LoginHandler(c *gin.Context) {

	// var creds models.User
	// if err := c.ShouldBindJSON(&creds); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求格式"})
	// 	return
	// }

	// // 验证管理员账户
	// if creds.Username == "admin" && creds.Password == "888888" {
	// 	c.JSON(http.StatusOK, gin.H{
	// 		"message": "登录成功",
	// 		"user":    "admin",
	// 	})
	// 	return
	// }

	// c.JSON(http.StatusUnauthorized, gin.H{"error": "用户名或密码错误"})
}

// 匹配房源接口入参结构体
type MatchHousingRequest struct {
	// 快速找房输入
	QuickSearchInput string `json:"quick_search_input"`

	// 区域偏好
	RegionPreference struct {
		City   string `json:"city"`
		Area   string `json:"area"`
		Street string `json:"street"`
	} `json:"region_preference"`

	// 房型与楼层
	HouseType       string `json:"house_type"`
	FloorPreference string `json:"floor_preference"`
	NeedElevator    string `json:"need_elevator"`

	// 预算与位置
	RentBudget struct {
		Min int `json:"min"`
		Max int `json:"max"`
	} `json:"rent_budget"`
	MaxCommuteTime int `json:"max_commute_time"`
	WorkLocation   struct {
		City          string `json:"city"`
		Area          string `json:"area"`
		DetailAddress string `json:"detail_address"`
	} `json:"work_location"`
	SubwayProximity string `json:"subway_proximity"`

	// 设施与便利性
	NeedParking         string   `json:"need_parking"`
	SubwayAccessibility string   `json:"subway_accessibility"`
	FurnitureNeed       string   `json:"furniture_need"`
	KitchenFacilities   []string `json:"kitchen_facilities"`

	// 租期与入住
	LeaseTerm  string `json:"lease_term"`
	MoveInDate string `json:"move_in_date"`

	// 社区与特殊需求
	CommunityFacilities []string `json:"community_facilities"`
	SpecialDemands      []string `json:"special_demands"`
}

// 房屋匹配接口
func MatchPropertyHandler(c *gin.Context) {
	// 接受匹配房源请求参数
	var req MatchHousingRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求参数"})
		return
	}

	var properties []*models.Property
	// 根据传入的city area street查询房屋信息
	if req.RegionPreference.City != "" && req.RegionPreference.Area != "" && req.RegionPreference.Street != "" {
		if err := database.DB.Where("district LIKE ?", "%"+req.RegionPreference.City+"-"+req.RegionPreference.Area+"-"+req.RegionPreference.Street+"%").Find(&properties).Error; err != nil || len(properties) == 0 {
			c.JSON(http.StatusNotFound, gin.H{"error": "房屋不存在"})
			return
		}
	}
	// 封装用户需求为字符串
	userData := fmt.Sprintf("用户找房需求：%s\n位置：%s %s %s\n工作地点：%s %s %s\n租赁类型：未提供\n户型：%s\n电梯：%s\n房补范围内：未提供\n房屋朝向：未提供\n房屋新旧情况：未提供\n预算：%d-%d\n设施：%s %s %s %s\n租期：%s\n地铁站：%s\n临街：未提供\n特殊要求：%s\n",
		req.QuickSearchInput,
		req.RegionPreference.City,
		req.RegionPreference.Area,
		req.RegionPreference.Street,
		req.WorkLocation.City,
		req.WorkLocation.Area,
		req.WorkLocation.DetailAddress,
		req.HouseType,
		req.NeedElevator,
		req.RentBudget.Min,
		req.RentBudget.Max,
		req.NeedParking,
		req.SubwayAccessibility,
		req.FurnitureNeed,
		req.KitchenFacilities,
		req.LeaseTerm,
		req.SubwayProximity,
		req.QuickSearchInput,
	)

	// 封装当前房屋列表信息为字符串
	propertyData := "房源列表为："
	for _, property := range properties {
		propertyData += fmt.Sprintf("房屋ID:%d 信息：%s %s %d层  是否有电梯：%s %s %.2f㎡ %.2f元/月\n", property.ID, property.District, property.Address, property.Floor, utils.IF(property.HasElevator, "是", "否"), property.Layout, property.Area, property.Rent)
	}

	// 调用AI模型生成报告
	result, err := ark.CreateChatCompletion(ark.HOUSE_MATCHING_PROMPT, userData+propertyData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "报告生成失败"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "报告生成成功",
		"report":  result,
	})
	// // 获取流式通道
	// stream, err := ark.CreateChatCompletionWithStream(ark.HOUSE_MATCHING_PROMPT, userData+propertyData)
	// if err != nil {
	// 	c.SSEvent("error", gin.H{"message": "服务不可用"})
	// 	return
	// }

	// // 流式传输
	// for chunk := range stream { // 直接遍历通道
	// 	c.SSEvent("message", gin.H{"report": chunk})
	// 	c.Writer.Flush()
	// }
	// c.SSEvent("end", nil)
}

// 新增场景模拟结构体
type ScenarioSimulation struct {
	PropertyID uint   `json:"property_id" binding:"required"`
	Scenario   string `json:"scenario" binding:"required"`
}

// 新增模拟居住场景处理函数
func SimulateScenarioHandler(c *gin.Context) {
	var input ScenarioSimulation
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求参数"})
		return
	}

	// 根据id查询房屋信息
	var property models.Property
	if err := database.DB.Where("id =?", input.PropertyID).First(&property).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "房屋不存在"})
		return
	}
	// 封装当前房屋信息为字符串
	propertyData := fmt.Sprintf("房屋ID:%d 信息：%s %s %d层  是否有电梯：%s %s %.2f㎡ %.2f元/月\n", property.ID, property.District, property.Address, property.Floor, utils.IF(property.HasElevator, "是", "否"), property.Layout, property.Area, property.Rent)
	// 获取流式通道
	result, err := ark.CreateChatCompletion(ark.LIVING_SIMULATION_PROMPT, propertyData+"模拟场景："+input.Scenario)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "报告生成失败"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "报告生成成功",
		"report":  result,
	})

}

// // 新增对话请求结构体
// type LandlordDialogRequest struct {
//     LandlordID uint `json:"landlord_id" binding:"required"`
// }

// // 新增房东对话处理函数
// func LandlordDialogHandler(c *gin.Context) {
//     var req LandlordDialogRequest
//     if err := c.ShouldBindJSON(&req); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求参数"})
//         return
//     }

//     // 查询对话记录
//     var dialogs []models.LandlordDialog
//     if err := database.DB.Where("landlord_id = ?", req.LandlordID).
//         Order("created_at DESC").
//         Limit(20).
//         Find(&dialogs).Error; err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": "查询对话记录失败"})
//         return
//     }

//     // 构建大模型提示
//     prompt := "以下是房东的历史对话记录：\n"
//     for _, d := range dialogs {
//         prompt += fmt.Sprintf("[%s] %s\n", d.CreatedAt.Format("2006-01-02 15:04"), d.Content)
//     }
//     prompt += "\n请根据上述对话内容，生成后续的沟通建议："

//     // 调用大模型
//     response, err := llm.CallDeepseekR1(prompt)
//     if err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": "AI服务暂时不可用"})
//         return
//     }

//     c.JSON(http.StatusOK, gin.H{
//         "landlord_id": req.LandlordID,
//         "dialog_history": dialogs,
//         "ai_suggestion": string(response),
//     })
// }

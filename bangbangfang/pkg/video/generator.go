package video

const (
	roleSystem = "你是一个专业的房产视频制作助手，需要根据照片生成带解说的看房视频"
	template   = `{
  "scene": "小区入口->楼栋外观->单元门厅->电梯间->房屋玄关->客厅->厨房->主卧->卫生间",
  "requirements": {
    "subtitle": {
      "content": "展示面积：{面积}平米｜楼层：{楼层}/{总楼层}｜朝向：{朝向}｜建成年代：{年代}",
      "font_size": 36,
      "position": "bottom_center"
    },
    "voice": {
      "gender": "female",
      "speed": 1.1,
      "pitch": 0.8
    },
    "analysis": [
      {"type": "light", "time_range": ["9:00", "15:00", "18:00"]},
      {"type": "noise", "sources": ["交通", "装修", "社区"]}
    ]
  }
}`
)

// // GeneratePropertyVideo 生成房产导览视频
// func GeneratePropertyVideo(photos []string, prop *models.Property) (string, error) {
// 	client, err := imm.NewClientWithAccessKey(
// 		"cn-shanghai",
// 		"<your-access-key-id>",
// 		"<your-access-key-secret>")

// 	if err != nil {
// 		return "", fmt.Errorf("阿里云客户端初始化失败: %v", err)
// 	}

// 	// 构建智能媒体生成请求
// 	request := imm.CreateCreateMediaComplexTaskRequest()
// 	request.Project = "bangbangfang"
// 	request.NotifyEndpoint = "http://callback.bangbangfang.com"
// 	request.NotifyTopicName = "video-generation"

// 	// 添加照片源
// 	sources := make([]imm.MediaSource, 0)
// 	for _, photo := range photos {
// 		sources = append(sources, imm.MediaSource{
// 			"URI": photo,
// 			"Type": "image/jpeg",
// 			"Metadata": {
// 				"Area":      fmt.Sprintf("%d", prop.Area),
// 				"Floor":     fmt.Sprintf("%d/%d", prop.Floor, prop.TotalFloor),
// 				"Direction": prop.Direction,
// 				"Year":      fmt.Sprintf("%d", prop.BuildYear),
// 			},
// 		})
// 	}
// 	request.Sources = sources

// 	// 发送生成请求
// 	response, err := client.CreateMediaComplexTask(request)
// 	if err != nil {
// 		return "", fmt.Errorf("视频生成请求失败: %v", err)
// 	}

// 	// 轮询任务状态
// 	taskID := response.TaskId
// 	ticker := time.NewTicker(10 * time.Second)
// 	defer ticker.Stop()

// 	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Minute)
// 	defer cancel()

// 	for {
// 		select {
// 		case <-ticker.C:
// 			statusReq := imm.CreateGetMediaTaskRequest()
// 			statusReq.TaskId = taskID
// 			statusResp, err := client.GetMediaTask(statusReq)
// 			if err != nil {
// 				return "", err
// 			}

// 			switch statusResp.Status {
// 			case "Success":
// 				var result struct{ VideoURL string }
// 				if err := json.Unmarshal([]byte(statusResp.Result), &result); err != nil {
// 					return "", err
// 				}
// 				return result.VideoURL, nil
// 			case "Failed":
// 				return "", fmt.Errorf("视频生成失败: %s", statusResp.ErrorMessage)
// 			}
// 		case <-ctx.Done():
// 			return "", fmt.Errorf("视频生成超时")
// 		}
// 	}
// }

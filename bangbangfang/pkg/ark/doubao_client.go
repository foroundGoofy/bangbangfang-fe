package ark

import (
	"context"
	"fmt"
	"io"

	"github.com/volcengine/volcengine-go-sdk/service/arkruntime"
	"github.com/volcengine/volcengine-go-sdk/service/arkruntime/model"
	"github.com/volcengine/volcengine-go-sdk/volcengine"
)

var (
	Client *arkruntime.Client
)

const (
	API_KEY    = "387ad16f-ba04-4c37-812d-5c590be860f4"
	MODEL_NAME = "doubao-1-5-vision-pro-32k-250115"
	ENDPOINT   = "ep-20241218102919-t6szr"
	REGION     = "cn-beijing"
)

// InitClient 初始化ARK客户端（线程安全）
func InitClient() {
	Client = arkruntime.NewClientWithApiKey(
		API_KEY,
		arkruntime.WithRegion(REGION),
	)
}

func CreateChatCompletion(systemInput, userInput string) (string, error) {
	// 原代码
	ctx := context.Background()
	fmt.Println("----- standard request -----")
	fmt.Println("userInput:", userInput)
	req := model.CreateChatCompletionRequest{
		Model: ENDPOINT,
		Messages: []*model.ChatCompletionMessage{
			{
				Role: model.ChatMessageRoleSystem,
				Content: &model.ChatCompletionMessageContent{
					StringValue: volcengine.String(systemInput),
				},
			},
			{
				Role: model.ChatMessageRoleUser,
				Content: &model.ChatCompletionMessageContent{
					StringValue: volcengine.String(userInput),
				},
			},
		},
	}

	resp, err := Client.CreateChatCompletion(ctx, req)
	if err != nil {
		fmt.Printf("standard chat error: %v\n", err)
		return "", err
	}
	return *resp.Choices[0].Message.Content.StringValue, nil
}

func CreateChatCompletionWithStream(systemInput, userInput string) (<-chan string, error) {
	ctx := context.Background()
	req := model.CreateChatCompletionRequest{
		Model: ENDPOINT,
		Messages: []*model.ChatCompletionMessage{
			{
				Role: model.ChatMessageRoleSystem,
				Content: &model.ChatCompletionMessageContent{
					StringValue: volcengine.String(systemInput),
				},
			},
			{
				Role: model.ChatMessageRoleUser,
				Content: &model.ChatCompletionMessageContent{
					StringValue: volcengine.String(userInput),
				},
			},
		},
	}

	stream, err := Client.CreateChatCompletionStream(ctx, req)
	if err != nil {
		return nil, err
	}

	// 创建持续使用的通道
	ch := make(chan string)

	go func() {
		defer close(ch)
		defer stream.Close()

		for {
			recv, err := stream.Recv()
			if err == io.EOF {
				return
			}
			if err != nil {
				fmt.Printf("Stream error: %v\n", err)
				return
			}

			if len(recv.Choices) > 0 && recv.Choices[0].Delta.Content != "" {
				content := recv.Choices[0].Delta.Content
				select {
				case ch <- content:
				case <-ctx.Done():
					return
				}
			}
		}
	}()

	return ch, nil
}

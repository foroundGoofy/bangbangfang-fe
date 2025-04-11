// 模拟房源详情数据
const mockPropertyDetail = {
  id: 1,
  video_url: 'https://example.com/video.mp4',
  video_created_at: '2024-01-01T12:00:00Z',
  video_status: 'completed',
  // 可以根据实际需求添加更多的模拟数据字段
};

// 定义 getPropertyDetail 函数，返回模拟数据
export const getPropertyDetail = async (id) => {
  // 模拟异步请求
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 返回模拟数据
  return { data: mockPropertyDetail };
};
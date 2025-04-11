
import React from "react";
import { Card, Typography, Rating } from "@douyinfe/semi-ui";

const TenantReviews = () => {
  const { Title, Text } = Typography;

  const reviews = [
    {
      name: "Sarah",
      rating: 5,
      comment: "位置很完美，周边设施齐全，房东也很热情。公寓的采光很棒，室内装修非常现代化。",
      date: "2024-02-15"
    },
    {
      name: "Mike",
      rating: 4,
      comment: "交通便利，地铁站就在附近，房间整体不错，就是隔音稍微差一点。",
      date: "2024-02-10"
    },
    {
      name: "Emma",
      rating: 5,
      comment: "房子很新，设施完善，特别是智能家居很方便，周边生活也很便利。",
      date: "2024-01-28"
    }
  ];

  return (
    <Card className="mb-6 shadow-sm">
      <Title heading={5}>租客评价</Title>
      <div/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {reviews.map((review, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <Text strong>{review.name}</Text>
              <Rating allowHalf value={review.rating} disabled />
            </div>
            <Text className="text-sm text-gray-600 mb-3">{review.comment}</Text>
            <Text className="text-xs text-gray-400">{review.date}</Text>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TenantReviews;

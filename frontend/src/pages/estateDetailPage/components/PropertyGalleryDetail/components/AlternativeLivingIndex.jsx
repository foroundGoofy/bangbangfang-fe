
import React from "react";
import { Card, Typography, Progress } from "@douyinfe/semi-ui";

const AlternativeLivingIndex = () => {
  const { Title, Text } = Typography;

  const indices = [
    { name: "交通便利性", value: 92, color: "blue" },
    { name: "商业配套", value: 88, color: "orange" },
    { name: "教育资源", value: 90, color: "purple" },
    { name: "周边环境", value: 85, color: "green" },
    { name: "医疗资源", value: 87, color: "red" }
  ];

  return (
    <Card className="mb-6 shadow-sm">
      <Title heading={5} className="mb-4">居住指数</Title>
      <div className="grid grid-cols-1 gap-4">
        {indices.map((index, idx) => (
          <div key={idx} className="flex flex-col">
            <div className="flex justify-between mb-1">
              <Text className="text-sm">{index.name}</Text>
              <Text strong>{index.value}</Text>
            </div>
            <Progress percent={index.value} stroke={index.color} showInfo={false} />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AlternativeLivingIndex;

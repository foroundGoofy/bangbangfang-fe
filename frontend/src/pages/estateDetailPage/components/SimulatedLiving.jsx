
import { Button } from "@douyinfe/semi-ui";
import React, { useState } from "react";
const lifestyleScenarios = [
  {
    icon: "🚇",
    title: "上下班通勤",
    description: "模拟日常上下班通勤路线和时间"
  },
  {
    icon: "🛒",
    title: "日常购物",
    description: "周边超市和菜市场的便利程度"
  },
  {
    icon: "🍽️",
    title: "餐饮美食",
    description: "探索周边餐厅和咖啡馆"
  },
  {
    icon: "💪",
    title: "运动健身",
    description: "健身房和运动场所的可达性"
  },
  {
    icon: "🎬",
    title: "休闲娱乐",
    description: "商场、影院等休闲场所"
  },
  {
    icon: "🏥",
    title: "医疗保健",
    description: "医院和诊所的便利程度"
  },
  {
    icon: "📚",
    title: "教育资源",
    description: "周边学校和教育设施"
  },
  {
    icon: "🌳",
    title: "周末休闲",
    description: "公园、文化场所和休闲区域"
  }
];

const SimulatedLiving = (props) => {
  const [selectIndexes, setSelectedIndexes] = useState([]);
  const handleScenarioClick = (index) => {
    if (selectIndexes.includes(index)) {
      setSelectedIndexes(selectIndexes.filter((i) => i !== index));
    } else {
      setSelectedIndexes([...selectIndexes, index]);
    }
  };
  const handleSubmit = () => {
    // 处理提交逻辑
    const selectedScenarios = selectIndexes.map(index => lifestyleScenarios[index]);
    props?.onSubmit?.(selectedScenarios)

  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 p-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-6">选择生活场景</h2>
        <Button theme="solid" type="primary" onClick={handleSubmit}>
          选择完成
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-2 gap-4">
        {lifestyleScenarios.map((scenario, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            style={{backgroundColor: selectIndexes.includes(index) ? "rgba(0, 123, 255, 0.1)" : ''}}
            onClick={() => handleScenarioClick(index)}>
            <div className="text-3xl mb-2">{scenario.icon}</div>
            <h3 className="font-medium text-lg mb-1">{scenario.title}</h3>
            <p className="text-sm text-gray-500">{scenario.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimulatedLiving;


import React from "react";
import { Card, Typography } from "@douyinfe/semi-ui";

const LivingIndex = () => {
  const { Title, Text } = Typography;

  const indices = [
    { name: "交通便利性", value: 92, color: "rgb(59, 130, 246)" },
    { name: "商业配套", value: 88, color: "rgb(245, 158, 11)" },
    { name: "教育资源", value: 90, color: "rgb(139, 92, 246)" },
    { name: "周边环境", value: 85, color: "rgb(16, 185, 129)" },
    { name: "医疗资源", value: 87, color: "rgb(239, 68, 68)" }
  ];

  return (
    <Card className="mb-6 shadow-sm">
      <Title heading={5} className="mb-4">居住指数</Title>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mb-4 md:mb-0 flex items-center justify-center">
          <CustomRadarChart data={indices} />
        </div>
        <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-3">
          {indices.map((index, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-md" 
              style={{ backgroundColor: `${index.color}20` }}
            >
              <Text className="text-sm">{index.name}</Text>
              <Title heading={4} style={{ color: index.color }}>{index.value}</Title>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

// 自定义雷达图组件
const CustomRadarChart = ({ data }) => {
  const size = 250;
  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = size * 0.4;
  
  // 计算多边形的顶点
  const calculatePoint = (value, index, total) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  };

  // 生成多边形路径
  const generatePolygonPath = (values) => {
    const points = values.map((value, i) => 
      calculatePoint(value, i, values.length)
    );
    
    return points.map((point, i) => 
      (i === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`)
    ).join(' ') + ' Z';
  };

  // 生成网格线路径
  const generateGridLines = () => {
    const levels = [20, 40, 60, 80, 100];
    return levels.map(level => {
      const points = data.map((_, i) => 
        calculatePoint(level, i, data.length)
      );
      
      return (
        <polygon 
          key={level}
          points={points.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="#ddd"
          strokeWidth="0.5"
        />
      );
    });
  };

  // 生成轴线
  const generateAxisLines = () => {
    return data.map((_, i) => {
      const point = calculatePoint(100, i, data.length);
      return (
        <line
          key={i}
          x1={centerX}
          y1={centerY}
          x2={point.x}
          y2={point.y}
          stroke="#ddd"
          strokeWidth="0.5"
        />
      );
    });
  };

  // 生成标签
  const generateLabels = () => {
    return data.map((item, i) => {
      const point = calculatePoint(110, i, data.length);
      return (
        <text
          key={i}
          x={point.x}
          y={point.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fill="#666"
        >
          {item.name}
        </text>
      );
    });
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 网格线 */}
      {generateGridLines()}
      
      {/* 轴线 */}
      {generateAxisLines()}
      
      {/* 数据多边形 */}
      <path
        d={generatePolygonPath(data.map(item => item.value))}
        fill="rgba(59, 130, 246, 0.2)"
        stroke="rgb(59, 130, 246)"
        strokeWidth="2"
      />
      
      {/* 数据点 */}
      {data.map((item, i) => {
        const point = calculatePoint(item.value, i, data.length);
        return (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="rgb(59, 130, 246)"
            stroke="#fff"
            strokeWidth="1"
          />
        );
      })}
      
      {/* 标签 */}
      {generateLabels()}
    </svg>
  );
};

export default LivingIndex;

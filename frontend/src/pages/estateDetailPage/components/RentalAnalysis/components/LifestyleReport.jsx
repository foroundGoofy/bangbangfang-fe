import React from "react";

const LifestyleReport = () => {
  const scores = [
    { value: 88, label: "便捷评分", color: "text-blue-600" },
    { value: 85, label: "便利指数", color: "text-green-600" },
    { value: 90, label: "舒适度", color: "text-yellow-600" },
    { value: 87, label: "生活便利度", color: "text-purple-600" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {scores.map((score, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className={`text-3xl font-bold ${score.color}`}>{score.value}</div>
          <div className="text-sm text-gray-500">{score.label}</div>
        </div>
      ))}
    </div>
  );
};

export default LifestyleReport;

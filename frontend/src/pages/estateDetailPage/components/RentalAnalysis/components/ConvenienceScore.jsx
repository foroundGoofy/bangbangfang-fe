import React from "react";
const ConvenienceScore = ({ score }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <div className="text-gray-600 mb-2">便利度评分</div>
        <div className="text-5xl font-bold text-blue-600">{score}</div>
      </div>
    </div>
  );
};

export default ConvenienceScore;

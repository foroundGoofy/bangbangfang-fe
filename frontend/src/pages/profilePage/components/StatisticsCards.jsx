
import React from "react";

const StatisticsCards = ({ statistics }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-blue-50 rounded-lg p-6 flex flex-col items-center">
        <span className="text-blue-600 text-2xl font-bold">{statistics.rentedCount}</span>
        <span className="text-gray-700">租房总数</span>
      </div>
      <div className="bg-green-50 rounded-lg p-6 flex flex-col items-center">
        <span className="text-green-600 text-2xl font-bold">{statistics.currentRentals}</span>
        <span className="text-gray-700">当前租房</span>
      </div>
      <div className="bg-purple-50 rounded-lg p-6 flex flex-col items-center">
        <span className="text-purple-600 text-2xl font-bold">{statistics.favoriteCount}</span>
        <span className="text-gray-700">收藏房源</span>
      </div>
    </div>
  );
};

export default StatisticsCards;

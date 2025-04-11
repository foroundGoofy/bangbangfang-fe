import React from "react";

import { FiClock } from 'react-icons/fi';

const LocationAnalysis = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
            <FiClock size={14} />
          </div>
          <span className="text-blue-500 font-medium">实用性</span>
        </div>
        <div className="text-xl font-bold text-blue-700">5-10分钟</div>
        <div className="text-sm text-gray-500">工作日早高峰时间</div>
      </div>
      
      <div className="bg-green-50 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">
            <FiClock size={14} />
          </div>
          <span className="text-green-500 font-medium">平峰期</span>
        </div>
        <div className="text-xl font-bold text-green-700">--</div>
        <div className="text-sm text-gray-500">工作日非高峰时段</div>
      </div>
      
      <div className="bg-purple-50 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white mr-2">
            <FiClock size={14} />
          </div>
          <span className="text-purple-500 font-medium">周末</span>
        </div>
        <div className="text-xl font-bold text-purple-700">--</div>
        <div className="text-sm text-gray-500">周末及节假日时段</div>
      </div>
    </div>
  );
};

export default LocationAnalysis;

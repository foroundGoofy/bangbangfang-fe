import React from "react";

import { FaBus, FaSubway, FaCar } from 'react-icons/fa';

const TransportationOptions = () => {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
            <FaSubway size={14} />
          </div>
          <span className="text-blue-500 font-medium">地铁</span>
        </div>
        <div className="text-sm text-gray-600">
          <p>线路：5号线/6号线，10号线/8号线</p>
          <p>步行时间：约5分钟</p>
          <p>换乘站数：5站</p>
        </div>
      </div>
      
      <div className="bg-green-50 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">
            <FaBus size={14} />
          </div>
          <span className="text-green-500 font-medium">公交</span>
        </div>
        <div className="text-sm text-gray-600">
          <p>线路：102路，105路，405路</p>
          <p>步行时间：5分钟</p>
          <p>发车频率：10分钟/班次</p>
        </div>
      </div>
      
      <div className="bg-yellow-50 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white mr-2">
            <FaCar size={14} />
          </div>
          <span className="text-yellow-500 font-medium">驾车</span>
        </div>
        <div className="text-sm text-gray-600">
          <p>距离：5.4公里</p>
          <p>平常用时：25分钟</p>
          <p>高峰用时：45分钟</p>
        </div>
      </div>
      
      <div className="bg-yellow-50 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white mr-2">
            <span className="text-xs">!</span>
          </div>
          <span className="text-yellow-500 font-medium">注意事项</span>
        </div>
        <div className="text-sm text-gray-600 space-y-2">
          <p className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 mr-2 text-xs">!</span>
            周围高峰期可能存在拥堵
          </p>
          <p className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 mr-2 text-xs">!</span>
            部分路段可能存在小拥堵
          </p>
          <p className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 mr-2 text-xs">!</span>
            停车位紧张程度小
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransportationOptions;

import React from "react";

import { FiCheck } from 'react-icons/fi';

const NeighborhoodAdvantages = () => {
  return (
    <div className="bg-green-50 rounded-lg p-4">
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-2">
            <FiCheck size={14} />
          </div>
          <span className="text-gray-600">餐饮种类丰富</span>
        </div>
        
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-2">
            <FiCheck size={14} />
          </div>
          <span className="text-gray-600">购物便利</span>
        </div>
        
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-2">
            <FiCheck size={14} />
          </div>
          <span className="text-gray-600">步行距离适中</span>
        </div>
      </div>
    </div>
  );
};

export default NeighborhoodAdvantages;

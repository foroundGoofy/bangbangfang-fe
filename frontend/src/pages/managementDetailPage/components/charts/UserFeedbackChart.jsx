
import React, { useState } from 'react';
function UserFeedbackChart() {
  return (
    <div>
      <h3 className="text-md font-medium text-gray-700 mb-3">用户反馈</h3>
      <div className="h-64 flex justify-center items-center">
        <div className="relative w-48 h-48">
          {/* Pie chart - using SVG for better accuracy */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Blue section (positive feedback) - 75% */}
            <path 
              d="M50,50 L50,0 A50,50 0 0,1 100,50 L50,50" 
              fill="#3b82f6" 
            />
            <path 
              d="M50,50 L100,50 A50,50 0 0,1 50,100 L50,50" 
              fill="#3b82f6" 
            />
            <path 
              d="M50,50 L50,100 A50,50 0 0,1 0,50 L50,50" 
              fill="#3b82f6" 
            />
            
            {/* Green section (negative feedback) - 25% */}
            <path 
              d="M50,50 L0,50 A50,50 0 0,1 50,0 L50,50" 
              fill="#4ade80" 
            />
          </svg>
          
          {/* Labels */}
          <div className="absolute bottom-0 right-0 text-sm text-gray-700">正面评价</div>
          <div className="absolute top-0 left-0 text-sm text-gray-700">负面评价</div>
        </div>
      </div>
    </div>
  );
}

export default UserFeedbackChart;


import React, { useState } from 'react';
function MarketAnalysisChart() {
  return (
    <div>
      <h3 className="text-md font-medium text-gray-700 mb-3">市场份额</h3>
      <div className="h-64 flex justify-center items-center">
        <div className="relative w-48 h-48">
          {/* Pie chart - using SVG for better accuracy */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Green section (competitors) - 80% */}
            <path 
              d="M50,50 L50,0 A50,50 0 0,1 100,50 L50,50" 
              fill="#4ade80" 
            />
            <path 
              d="M50,50 L100,50 A50,50 0 0,1 50,100 L50,50" 
              fill="#4ade80" 
            />
            <path 
              d="M50,50 L50,100 A50,50 0 0,1 0,50 L50,50" 
              fill="#4ade80" 
            />
            
            {/* Blue section (our share) - 20% */}
            <path 
              d="M50,50 L0,50 A50,50 0 0,1 15,15 L50,50" 
              fill="#3b82f6" 
            />
          </svg>
          
          {/* Labels */}
          <div className="absolute top-0 left-0 text-sm text-gray-700">我们的份额</div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm text-gray-700">其他竞争对手</div>
        </div>
      </div>
    </div>
  );
}

export default MarketAnalysisChart;

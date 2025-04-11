
import React, { useState } from 'react';
function ConsultationChart() {
  return (
    <div>
      <h3 className="text-md font-medium text-gray-700 mb-3">咨询数据</h3>
      <div className="h-64 relative flex items-center">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 pr-2">
          <span>500</span>
          <span>400</span>
          <span>300</span>
          <span>200</span>
          <span>100</span>
          <span>0</span>
        </div>
        
        {/* Chart area */}
        <div className="ml-10 flex-1 h-full flex items-end justify-center">
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 w-16 h-48 mb-2 rounded-t"></div>
            <span className="text-sm text-gray-600">总咨询量</span>
          </div>
        </div>
        
        {/* Horizontal grid lines */}
        <div className="absolute left-10 right-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border-t border-gray-200 w-full h-0"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ConsultationChart;

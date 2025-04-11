
import React, { useState } from 'react';
function SwotAnalysisChart() {
  // Define SWOT data with values (0-100 scale)
  const swotData = {
    strength: 85,     // 优势
    weakness: 40,     // 劣势
    opportunity: 70,  // 机会
    threat: 55        // 威胁
  };

  // Calculate coordinates for the polygon points based on data values
  // Convert values to positions on the chart (0 = center, 100 = edge)
  const calculatePoint = (value, angle) => {
    const radius = (value / 100) * 40; // 40 is max radius in our viewBox
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    return { x, y };
  };

  const strengthPoint = calculatePoint(swotData.strength, -Math.PI/2); // top
  const weaknessPoint = calculatePoint(swotData.weakness, Math.PI); // left
  const opportunityPoint = calculatePoint(swotData.opportunity, Math.PI/2); // bottom
  const threatPoint = calculatePoint(swotData.threat, 0); // right

  // Create polygon points string for SVG
  const polygonPoints = `${strengthPoint.x},${strengthPoint.y} ${weaknessPoint.x},${weaknessPoint.y} ${opportunityPoint.x},${opportunityPoint.y} ${threatPoint.x},${threatPoint.y}`;

  return (
    <div>
      <h3 className="text-md font-medium text-gray-700 mb-3">SWOT分析</h3>
      <div className="h-64 flex justify-center items-center">
        <div className="relative w-48 h-48">
          {/* Radar chart background with multiple levels */}
          <div className="absolute inset-0 border-2 border-gray-200 rounded-full"></div>
          <div className="absolute inset-[25%] border-2 border-gray-200 rounded-full"></div>
          <div className="absolute inset-[50%] border-2 border-gray-200 rounded-full"></div>
          <div className="absolute inset-[75%] border-2 border-gray-200 rounded-full"></div>
          
          {/* Axes */}
          <div className="absolute top-0 left-1/2 h-full w-0 border-l border-gray-300" style={{ transform: 'translateX(-50%)' }}></div>
          <div className="absolute top-1/2 left-0 h-0 w-full border-t border-gray-300" style={{ transform: 'translateY(-50%)' }}></div>
          
          {/* Data points and lines */}
          <svg className="absolute inset-0" viewBox="0 0 100 100">
            {/* Data polygon */}
            <polygon 
              points={polygonPoints}
              fill="rgba(59, 130, 246, 0.2)" 
              stroke="#3b82f6" 
              strokeWidth="1.5" 
            />
            
            {/* Data points with values */}
            <circle cx={strengthPoint.x} cy={strengthPoint.y} r="3" fill="#3b82f6" />
            <circle cx={weaknessPoint.x} cy={weaknessPoint.y} r="3" fill="#3b82f6" />
            <circle cx={opportunityPoint.x} cy={opportunityPoint.y} r="3" fill="#3b82f6" />
            <circle cx={threatPoint.x} cy={threatPoint.y} r="3" fill="#3b82f6" />
            
            {/* Data value labels */}
            <text x={strengthPoint.x} y={strengthPoint.y - 5} textAnchor="middle" fontSize="8" fill="#3b82f6" fontWeight="bold">{swotData.strength}%</text>
            <text x={weaknessPoint.x - 5} y={weaknessPoint.y} textAnchor="end" fontSize="8" fill="#3b82f6" fontWeight="bold">{swotData.weakness}%</text>
            <text x={opportunityPoint.x} y={opportunityPoint.y + 10} textAnchor="middle" fontSize="8" fill="#3b82f6" fontWeight="bold">{swotData.opportunity}%</text>
            <text x={threatPoint.x + 5} y={threatPoint.y} textAnchor="start" fontSize="8" fill="#3b82f6" fontWeight="bold">{swotData.threat}%</text>
          </svg>
          
          {/* Axis Labels */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 text-sm text-gray-700 font-medium">优势</div>
          <div className="absolute top-1/2 left-0 transform -translate-x-12 -translate-y-1/2 text-sm text-gray-700 font-medium">劣势</div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 text-sm text-gray-700 font-medium">机会</div>
          <div className="absolute top-1/2 right-0 transform translate-x-12 -translate-y-1/2 text-sm text-gray-700 font-medium">威胁</div>
          
          {/* Scale labels */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[8px] text-gray-500">0%</div>
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[8px] text-gray-500">50%</div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 text-[8px] text-gray-500">100%</div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex justify-center">
        <div className="grid grid-cols-2 gap-x-8 gap-y-1">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            <span className="text-xs text-gray-600">优势: {swotData.strength}%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            <span className="text-xs text-gray-600">劣势: {swotData.weakness}%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            <span className="text-xs text-gray-600">机会: {swotData.opportunity}%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            <span className="text-xs text-gray-600">威胁: {swotData.threat}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwotAnalysisChart;

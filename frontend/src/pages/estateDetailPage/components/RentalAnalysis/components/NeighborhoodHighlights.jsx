import React from "react";

import { FiCheck, FiInfo } from 'react-icons/fi';

const NeighborhoodHighlights = ({ highlights, isSuggestion = false}) => {
  const Icon = isSuggestion ? FiInfo : FiCheck;
  const bgColor = isSuggestion ? "bg-blue-100" : "bg-green-100";
  const textColor = isSuggestion ? "text-blue-500" : "text-green-500";

  return (
    <div className="space-y-2">
      {highlights.map((highlight, index) => (
        <div key={index} className="flex items-center">
          <div className={`w-6 h-6 rounded-full ${bgColor} flex items-center justify-center ${textColor} mr-2`}>
            <Icon size={14} />
          </div>
          <span className="text-gray-600 text-sm">{highlight}</span>
        </div>
      ))}
    </div>
  );
};

export default NeighborhoodHighlights;

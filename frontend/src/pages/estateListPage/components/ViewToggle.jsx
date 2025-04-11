import  React from "react";

import { FaThLarge, FaList } from "react-icons/fa";

const ViewToggle = ({ currentView, onToggle }) => {
  return (
    <div className="flex items-center space-x-2 bg-white rounded-md shadow-sm border border-gray-200 inline-flex">
      <button
        className={`flex items-center justify-center px-4 py-2 rounded-l-md ${
          currentView === "grid" 
            ? "bg-blue-500 text-white" 
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => onToggle("grid")}
        aria-label="Grid view"
      >
        <FaThLarge className="mr-2" />
        <span>网格视图</span>
      </button>
      
      <button
        className={`flex items-center justify-center px-4 py-2 rounded-r-md ${
          currentView === "list" 
            ? "bg-blue-500 text-white" 
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => onToggle("list")}
        aria-label="List view"
      >
        <FaList className="mr-2" />
        <span>列表视图</span>
      </button>
    </div>
  );
};

export default ViewToggle;

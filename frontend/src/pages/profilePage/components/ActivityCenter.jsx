
import React from "react";

const ActivityCenter = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-semibold">活动中心</h3>
        <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded">
          发起活动
        </button>
      </div>
      <div className="p-8 text-center text-gray-400">
        暂无活动信息
      </div>
    </div>
  );
};

export default ActivityCenter;

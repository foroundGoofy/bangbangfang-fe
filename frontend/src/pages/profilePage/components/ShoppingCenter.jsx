
import React from "react";

const ShoppingCenter = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-semibold">商城中心</h3>
        <button className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded">
          去市场
        </button>
      </div>
      <div className="p-8 text-center text-gray-400">
        暂无商品信息
      </div>
    </div>
  );
};

export default ShoppingCenter;

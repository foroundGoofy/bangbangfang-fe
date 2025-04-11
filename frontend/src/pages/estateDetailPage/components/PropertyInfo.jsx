
import React from "react";
import { useLocation } from "react-router-dom";

const PropertyInfo = () => {
  const location = useLocation();
  const { property ={} } = location.state || {};
  console.log("id", location.state);
  return (
    <div>
      {/* <h1 className="text-2xl font-bold mb-4">阳光城现代公寓</h1> */}
      <div className="text-2xl font-bold text-red-500 mb-4">{property['租金']|| '暂无信息'}/月</div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="flex flex-col">
          <span className="text-gray-500">面积：</span>
          <span className="font-medium">85m²</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">户型：</span>
          <span className="font-medium">{property['户型'] || '暂无信息'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">位置：</span>
          <span className="font-medium">{property['位置'] || '暂无信息'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">匹配值：</span>
          <span className="font-medium">{property['匹配值'] ? `${property['匹配值']}/10分` : '暂无信息'}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;

import React from 'react';

import { Card } from "@douyinfe/semi-ui";

const PropertyInfo = ({ propertyData }) => {
  const { minRent: rent, maxRent, floor,has_elevator, layout = '暂无信息', district, address, roomAge, propertyCondition = '暂无信息' } = propertyData
  console.log('PropertyInfo', propertyData)
  const rentRange = !rent ? '暂无信息' : maxRent && rent ? `${rent}-${maxRent}元`: `${rent}元`
  return (
    <Card className="shadow-sm">
      <h2 className="text-xl font-bold mb-4">房屋信息</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex">
            <span className="text-gray-500 w-20">位置：</span>
            <span className="font-medium">{[district,address].filter(item => item).join(' ') || '暂无信息'}</span>
          </div>
          <div className="flex">
            <span className="text-gray-500 w-20">户型：</span>
            <span className="font-medium">{layout}</span>
          </div>
          <div className="flex">
            <span className="text-gray-500 w-20">楼层：</span>
            <span className="font-medium">{floor ? `${floor}层`: '暂无信息'}</span>
          </div>
          <div className="flex">
            <span className="text-gray-500 w-20">电梯：</span>
            <span className="font-medium">{has_elevator ? "有" : "无"}</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex">
            <span className="text-gray-500 w-20">房龄：</span>
            <span className="font-medium">{roomAge}</span>
          </div>
          <div className="flex">
            <span className="text-gray-500 w-20">装修状况：</span>
            <span className="font-medium">{propertyCondition}</span>
          </div>
          <div className="flex">
            <span className="text-gray-500 w-20">租金范围：</span>
            <span className="font-medium">{rentRange}</span>
          </div>
          <div className="flex">
            <span className="text-gray-500 w-20">房屋性质：</span>
            <span className="font-medium">{propertyData.propertyType}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PropertyInfo;


import React from "react";
import { Select } from "@douyinfe/semi-ui";

const AvailabilityInfo = ({ 
  availableDate, 
  propertyFeatures, 
  onAvailableDateChange, 
  onPropertyFeaturesChange 
}) => {
  const availableDates = ["立即入住", "一周内", "一个月内", "三个月内", "待商议"];
  const featureOptions = ["电梯", "车位", "储藏室", "花园", "阳台", "家具齐全", "家电齐全", "宽带", "暖气", "空调"];
  
  return (
    <>
      <div className="space-y-2">
        <label htmlFor="availableDate" className="block text-sm font-medium text-gray-700">
          出租时间
        </label>
        <Select
          id="availableDate"
          placeholder="请选择"
          style={{ width: '100%' }}
          value={availableDate}
          onChange={(value) => onAvailableDateChange(value)}
          optionList={availableDates.map(date => ({ label: date, value: date }))}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="propertyFeatures" className="block text-sm font-medium text-gray-700">
          房屋特点
        </label>
        <Select
          id="propertyFeatures"
          placeholder="请选择"
          style={{ width: '100%' }}
          value={propertyFeatures}
          onChange={(value) => onPropertyFeaturesChange(value)}
          multiple
          maxTagCount={3}
          optionList={featureOptions.map(feature => ({ label: feature, value: feature }))}
        />
      </div>
    </>
  );
};

export default AvailabilityInfo;

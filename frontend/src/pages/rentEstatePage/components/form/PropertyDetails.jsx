
import React from "react";
import { Select } from "@douyinfe/semi-ui";

const PropertyDetails = ({ 
  floor, 
  propertyType, 
  roomAge, 
  propertyCondition,
  onFloorChange,
  onPropertyTypeChange,
  onRoomAgeChange,
  onPropertyConditionChange
}) => {
  const propertyTypes = ["一室一厅", "两室一厅", "三室一厅", "开间"];
  const propertyConditions = ["毛坯", "简装", "精装", "豪装"];
  const roomAgeOptions = ["1年以内", "1-3年", "3-5年", "5-10年", "10年以上"];
  
  // Generate floor options: 1-50层, 地下1-3层
  const floorOptions = [
    ...Array.from({ length: 3 }, (_, i) => ({label:`地下${i + 1}层`, value:i+1})),
    ...Array.from({ length: 50 }, (_, i) => ({label:`${i + 1}层`, value:i+1}))
  ];
  
  return (
    <>
      <div className="space-y-2">
        <label htmlFor="floor" className="block text-sm font-medium text-gray-700">
          楼层
        </label>
        <Select
          id="floor"
          placeholder="请选择"
          style={{ width: '100%' }}
          value={floor}
          onChange={(value) => onFloorChange(value)}
          showSearch
          optionList={floorOptions}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
          户型
        </label>
        <Select
          id="propertyType"
          placeholder="请选择"
          style={{ width: '100%' }}
          value={propertyType}
          onChange={(value) => onPropertyTypeChange(value)}
          optionList={propertyTypes.map(type => ({ label: type, value: type }))}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="roomAge" className="block text-sm font-medium text-gray-700">
          房龄
        </label>
        <Select
          id="roomAge"
          placeholder="请选择"
          style={{ width: '100%' }}
          value={roomAge}
          onChange={(value) => onRoomAgeChange(value)}
          optionList={roomAgeOptions.map(age => ({ label: age, value: age }))}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="propertyCondition" className="block text-sm font-medium text-gray-700">
          房屋新旧程度
        </label>
        <Select
          id="propertyCondition"
          placeholder="请选择"
          style={{ width: '100%' }}
          value={propertyCondition}
          onChange={(value) => onPropertyConditionChange(value)}
          optionList={propertyConditions.map(condition => ({ label: condition, value: condition }))}
        />
      </div>
    </>
  );
};

export default PropertyDetails;

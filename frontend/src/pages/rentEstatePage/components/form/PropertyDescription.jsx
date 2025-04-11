
import React from "react";

const PropertyDescription = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
        房源描述
      </label>
      <textarea
        id="description"
        rows={4}
        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm"
        placeholder="请描述您要出租的房源信息，例如：我要出租一套位于朝阳区星光新城的两居室，70平米，带电梯，精装修，房龄5年，月租6000-7000元..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex justify-center mt-4">
        <button
          type="button"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium"
          onClick={() => {
            // This would typically generate a description based on other form fields
            // For demo purposes, we'll just set a sample description
            onChange("朝阳区星光新城两居室，70平米，带电梯，精装修，房龄5年，月租6500元。");
          }}
        >
          生成房源信息
        </button>
      </div>
    </div>
  );
};

export default PropertyDescription;

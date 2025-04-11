
import React, { useState, useEffect } from "react";
import { Slider } from "@douyinfe/semi-ui";

const PricingInfo = ({ minRent, maxRent, onMinRentChange, onMaxRentChange }) => {
  const [sliderValue, setSliderValue] = useState([
    minRent ? parseInt(minRent) : 1000,
    maxRent ? parseInt(maxRent) : 10000
  ]);

  // Update input fields when slider changes
  const handleSliderChange = (value) => {
    setSliderValue(value);
    onMinRentChange(value[0].toString());
    onMaxRentChange(value[1].toString());
  };

  // Update slider when input fields change
  useEffect(() => {
    const min = minRent ? parseInt(minRent) : sliderValue[0];
    const max = maxRent ? parseInt(maxRent) : sliderValue[1];
    
    // Only update if values are different to avoid infinite loop
    if (min !== sliderValue[0] || max !== sliderValue[1]) {
      setSliderValue([min, max]);
    }
  }, [minRent, maxRent]);

  return (
    <>
      <div className="space-y-2">
        <label htmlFor="minRent" className="block text-sm font-medium text-gray-700">
          最低租金（元/月）
        </label>
        <input
          type="number"
          id="minRent"
          className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm"
          value={minRent}
          onChange={(e) => onMinRentChange(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="maxRent" className="block text-sm font-medium text-gray-700">
          最高租金（元/月）
        </label>
        <input
          type="number"
          id="maxRent"
          className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm"
          value={maxRent}
          onChange={(e) => onMaxRentChange(e.target.value)}
        />
      </div>

      <div className="col-span-2 mt-4 px-4">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          租金范围滑块
        </label>
        <Slider
          range
          min={0}
          max={20000}
          step={100}
          value={sliderValue}
          onChange={handleSliderChange}
          tipFormatter={value => `¥${value}`}
          marks={{
            1000: '¥1000',
            5000: '¥5000',
            10000: '¥10000',
            15000: '¥15000',
            20000: '¥20000'
          }}
        />
      </div>
    </>
  );
};

export default PricingInfo;

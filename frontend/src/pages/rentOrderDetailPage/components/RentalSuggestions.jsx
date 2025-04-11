import React from 'react';
import { Card } from "@douyinfe/semi-ui";
const convertToChinese = (str) => {
  const map = {
    "housingDecorSuggest": "房屋装修建议",
    "housingFacilitySuggest":"房屋设施建议"
  };
  return map[str] || str;
};
const RentalSuggestions = ({suggestions}) => {
  console.log(suggestions);
  return (
    <Card className="shadow-sm">
      <h2 className="text-xl font-bold mb-4">出租建议</h2>
      <div className="text-gray-500 italic">
        根据您的房源情况，系统将生成个性化的出租建议...
      </div>

      <div className="mt-2">
        {Object.entries(suggestions).map((suggestion, index) => {
          console.log(suggestion);
          const [key, value] = suggestion;
          return (
            <div key={index} className="mb-2 flex">
              <strong className="text-gray-700 mr-1 font-bold shrink-0">{convertToChinese(key)}</strong>
              <span className="text-gray-500 inline-block">{value}</span>
            </div>
          )
          }
        )}
      </div>
    </Card>
  );
};

export default RentalSuggestions;

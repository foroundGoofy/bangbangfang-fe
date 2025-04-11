
import React, { useState } from 'react';
function ProductRecommendations() {
  const recommendations = [
    '增加AR/VR看房功能',
    '优化智能匹配算法',
    '增加房东和租客评价系统',
    '开发智能合同管理功能'
  ];

  return (
    <div>
      <ul className="list-disc pl-5 space-y-2">
        {recommendations.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductRecommendations;

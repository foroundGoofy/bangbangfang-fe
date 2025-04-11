
import React, { useState } from 'react';
function OperationStrategy() {
  const strategies = [
    { title: '营销策略', content: '加大社交媒体推广力度' },
    { title: '用户获取', content: '开展校园推广活动' },
    { title: '留存计划', content: '推出会员积分制度' },
    { title: '合作计划', content: '与家居品牌合作，提供租房优惠' }
  ];

  return (
    <div className="space-y-3">
      {strategies.map((strategy, index) => (
        <div key={index} className="flex">
          <span className="font-medium text-gray-800 mr-2">{strategy.title}:</span>
          <span className="text-gray-700">{strategy.content}</span>
        </div>
      ))}
    </div>
  );
}

export default OperationStrategy;

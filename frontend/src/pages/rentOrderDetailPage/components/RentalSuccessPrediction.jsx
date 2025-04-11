import React from 'react';

import { Card } from "@douyinfe/semi-ui";

const RentalSuccessPrediction = ({ successData }) => {
  const [_, rateData,...restSuccessDataList] = successData || []
  console.log({rateData, restSuccessDataList})
  return (
    <Card className="shadow-sm">
      <h2 className="text-xl font-bold mb-4">出租成功率预测</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-600 text-white p-6 rounded-md">
          <h3 className="text-lg font-medium mb-2">3天出租成功率</h3>
          <div className="text-5xl font-bold mb-3">{rateData.value.split('%')[0]}%</div>
          <p className="text-blue-100 text-sm">基于当前市场需求和房源特点的综合评估</p>
        </div>
        <div className="md:col-span-2 space-y-6">
          {restSuccessDataList.map(row => <div key={row.key}>
            <h3 className="text-lg font-medium mb-2">{row.key}</h3>
            <p className="text-gray-700">{row.value}</p>
          </div>)}
        </div>
      </div>
    </Card>
  );
};

export default RentalSuccessPrediction;

import React from 'react';

const SuccessNotification = () => {
  return (
    <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-md">
      <div className="flex">
        <div>
          <p className="text-green-700 font-medium">提交成功!</p>
          <p className="text-green-600">您的房屋信息已成功登记，以下是详细的分析报告。</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessNotification;

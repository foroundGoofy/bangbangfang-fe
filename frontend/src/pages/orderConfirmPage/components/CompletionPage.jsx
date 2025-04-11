
import React from "react";
import { Button } from "@douyinfe/semi-ui";

const CompletionPage = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="white">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold mb-2">交易完成</h3>
      <p className="text-gray-600 mb-6">
        恭喜您已成功租下 {property.name}，祝您入住愉快！
      </p>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">租期开始</span>
          <span className="font-medium">2023年10月01日</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">租期结束</span>
          <span className="font-medium">2024年10月01日</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">合同编号</span>
          <span className="font-medium">BF20231001-8765</span>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button 
          type="primary"
          style={{ borderRadius: '4px', padding: '0 24px' }}
        >
          查看合同
        </Button>
        <Button 
          style={{ borderRadius: '4px', padding: '0 24px' }}
          onClick={() => window.location.href = '/'}
        >
          返回首页
        </Button>
      </div>
    </div>
  );
};

export default CompletionPage;

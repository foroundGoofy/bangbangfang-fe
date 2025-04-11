
import React, { useState } from "react";
import { Button, Input } from "@douyinfe/semi-ui";
import dayjs from "dayjs";

const ContractPreviewModal = ({ property, contractData, onClose, onSign }) => {
  const [signature, setSignature] = useState("");
  
  // Generate a random contract number
  const contractNumber = `CT${dayjs().format('YYYYMMDDHHmmss')}`;
  
  // Format dates for display
  const startDateFormatted = contractData.startDate ? 
    dayjs(contractData.startDate).format('YYYY-MM-DD') : '';
  const endDateFormatted = contractData.endDate ? 
    dayjs(contractData.endDate).format('YYYY-MM-DD') : '';
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">租房合同预览</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">合同编号：</span>
              <span>{contractNumber}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">承租人：</span>
              <span>admin</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">租期：</span>
              <span>{startDateFormatted} 至 {endDateFormatted}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">月租金：</span>
              <span>¥{property.price}.0</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">押金：</span>
              <span>¥{property.deposit}.0</span>
            </div>
            
            <div className="pt-4">
              <div className="text-gray-600 mb-2">合同条款：</div>
              <ul className="list-disc pl-5 space-y-2">
                <li>租期内房屋维修由房东负责</li>
                <li>每月5号前支付下月房租</li>
                <li>租客需遵守小区物业管理规定</li>
                <li>合同期满自动终止</li>
              </ul>
            </div>
            
            <div className="pt-4">
              <div className="text-gray-600 mb-2">电子签名：</div>
              <Input 
                placeholder="请输入您的签名文字"
                value={signature}
                onChange={(value) => setSignature(value)}
              />
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-4">
            <Button onClick={onClose}>取消</Button>
            <Button 
              theme="solid" 
              type="primary" 
              disabled={!signature}
              onClick={onSign}
              style={{ 
                backgroundColor: '#10b981',
                borderRadius: '4px'
              }}
            >
              签署并提交合同
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractPreviewModal;

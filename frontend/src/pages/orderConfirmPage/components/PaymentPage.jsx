
import React from "react";
import { Button, Radio, Input } from "@douyinfe/semi-ui";

const PaymentPage = ({ property, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = React.useState("alipay");
  
  const handlePayment = () => {
    // In a real app, this would process payment
    onPaymentComplete();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-6">支付费用</h3>
      
      <div className="border-b pb-4 mb-4">
        <div className="flex justify-between mb-3">
          <span className="text-gray-600">月租金</span>
          <span className="font-medium">¥{property.price}</span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-gray-600">押金</span>
          <span className="font-medium">¥{property.deposit}</span>
        </div>
        <div className="flex justify-between mt-4">
          <span className="text-lg font-bold">总计</span>
          <span className="text-lg font-bold text-blue-600">¥{property.price + property.deposit}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium mb-3">选择支付方式</h4>
        <Radio.Group value={paymentMethod} onChange={value => setPaymentMethod(value)}>
          <div className="flex flex-col space-y-3">
            <Radio value="alipay">支付宝</Radio>
            <Radio value="wechat">微信支付</Radio>
            <Radio value="bank">银行卡支付</Radio>
          </div>
        </Radio.Group>
      </div>
      
      <Button 
        theme="solid" 
        type="primary" 
        size="large"
        onClick={handlePayment}
        style={{ 
          backgroundColor: '#3b82f6',
          borderRadius: '4px',
          padding: '0 24px',
          width: '100%'
        }}
      >
        确认支付
      </Button>
    </div>
  );
};

export default PaymentPage;

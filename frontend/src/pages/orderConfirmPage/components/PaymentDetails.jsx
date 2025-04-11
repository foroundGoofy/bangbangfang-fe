
import React, { useState } from "react";
import { Button, Input, Radio } from "@douyinfe/semi-ui";

const PaymentDetails = ({ property, onPaymentComplete }) => {
  const [couponCode, setCouponCode] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("wechat");
  
  const totalAmount = property.price + property.deposit;
  
  const availableCoupons = [
    { id: "NEWUSER2024", description: "新用户专享优惠", discount: 500 },
    { id: "SPRING2024", description: "春季特惠活动", discount: 300 }
  ];
  
  const handleCouponApply = (couponId) => {
    setSelectedCoupon(couponId);
  };
  
  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };
  
  const handlePaymentConfirm = () => {
    // This will trigger the parent component to hide this component
    // and show the completion page instead
    onPaymentComplete();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">支付详情</h2>
      
      {/* Coupon Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center mb-4">
          <Input 
            placeholder="请输入优惠码" 
            value={couponCode}
            onChange={(value) => setCouponCode(value)}
            style={{ flex: 1 }}
          />
          <Button 
            className="ml-2"
            style={{ 
              backgroundColor: '#4ade80',
              color: 'white',
              borderRadius: '4px'
            }}
          >
            使用
          </Button>
        </div>
        
        {availableCoupons.map((coupon) => (
          <div key={coupon.id} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg mb-2">
            <div>
              <div className="font-bold">{coupon.id}</div>
              <div className="text-sm text-gray-600">{coupon.description}</div>
            </div>
            <Button 
              type="primary"
              size="small"
              className={selectedCoupon === coupon.id ? "bg-gray-400" : ""}
              onClick={() => handleCouponApply(coupon.id)}
            >
              使用
            </Button>
          </div>
        ))}
      </div>
      
      {/* Cost Breakdown */}
      <div className="border-t border-b py-4">
        <h3 className="font-bold mb-4">费用明细</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">月租金</span>
            <span className="font-medium">¥{property.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">押金 (2个月)</span>
            <span className="font-medium">¥{property.deposit}</span>
          </div>
          <div className="flex justify-between pt-3 border-t">
            <span className="font-bold">总金额</span>
            <span className="font-bold">¥{totalAmount}</span>
          </div>
        </div>
      </div>
      
      {/* Payment Methods */}
      <div>
        <h3 className="font-bold mb-4">支付方式</h3>
        <Radio.Group value={paymentMethod} onChange={handlePaymentMethodChange}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`border rounded-lg p-4 flex items-center cursor-pointer ${paymentMethod === 'wechat' ? 'border-blue-500' : ''}`}>
              <Radio value="wechat" className="mr-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center mr-2">
                    <svg viewBox="0 0 1024 1024" width="24" height="24" fill="white">
                      <path d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6 5.5 3.9 9.1 10.3 9.1 17.6 0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7 6 0 9.3-4.9 8.2-10.8-.4-1.8-2.4-9.9-5.9-24.5-.3-1.2-.6-2.5-.6-3.8 0-4.1 2.3-7.9 5.5-10.4zm-220.9-126.7c-16.3 0-29.5-13.2-29.5-29.5s13.2-29.5 29.5-29.5 29.5 13.2 29.5 29.5-13.2 29.5-29.5 29.5zm147.4 0c-16.3 0-29.5-13.2-29.5-29.5s13.2-29.5 29.5-29.5 29.5 13.2 29.5 29.5-13.2 29.5-29.5 29.5z" />
                    </svg>
                  </div>
                  <span>微信支付</span>
                </div>
              </Radio>
            </div>
            
            <div className={`border rounded-lg p-4 flex items-center cursor-pointer ${paymentMethod === 'alipay' ? 'border-blue-500' : ''}`}>
              <Radio value="alipay" className="mr-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-700 rounded-md flex items-center justify-center mr-2">
                    <svg viewBox="0 0 1024 1024" width="24" height="24" fill="white">
                      <path d="M992 716.8v-3.2c-19.2-179.2-163.2-268.8-163.2-268.8v-3.2c-51.2-38.4-115.2-67.2-179.2-86.4 41.6-44.8 70.4-102.4 70.4-166.4 0-140.8-115.2-256-256-256s-256 115.2-256 256c0 64 25.6 121.6 67.2 166.4-64 19.2-124.8 48-176 86.4v3.2c0 0-144 89.6-163.2 268.8v3.2c-3.2 22.4-6.4 44.8-6.4 67.2 0 131.2 105.6 240 236.8 240h592c131.2 0 236.8-108.8 236.8-240 0-22.4-3.2-44.8-3.2-67.2z" />
                    </svg>
                  </div>
                  <span>支付宝</span>
                </div>
              </Radio>
            </div>
          </div>
        </Radio.Group>
      </div>
      
      {/* Confirm Button */}
      <div className="flex justify-center mt-8">
        <Button 
          theme="solid" 
          type="primary" 
          size="large"
          onClick={handlePaymentConfirm}
          style={{ 
            backgroundColor: '#3b82f6',
            borderRadius: '4px',
            padding: '0 32px',
            width: '100%',
            maxWidth: '400px'
          }}
        >
          确认支付
        </Button>
      </div>
    </div>
  );
};

export default PaymentDetails;

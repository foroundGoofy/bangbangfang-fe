import React, { useState } from 'react';
import { Button, Alert, Card } from 'antd';

export default function ContractPage({ property }) {
  const [isPaid, setIsPaid] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const mockContract = {
    id: 'BBF2023110001',
    period: '2023-11-01 至 2024-11-01',
    clauses: [
      '租户享有3天试住期，试住期间可无理由退租',
      '租金每月5000元，押一付三',
      '房屋日常维护由房东负责'
    ]
  };

  const handlePayment = () => {
    setIsPaid(true);
    setShowReward(true);
  };

  return (
    <Card>
      <Alert
        message="3天试住期"
        description="试住期间可领取试住奖励包，3天内免费换房、免费搬家"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <h3>电子租房合同（合同编号：{mockContract.id}）</h3>
      <p>租赁期限：{mockContract.period}</p>
      
      <div style={{ margin: '16px 0' }}>
        {mockContract.clauses.map((clause, index) => (
          <p key={index}>{index + 1}. {clause}</p>
        ))}
      </div>

      {!isPaid ? (
        <Button
          type="primary"
          block
          onClick={handlePayment}
          style={{ marginTop: 24 }}
        >
          确认并支付租金
        </Button>
      ) : (
        <Alert
          message="支付成功"
          description="感谢您完成支付"
          type="success"
          showIcon
        />
      )}

      {showReward && (
        <div style={{ marginTop: 24 }}>
          <Alert
            message="恭喜获得奖励"
            description="帮帮房奖励30元搬家券及新房欢迎礼包"
            type="success"
            showIcon
          />
          <Button
            type="primary"
            onClick={() => console.log('领取奖励')}
            style={{ marginTop: 16 }}
          >
            点击领取
          </Button>
        </div>
      )}
    </Card>
  );
}
import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';

export default function ManagementCenter() {
  const [reports] = useState([
    {
      key: '1',
      date: '2025-03-21',
      sales: { total: 158, amount: 2356000 },
      consultations: 482,
      feedbacks: 32,
      visits: 15800,
      competitors: ['安居客', '链家']
    },
    {
      key: '2',
      date: '2025-03-18',
      sales: { total: 142, amount: 2100000 },
      consultations: 432,
      feedbacks: 28,
      visits: 14200,
      competitors: ['贝壳', '我爱我家']
    }
  ]);

  const handleUpgrade = () => {
    Modal.confirm({
      title: '确认升级',
      content: '确认进行产品自升级和发布？',
      onOk() {
        fetch('/api/self-upgrade', { method: 'POST' })
          .then(res => res.json())
          .then(data => {
            Modal.success({ content: data.message });
          });
      }
    });
  };

  const columns = [
    { title: '报告日期', dataIndex: 'date' },
    { title: '成交套数', render: (_, r) => r.sales.total },
    { title: '咨询量', dataIndex: 'consultations' },
    { title: '操作', render: () => <Button type="primary" onClick={handleUpgrade}>一键自升级</Button> }
  ];

  return (
    <div className="management-center">
      <Table 
        columns={columns}
        dataSource={reports}
        expandedRowRender={record => (
          <div>
            <p>成交金额：{record.sales.amount}元</p>
            <p>用户反馈：{record.feedbacks}条</p>
            <p>访问量：{record.visits}次</p>
            <p>竞品分析：{record.competitors.join(', ')}</p>
          </div>
        )}
      />
    </div>
  );
}
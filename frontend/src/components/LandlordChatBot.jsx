import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Alert, List } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

const mockKnowledgeBase = {
  '可以养宠物吗': '不可以哦',
  '电子锁': '我还不知道这个问题的答案，我会与我的主人确认后第一时间告诉你'
};

export default function LandlordChatBot({ visible, onClose, propertyId }) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [unreadQuestions, setUnreadQuestions] = useState([]);

  const handleSend = async () => {
    if (!message) return;

    // 模拟API调用
    const response = mockKnowledgeBase[message] || 
      '我还不知道这个问题的答案，我会与我的主人确认后第一时间告诉你';

    // 记录未回答问题
    if (!mockKnowledgeBase[message]) {
      setUnreadQuestions(prev => [...prev, {
        id: Date.now(),
        question: message,
        timestamp: new Date().toISOString()
      }]);
    }

    setChatHistory(prev => [...prev, {
      type: 'user',
      content: message
    }, {
      type: 'bot',
      content: response
    }]);
    setMessage('');
  };

  return (
    <Modal
      title="房东数字人"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <div style={{ height: '400px', overflowY: 'auto', marginBottom: '16px' }}>
        <List
          dataSource={chatHistory}
          renderItem={item => (
            <div style={{ 
              textAlign: item.type === 'user' ? 'right' : 'left',
              margin: '8px 0'
            }}>
              <Alert
                message={item.content}
                type={item.type === 'user' ? 'info' : 'success'}
                showIcon
                icon={item.type === 'user' ? <MessageOutlined /> : null}
              />
            </div>
          )}
        />
      </div>
      
      <Input.Search
        placeholder="输入您的问题..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        onSearch={handleSend}
        enterButton={<Button type="primary">发送</Button>}
      />
    </Modal>
  );
}
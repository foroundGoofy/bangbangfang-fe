import React, { useEffect, useState } from 'react';
import { Progress, Alert, Tag } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import styles from './MatchingProgressModal.module.less';

export default function MatchingProgressModal({ visible, onClose, criteria }) {
  const [progress, setProgress] = useState(0);
  const [activeTags, setActiveTags] = useState([]);
  const [currentStage, setCurrentStage] = useState('');

  useEffect(() => {
    if (!visible) return;
    
    const ws = new WebSocket('ws://localhost:8080/ws/match');
    
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setProgress(data.progress);
      setCurrentStage(data.stage);
      
      if (data.keywords) {
        setActiveTags(prev => [
          ...data.keywords.map(text => ({
            id: Math.random(),
            text,
            style: {
              transform: `translateY(${Math.random() * 20 - 10}px)`
            }
          })),
          ...prev
        ].slice(0, 8));
      }
    };

    ws.onopen = () => {
      ws.send(JSON.stringify(criteria));
    };

    return () => ws.close();
  }, [visible]);

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.content}>
        <SmileOutlined className={styles.icon} />
        <h3>小房子正在努力为您找房</h3>
        <Alert
          message="匹配完成后将获得不看房里程分"
          type="info"
          showIcon
          className={styles.alert}
        />
        
        <Progress
          percent={progress}
          status="active"
          strokeColor={{ '0%': '#1890ff', '100%': '#52c41a' }}
          className={styles.progress}
        />
        
        <div className={styles.stage}>{currentStage}</div>
        
        <div className={styles.tagContainer}>
          {activeTags.map(tag => (
            <Tag
              key={tag.id}
              className={styles.animatedTag}
              style={tag.style}
            >
              {tag.text}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
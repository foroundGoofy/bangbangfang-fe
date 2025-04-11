import React from 'react';
import { Card } from 'antd';
import styles from './FeatureCard.module.less';

export default function FeatureCard({ icon, title, description }) {
  return (
    <Card
      hoverable
      className={styles.card}
      cover={<div className={styles.iconContainer}>{icon}</div>}
    >
      <Card.Meta
        title={<h3 className={styles.title}>{title}</h3>}
        description={<p className={styles.description}>{description}</p>}
      />
    </Card>
  );
}
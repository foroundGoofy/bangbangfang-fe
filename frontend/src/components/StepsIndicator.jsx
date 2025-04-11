import React from 'react';
import PropTypes from 'prop-types';
import styles from './StepsIndicator.module.less';

export default function StepsIndicator({ currentStep, steps, onChange }) {
  return (
    <div className={styles.container}>
      {steps.map((step, index) => (
        <div 
          key={step.id}
          className={`${styles.step} ${index <= currentStep ? styles.active : ''}`}
          onClick={() => index < currentStep && onChange(index)}
        >
          <div className={styles.circle}>{index + 1}</div>
          <div className={styles.label}>{step.title}</div>
          {index < steps.length - 1 && <div className={styles.connector} />}
        </div>
      ))}
    </div>
  );
}

StepsIndicator.propTypes = {
  currentStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string
  })).isRequired,
  onChange: PropTypes.func
};
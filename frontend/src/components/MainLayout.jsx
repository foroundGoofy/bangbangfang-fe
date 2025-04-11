import React from 'react';
import { COLORS } from '../constants/color';

const MainLayout = ({ children }) => (
  <div style={{
    minHeight: '100vh',
    backgroundColor: COLORS.BACKGROUND,
    padding: '24px'
  }}>
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      backgroundColor: 'white'
    }}>
      {children}
    </div>
  </div>
);

export default MainLayout;
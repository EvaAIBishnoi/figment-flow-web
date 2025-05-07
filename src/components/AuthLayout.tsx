
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'stretch' 
    }}>
      <div style={{ 
        backgroundColor: '#0a2e81',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/9/9d/KPMG_logo.svg" 
          alt="KPMG Logo" 
          style={{ height: '40px', filter: 'brightness(0) invert(1)' }} 
        />
      </div>

      <div style={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '20px' 
      }}>
        {children}
      </div>

      <div style={{ 
        textAlign: 'center', 
        padding: '20px', 
        fontSize: '14px', 
        color: '#718096' 
      }}>
        Copyright 2025 KPMG. All Rights Reserved
      </div>
    </div>
  );
};

export default AuthLayout;

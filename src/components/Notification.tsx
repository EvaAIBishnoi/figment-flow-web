
import React, { useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface NotificationProps {
  visible: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ visible, type, message, onClose }) => {
  // Auto hide notification after 5 seconds
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      backgroundColor: 'white',
      padding: '0',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 100,
      maxWidth: '400px',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '15px',
        backgroundColor: type === 'success' ? '#4CAF50' : '#f44336',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: '8px',
        borderBottomLeftRadius: '8px',
        height: '100%'
      }}>
        {type === 'success' ? (
          <CheckCircle2 size={20} color="white" />
        ) : (
          <X size={20} color="white" />
        )}
      </div>
      <div style={{ 
        flex: 1, 
        padding: '15px 10px',
        backgroundColor: 'white',
        color: '#333'
      }}>
        {message}
      </div>
      <button 
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#333',
          cursor: 'pointer',
          padding: '15px',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Notification;

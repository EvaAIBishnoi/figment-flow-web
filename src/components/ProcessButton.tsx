
import React from 'react';

interface ProcessButtonProps {
  onClick: () => void;
  disabled: boolean;
  isProcessing: boolean;
}

const ProcessButton: React.FC<ProcessButtonProps> = ({ onClick, disabled, isProcessing }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isProcessing}
      style={{
        padding: '0.75rem 2rem',
        backgroundColor: disabled || isProcessing ? '#a0aec0' : '#0a2e81',
        color: 'white',
        border: 'none',
        borderRadius: '0.25rem',
        cursor: disabled || isProcessing ? 'not-allowed' : 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'background-color 0.2s'
      }}
    >
      {isProcessing ? 'Processing...' : 'Process notification'}
    </button>
  );
};

export default ProcessButton;


import React from 'react';
import { Loader } from 'lucide-react';

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
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'background-color 0.2s'
      }}
    >
      {isProcessing && <Loader className="animate-spin" size={18} />}
      {isProcessing ? 'Processing...' : 'Process notification'}
    </button>
  );
};

export default ProcessButton;

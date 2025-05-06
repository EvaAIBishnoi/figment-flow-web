
import React from 'react';

interface DeleteConfirmationProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onCancel, onConfirm }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 50
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.375rem',
        padding: '1.5rem',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>Delete the file</h2>
        <p style={{ marginBottom: '1.5rem', color: '#4b5563' }}>
          File will be deleted permanently. This action cannot be undone. Are you sure you want to proceed?
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '0.25rem',
              border: '1px solid #0a2e81',
              backgroundColor: 'white',
              color: '#0a2e81',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            NO
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '0.25rem',
              border: 'none',
              backgroundColor: '#0a2e81',
              color: 'white',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            YES
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;


import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, Calendar } from 'lucide-react';
import { ProcessingResult } from '../types';

interface ProcessingResultsProps {
  result: ProcessingResult;
  onBack: () => void;
  onSave: () => void;
}

const ProcessingResults: React.FC<ProcessingResultsProps> = ({ result, onBack, onSave }) => {
  const [notificationType, setNotificationType] = useState<string>(result.notificationType);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState<boolean>(false);
  
  const notificationTypes = ['Audit request', 'Tax Request', 'General Notice'];

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
          padding: '0.5rem',
          backgroundColor: 'transparent',
          border: 'none',
          color: '#0a2e81',
          cursor: 'pointer',
          fontSize: '0.875rem'
        }}
      >
        <ChevronLeft size={16} />
        <span>Back</span>
      </button>

      <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Processing results</h2>
      <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        File name: {result.fileName}
      </p>

      <div style={{ 
        border: '1px solid #e2e8f0', 
        borderRadius: '0.375rem', 
        padding: '1.5rem',
        backgroundColor: 'white',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Classification</h3>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.875rem', marginRight: '0.5rem' }}>Type:</span>
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{result.classification.type}</span>
          <span style={{ fontSize: '0.875rem', marginLeft: '1rem', marginRight: '0.5rem' }}>Confidence:</span>
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{result.classification.confidence}</span>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            Notification type (Correct as per requirement)
          </label>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              <span>{notificationType}</span>
              <ChevronDown size={16} />
            </button>

            {isTypeDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                width: '100%',
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                marginTop: '0.25rem',
                zIndex: 10,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                {notificationTypes.map((type) => (
                  <div
                    key={type}
                    onClick={() => {
                      setNotificationType(type);
                      setIsTypeDropdownOpen(false);
                    }}
                    style={{
                      padding: '0.75rem 1rem',
                      cursor: 'pointer',
                      backgroundColor: type === notificationType ? '#f7fafc' : 'transparent',
                      fontSize: '0.875rem'
                    }}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ 
        border: '1px solid #e2e8f0', 
        borderRadius: '0.375rem', 
        padding: '1.5rem',
        backgroundColor: 'white',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Extracted entities</h3>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <div>
            <label htmlFor="taxId" style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Tax ID <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="taxId"
              type="text"
              defaultValue={result.extractedEntities.taxId}
              placeholder="Enter Tax ID"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
            />
          </div>

          <div>
            <label htmlFor="amount" style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Amount <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="amount"
              type="text"
              defaultValue={result.extractedEntities.amount}
              placeholder="Enter amount"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
            />
          </div>
        </div>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem'
        }}>
          <div>
            <label htmlFor="date" style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Date <span style={{ color: 'red' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="date"
                type="text"
                defaultValue={result.extractedEntities.date}
                placeholder="Select date"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  paddingRight: '2.5rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
              />
              <span style={{ 
                position: 'absolute',
                top: '50%',
                right: '1rem',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}>
                <Calendar size={16} />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="reference" style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Reference ID <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="reference"
              type="text"
              defaultValue={result.extractedEntities.reference}
              placeholder="Enter reference ID"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ 
        border: '1px solid #e2e8f0', 
        borderRadius: '0.375rem', 
        padding: '1.5rem',
        backgroundColor: 'white',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Generated response</h3>
        <div>
          <textarea
            defaultValue={`Subject: ${result.generatedResponse.subject}

${result.generatedResponse.body}

Tax ID: 12345
Reference: XYZ`}
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '1rem',
              border: '1px solid #e2e8f0',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              lineHeight: 1.5,
              resize: 'vertical'
            }}
          />
        </div>
      </div>

      <div>
        <button
          onClick={onSave}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#0a2e81',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          Save and Process
        </button>
      </div>
    </div>
  );
};

export default ProcessingResults;


import React, { useState, useEffect } from 'react';
import { ChevronLeft, Calendar as CalendarIcon, X } from 'lucide-react';
import { ProcessingResult } from '../types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import { Checkbox } from './ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';

interface ProcessingResultsProps {
  result: ProcessingResult;
  onBack: () => void;
  onSave: () => void;
}

const ProcessingResults: React.FC<ProcessingResultsProps> = ({ result, onBack, onSave }) => {
  const [notificationType, setNotificationType] = useState<string>(result.notificationType);
  const [taxId, setTaxId] = useState<string>(result.extractedEntities.taxId);
  const [amount, setAmount] = useState<string>(result.extractedEntities.amount);
  const [date, setDate] = useState<string>(result.extractedEntities.date);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    date ? new Date(date) : undefined
  );
  const [reference, setReference] = useState<string>(result.extractedEntities.reference);
  const [formValid, setFormValid] = useState<boolean>(false);
  
  // Response choices
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const responseChoices = ['Acknowledgement', 'Detailed response'];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const notificationTypes = ['Audit request', 'Tax Request', 'General Notice'];

  // Format amount to include $ and parentheses
  const formatAmount = (value: string): string => {
    // Remove any non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    if (numericValue === '') return '';
    return `(${numericValue})`;
  };

  // Handle amount input changes
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(rawValue);
  };

  // Handle date selection
  const handleDateSelect = (selected: Date | undefined) => {
    setSelectedDate(selected);
    if (selected) {
      setDate(format(selected, 'yyyy-MM-dd'));
    }
  };

  // Handle response choice selection
  const toggleResponseChoice = (choice: string) => {
    setSelectedChoices(prev => {
      if (prev.includes(choice)) {
        return prev.filter(item => item !== choice);
      } else {
        return [...prev, choice];
      }
    });
  };

  // Remove a selected choice
  const removeChoice = (choice: string) => {
    setSelectedChoices(prev => prev.filter(item => item !== choice));
  };

  // Check if all required fields are filled
  useEffect(() => {
    setFormValid(
      taxId.trim() !== '' && 
      amount.trim() !== '' && 
      date.trim() !== '' && 
      reference.trim() !== ''
    );
  }, [taxId, amount, date, reference]);

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
          <div style={{ maxWidth: '100%' }}>
            <Select 
              defaultValue={notificationType} 
              onValueChange={setNotificationType}
            >
              <SelectTrigger className="w-full h-[45px] px-3 text-sm">
                <SelectValue placeholder="Select notification type" />
              </SelectTrigger>
              <SelectContent>
                {notificationTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              value={taxId}
              onChange={(e) => setTaxId(e.target.value)}
              placeholder="Enter Tax ID"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                height: '45px'
              }}
            />
          </div>

          <div>
            <label htmlFor="amount" style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Amount ($) <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="amount"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                height: '45px'
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
            <Popover>
              <PopoverTrigger asChild>
                <div style={{ position: 'relative' }}>
                  <input
                    id="date"
                    type="text"
                    value={selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''}
                    readOnly
                    placeholder="Select date"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      paddingRight: '2.5rem',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      height: '45px',
                      cursor: 'pointer',
                      backgroundColor: 'white'
                    }}
                  />
                  <span style={{ 
                    position: 'absolute',
                    top: '50%',
                    right: '1rem',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none'
                  }}>
                    <CalendarIcon size={16} />
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                  className={cn("p-3 pointer-events-auto z-50")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label htmlFor="reference" style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Reference ID <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="reference"
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Enter reference ID"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                height: '45px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Response choices section */}
      <div style={{ 
        border: '1px solid #e2e8f0', 
        borderRadius: '0.375rem', 
        padding: '1.5rem',
        backgroundColor: 'white',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Response choices</h3>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            Response choices <span style={{ color: 'red' }}>*</span>
          </label>
          
          {/* Custom multi-select dropdown */}
          <div style={{ position: 'relative' }}>
            <div 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                minHeight: '45px',
                cursor: 'pointer',
                backgroundColor: 'white',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {selectedChoices.length > 0 ? (
                selectedChoices.map(choice => (
                  <div 
                    key={choice}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      backgroundColor: '#f1f5f9',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem'
                    }}
                  >
                    {choice}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeChoice(choice);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '0',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))
              ) : (
                <span style={{ color: '#94a3b8' }}>Select response</span>
              )}
            </div>
            
            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 5px)',
                  left: 0,
                  width: '100%',
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.375rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  zIndex: 50
                }}
              >
                {responseChoices.map(choice => (
                  <div 
                    key={choice}
                    onClick={() => toggleResponseChoice(choice)}
                    style={{
                      padding: '0.75rem 1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <div 
                      style={{
                        width: '16px',
                        height: '16px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '2px',
                        backgroundColor: selectedChoices.includes(choice) ? '#1e40af' : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      {selectedChoices.includes(choice) && <span style={{ fontSize: '10px' }}>✓</span>}
                    </div>
                    <span>{choice}</span>
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
        <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Generated response</h3>
        <div>
          <textarea
            defaultValue={`Subject: ${result.generatedResponse.subject}

${result.generatedResponse.body}

Tax ID: ${taxId || '12345'}
Reference: ${reference || 'XYZ'}`}
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
          disabled={!formValid}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: formValid ? '#0a2e81' : '#a0aec0',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: formValid ? 'pointer' : 'not-allowed',
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

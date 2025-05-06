
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { FileType } from '../types';

interface FileTypeSelectorProps {
  selectedType: FileType;
  onChange: (type: FileType) => void;
}

const FileTypeSelector: React.FC<FileTypeSelectorProps> = ({ selectedType, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const fileTypes: FileType[] = ['Document', 'Email (text)'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="kpmg-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '10px 16px',
          backgroundColor: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        <span>{selectedType}</span>
        <ChevronDown size={18} />
      </button>

      {isOpen && (
        <div className="kpmg-dropdown-options">
          {fileTypes.map((type) => (
            <div
              key={type}
              className="kpmg-dropdown-option"
              onClick={() => {
                onChange(type);
                setIsOpen(false);
              }}
              style={{
                backgroundColor: type === selectedType ? '#f7fafc' : 'transparent'
              }}
            >
              {type}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileTypeSelector;

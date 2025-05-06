
import React, { useCallback, useState, useRef } from 'react';
import { X } from 'lucide-react';
import { UploadedFile } from '../types';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  uploadedFile: UploadedFile | null;
  onRemoveFile: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, uploadedFile, onRemoveFile }) => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onFileUpload(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';  // Reset the input
      }
    }
  }, [onFileUpload]);

  const handleBrowseClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const getUploadStatusColor = () => {
    if (!uploadedFile) return '';
    
    switch(uploadedFile.status) {
      case 'error':
        return '#f44336';  // Error red
      case 'complete':
        return '#4CAF50';  // Success green
      default:
        return '#1a47ad';  // KPMG blue for uploading/processing
    }
  };

  const renderUploadContent = () => {
    if (!uploadedFile) {
      return (
        <>
          <p style={{ marginBottom: '1rem', fontSize: '1rem', color: '#4b5563' }}>
            Drag and drop or Upload
          </p>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            File supported: PDF | File size: 200mb
          </p>
          <button
            onClick={handleBrowseClick}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 2rem',
              backgroundColor: '#0a2e81',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Browse
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept=".pdf"
          />
        </>
      );
    }

    return (
      <div style={{ width: '100%' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between', 
          marginBottom: '1rem',
          width: '100%'
        }}>
          <span style={{ fontSize: '0.875rem' }}>
            {uploadedFile.name}
            {uploadedFile.size && ` (${(uploadedFile.size / 1024).toFixed(1)}KB)`}
          </span>
          <button
            onClick={onRemoveFile}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '5px'
            }}
          >
            <X size={16} color="#4b5563" />
          </button>
        </div>

        <div className="kpmg-progress-bar">
          <div
            style={{
              width: `${uploadedFile.progress}%`,
              backgroundColor: getUploadStatusColor()
            }}
          />
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '0.5rem',
          fontSize: '0.75rem',
          color: uploadedFile.status === 'error' ? '#f44336' : '#4b5563'
        }}>
          <span>
            {uploadedFile.status === 'error' 
              ? 'Upload failed. Please upload a new file and try again' 
              : `${uploadedFile.progress}% complete`
            }
          </span>
          {uploadedFile.status === 'error' && (
            <button
              onClick={handleBrowseClick}
              style={{
                padding: '0.25rem 1rem',
                backgroundColor: '#0a2e81',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: '500'
              }}
            >
              Browse
            </button>
          )}
        </div>
        
        {uploadedFile.status === 'uploaded' && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button
              onClick={handleBrowseClick}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#0a2e81',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              Upload
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`kpmg-file-upload ${isDragActive ? 'drag-active' : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {renderUploadContent()}
    </div>
  );
};

export default FileUpload;

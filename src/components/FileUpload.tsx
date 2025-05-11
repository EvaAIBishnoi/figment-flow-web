import React, { useCallback, useState, useRef } from 'react';
import { X, Upload, AlertTriangle } from 'lucide-react';
import { UploadedFile } from '../types';
import { Progress } from './ui/progress';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  uploadedFile: UploadedFile | null;
  onRemoveFile: () => void;
  onUploadStart: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileUpload, 
  uploadedFile, 
  onRemoveFile,
  onUploadStart 
}) => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [networkError, setNetworkError] = useState<boolean>(false);
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
      setSelectedFile(file);
      setNetworkError(false);
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setNetworkError(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';  // Reset the input
      }
    }
  }, []);

  const handleBrowseClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleUploadClick = useCallback(() => {
    if (selectedFile) {
      onUploadStart();
      // Simulate a potential network error (10% chance)
      if (Math.random() < 0.1) {
        setTimeout(() => {
          setNetworkError(true);
        }, 1000);
        return;
      }
      onFileUpload(selectedFile);
      setSelectedFile(null);
    }
  }, [selectedFile, onFileUpload, onUploadStart]);

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
    // Show error message if network error
    if (networkError) {
      return (
        <div style={{ textAlign: 'center', color: '#f44336' }}>
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
            <AlertTriangle size={40} color="#f44336" />
          </div>
          <p style={{ marginBottom: '1rem', fontSize: '1rem', color: '#f44336', fontWeight: '500' }}>
            Network error occurred
          </p>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
            Please check your connection and try again
          </p>
          <button
            onClick={() => setNetworkError(false)}
            style={{
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
            Try Again
          </button>
        </div>
      );
    }

    // Step 1: Show browse button when no file is selected or uploaded
    if (!selectedFile && !uploadedFile) {
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

    // Step 2: Show upload button when file is selected but not yet uploaded
    if (selectedFile && !uploadedFile) {
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
              {selectedFile.name}
              {selectedFile.size && ` (${(selectedFile.size / 1024).toFixed(1)}KB)`}
            </span>
            <button
              onClick={() => setSelectedFile(null)}
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
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button
              onClick={handleUploadClick}
              style={{
                padding: '0.5rem 2rem',
                backgroundColor: '#0a2e81',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500'
              }}
            >
              <Upload size={18} />
              Upload
            </button>
          </div>
        </div>
      );
    }

    // Step 3: Show progress/status when file is being uploaded or processed
    if (uploadedFile) {
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

          <Progress 
            value={uploadedFile.progress} 
            className="h-2 w-full"
            style={{ backgroundColor: '#e2e8f0' }}
          />
          
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
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`kpmg-file-upload ${isDragActive ? 'drag-active' : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        border: '2px dashed #e2e8f0',
        borderRadius: '0.5rem',
        padding: '2rem',
        textAlign: 'center',
        transition: 'all 0.2s ease',
        backgroundColor: isDragActive ? '#f8fafc' : 'white',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {renderUploadContent()}
    </div>
  );
};

export default FileUpload;

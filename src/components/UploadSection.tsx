
import React from 'react';
import FileTypeSelector from './FileTypeSelector';
import FileUpload from './FileUpload';
import ProcessButton from './ProcessButton';
import { FileType, UploadedFile } from '../types';

interface UploadSectionProps {
  selectedFileType: FileType;
  setSelectedFileType: (type: FileType) => void;
  uploadedFile: UploadedFile | null;
  handleFileUpload: (file: File) => void;
  handleRemoveFile: () => void;
  handleProcessNotification: () => void;
  isProcessing: boolean;
  isProcessButtonDisabled: boolean;
  handleUploadStart: () => void;
  uploadStarted: boolean;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  selectedFileType,
  setSelectedFileType,
  uploadedFile,
  handleFileUpload,
  handleRemoveFile,
  handleProcessNotification,
  isProcessing,
  isProcessButtonDisabled,
  handleUploadStart,
  uploadStarted
}) => {
  return (
    <>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Select file type</label>
        <div style={{ maxWidth: '400px' }}>
          <FileTypeSelector 
            selectedType={selectedFileType} 
            onChange={setSelectedFileType} 
          />
        </div>
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <FileUpload 
          onFileUpload={handleFileUpload}
          uploadedFile={uploadedFile}
          onRemoveFile={handleRemoveFile}
          onUploadStart={handleUploadStart}
        />
      </div>
      
      <div>
        <ProcessButton 
          onClick={handleProcessNotification} 
          disabled={isProcessButtonDisabled} 
          isProcessing={isProcessing}
        />
      </div>
    </>
  );
};

export default UploadSection;

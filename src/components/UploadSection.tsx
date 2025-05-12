
import React, { useState, useEffect } from 'react';
import FileTypeSelector from './FileTypeSelector';
import FileUpload from './FileUpload';
import ProcessButton from './ProcessButton';
import ApiKeyInput from './ApiKeyInput';
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
  const [apiKey, setApiKey] = useState<string>('');
  
  // Load API key from localStorage on component mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('mistral-api-key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleApiKeySet = (key: string) => {
    setApiKey(key);
  };

  return (
    <>
      <ApiKeyInput onApiKeySet={handleApiKeySet} />
      
      <div className="mb-6">
        <label className="block mb-2">Select file type</label>
        <div className="max-w-md">
          <FileTypeSelector 
            selectedType={selectedFileType} 
            onChange={setSelectedFileType} 
          />
        </div>
      </div>
      
      <div className="mb-6">
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
          disabled={isProcessButtonDisabled || !apiKey} 
          isProcessing={isProcessing}
        />
        {!apiKey && uploadedFile && (
          <p className="text-sm text-amber-600 mt-2">
            Please set your Mistral API key before processing the document.
          </p>
        )}
      </div>
    </>
  );
};

export default UploadSection;

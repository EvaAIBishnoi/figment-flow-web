
import React from 'react';
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
  apiKey?: string;
  handleApiKeySet?: (key: string) => void;
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
  uploadStarted,
  apiKey,
  handleApiKeySet
}) => {
  return (
    <>
      {handleApiKeySet && (
        <ApiKeyInput 
          onApiKeySet={handleApiKeySet}
          label="Mistral API Key" 
          placeholder="Enter your Mistral API key"
        />
      )}
      
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
          disabled={isProcessButtonDisabled} 
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

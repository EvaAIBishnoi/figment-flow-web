
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import DeleteConfirmation from './DeleteConfirmation';
import ProcessingResults from './ProcessingResults';
import UploadSection from './UploadSection';
import Notification from './Notification';
import { FileType, UploadedFile, ProcessingResult } from '../types';

interface UploadProcessContainerProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  selectedFileType: FileType;
  setSelectedFileType: (type: FileType) => void;
  uploadedFile: UploadedFile | null;
  handleFileUpload: (file: File) => void;
  handleRemoveFile: () => void;
  handleProcessNotification: () => void;
  isProcessing: boolean;
  processingResult: ProcessingResult | null;
  isProcessButtonDisabled: boolean;
  handleUploadStart: () => void;
  uploadStarted: boolean;
  handleBack: () => void;
  handleSave: () => void;
  notificationVisible: boolean;
  notificationType: 'success' | 'error';
  notificationMessage: string;
  setNotificationVisible: (visible: boolean) => void;
  showDeleteConfirmation: boolean;
  handleDeleteCancel: () => void;
  handleDeleteConfirm: () => void;
  apiKey?: string;
  handleApiKeySet?: (key: string) => void;
}

const UploadProcessContainer: React.FC<UploadProcessContainerProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  selectedFileType,
  setSelectedFileType,
  uploadedFile,
  handleFileUpload,
  handleRemoveFile,
  handleProcessNotification,
  isProcessing,
  processingResult,
  isProcessButtonDisabled,
  handleUploadStart,
  uploadStarted,
  handleBack,
  handleSave,
  notificationVisible,
  notificationType,
  notificationMessage,
  setNotificationVisible,
  showDeleteConfirmation,
  handleDeleteCancel,
  handleDeleteConfirm,
  apiKey,
  handleApiKeySet
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1 relative">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        
        <main className={`flex-1 p-8 bg-[#f8f9fa] transition-all duration-300 ${isSidebarOpen ? 'ml-[240px]' : 'ml-0'}`}>
          <Notification 
            visible={notificationVisible} 
            type={notificationType} 
            message={notificationMessage} 
            onClose={() => setNotificationVisible(false)} 
          />

          <h1 className="text-2xl font-semibold mb-6">Upload and Process</h1>
          
          {processingResult ? (
            <ProcessingResults 
              result={processingResult} 
              onBack={handleBack} 
              onSave={handleSave} 
            />
          ) : (
            <UploadSection
              selectedFileType={selectedFileType}
              setSelectedFileType={setSelectedFileType}
              uploadedFile={uploadedFile}
              handleFileUpload={handleFileUpload}
              handleRemoveFile={handleRemoveFile}
              handleProcessNotification={handleProcessNotification}
              isProcessing={isProcessing}
              isProcessButtonDisabled={isProcessButtonDisabled}
              handleUploadStart={handleUploadStart}
              uploadStarted={uploadStarted}
              apiKey={apiKey}
              handleApiKeySet={handleApiKeySet}
            />
          )}
        </main>
      </div>
      
      <footer className={`py-4 px-6 text-center border-t border-[#e2e8f0] text-sm text-[#718096] bg-white transition-all duration-300 ${isSidebarOpen ? 'ml-[240px]' : 'ml-0'}`}>
        Copyright 2025 KPMG. All Rights Reserved
      </footer>
      
      {showDeleteConfirmation && (
        <DeleteConfirmation 
          onCancel={handleDeleteCancel} 
          onConfirm={handleDeleteConfirm} 
        />
      )}
    </div>
  );
};

export default UploadProcessContainer;

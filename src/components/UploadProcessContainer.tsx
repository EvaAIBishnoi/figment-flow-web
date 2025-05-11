
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
  handleDeleteConfirm
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar isSidebarOpen={isSidebarOpen} />
        
        <main style={{ 
          flex: 1, 
          padding: '30px', 
          backgroundColor: '#f8f9fa',
          position: 'relative'
        }}>
          <Notification 
            visible={notificationVisible} 
            type={notificationType} 
            message={notificationMessage} 
            onClose={() => setNotificationVisible(false)} 
          />

          <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Upload and Process</h1>
          
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
            />
          )}
        </main>
      </div>
      
      <footer style={{ 
        padding: '15px', 
        textAlign: 'center', 
        borderTop: '1px solid #e2e8f0',
        fontSize: '0.875rem',
        color: '#718096',
        backgroundColor: 'white'
      }}>
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

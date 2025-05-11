
import React from 'react';
import { FileType, ProcessingResult } from '../types';
import Header from './Header';
import Sidebar from './Sidebar';
import DeleteConfirmation from './DeleteConfirmation';
import ProcessingResults from './ProcessingResults';
import UploadSection from './UploadSection';
import Notification from './Notification';

interface UploadProcessContainerProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedFileType: FileType;
  setSelectedFileType: (type: FileType) => void;
  showProcessingResults: boolean;
  processingResult: ProcessingResult | null;
  showDeleteConfirmation: boolean;
  uploadProps: any;
  notificationProps: {
    visible: boolean;
    type: 'success' | 'error';
    message: string;
    onClose: () => void;
  };
  handleProcessing: {
    onBack: () => void;
    onSave: () => void;
  };
  handleDelete: {
    onCancel: () => void;
    onConfirm: () => void;
  };
}

const UploadProcessContainer: React.FC<UploadProcessContainerProps> = ({
  isSidebarOpen,
  toggleSidebar,
  selectedFileType,
  setSelectedFileType,
  showProcessingResults,
  processingResult,
  showDeleteConfirmation,
  uploadProps,
  notificationProps,
  handleProcessing,
  handleDelete
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onToggleSidebar={toggleSidebar} />
      
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar isSidebarOpen={isSidebarOpen} />
        
        <main style={{ 
          flex: 1, 
          padding: '30px', 
          backgroundColor: '#f8f9fa',
          position: 'relative'
        }}>
          <Notification 
            visible={notificationProps.visible} 
            type={notificationProps.type} 
            message={notificationProps.message} 
            onClose={notificationProps.onClose} 
          />

          <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Upload and Process</h1>
          
          {showProcessingResults ? (
            <ProcessingResults 
              result={processingResult!} 
              onBack={handleProcessing.onBack} 
              onSave={handleProcessing.onSave} 
            />
          ) : (
            <UploadSection
              selectedFileType={selectedFileType}
              setSelectedFileType={setSelectedFileType}
              uploadedFile={uploadProps.uploadedFile}
              handleFileUpload={uploadProps.handleFileUpload}
              handleRemoveFile={uploadProps.handleRemoveFile}
              handleProcessNotification={uploadProps.handleProcessNotification}
              isProcessing={uploadProps.isProcessing}
              isProcessButtonDisabled={uploadProps.isProcessButtonDisabled}
              handleUploadStart={uploadProps.handleUploadStart}
              uploadStarted={uploadProps.uploadStarted}
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
          onCancel={handleDelete.onCancel} 
          onConfirm={handleDelete.onConfirm} 
        />
      )}
    </div>
  );
};

export default UploadProcessContainer;

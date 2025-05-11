
import React, { useState } from 'react';
import { FileType } from '../types';
import { useFileUpload } from '../hooks/useFileUpload';
import UploadProcessContainer from '../components/UploadProcessContainer';

const UploadProcess: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [selectedFileType, setSelectedFileType] = useState<FileType>('Document');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  
  const {
    uploadedFile,
    isProcessing,
    processingResult,
    uploadStarted,
    notificationVisible,
    notificationType,
    notificationMessage,
    isProcessButtonDisabled,
    handleFileUpload,
    handleUploadStart,
    handleRemoveFile,
    handleDeleteConfirm,
    handleProcessFile,
    handleBack,
    handleSave,
    setNotificationVisible
  } = useFileUpload();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onRemoveFileRequest = () => {
    setShowDeleteConfirmation(true);
  };

  const onDeleteConfirm = () => {
    handleDeleteConfirm();
    setShowDeleteConfirmation(false);
  };

  const onDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <UploadProcessContainer
      isSidebarOpen={isSidebarOpen}
      toggleSidebar={toggleSidebar}
      selectedFileType={selectedFileType}
      setSelectedFileType={setSelectedFileType}
      showProcessingResults={!!processingResult}
      processingResult={processingResult}
      showDeleteConfirmation={showDeleteConfirmation}
      uploadProps={{
        uploadedFile,
        isProcessing,
        isProcessButtonDisabled,
        uploadStarted,
        handleFileUpload,
        handleRemoveFile: onRemoveFileRequest,
        handleProcessNotification: handleProcessFile,
        handleUploadStart
      }}
      notificationProps={{
        visible: notificationVisible,
        type: notificationType,
        message: notificationMessage,
        onClose: () => setNotificationVisible(false)
      }}
      handleProcessing={{
        onBack: handleBack,
        onSave: handleSave
      }}
      handleDelete={{
        onCancel: onDeleteCancel,
        onConfirm: onDeleteConfirm
      }}
    />
  );
};

export default UploadProcess;

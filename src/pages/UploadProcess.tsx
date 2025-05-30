
import React, { useState } from 'react';
import { useFileUploadProcessWithMistral } from '../hooks/useFileUploadProcessWithMistral';
import UploadProcessContainer from '../components/UploadProcessContainer';

const UploadProcess: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  
  const {
    selectedFileType,
    setSelectedFileType,
    uploadedFile,
    handleFileUpload,
    handleRemoveFile: onRemoveRequested,
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
    apiKey,
    handleApiKeySet
  } = useFileUploadProcessWithMistral();

  const handleDeleteConfirm = () => {
    handleRemoveFile();
    setShowDeleteConfirmation(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const handleRemoveFile = () => {
    onRemoveRequested();
    setShowDeleteConfirmation(false);
  };

  return (
    <UploadProcessContainer
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      selectedFileType={selectedFileType}
      setSelectedFileType={setSelectedFileType}
      uploadedFile={uploadedFile}
      handleFileUpload={handleFileUpload}
      handleRemoveFile={() => setShowDeleteConfirmation(true)}
      handleProcessNotification={handleProcessNotification}
      isProcessing={isProcessing}
      processingResult={processingResult}
      isProcessButtonDisabled={isProcessButtonDisabled}
      handleUploadStart={handleUploadStart}
      uploadStarted={uploadStarted}
      handleBack={handleBack}
      handleSave={handleSave}
      notificationVisible={notificationVisible}
      notificationType={notificationType}
      notificationMessage={notificationMessage}
      setNotificationVisible={setNotificationVisible}
      showDeleteConfirmation={showDeleteConfirmation}
      handleDeleteCancel={handleDeleteCancel}
      handleDeleteConfirm={handleDeleteConfirm}
      apiKey={apiKey}
      handleApiKeySet={handleApiKeySet}
    />
  );
};

export default UploadProcess;

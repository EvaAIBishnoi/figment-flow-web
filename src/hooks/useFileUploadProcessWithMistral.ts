
import { useState } from 'react';
import { FileType, UploadedFile, ProcessingResult } from '../types';
import MistralService from '../services/MistralService';

// Create a mock file ID generator
const generateFileId = () => `file-${Math.random().toString(36).substring(2, 15)}`;

export const useFileUploadProcessWithMistral = () => {
  const [selectedFileType, setSelectedFileType] = useState<FileType>('Document');
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);
  const [uploadStarted, setUploadStarted] = useState<boolean>(false);
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false);
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  
  // In a real application, this API key should come from environment variables or user input
  // For demo purposes, we're using a placeholder
  const mistralService = new MistralService('your-api-key-here');

  const handleFileUpload = (file: File) => {
    // Create a file object
    const newFile: UploadedFile = {
      id: generateFileId(),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'uploading'
    };

    // Set the uploaded file
    setUploadedFile(newFile);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadedFile((prev) => {
        if (!prev) return null;
        
        const newProgress = Math.min(prev.progress + 10, 100);
        const newStatus = newProgress === 100 ? 'uploaded' : 'uploading';
        
        return {
          ...prev,
          progress: newProgress,
          status: newStatus
        };
      });
    }, 300);

    // Clear interval once upload is complete
    setTimeout(() => {
      clearInterval(interval);
      showNotification('success', 'File uploaded successfully');
    }, 3000);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadStarted(false);
  };

  const handleProcessNotification = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    
    try {
      // Get the file object from the uploadedFile state
      // In a real implementation, you'd have the actual File object stored somewhere
      // For demo purposes, we're creating a mock File
      const mockFileContent = new Blob(['Mock PDF content'], { type: 'application/pdf' });
      const mockFile = new File([mockFileContent], uploadedFile.name, { type: 'application/pdf' });
      
      // Process the document with Mistral
      const result = await mistralService.processDocument(mockFile);
      
      setProcessingResult(result);
      showNotification('success', 'Document processed successfully');
    } catch (error) {
      console.error('Error processing document:', error);
      showNotification('error', 'Failed to process document');
    } finally {
      setIsProcessing(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setNotificationVisible(true);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
      setNotificationVisible(false);
    }, 5000);
  };

  const handleUploadStart = () => {
    setUploadStarted(true);
  };

  const handleBack = () => {
    setProcessingResult(null);
  };

  const handleSave = () => {
    showNotification('success', 'Results saved successfully');
    setProcessingResult(null);
  };

  return {
    selectedFileType,
    setSelectedFileType,
    uploadedFile,
    handleFileUpload,
    handleRemoveFile,
    handleProcessNotification,
    isProcessing,
    processingResult,
    isProcessButtonDisabled: !uploadedFile || uploadedFile.status !== 'uploaded',
    handleUploadStart,
    uploadStarted,
    handleBack,
    handleSave,
    notificationVisible,
    notificationType,
    notificationMessage,
    setNotificationVisible
  };
};

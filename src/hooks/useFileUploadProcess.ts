
import { useState } from 'react';
import { toast } from 'sonner';
import { FileType, UploadedFile, ProcessingResult } from '../types';

export const useFileUploadProcess = () => {
  const [selectedFileType, setSelectedFileType] = useState<FileType>('Document');
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false);
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const [uploadStarted, setUploadStarted] = useState<boolean>(false);

  // Simulate file selection
  const handleFileUpload = (file: File) => {
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'uploading'
    };
    
    setUploadedFile(newFile);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      
      // Simulate an error (10% chance) when progress is at 50%
      if (progress === 50 && Math.random() < 0.1) {
        clearInterval(interval);
        setUploadedFile(prev => prev ? { 
          ...prev, 
          progress: 50, 
          status: 'error',
          errorMessage: 'Files could not be uploaded due to an error'
        } : null);
        setNotificationType('error');
        setNotificationMessage('Files could not be uploaded due to an error');
        setNotificationVisible(true);
        toast.error("Files could not be uploaded due to an error");
        setUploadStarted(false);
        return;
      }
      
      if (progress <= 100) {
        setUploadedFile(prev => {
          if (!prev) return null;
          
          const newStatus = progress === 100 ? 'uploaded' : 'uploading';
          
          return {
            ...prev,
            progress,
            status: newStatus
          };
        });
      } else {
        clearInterval(interval);
        setUploadStarted(false);
        
        // Show success notification when upload completes
        if (uploadedFile && uploadedFile.status !== 'error') {
          setNotificationType('success');
          setNotificationMessage('PDF uploaded successfully');
          setNotificationVisible(true);
          toast.success("PDF uploaded successfully");
        }
      }
    }, 300);
    
    // Cleanup interval after max time
    setTimeout(() => {
      clearInterval(interval);
      setUploadStarted(false);
    }, 3500);
  };

  const handleUploadStart = () => {
    setUploadStarted(true);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleProcessNotification = () => {
    if (!uploadedFile || uploadedFile.status !== 'uploaded') return;
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      // Simulate success or error (90% success rate)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        setUploadedFile(prev => prev ? { ...prev, status: 'complete' } : null);
        setNotificationType('success');
        setNotificationMessage('PDF processed successfully');
        setNotificationVisible(true);
        
        // Show the processing results after a delay
        setTimeout(() => {
          setProcessingResult({
            fileName: uploadedFile.name,
            classification: {
              type: 'Request type',
              confidence: '40%'
            },
            notificationType: 'Audit request',
            extractedEntities: {
              taxId: '',
              amount: '',
              date: '',
              reference: ''
            },
            generatedResponse: {
              subject: 'Response to Audit Request',
              body: `Dear Tax Authority,

I acknowledge receipt of your audit request with reference dated.

I am gathering the requested documents and information and will provide them by the specified deadline. If I need any clarification or additional time, I will contact your office promptly.

Tax ID: 12345
Reference: XYZ`
            }
          });
        }, 1000);
        
        toast.success("PDF processed successfully");
      } else {
        setUploadedFile(prev => prev ? { ...prev, status: 'error', errorMessage: 'Processing failed' } : null);
        setNotificationType('error');
        setNotificationMessage('Files could not be processed due to an error');
        setNotificationVisible(true);
        toast.error("Files could not be processed due to an error");
      }
      
      setIsProcessing(false);
    }, 2000);
  };

  const handleBack = () => {
    setProcessingResult(null);
  };

  const handleSave = () => {
    setNotificationType('success');
    setNotificationMessage('File processed and saved successfully');
    setNotificationVisible(true);
    
    // Navigate to the history page after a delay
    setTimeout(() => {
      window.location.href = '/history';
    }, 1500);
  };

  // Determine if the process button should be disabled
  const isProcessButtonDisabled = !uploadedFile || uploadedFile.status !== 'uploaded' || uploadStarted;

  return {
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
    setNotificationVisible
  };
};

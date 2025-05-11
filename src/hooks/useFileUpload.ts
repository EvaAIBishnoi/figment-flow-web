
import { useState } from 'react';
import { toast } from 'sonner';
import { FileType, UploadedFile, ProcessingResult } from '../types';

export const useFileUpload = () => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);
  const [uploadStarted, setUploadStarted] = useState<boolean>(false);
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false);
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  const [notificationMessage, setNotificationMessage] = useState<string>('');

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
    const interval = setInterval(() => {
      setUploadedFile(prev => {
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
    
    // Cleanup interval
    setTimeout(() => {
      clearInterval(interval);
      setUploadStarted(false); // Reset upload started flag
      
      // Show success notification when upload completes
      setNotificationType('success');
      setNotificationMessage('PDF uploaded successfully');
      setNotificationVisible(true);
      toast.success("PDF uploaded successfully");
    }, 3500);
  };

  const handleUploadStart = () => {
    setUploadStarted(true);
  };

  const handleRemoveFile = () => {
    return true; // Return true to show deletion confirmation
  };

  const handleDeleteConfirm = () => {
    setUploadedFile(null);
    return false; // Return false to hide deletion confirmation
  };

  const handleProcessFile = () => {
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
        setNotificationMessage('PDF processing failed. Please try again.');
        setNotificationVisible(true);
        toast.error("PDF processing failed. Please try again.");
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
  };
};

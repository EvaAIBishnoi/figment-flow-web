
import React, { useState } from 'react';
import { toast } from 'sonner';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DeleteConfirmation from '../components/DeleteConfirmation';
import ProcessingResults from '../components/ProcessingResults';
import UploadSection from '../components/UploadSection';
import Notification from '../components/Notification';
import { FileType, UploadedFile, ProcessingResult } from '../types';

const UploadProcess: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [selectedFileType, setSelectedFileType] = useState<FileType>('Document');
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false);
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  const [notificationMessage, setNotificationMessage] = useState<string>('');

  // Simulate file upload and processing
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
    }, 3500);
  };

  const handleRemoveFile = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    setUploadedFile(null);
    setShowDeleteConfirmation(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const handleProcessNotification = () => {
    if (!uploadedFile) return;
    
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
        setNotificationMessage('Files could not be uploaded due to an error');
        setNotificationVisible(true);
        toast.error("Files could not be uploaded due to an error");
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

export default UploadProcess;

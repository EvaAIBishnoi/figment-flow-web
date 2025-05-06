import React, { useState, useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import FileTypeSelector from '../components/FileTypeSelector';
import FileUpload from '../components/FileUpload';
import DeleteConfirmation from '../components/DeleteConfirmation';
import ProcessingResults from '../components/ProcessingResults';
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
    toast.success("File processed and saved successfully");
    
    // Navigate to the history page (in a real app, we would use React Router)
    setTimeout(() => {
      window.location.href = '/history';
    }, 1500);
  };

  // Auto hide notification after 5 seconds
  useEffect(() => {
    if (notificationVisible) {
      const timer = setTimeout(() => {
        setNotificationVisible(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notificationVisible]);

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
          {notificationVisible && (
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: notificationType === 'success' ? '#4CAF50' : '#f44336',
              color: 'white',
              padding: '0',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              zIndex: 100,
              maxWidth: '400px',
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '15px',
                backgroundColor: notificationType === 'success' ? '#4CAF50' : '#f44336',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {notificationType === 'success' ? (
                  <CheckCircle2 size={20} color="white" />
                ) : (
                  <X size={20} color="white" />
                )}
              </div>
              <div style={{ 
                flex: 1, 
                padding: '15px 10px',
                backgroundColor: 'white',
                color: '#333'
              }}>
                {notificationType === 'success' 
                  ? 'PDF processed successfully' 
                  : 'Files could not be uploaded due to an error'
                }
              </div>
              <button 
                onClick={() => setNotificationVisible(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#333',
                  cursor: 'pointer',
                  padding: '15px',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={16} />
              </button>
            </div>
          )}

          <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Upload and Process</h1>
          
          {processingResult ? (
            <ProcessingResults 
              result={processingResult} 
              onBack={handleBack} 
              onSave={handleSave} 
            />
          ) : (
            <>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Select file type</label>
                <div style={{ maxWidth: '400px' }}>
                  <FileTypeSelector 
                    selectedType={selectedFileType} 
                    onChange={setSelectedFileType} 
                  />
                </div>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <FileUpload 
                  onFileUpload={handleFileUpload}
                  uploadedFile={uploadedFile}
                  onRemoveFile={handleRemoveFile}
                />
              </div>
              
              <div>
                <button
                  onClick={handleProcessNotification}
                  disabled={!uploadedFile || isProcessing}
                  style={{
                    padding: '0.75rem 2rem',
                    backgroundColor: !uploadedFile || isProcessing ? '#a0aec0' : '#0a2e81',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: !uploadedFile || isProcessing ? 'not-allowed' : 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    transition: 'background-color 0.2s'
                  }}
                >
                  {isProcessing ? 'Processing...' : 'Process notification'}
                </button>
              </div>
            </>
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

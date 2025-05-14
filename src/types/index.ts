
export interface User {
  id: string;
  email: string;
  name?: string;
}

export type FileType = 'Document' | 'Email (text)';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'uploaded' | 'processing' | 'error' | 'complete';
  errorMessage?: string;
}

export interface ProcessedItem {
  id: string;
  timestamp: string;
  category: string;
  inputType: 'File' | 'Email (text)';
  confidence: string;
  reference: string;
}

export interface ExtractedEntity {
  id: string;
  amount: string; 
  date: string;
  reference: string;
}

export interface NotificationDetail {
  id: string;
  content: string;
  generatedResponse: string;
  extractedEntities: ExtractedEntity[];
}

export interface ProcessingResult {
  fileName: string;
  classification: {
    type: string;
    confidence: string;
  };
  notificationType: string;
  extractedEntities: {
    taxId: string;
    amount: string;
    date: string;
    reference: string;
  };
  requirements?: string[];
  generatedResponse: {
    subject: string;
    body: string;
  };
}

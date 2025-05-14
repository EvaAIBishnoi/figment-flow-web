
import { ProcessingResult } from '../../types';
import OCRService from './OCRService';
import ResponseGenerationService from './ResponseGenerationService';
import DocumentClassificationService from './DocumentClassificationService';

/**
 * Main service that coordinates all Mistral-related operations
 */
class MistralService {
  private apiKey: string;
  private ocrService: OCRService;
  private responseGenerationService: ResponseGenerationService;
  private documentClassificationService: DocumentClassificationService;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.ocrService = new OCRService(apiKey);
    this.responseGenerationService = new ResponseGenerationService(apiKey);
    this.documentClassificationService = new DocumentClassificationService(apiKey);
  }

  /**
   * Process a document through the entire pipeline:
   * 1. Classification
   * 2. OCR extraction
   * 3. Response generation
   */
  async processDocument(file: File): Promise<ProcessingResult> {
    try {
      console.log('Starting document processing pipeline for:', file.name);
      
      // Step 1: Classify the document
      const classification = await this.documentClassificationService.classifyDocument(file);
      
      // Step 2: Extract data using OCR
      const extractionsJson = await this.ocrService.extractFromNativePDF(file);
      const extractions = JSON.parse(extractionsJson);
      
      // Step 3: Generate email response
      const generatedResponse = await this.responseGenerationService.generateEmailResponse(extractionsJson);
      
      // Return combined results
      return {
        fileName: file.name,
        classification,
        notificationType: 'Tax Notification',
        extractedEntities: {
          taxId: extractions.taxId || '',
          amount: extractions.amount || '',
          date: extractions.dueDate || '',
          reference: extractions.reference || ''
        },
        requirements: extractions.requirements || [],
        generatedResponse
      };
    } catch (error) {
      console.error('Error in document processing pipeline:', error);
      throw new Error('Failed to process document');
    }
  }
}

export default MistralService;

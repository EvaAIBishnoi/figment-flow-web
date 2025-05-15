
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import HistoryTable from '../components/HistoryTable';
import NotificationDetails from '../components/NotificationDetails';
import { ProcessedItem, NotificationDetail } from '../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Download } from 'lucide-react';

const History: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'processed' | 'details'>('processed');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [showGeneratedResponse, setShowGeneratedResponse] = useState<boolean>(false);
  
  // Sample data - in a real app, this would come from your API
  const processedItems: ProcessedItem[] = [
    {
      id: 'Occ60ead',
      timestamp: '2025-04-30 15:07:28',
      category: 'Audit Request',
      inputType: 'File',
      confidence: '40%',
      reference: '12345677'
    },
    {
      id: 'Occ60def',
      timestamp: '2025-03-20 12:07:28',
      category: 'Audit Request',
      inputType: 'File',
      confidence: '38.08%',
      reference: '12345667'
    },
    {
      id: 'Occ80cad',
      timestamp: '2025-02-20 22:07:20',
      category: 'Tax Request',
      inputType: 'Email (text)',
      confidence: '75%',
      reference: '12345666'
    },
    {
      id: 'Occ70ead',
      timestamp: '2025-02-12 15:07:38',
      category: 'Audit Request',
      inputType: 'Email (text)',
      confidence: '60%',
      reference: '12345657'
    },
    {
      id: 'Occ90ead',
      timestamp: '2025-01-10 13:07:28',
      category: 'Tax Request',
      inputType: 'File',
      confidence: '50%',
      reference: '12345660'
    }
  ];
  
  const notificationDetails: NotificationDetail[] = [
    {
      id: 'Occ60ead',
      content: 'OFFICIAL AUDIT DOCUMENT REQUEST\n===========================\nAUDIT NOTIFICATION ID: AUD-836782\nDATE OF ISSUE: 2025-04-22\nTAXPAYER DETAILS:\n-----------------\nName: Garrett Riley\nTax Identification Number: TX79426243',
      generatedResponse: 'Subject: Response to Audit Request\n\nDear Tax Authority,\n\nI acknowledge receipt of your audit request with reference dated.\n\nI am gathering the requested documents and information and will provide them by the specified deadline. If I need any clarification or additional time, I will contact your office promptly.\n\nTax ID: 12345\nReference: XYZ',
      extractedEntities: [
        { id: 'Occ60ead', amount: '2500.00', date: '2025-04-30 15:07:28', reference: '-' },
        { id: 'Occ60def', amount: '3000.00', date: '2025-03-20 12:07:28', reference: '-' },
        { id: 'Occ80cad', amount: '1250.00', date: '2025-02-20 22:07:20', reference: '-' },
        { id: 'Occ70ead', amount: '5600.00', date: '2025-02-12 15:07:38', reference: '-' },
        { id: 'Occ90ead', amount: '2100.00', date: '2025-01-10 13:07:28', reference: '-' }
      ]
    },
    {
      id: 'Occ60def',
      content: 'OFFICIAL AUDIT DOCUMENT REQUEST\n===========================\nAUDIT NOTIFICATION ID: AUD-736782\nDATE OF ISSUE: 2025-03-18\nTAXPAYER DETAILS:\n-----------------\nName: Sarah Johnson\nTax Identification Number: TX79426244',
      generatedResponse: 'Subject: Response to Audit Request\n\nDear Tax Authority,\n\nI acknowledge receipt of your audit request with reference dated.\n\nI am gathering the requested documents and information and will provide them by the specified deadline. If I need any clarification or additional time, I will contact your office promptly.\n\nTax ID: 12346\nReference: ABC',
      extractedEntities: [
        { id: 'Occ60def', amount: '3000.00', date: '2025-03-20 12:07:28', reference: '-' }
      ]
    }
  ];

  const handleSelectItem = (id: string) => {
    setSelectedItemId(id);
    setActiveTab('details');
  };

  const getFullResponseContent = () => {
    if (!selectedItemId) return null;

    const notification = notificationDetails.find(n => n.id === selectedItemId);
    if (!notification) return null;

    return (
      <div className="space-y-4">
        <div>
          <p>To: The Assessing Officer</p>
          <p>Tax Department / Income Tax Office</p>
          <p>Bangalore, Karnataka, India</p>
          <p>Date: 08-05-2025</p>
        </div>
        <p>Subject: Response to Tax Notification Reference No. [{selectedItemId}]</p>
        <p>Dear Sir/Madam,</p>
        <p>
          I am writing in reference to the tax notification dated [Insert Date] with
          reference number [Insert Notification Number], which pertains to the
          assessment year [Insert AY] and highlights certain discrepancies in the
          return of income filed under PAN [Insert PAN]. I appreciate the
          department's diligence in ensuring tax compliance and transparency.
        </p>
        <p>
          Upon receiving the notification, I have reviewed the contents carefully and
          would like to address the points raised therein with clarifications and
          supporting documentation as detailed below:
        </p>
        <div>
          <p className="font-medium">1. Discrepancy in Reported Income</p>
          <p>
            The notice highlights a variation in the income declared under "Other
            Sources" compared to information received by the department. The
            amount declared in my ITR was ₹[X], whereas the department notes ₹[Y].
            Upon investigation, I confirm that the income from interest on fixed
            deposits amounting to ₹[Y] had inadvertently not been included under the
            "Income from Other Sources" due to delayed receipt of the bank's annual
            interest certificate. I regret this oversight and acknowledge the shortfall. A
            revised computation sheet reflecting the correct interest income is
            enclosed for your reference.
          </p>
        </div>
        <div>
          <p className="font-medium">2. Tax Deducted at Source (TDS) Mismatch</p>
          <p>
            It has also been pointed out that the TDS claimed does not match the TDS
            credited as per Form 26AS.
            This discrepancy is primarily due to timing differences in quarterly TDS
            credits and a correction statement filed late by [Bank/Organization Name].
            The mismatch is now reconciled in the latest Form 26AS (enclosed), which
            supports the TDS claimed in the return. A reconciliation sheet is attached
            for detailed comparison.
          </p>
        </div>
        <div>
          <p className="font-medium">3. Request for Rectification and Adjustment</p>
          <p>
            Given the above, I kindly request that the assessment be rectified under
            Section 154 (if applicable), and the necessary adjustments be made to
            reflect the revised income and tax liability. If any balance tax is payable
            after reassessment, I am willing to pay the amount promptly upon
            receiving the revised computation from your end.
          </p>
          <p>Supporting Documents Enclosed:</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        
        <main className="flex-1 p-8 bg-[#f8f9fa]">
          <h1 className="text-2xl font-semibold mb-6">History</h1>
          
          <div className="bg-[#f8f9fa] rounded-md">
            <Tabs 
              defaultValue="processed" 
              value={activeTab} 
              onValueChange={(value) => setActiveTab(value as 'processed' | 'details')}
              className="w-full"
            >
              <TabsList className="bg-[#f1f3f5] mb-6 p-0 h-auto rounded-none w-full">
                <TabsTrigger 
                  value="processed" 
                  className="px-4 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#0a2e81] data-[state=active]:shadow-none"
                >
                  Processed data
                </TabsTrigger>
                <TabsTrigger 
                  value="details" 
                  className="px-4 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#0a2e81] data-[state=active]:shadow-none"
                >
                  Notification details
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="processed" className="bg-white rounded-md p-6 mt-0 border border-gray-200">
                <HistoryTable 
                  items={processedItems} 
                  onSelectItem={handleSelectItem} 
                />
              </TabsContent>
              
              <TabsContent value="details" className="bg-white rounded-md p-6 mt-0 border border-gray-200">
                <NotificationDetails 
                  notifications={notificationDetails} 
                  onGenerateResponseClick={() => setShowGeneratedResponse(true)}
                />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      
      <footer className="p-4 text-center border-t border-gray-200 text-sm text-gray-500 bg-white">
        Copyright 2025 KPMG. All Rights Reserved
      </footer>

      <Dialog open={showGeneratedResponse} onOpenChange={setShowGeneratedResponse}>
        <DialogContent className="max-w-3xl p-0 gap-0">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-medium">Generated response</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowGeneratedResponse(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-4 border-b border-gray-200">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download the response
            </Button>
          </div>
          
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {getFullResponseContent()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default History;

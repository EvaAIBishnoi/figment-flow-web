
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import HistoryTable from '../components/HistoryTable';
import NotificationDetails from '../components/NotificationDetails';
import { ProcessedItem, NotificationDetail } from '../types';

const History: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'processed' | 'details'>('processed');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  
  // Sample data - in a real app, this would come from your API
  const processedItems: ProcessedItem[] = [
    {
      id: 'Occ60ead',
      timestamp: '2025-05-20 15:07:28',
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar isSidebarOpen={isSidebarOpen} />
        
        <main style={{ 
          flex: 1, 
          padding: '30px', 
          backgroundColor: '#f8f9fa'
        }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>History</h1>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ 
              display: 'flex', 
              borderBottom: '1px solid #e2e8f0' 
            }}>
              <button
                onClick={() => setActiveTab('processed')}
                className={activeTab === 'processed' ? 'kpmg-tab-active' : ''}
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: activeTab === 'processed' ? '500' : 'normal',
                  borderBottom: activeTab === 'processed' ? '2px solid #0a2e81' : 'none',
                  marginBottom: activeTab === 'processed' ? '-1px' : '0'
                }}
              >
                Processed data
              </button>
              
              <button
                onClick={() => setActiveTab('details')}
                className={activeTab === 'details' ? 'kpmg-tab-active' : ''}
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: activeTab === 'details' ? '500' : 'normal',
                  borderBottom: activeTab === 'details' ? '2px solid #0a2e81' : 'none',
                  marginBottom: activeTab === 'details' ? '-1px' : '0'
                }}
              >
                Notification details
              </button>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'white', borderRadius: '0.375rem', padding: '1.5rem' }}>
            {activeTab === 'processed' ? (
              <HistoryTable 
                items={processedItems} 
                onSelectItem={handleSelectItem} 
              />
            ) : (
              <NotificationDetails notifications={notificationDetails} />
            )}
          </div>
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
    </div>
  );
};

export default History;


import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { NotificationDetail } from '../types';

interface NotificationDetailsProps {
  notifications: NotificationDetail[];
}

const NotificationDetails: React.FC<NotificationDetailsProps> = ({ notifications }) => {
  const [selectedNotification, setSelectedNotification] = useState<string | null>(
    notifications.length > 0 ? notifications[0].id : null
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const getNotificationById = (id: string) => {
    return notifications.find(notification => notification.id === id) || null;
  };

  const notification = selectedNotification ? getNotificationById(selectedNotification) : null;

  const getDropdownLabel = () => {
    if (!selectedNotification || !notification) {
      return 'Select details';
    }

    const index = notifications.findIndex(n => n.id === selectedNotification);
    if (index !== -1) {
      return `${notification.id} - Audit Request (2025-04-30 15:07:28)`;
    }
    
    return 'Select details';
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
          Select notification to view details
        </label>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: '0.75rem 1rem',
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            <span>{getDropdownLabel()}</span>
            <ChevronDown size={16} />
          </button>

          {isDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '0.375rem',
              marginTop: '0.25rem',
              zIndex: 10,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => {
                    setSelectedNotification(notification.id);
                    setIsDropdownOpen(false);
                  }}
                  style={{
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    backgroundColor: notification.id === selectedNotification ? '#f7fafc' : 'transparent',
                    fontSize: '0.875rem'
                  }}
                >
                  {`${notification.id} - Audit Request (2025-04-30 15:07:28)`}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {notification && (
        <div>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ 
              border: '1px solid #e2e8f0', 
              borderRadius: '0.375rem', 
              padding: '1rem',
              backgroundColor: 'white'
            }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '1rem' }}>Content</h3>
              <pre style={{ 
                whiteSpace: 'pre-wrap', 
                fontFamily: 'inherit', 
                fontSize: '0.875rem', 
                margin: 0,
                lineHeight: 1.5
              }}>
                {`OFFICIAL AUDIT DOCUMENT REQUEST
===========================
AUDIT NOTIFICATION ID: AUD-836782
DATE OF ISSUE: 2025-04-22
TAXPAYER DETAILS:
-----------------
Name: Garrett Riley
Tax Identification Number: TX79426243`}
              </pre>
            </div>
            
            <div style={{ 
              border: '1px solid #e2e8f0', 
              borderRadius: '0.375rem', 
              padding: '1rem',
              backgroundColor: 'white'
            }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '1rem' }}>Generated Response</h3>
              <div style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                <p style={{ margin: '0 0 0.75rem 0' }}>Subject: Response to Audit Request</p>
                <p style={{ margin: '0 0 0.75rem 0' }}>Dear Tax Authority,</p>
                <p style={{ margin: '0 0 0.75rem 0' }}>
                  I acknowledge receipt of your audit request with reference dated.
                </p>
                <p style={{ margin: '0 0 0.75rem 0' }}>
                  I am gathering the requested documents and information and will provide them by the specified deadline. If I need any clarification or additional time, I will contact your office promptly.
                </p>
              </div>
            </div>
          </div>

          <div style={{ 
            border: '1px solid #e2e8f0', 
            borderRadius: '0.375rem', 
            padding: '1rem',
            backgroundColor: 'white'
          }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '1rem' }}>Extracted entities</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '500', borderBottom: '1px solid #e2e8f0' }}>ID</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '500', borderBottom: '1px solid #e2e8f0' }}>Amount (Rs.)</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '500', borderBottom: '1px solid #e2e8f0' }}>Date</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '500', borderBottom: '1px solid #e2e8f0' }}>Reference</th>
                </tr>
              </thead>
              <tbody>
                {notification.extractedEntities.map((entity) => (
                  <tr key={entity.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{entity.id}</td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{entity.amount}</td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{entity.date}</td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{entity.reference || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDetails;

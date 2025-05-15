
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { NotificationDetail } from '../types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface NotificationDetailsProps {
  notifications: NotificationDetail[];
  onGenerateResponseClick?: () => void;
}

const NotificationDetails: React.FC<NotificationDetailsProps> = ({ 
  notifications,
  onGenerateResponseClick 
}) => {
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

    return `${notification.id} - Audit Request (2025-04-30 15:07:28)`;
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm mb-2 block">
          Select notification to view details
        </label>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex justify-between items-center w-full p-3 bg-white border border-gray-200 rounded-md text-sm"
          >
            <span>{getDropdownLabel()}</span>
            <ChevronDown size={16} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md mt-1 z-10 shadow-md max-h-[200px] overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => {
                    setSelectedNotification(notification.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`p-3 cursor-pointer hover:bg-gray-50 text-sm ${
                    notification.id === selectedNotification ? 'bg-gray-50' : ''
                  }`}
                >
                  {`${notification.id} - Audit Request (2025-04-30 15:07:28)`}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {notification && (
        <div className="space-y-6">
          <div className="flex gap-6">
            <div className="flex-1 p-4 border border-gray-200 rounded-md bg-white">
              <h3 className="text-sm font-medium mb-4">Original content</h3>
              <pre className="whitespace-pre-wrap font-sans text-sm leading-normal">
                {notification.content}
              </pre>
            </div>
            
            <div className="flex-1 p-4 border border-gray-200 rounded-md bg-white">
              <h3 className="text-sm font-medium mb-4">Summary</h3>
              <div className="text-sm leading-relaxed">
                <p className="mb-3">Subject: Response to Audit Request</p>
                <p className="mb-3">Dear Tax Authority,</p>
                <p className="mb-3">
                  I acknowledge receipt of your audit request with reference dated.
                </p>
                <p className="mb-3">
                  I am gathering the requested documents and information and will provide them by the specified deadline. If I need any clarification or additional time, I will contact your office promptly.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium">Extracted entities</h3>
              {onGenerateResponseClick && (
                <Button 
                  variant="outline" 
                  className="text-[#0a2e81] border-[#0a2e81] hover:bg-[#e0e8f7] hover:text-[#0a2e81]"
                  onClick={onGenerateResponseClick}
                >
                  Generated response
                </Button>
              )}
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-medium text-sm">ID</TableHead>
                  <TableHead className="font-medium text-sm">Amount (Rs.)</TableHead>
                  <TableHead className="font-medium text-sm">Date</TableHead>
                  <TableHead className="font-medium text-sm">Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notification.extractedEntities.map((entity) => (
                  <TableRow key={entity.id} className="hover:bg-gray-50">
                    <TableCell className="text-sm">{entity.id}</TableCell>
                    <TableCell className="text-sm">{entity.amount}</TableCell>
                    <TableCell className="text-sm">{entity.date}</TableCell>
                    <TableCell className="text-sm">{entity.reference || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDetails;

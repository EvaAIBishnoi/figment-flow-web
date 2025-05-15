
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProcessedItem } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface HistoryTableProps {
  items: ProcessedItem[];
  onSelectItem: (id: string) => void;
}

const HistoryTable: React.FC<HistoryTableProps> = ({ items, onSelectItem }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const totalPages = Math.ceil(items.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleItems = items.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-medium text-sm">ID</TableHead>
            <TableHead className="font-medium text-sm">Timestamp</TableHead>
            <TableHead className="font-medium text-sm">Category</TableHead>
            <TableHead className="font-medium text-sm">Input type</TableHead>
            <TableHead className="font-medium text-sm">Confidence</TableHead>
            <TableHead className="font-medium text-sm">Reference</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleItems.map((item) => (
            <TableRow 
              key={item.id} 
              onClick={() => onSelectItem(item.id)} 
              className="cursor-pointer hover:bg-gray-50"
            >
              <TableCell className="text-sm">{item.id}</TableCell>
              <TableCell className="text-sm">{item.timestamp}</TableCell>
              <TableCell className="text-sm">{item.category}</TableCell>
              <TableCell className="text-sm">{item.inputType}</TableCell>
              <TableCell className="text-sm">{item.confidence}</TableCell>
              <TableCell className="text-sm">{item.reference}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between p-4 text-sm">
        <div className="flex items-center gap-2">
          <span>ROWS PER</span>
          <select 
            value={rowsPerPage} 
            onChange={handleRowsPerPageChange}
            className="px-2 py-1 rounded border border-gray-200"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="flex items-center">
          <span className="mr-2">
            PAGE {currentPage} OF {totalPages}
          </span>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={`px-2 py-1 border-none bg-transparent ${
                currentPage === 1 ? 'text-gray-300 cursor-default' : 'text-[#0a2e81] cursor-pointer'
              }`}
            >
              First
            </button>
            
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center px-2 py-1 border-none bg-transparent ${
                currentPage === 1 ? 'text-gray-300 cursor-default' : 'text-[#0a2e81] cursor-pointer'
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              // Calculate page number to show based on current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              if (pageNum >= 1 && pageNum <= totalPages) {
                return (
                  <button 
                    key={i}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-7 h-7 flex items-center justify-center rounded-full ${
                      currentPage === pageNum 
                        ? 'border border-[#0a2e81] bg-transparent text-[#0a2e81]' 
                        : 'border-none bg-transparent text-[#0a2e81]'
                    } cursor-pointer text-sm`}
                  >
                    {pageNum}
                  </button>
                );
              }
              return null;
            })}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="text-gray-600">...</span>
            )}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center px-2 py-1 border-none bg-transparent ${
                currentPage === totalPages ? 'text-gray-300 cursor-default' : 'text-[#0a2e81] cursor-pointer'
              }`}
            >
              <ChevronRight size={16} />
            </button>
            
            <button 
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 border-none bg-transparent ${
                currentPage === totalPages ? 'text-gray-300 cursor-default' : 'text-[#0a2e81] cursor-pointer'
              }`}
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;


import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProcessedItem } from '../types';

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
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        marginTop: '1rem',
        backgroundColor: 'white'
      }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#4b5563' }}>ID</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#4b5563' }}>Timestamp</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#4b5563' }}>Category</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#4b5563' }}>Input type</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#4b5563' }}>Confidence</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#4b5563' }}>Reference</th>
          </tr>
        </thead>
        <tbody>
          {visibleItems.map((item) => (
            <tr 
              key={item.id} 
              onClick={() => onSelectItem(item.id)} 
              style={{ 
                borderBottom: '1px solid #e2e8f0',
                cursor: 'pointer'
              }}
            >
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>{item.id}</td>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>{item.timestamp}</td>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>{item.category}</td>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>{item.inputType}</td>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>{item.confidence}</td>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>{item.reference}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '1rem',
        fontSize: '0.875rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>ROWS PER</span>
          <select 
            value={rowsPerPage} 
            onChange={handleRowsPerPageChange}
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              border: '1px solid #e2e8f0'
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '0.5rem' }}>
            PAGE {currentPage} OF {totalPages}
          </span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <button 
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              style={{
                padding: '0.25rem 0.5rem',
                color: currentPage === 1 ? '#d1d5db' : '#0a2e81',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: currentPage === 1 ? 'default' : 'pointer'
              }}
            >
              First
            </button>
            
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: '0.25rem 0.5rem',
                color: currentPage === 1 ? '#d1d5db' : '#0a2e81',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: currentPage === 1 ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
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
                    style={{
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: currentPage === pageNum ? '1px solid #0a2e81' : 'none',
                      borderRadius: '50%',
                      backgroundColor: currentPage === pageNum ? 'transparent' : 'transparent',
                      color: '#0a2e81',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    {pageNum}
                  </button>
                );
              }
              return null;
            })}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span style={{ color: '#4b5563' }}>...</span>
            )}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: '0.25rem 0.5rem',
                color: currentPage === totalPages ? '#d1d5db' : '#0a2e81',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: currentPage === totalPages ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ChevronRight size={16} />
            </button>
            
            <button 
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              style={{
                padding: '0.25rem 0.5rem',
                color: currentPage === totalPages ? '#d1d5db' : '#0a2e81',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: currentPage === totalPages ? 'default' : 'pointer'
              }}
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


import React from 'react';
import { File, History } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  const location = useLocation();
  const pathname = location.pathname;

  if (!isSidebarOpen) {
    return null;
  }

  return (
    <div style={{
      backgroundColor: '#0a2e81',
      width: '240px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ marginTop: '20px', padding: '10px 15px' }}>
        <Link 
          to="/upload" 
          className="kpmg-sidebar-item" 
          style={{ 
            backgroundColor: pathname.includes('/upload') ? '#000000' : 'transparent',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            marginBottom: '8px',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            textDecoration: 'none'
          }}
        >
          <File size={20} />
          <span>Upload and Process</span>
        </Link>
        
        <Link 
          to="/history" 
          className="kpmg-sidebar-item" 
          style={{ 
            backgroundColor: pathname.includes('/history') ? '#000000' : 'transparent',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            textDecoration: 'none'
          }}
        >
          <History size={20} />
          <span>History</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

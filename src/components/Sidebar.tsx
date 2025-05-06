
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
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ marginTop: '20px' }}>
        <Link 
          to="/upload" 
          className="kpmg-sidebar-item" 
          style={{ 
            backgroundColor: pathname.includes('/upload') ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
          }}
        >
          <File size={20} />
          <span>Upload and Process</span>
        </Link>
        
        <Link 
          to="/history" 
          className="kpmg-sidebar-item" 
          style={{ 
            backgroundColor: pathname.includes('/history') ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
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

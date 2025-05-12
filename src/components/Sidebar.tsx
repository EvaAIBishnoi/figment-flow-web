
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
    <div className="fixed top-[64px] left-0 bottom-0 w-[240px] bg-[#0a2e81] flex flex-col z-10 h-[calc(100vh-64px)]">
      <div className="flex-1 overflow-y-auto p-4">
        <Link 
          to="/upload" 
          className={`kpmg-sidebar-item rounded-md mb-2 ${pathname.includes('/upload') ? 'bg-black' : 'hover:bg-white/10'}`}
        >
          <File size={20} />
          <span>Upload and Process</span>
        </Link>
        
        <Link 
          to="/history" 
          className={`kpmg-sidebar-item rounded-md ${pathname.includes('/history') ? 'bg-black' : 'hover:bg-white/10'}`}
        >
          <History size={20} />
          <span>History</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

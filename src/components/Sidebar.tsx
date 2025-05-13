
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, History, Settings, MessageSquare, FolderArchive, BookOpen } from 'lucide-react';

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  return (
    <aside 
      className={`fixed top-0 left-0 h-full bg-[#0a2e81] text-white transition-all duration-300 z-10 mt-0 ${
        isSidebarOpen ? 'w-[240px]' : 'w-0 overflow-hidden'
      }`}
    >
      <div className="p-6 pt-16"> {/* Increased top padding to align with header */}
        <nav>
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => handleNavigation('/upload')}
                className="flex items-center w-full p-3 rounded-md hover:bg-[#071d52] transition-colors"
              >
                <Upload size={18} className="mr-3" />
                <span>Upload and Process</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('/history')}
                className="flex items-center w-full p-3 rounded-md hover:bg-[#071d52] transition-colors"
              >
                <History size={18} className="mr-3" />
                <span>Process History</span>
              </button>
            </li>
            <li>
              <button 
                className="flex items-center w-full p-3 rounded-md hover:bg-[#071d52] transition-colors"
              >
                <MessageSquare size={18} className="mr-3" />
                <span>Communication</span>
              </button>
            </li>
            <li>
              <button 
                className="flex items-center w-full p-3 rounded-md hover:bg-[#071d52] transition-colors"
              >
                <FolderArchive size={18} className="mr-3" />
                <span>Archive</span>
              </button>
            </li>
            <li>
              <button 
                className="flex items-center w-full p-3 rounded-md hover:bg-[#071d52] transition-colors"
              >
                <BookOpen size={18} className="mr-3" />
                <span>Documentation</span>
              </button>
            </li>
            <li>
              <button 
                className="flex items-center w-full p-3 rounded-md hover:bg-[#071d52] transition-colors"
              >
                <Settings size={18} className="mr-3" />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

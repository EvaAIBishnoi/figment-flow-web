
import React, { useState } from 'react';
import { Bell, ChevronDown, Menu, User } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <header style={{ 
      backgroundColor: '#0a2e81',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      width: '100%',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button 
          onClick={onToggleSidebar}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            cursor: 'pointer',
            marginRight: '15px',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Menu color="white" size={24} />
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/9/9d/KPMG_logo.svg" 
            alt="KPMG Logo" 
            style={{ height: '40px', filter: 'brightness(0) invert(1)' }} 
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ 
          position: 'relative', 
          backgroundColor: 'white', 
          borderRadius: '50%', 
          width: '40px', 
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <button style={{ 
            background: 'transparent', 
            border: 'none', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}>
            <User color="#0a2e81" size={20} />
          </button>
        </div>

        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>ABC</span>
              <ChevronDown color="white" size={16} />
            </span>
          </button>

          {dropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: '0',
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '0.375rem',
              padding: '0.5rem',
              marginTop: '0.5rem',
              zIndex: 10,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              minWidth: '150px'
            }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li>
                  <a 
                    href="/profile" 
                    style={{ 
                      display: 'block', 
                      padding: '0.5rem 1rem', 
                      color: '#1a202c',
                      textDecoration: 'none',
                      fontSize: '0.875rem'
                    }}
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a 
                    href="/settings" 
                    style={{ 
                      display: 'block', 
                      padding: '0.5rem 1rem', 
                      color: '#1a202c',
                      textDecoration: 'none',
                      fontSize: '0.875rem'
                    }}
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a 
                    href="/sign-in" 
                    style={{ 
                      display: 'block', 
                      padding: '0.5rem 1rem', 
                      color: '#1a202c',
                      textDecoration: 'none',
                      fontSize: '0.875rem'
                    }}
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <button style={{ 
            background: 'transparent', 
            border: 'none', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Bell color="white" fill="white" size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

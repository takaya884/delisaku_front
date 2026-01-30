import React from 'react';
import './Sidebar.css';

export interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  isOpen: boolean;
  onToggle: () => void;
  currentPath?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  isOpen,
  onToggle,
  currentPath = '',
}) => {
  return (
    <>
      {/* オーバーレイ（モバイル用） */}
      {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}
      
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <button
          className="sidebar-toggle"
          onClick={onToggle}
          aria-label={isOpen ? 'サイドバーを閉じる' : 'サイドバーを開く'}
        >
          <span className={`toggle-icon ${isOpen ? 'open' : ''}`}>
            {isOpen ? '‹' : '›'}
          </span>
        </button>
        
        <nav className="sidebar-nav">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`sidebar-item ${currentPath === item.href ? 'active' : ''}`}
              title={item.label}
            >
              {item.icon && <span className="sidebar-icon">{item.icon}</span>}
              <span className="sidebar-label">{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
};

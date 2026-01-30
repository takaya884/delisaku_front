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
  const handleOverlayKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <>
      {/* オーバーレイ（モバイル用） */}
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={onToggle}
          onKeyDown={handleOverlayKeyDown}
          role="button"
          tabIndex={0}
          aria-label="サイドバーを閉じる"
        />
      )}
      
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
        
        <nav className="sidebar-nav" aria-label="メインナビゲーション">
          {items.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                title={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.icon && <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>}
                <span className="sidebar-label">{item.label}</span>
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

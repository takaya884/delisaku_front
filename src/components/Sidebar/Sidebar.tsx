import React, { useState } from 'react';
import './Sidebar.css';

export interface SidebarItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
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
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const handleOverlayKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
      e.preventDefault();
      onToggle();
    }
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleGroupKeyDown = (e: React.KeyboardEvent, groupId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleGroup(groupId);
    }
  };

  const renderItem = (item: SidebarItem, isNested = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedGroups[item.id];
    const isActive = currentPath === item.href;
    const hasActiveChild = item.children?.some((child) => currentPath === child.href);

    if (hasChildren) {
      return (
        <div key={item.id} className="sidebar-group">
          <div
            className={`sidebar-item sidebar-group-header ${hasActiveChild ? 'has-active-child' : ''}`}
            onClick={() => toggleGroup(item.id)}
            onKeyDown={(e) => handleGroupKeyDown(e, item.id)}
            role="button"
            tabIndex={0}
            title={item.label}
            aria-expanded={isExpanded}
          >
            {item.icon && <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>}
            <span className="sidebar-label">{item.label}</span>
            <span className={`sidebar-expand-icon ${isExpanded ? 'expanded' : ''}`} aria-hidden="true">
              ▾
            </span>
          </div>
          {isExpanded && item.children && (
            <div className="sidebar-children">
              {item.children.map((child) => renderItem(child, true))}
            </div>
          )}
        </div>
      );
    }

    return (
      <a
        key={item.id}
        href={item.href}
        className={`sidebar-item ${isActive ? 'active' : ''} ${isNested ? 'nested' : ''}`}
        title={item.label}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.icon && <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>}
        <span className="sidebar-label">{item.label}</span>
      </a>
    );
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
          {items.map((item) => renderItem(item))}
        </nav>
      </aside>
    </>
  );
};

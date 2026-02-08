import React, { useState } from 'react';
import { Sidebar, SidebarItem } from '../Sidebar';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  currentPath?: string;
}

const sidebarItems: SidebarItem[] = [
  { id: 'inventory', label: '在庫管理', href: '#inventory', icon: '📦' },
  { id: 'recipes', label: 'レシピ', href: '#recipes', icon: '🍳' },
  { 
    id: 'ingredients-group', 
    label: '食材', 
    icon: '🥬',
    children: [
      { id: 'ingredients', label: '食材登録', href: '#ingredients' },
      { id: 'ingredient-list', label: '食材一覧', href: '#ingredient-list' },
    ]
  },
  { id: 'sales', label: '日次売上確認', href: '#sales', icon: '💰' },
  { id: 'data-input', label: 'データ入力', href: '#data-input', icon: '📲' },
];

export const Layout: React.FC<LayoutProps> = ({
  children,
  headerContent,
  currentPath = '',
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="layout-header-container">
          <div className="layout-header-brand">
            <h1 className="layout-header-title">Delisaku</h1>
            <p className="layout-header-subtitle">在庫・レシピ管理</p>
          </div>
          
          {headerContent && (
            <div className="layout-header-content">
              {headerContent}
            </div>
          )}
        </div>
      </header>
      
      <Sidebar
        items={sidebarItems}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        currentPath={currentPath}
      />
      
      <main className={`layout-main ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {children}
      </main>
    </div>
  );
};

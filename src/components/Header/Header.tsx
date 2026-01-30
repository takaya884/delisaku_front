import React, { useState } from 'react';
import './Header.css';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = 'Delisaku' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <h1 className="header-title">{title}</h1>
          <p className="header-subtitle">在庫・レシピ管理</p>
        </div>
        
        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="メニュー"
        >
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </button>
        
        <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
          <a href="#inventory" className="nav-link">在庫管理</a>
          <a href="#recipes" className="nav-link">レシピ</a>
          <a href="#settings" className="nav-link">設定</a>
        </nav>
      </div>
    </header>
  );
};

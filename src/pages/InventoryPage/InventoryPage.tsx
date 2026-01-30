import React from 'react';
import { InventoryList } from '../../components/InventoryList/InventoryList';
import { demoInventoryItems } from '../../data/demoData';
import { InventoryItem } from '../../types';
import './InventoryPage.css';

export const InventoryPage: React.FC = () => {
  const handleEdit = (item: InventoryItem) => {
    console.log('Edit item:', item);
  };

  return (
    <div className="page inventory-page">
      <div className="page-header">
        <h2 className="page-title">在庫管理</h2>
        <button className="add-button">+ 在庫追加</button>
      </div>
      
      <div className="page-content">
        <InventoryList items={demoInventoryItems} onEdit={handleEdit} />
      </div>
    </div>
  );
};

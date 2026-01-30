import React from 'react';
import { InventoryItem } from '../../types';
import { InventoryCard } from '../InventoryCard/InventoryCard';
import './InventoryList.css';

interface InventoryListProps {
  items: InventoryItem[];
  onEdit?: (item: InventoryItem) => void;
}

export const InventoryList: React.FC<InventoryListProps> = ({ items, onEdit }) => {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>在庫アイテムがありません</p>
      </div>
    );
  }

  return (
    <div className="inventory-list">
      {items.map((item) => (
        <InventoryCard key={item.id} item={item} onEdit={onEdit} />
      ))}
    </div>
  );
};

import React from 'react';
import { InventoryItem } from '../../types';
import './InventoryCard.css';

interface InventoryCardProps {
  item: InventoryItem;
  onEdit?: (item: InventoryItem) => void;
}

export const InventoryCard: React.FC<InventoryCardProps> = ({ item, onEdit }) => {
  const isLowStock = item.quantity <= item.minQuantity;
  const isExpiringSoon = item.expiryDate && 
    new Date(item.expiryDate).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000;

  return (
    <div className={`inventory-card ${isLowStock ? 'low-stock' : ''}`}>
      <div className="inventory-card-header">
        <h3 className="inventory-card-name">{item.name}</h3>
        <span className="inventory-card-category">{item.category}</span>
      </div>
      
      <div className="inventory-card-body">
        <div className="inventory-quantity">
          <span className="quantity-value">{item.quantity}</span>
          <span className="quantity-unit">{item.unit}</span>
        </div>
        
        <div className="inventory-details">
          <div className="detail-row">
            <span className="detail-label">最小在庫:</span>
            <span className="detail-value">{item.minQuantity} {item.unit}</span>
          </div>
          
          {item.expiryDate && (
            <div className={`detail-row ${isExpiringSoon ? 'expiry-warning' : ''}`}>
              <span className="detail-label">賞味期限:</span>
              <span className="detail-value">{item.expiryDate}</span>
            </div>
          )}
          
          <div className="detail-row">
            <span className="detail-label">更新日:</span>
            <span className="detail-value">{item.lastUpdated}</span>
          </div>
        </div>
      </div>
      
      {isLowStock && (
        <div className="inventory-alert">
          在庫が少なくなっています
        </div>
      )}
      
      {onEdit && (
        <button className="inventory-edit-btn" onClick={() => onEdit(item)}>
          編集
        </button>
      )}
    </div>
  );
};

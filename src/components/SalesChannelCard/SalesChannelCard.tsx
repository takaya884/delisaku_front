import React from 'react';
import { SalesChannel } from '../../types';
import './SalesChannelCard.css';

interface SalesChannelCardProps {
  channel: SalesChannel;
}

const getRetrievalMethodLabel = (method: string): string => {
  const labels: Record<string, string> = {
    'api': 'API連携',
    'csv-import': 'CSV取込',
    'manual': '手動入力',
    'webhook': 'Webhook',
    'rpa': 'RPA自動化',
    'email-parsing': 'メール解析',
    'cloud-sync': 'クラウド同期',
  };
  return labels[method] || method;
};

const getRetrievalMethodColor = (method: string): string => {
  const colors: Record<string, string> = {
    'api': '#4CAF50',
    'csv-import': '#2196F3',
    'manual': '#FF9800',
    'webhook': '#9C27B0',
    'rpa': '#00BCD4',
    'email-parsing': '#FF5722',
    'cloud-sync': '#3F51B5',
  };
  return colors[method] || '#757575';
};

export const SalesChannelCard: React.FC<SalesChannelCardProps> = ({ channel }) => {
  return (
    <div className="sales-channel-card">
      <div className="sales-channel-card-header">
        <span className="sales-channel-icon">{channel.icon}</span>
        <h3 className="sales-channel-name">{channel.name}</h3>
      </div>
      
      <p className="sales-channel-description">{channel.description}</p>
      
      <div className="sales-channel-method">
        <span 
          className="method-badge"
          style={{ backgroundColor: getRetrievalMethodColor(channel.retrievalMethod) }}
        >
          {getRetrievalMethodLabel(channel.retrievalMethod)}
        </span>
      </div>

      {channel.apiEndpoint && (
        <div className="sales-channel-api">
          <strong>APIエンドポイント:</strong>
          <code>{channel.apiEndpoint}</code>
        </div>
      )}

      {channel.apiDocUrl && (
        <div className="sales-channel-doc">
          <a 
            href={channel.apiDocUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="doc-link"
          >
            📚 APIドキュメント
          </a>
        </div>
      )}

      {channel.notes && (
        <div className="sales-channel-notes">
          <details>
            <summary>実装詳細</summary>
            <p>{channel.notes}</p>
          </details>
        </div>
      )}
    </div>
  );
};

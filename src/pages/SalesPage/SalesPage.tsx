import React, { useState, useMemo } from 'react';
import { SalesChannelCard } from '../../components/SalesChannelCard';
import { salesChannels } from '../../data/salesChannels';
import { SalesChannelCategory } from '../../types';
import './SalesPage.css';

const categoryLabels: Record<SalesChannelCategory, string> = {
  'in-store': '店内販売',
  'payment': '決済手段別',
  'online-delivery': 'オンライン・デリバリー',
  'reservation': '予約・事前決済',
  'subscription': 'サブスク・定期購入',
  'b2b': '法人・特殊販売',
  'other': 'その他',
};

const categoryIcons: Record<SalesChannelCategory, string> = {
  'in-store': '🏪',
  'payment': '💳',
  'online-delivery': '🚚',
  'reservation': '📅',
  'subscription': '🔄',
  'b2b': '🏢',
  'other': '📊',
};

export const SalesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SalesChannelCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChannels = useMemo(() => {
    return salesChannels.filter(channel => {
      const matchesCategory = selectedCategory === 'all' || channel.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        channel.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const channelsByCategory = useMemo(() => {
    const categories: SalesChannelCategory[] = [
      'in-store',
      'payment',
      'online-delivery',
      'reservation',
      'subscription',
      'b2b',
      'other',
    ];

    return categories.map(category => ({
      category,
      channels: filteredChannels.filter(c => c.category === category),
    })).filter(group => group.channels.length > 0);
  }, [filteredChannels]);

  const stats = useMemo(() => {
    return {
      total: salesChannels.length,
      apiIntegration: salesChannels.filter(c => c.retrievalMethod === 'api').length,
      csvImport: salesChannels.filter(c => c.retrievalMethod === 'csv-import').length,
      manual: salesChannels.filter(c => c.retrievalMethod === 'manual').length,
    };
  }, []);

  return (
    <div className="sales-page">
      <div className="page-header">
        <h2 className="page-title">💰 日次売上確認</h2>
        <p className="page-description">
          37種類の売上チャネルからデータを自動取得し、日次売上を一元管理します
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">対応チャネル</div>
        </div>
        <div className="stat-card stat-success">
          <div className="stat-value">{stats.apiIntegration}</div>
          <div className="stat-label">API連携</div>
        </div>
        <div className="stat-card stat-info">
          <div className="stat-value">{stats.csvImport}</div>
          <div className="stat-label">CSV取込</div>
        </div>
        <div className="stat-card stat-warning">
          <div className="stat-value">{stats.manual}</div>
          <div className="stat-label">手動入力</div>
        </div>
      </div>

      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="チャネル名で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="clear-search"
              type="button"
            >
              ✕
            </button>
          )}
        </div>

        <div className="category-filters">
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
            type="button"
          >
            すべて ({salesChannels.length})
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => {
            const count = salesChannels.filter(c => c.category === key).length;
            return (
              <button
                key={key}
                className={`filter-btn ${selectedCategory === key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(key as SalesChannelCategory)}
                type="button"
              >
                {categoryIcons[key as SalesChannelCategory]} {label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="channels-container">
        {channelsByCategory.length === 0 ? (
          <div className="empty-state">
            <p>該当するチャネルが見つかりません</p>
          </div>
        ) : (
          channelsByCategory.map(({ category, channels }) => (
            <div key={category} className="category-section">
              <h3 className="category-title">
                <span className="category-icon">{categoryIcons[category]}</span>
                {categoryLabels[category]}
                <span className="category-count">({channels.length})</span>
              </h3>
              <div className="channels-grid">
                {channels.map(channel => (
                  <SalesChannelCard key={channel.id} channel={channel} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

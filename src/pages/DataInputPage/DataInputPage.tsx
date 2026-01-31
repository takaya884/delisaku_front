import React, { useState, useEffect, useRef } from 'react';
import './DataInputPage.css';

const STORAGE_KEY = 'delisaku_data_input_history';

export const DataInputPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [storedData, setStoredData] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // ローカルストレージからデータを読み込む
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setStoredData(JSON.parse(saved));
      }
    } catch (e) {
      console.error('データの読み込みに失敗しました:', e);
    }
  }, []);

  // データをローカルストレージに保存
  const saveToStorage = (data: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('データの保存に失敗しました:', e);
    }
  };

  // エンターキーで入力値を保存
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const newData = [...storedData, inputValue.trim()];
      setStoredData(newData);
      saveToStorage(newData);
      setInputValue('');
    }
  };

  // 項目を削除
  const handleDelete = (index: number) => {
    const newData = storedData.filter((_, i) => i !== index);
    setStoredData(newData);
    saveToStorage(newData);
  };

  // 全件クリア
  const handleClearAll = () => {
    setStoredData([]);
    saveToStorage([]);
  };

  // 入力欄にフォーカス
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="data-input-page">
      <div className="page-header">
        <h2 className="page-title">📲 データ入力（ハンディ用）</h2>
        <p className="page-description">
          テキストを入力してEnterキーを押すと、端末のローカルストレージに保存されます。
          ハンディターミナル連携のための技術調査用画面です。
        </p>
      </div>

      <div className="input-section">
        <input
          ref={inputRef}
          type="text"
          className="data-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="入力してEnterで保存..."
          aria-label="データ入力"
        />
      </div>

      <div className="stored-data-section">
        <div className="section-header">
          <h3>保存済みデータ ({storedData.length}件)</h3>
          {storedData.length > 0 && (
            <button
              className="btn btn-danger-outline"
              onClick={handleClearAll}
              type="button"
            >
              全件クリア
            </button>
          )}
        </div>

        {storedData.length === 0 ? (
          <p className="empty-message">まだデータがありません</p>
        ) : (
          <ul className="data-list">
            {storedData.map((item, index) => (
              <li key={index} className="data-item">
                <span className="item-index">{index + 1}</span>
                <span className="item-value">{item}</span>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(index)}
                  type="button"
                  aria-label={`${item}を削除`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

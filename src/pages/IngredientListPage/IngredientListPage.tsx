import React, { useState } from 'react';
import { Ingredient } from '../../types';
import './IngredientListPage.css';

// デモ用の食材データ
const demoIngredients: Ingredient[] = [
  {
    id: 'ing-1',
    code: 'VEG001',
    name: 'トマト',
    unit: 'kg',
    packageQuantity: 5,
    purchasePrice: 800,
    expiryDate: '2026-02-05',
  },
  {
    id: 'ing-2',
    code: 'VEG002',
    name: '玉ねぎ',
    unit: 'kg',
    packageQuantity: 10,
    purchasePrice: 500,
    expiryDate: '2026-02-10',
  },
  {
    id: 'ing-3',
    code: 'MEAT001',
    name: '牛肉',
    unit: 'kg',
    packageQuantity: 1,
    purchasePrice: 3500,
    expiryDate: '2026-02-02',
  },
  {
    id: 'ing-4',
    code: 'OIL001',
    name: 'オリーブオイル',
    unit: 'L',
    packageQuantity: 1,
    purchasePrice: 1200,
  },
  {
    id: 'ing-5',
    code: 'DRY001',
    name: 'パスタ',
    unit: 'kg',
    packageQuantity: 5,
    purchasePrice: 600,
  },
];

export const IngredientListPage: React.FC = () => {
  const [searchName, setSearchName] = useState('');
  const [ingredients] = useState<Ingredient[]>(demoIngredients);

  // 食材名でフィルタリング
  const filteredIngredients = ingredients.filter((ing) =>
    ing.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="ingredient-list-page">
      <div className="page-header">
        <h2 className="page-title">食材一覧</h2>
        <p className="page-description">
          登録されている食材の一覧を表示します。食材名で検索できます。
        </p>
      </div>

      <div className="search-section">
        <div className="search-field">
          <label htmlFor="searchName">食材名</label>
          <input
            type="text"
            id="searchName"
            placeholder="食材名で検索..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
      </div>

      <div className="ingredient-table-container">
        <table className="ingredient-table">
          <thead>
            <tr>
              <th>コード</th>
              <th>食材名</th>
              <th>単位</th>
              <th>入数</th>
              <th>仕入価格</th>
              <th>賞味期限</th>
            </tr>
          </thead>
          <tbody>
            {filteredIngredients.length > 0 ? (
              filteredIngredients.map((ing) => (
                <tr key={ing.id}>
                  <td className="code-cell">{ing.code}</td>
                  <td>{ing.name}</td>
                  <td>{ing.unit}</td>
                  <td>{ing.packageQuantity}</td>
                  <td className="price-cell">¥{ing.purchasePrice.toLocaleString()}</td>
                  <td>{ing.expiryDate || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="no-data">
                  {searchName ? '該当する食材が見つかりません' : '登録されている食材がありません'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="result-count">
        {filteredIngredients.length}件の食材が見つかりました
      </div>
    </div>
  );
};

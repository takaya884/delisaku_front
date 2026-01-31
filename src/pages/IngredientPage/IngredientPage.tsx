import React, { useState, useRef, useEffect } from 'react';
import { IngredientForm } from '../../components/IngredientForm';
import { Ingredient } from '../../types';
import './IngredientPage.css';

type ViewMode = 'card' | 'list';

interface IngredientPageProps {
  onSave?: (ingredient: Ingredient) => void;
}

export const IngredientPage: React.FC<IngredientPageProps> = ({ onSave }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [registeredIngredients, setRegisteredIngredients] = useState<Ingredient[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const timeoutRef = useRef<number | null>(null);

  // コンポーネントアンマウント時にタイムアウトをクリア
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (data: Omit<Ingredient, 'id'>) => {
    setIsSubmitting(true);
    setSuccessMessage('');

    // 擬似的な非同期処理（実際のAPIコールを想定）
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newIngredient: Ingredient = {
      ...data,
      id: `ing-${Date.now()}`,
    };

    setRegisteredIngredients((prev) => [...prev, newIngredient]);
    
    if (onSave) {
      onSave(newIngredient);
    }

    setSuccessMessage(`「${data.name}」を登録しました`);
    setIsSubmitting(false);

    // 既存のタイムアウトをクリア
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // 成功メッセージを数秒後に消す
    timeoutRef.current = window.setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="ingredient-page">
      <div className="page-header">
        <h2 className="page-title">食材登録</h2>
        <p className="page-description">
          新しい食材をシステムに登録します。必須項目を入力してください。
        </p>
      </div>

      {successMessage && (
        <div className="success-message" role="alert">
          ✓ {successMessage}
        </div>
      )}

      <IngredientForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

      {registeredIngredients.length > 0 && (
        <div className="registered-list">
          <div className="registered-header">
            <h3>登録済み食材 ({registeredIngredients.length}件)</h3>
            <div className="view-toggle">
              <button
                type="button"
                className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
                onClick={() => setViewMode('card')}
                aria-label="カード表示"
              >
                ▦ カード
              </button>
              <button
                type="button"
                className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="一覧表示"
              >
                ☰ 一覧
              </button>
            </div>
          </div>

          {viewMode === 'card' ? (
            <div className="ingredient-cards">
              {registeredIngredients.map((ing) => (
                <div key={ing.id} className="ingredient-card">
                  {ing.imageUrl ? (
                    <img
                      src={ing.imageUrl}
                      alt={ing.name}
                      className="card-image"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="card-image-placeholder">🥬</div>
                  )}
                  <div className="card-content">
                    <span className="ing-code">{ing.code}</span>
                    <span className="ing-name">{ing.name}</span>
                    <span className="ing-price">¥{ing.purchasePrice.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ul className="ingredient-list-view">
              {registeredIngredients.map((ing) => (
                <li key={ing.id}>
                  {ing.imageUrl && (
                    <img
                      src={ing.imageUrl}
                      alt={ing.name}
                      className="list-thumbnail"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  {!ing.imageUrl && <span className="list-thumbnail-placeholder">🥬</span>}
                  <span className="ing-code">{ing.code}</span>
                  <span className="ing-name">{ing.name}</span>
                  <span className="ing-price">¥{ing.purchasePrice.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

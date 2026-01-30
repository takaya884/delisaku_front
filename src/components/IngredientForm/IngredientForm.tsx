import React, { useState } from 'react';
import { Ingredient } from '../../types';
import './IngredientForm.css';

interface IngredientFormProps {
  initialData?: Partial<Ingredient>;
  onSubmit: (data: Omit<Ingredient, 'id'>) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export const IngredientForm: React.FC<IngredientFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState({
    code: initialData?.code || '',
    name: initialData?.name || '',
    unit: initialData?.unit || '',
    packageQuantity: initialData?.packageQuantity || 1,
    purchasePrice: initialData?.purchasePrice || 0,
    expiryDate: initialData?.expiryDate || '',
    imageUrl: initialData?.imageUrl || '',
    orderUrl: initialData?.orderUrl || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageLoadError, setImageLoadError] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.code.trim()) {
      newErrors.code = '食材コードは必須です';
    }
    if (!formData.name.trim()) {
      newErrors.name = '食材名は必須です';
    }
    if (!formData.unit.trim()) {
      newErrors.unit = '単位は必須です';
    }
    if (isNaN(formData.packageQuantity) || formData.packageQuantity <= 0) {
      newErrors.packageQuantity = '入数は1以上を入力してください';
    }
    if (isNaN(formData.purchasePrice) || formData.purchasePrice < 0) {
      newErrors.purchasePrice = '仕入価格は0以上を入力してください';
    }
    if (formData.orderUrl && !isValidUrl(formData.orderUrl)) {
      newErrors.orderUrl = '有効なURLを入力してください';
    }
    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = '有効なURLを入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
    
    // 画像URLが変更されたらエラー状態をリセット
    if (name === 'imageUrl') {
      setImageLoadError(false);
    }
    
    // エラーをクリア
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="ingredient-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3 className="section-title">基本情報</h3>
        
        <div className="form-group">
          <label htmlFor="code" className="form-label">
            食材コード <span className="required">*</span>
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className={`form-input ${errors.code ? 'error' : ''}`}
            placeholder="例: ING001"
            disabled={isSubmitting}
          />
          {errors.code && <span className="error-message">{errors.code}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="name" className="form-label">
            食材名 <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="例: トマト"
            disabled={isSubmitting}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="unit" className="form-label">
              単位 <span className="required">*</span>
            </label>
            <input
              type="text"
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className={`form-input ${errors.unit ? 'error' : ''}`}
              placeholder="例: kg"
              disabled={isSubmitting}
            />
            {errors.unit && <span className="error-message">{errors.unit}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="packageQuantity" className="form-label">
              入数 <span className="required">*</span>
            </label>
            <input
              type="number"
              id="packageQuantity"
              name="packageQuantity"
              value={formData.packageQuantity}
              onChange={handleChange}
              className={`form-input ${errors.packageQuantity ? 'error' : ''}`}
              min="1"
              disabled={isSubmitting}
            />
            {errors.packageQuantity && (
              <span className="error-message">{errors.packageQuantity}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="purchasePrice" className="form-label">
            仕入価格（円） <span className="required">*</span>
          </label>
          <input
            type="number"
            id="purchasePrice"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleChange}
            className={`form-input ${errors.purchasePrice ? 'error' : ''}`}
            min="0"
            disabled={isSubmitting}
          />
          {errors.purchasePrice && (
            <span className="error-message">{errors.purchasePrice}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="expiryDate" className="form-label">
            賞味期限
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="form-input"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">追加情報</h3>

        <div className="form-group">
          <label htmlFor="imageUrl" className="form-label">
            商品画像URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={`form-input ${errors.imageUrl ? 'error' : ''}`}
            placeholder="https://example.com/image.jpg"
            disabled={isSubmitting}
          />
          {errors.imageUrl && (
            <span className="error-message">{errors.imageUrl}</span>
          )}
          {formData.imageUrl && !errors.imageUrl && !imageLoadError && (
            <div className="image-preview">
              <img 
                src={formData.imageUrl} 
                alt="プレビュー" 
                onError={() => setImageLoadError(true)}
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="orderUrl" className="form-label">
            発注先URL
          </label>
          <input
            type="url"
            id="orderUrl"
            name="orderUrl"
            value={formData.orderUrl}
            onChange={handleChange}
            className={`form-input ${errors.orderUrl ? 'error' : ''}`}
            placeholder="https://example.com/order"
            disabled={isSubmitting}
          />
          {errors.orderUrl && (
            <span className="error-message">{errors.orderUrl}</span>
          )}
        </div>
      </div>

      <div className="form-actions">
        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            キャンセル
          </button>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? '登録中...' : '登録する'}
        </button>
      </div>
    </form>
  );
};

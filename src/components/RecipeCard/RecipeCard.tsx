import React from 'react';
import { Recipe } from '../../types';
import './RecipeCard.css';

interface RecipeCardProps {
  recipe: Recipe;
  onView?: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onView }) => {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="recipe-card">
      {recipe.imageUrl && (
        <div className="recipe-image">
          <img src={recipe.imageUrl} alt={recipe.name} />
        </div>
      )}
      
      <div className="recipe-card-content">
        <div className="recipe-card-header">
          <h3 className="recipe-card-name">{recipe.name}</h3>
          <span className="recipe-card-category">{recipe.category}</span>
        </div>
        
        <p className="recipe-description">{recipe.description}</p>
        
        <div className="recipe-meta">
          <div className="meta-item">
            <span className="meta-icon">👥</span>
            <span className="meta-text">{recipe.servings}人分</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">⏱️</span>
            <span className="meta-text">{totalTime}分</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">🥘</span>
            <span className="meta-text">{recipe.ingredients.length}種類</span>
          </div>
        </div>
        
        <div className="recipe-ingredients-preview">
          <strong>材料:</strong>
          <div className="ingredients-list">
            {recipe.ingredients.slice(0, 3).map((ing, idx) => (
              <span key={idx} className="ingredient-tag">
                {ing.itemName}
              </span>
            ))}
            {recipe.ingredients.length > 3 && (
              <span className="ingredient-tag more">
                +{recipe.ingredients.length - 3}
              </span>
            )}
          </div>
        </div>
        
        {onView && (
          <button className="recipe-view-btn" onClick={() => onView(recipe)}>
            詳細を見る
          </button>
        )}
      </div>
    </div>
  );
};

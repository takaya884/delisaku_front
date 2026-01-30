import React from 'react';
import { Recipe } from '../../types';
import { RecipeCard } from '../RecipeCard/RecipeCard';
import './RecipeList.css';

interface RecipeListProps {
  recipes: Recipe[];
  onView?: (recipe: Recipe) => void;
}

export const RecipeList: React.FC<RecipeListProps> = ({ recipes, onView }) => {
  if (recipes.length === 0) {
    return (
      <div className="empty-state" role="status" aria-live="polite">
        <p>レシピがありません</p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onView={onView} />
      ))}
    </div>
  );
};

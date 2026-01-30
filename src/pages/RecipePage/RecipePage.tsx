import React from 'react';
import { RecipeList } from '../../components/RecipeList/RecipeList';
import { demoRecipes } from '../../data/demoData';
import { Recipe } from '../../types';
import './RecipePage.css';

export const RecipePage: React.FC = () => {
  const handleView = (recipe: Recipe) => {
    console.log('View recipe:', recipe);
  };

  return (
    <div className="page recipe-page">
      <div className="page-header">
        <h2 className="page-title">レシピ管理</h2>
        <button className="add-button">+ レシピ追加</button>
      </div>
      
      <div className="page-content">
        <RecipeList recipes={demoRecipes} onView={handleView} />
      </div>
    </div>
  );
};

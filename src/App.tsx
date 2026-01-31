import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { InventoryPage } from './pages/InventoryPage/InventoryPage';
import { RecipePage } from './pages/RecipePage/RecipePage';
import { IngredientPage } from './pages/IngredientPage';
import { IngredientListPage } from './pages/IngredientListPage';
import { DataInputPage } from './pages/DataInputPage';
import './styles/global.css';

type PageType = 'inventory' | 'recipes' | 'ingredients' | 'ingredient-list' | 'data-input';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('inventory');

  // Simple routing based on hash
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as PageType;
      if (['inventory', 'recipes', 'ingredients', 'ingredient-list', 'data-input'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'inventory':
        return <InventoryPage />;
      case 'recipes':
        return <RecipePage />;
      case 'ingredients':
        return <IngredientPage />;
      case 'ingredient-list':
        return <IngredientListPage />;
      case 'data-input':
        return <DataInputPage />;
      default:
        return <InventoryPage />;
    }
  };

  return (
    <Layout currentPath={`#${currentPage}`}>
      {renderPage()}
    </Layout>
  );
}

export default App;

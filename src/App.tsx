import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { InventoryPage } from './pages/InventoryPage/InventoryPage';
import { RecipePage } from './pages/RecipePage/RecipePage';
import './styles/global.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'inventory' | 'recipes'>('inventory');

  // Simple routing based on hash
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'inventory' || hash === 'recipes') {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        {currentPage === 'inventory' && <InventoryPage />}
        {currentPage === 'recipes' && <RecipePage />}
      </main>
    </div>
  );
}

export default App;

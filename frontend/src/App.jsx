import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import InventoryPage from './pages/InventoryPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import FeedbackPage from './pages/FeedbackPage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <Router>
      <div className="min-h-screen font-sans transition-colors duration-300">
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/community" element={<FeedbackPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

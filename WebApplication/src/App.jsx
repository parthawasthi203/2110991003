import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllProductsPage from './AllProductsPage';
import ProductCard from './ProductCard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AllProductsPage />} />
        <Route path="/product/:productId" element={<ProductCard />} />
      </Routes>
    </Router>
  );
}

export default App;
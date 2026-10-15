import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ProductModal } from './components/ProductModal';
import { AuthModal } from './components/AuthModal';
import { AdminHotshotModal } from './components/AdminHotshotModal';
import { CheckoutModal } from './components/CheckoutModal';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { OnSalePage } from './pages/OnSalePage';
import { CartPage } from './pages/CartPage';
import { NewsletterPage } from './pages/NewsletterPage';

export const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminHotshotOpen, setIsAdminHotshotOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <>
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenAdminModal={() => setIsAdminHotshotOpen(true)}
                onSelectProduct={setSelectedProduct}
              />
            }
          />
          <Route
            path="/products"
            element={<ProductsPage onSelectProduct={setSelectedProduct} />}
          />
          <Route
            path="/on-sale"
            element={<OnSalePage onSelectProduct={setSelectedProduct} />}
          />
          <Route
            path="/cart"
            element={<CartPage onOpenCheckout={() => setIsCheckoutOpen(true)} />}
          />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route
            path="*"
            element={
              <HomePage
                onOpenAdminModal={() => setIsAdminHotshotOpen(true)}
                onSelectProduct={setSelectedProduct}
              />
            }
          />
        </Routes>
      </main>

      <Footer />
      <Toast />

      {/* Modals */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {isAuthOpen && (
        <AuthModal onClose={() => setIsAuthOpen(false)} />
      )}

      {isAdminHotshotOpen && (
        <AdminHotshotModal
          onClose={() => setIsAdminHotshotOpen(false)}
          onUpdated={() => window.location.reload()}
        />
      )}

      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
      )}
    </>
  );
};

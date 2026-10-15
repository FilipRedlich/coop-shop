import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total_price: '0.00', total_items: 0 });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr));
    }, 3000);
  };

  const refreshCart = async () => {
    try {
      const data = await api.getCart();
      setCart(data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = async (productId, quantity = 1, productName = '') => {
    try {
      const res = await api.addToCart(productId, quantity);
      setCart(res.cart);
      showToast(productName ? `Dodano do koszyka: ${productName}` : 'Produkt został dodany do koszyka!', 'success');
      return res;
    } catch (err) {
      showToast(err.message || 'Nie udało się dodać produktu do koszyka', 'error');
      throw err;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await api.updateCartQuantity(productId, quantity);
      setCart(res.cart);
      return res;
    } catch (err) {
      showToast(err.message || 'Błąd przy aktualizacji ilości', 'error');
      throw err;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await api.removeFromCart(productId);
      setCart(res.cart);
      showToast('Produkt usunięty z koszyka.', 'info');
      return res;
    } catch (err) {
      showToast(err.message || 'Błąd przy usuwaniu produktu', 'error');
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      const res = await api.clearCart();
      setCart(res.cart);
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };

  const value = {
    cart,
    items: cart.items || [],
    totalPrice: cart.total_price || '0.00',
    totalItems: cart.total_items || 0,
    loading,
    toast,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
    showToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

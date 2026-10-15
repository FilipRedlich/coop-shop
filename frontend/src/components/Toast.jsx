import React from 'react';
import { useCart } from '../context/CartContext';

export const Toast = () => {
  const { toast } = useCart();
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className={`toast-container ${isSuccess ? 'toast-success' : ''} ${isError ? 'toast-error' : ''}`}>
      <i className={`bi ${isSuccess ? 'bi-check-circle-fill' : isError ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill'}`}
         style={{ color: isSuccess ? 'var(--success)' : isError ? 'var(--danger)' : 'var(--accent-primary)', fontSize: '1.2rem' }}></i>
      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{toast.message}</span>
    </div>
  );
};

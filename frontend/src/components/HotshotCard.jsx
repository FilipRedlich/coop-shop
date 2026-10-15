import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';

export const HotshotCard = ({ onOpenAdminModal, onSelectProduct }) => {
  const [product, setProduct] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 24, seconds: 18 });
  const { addToCart } = useCart();
  const { isStaff } = useAuth();

  const loadHotshot = () => {
    api.getHotshot()
      .then(setProduct)
      .catch((err) => console.error('Failed to load hotshot:', err));
  };

  useEffect(() => {
    loadHotshot();
  }, []);

  // Live countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 11, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!product) return null;

  const format2 = (n) => String(n).padStart(2, '0');

  return (
    <div className="hotshot-card">
      <div className="hotshot-badge-header">
        <div className="hotshot-pill">
          <i className="bi bi-fire"></i>
          <span>Gorący Strzał</span>
        </div>
        <div className="countdown-box">
          <i className="bi bi-clock-history"></i>
          <span>{format2(timeLeft.hours)}:{format2(timeLeft.minutes)}:{format2(timeLeft.seconds)}</span>
        </div>
      </div>

      <div
        className="hotshot-image-wrapper"
        onClick={() => onSelectProduct && onSelectProduct(product)}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={product.picture || '/static/shop/img/SUBCAT/MONITOR.jpg'}
          alt={product.name}
          className="hotshot-image"
          onError={(e) => { e.target.src = '/static/shop/img/SUBCAT/MONITOR.jpg'; }}
        />
        {product.is_discounted && (
          <div className="discount-circle">
            -{product.discount_percentage}%
          </div>
        )}
      </div>

      <div
        className="hotshot-name"
        onClick={() => onSelectProduct && onSelectProduct(product)}
        style={{ cursor: 'pointer' }}
        title={product.name}
      >
        {product.name}
      </div>

      <div className="hotshot-prices">
        <span className="price-current">{product.current_price} zł</span>
        {product.is_discounted && (
          <span className="price-old">{product.price} zł</span>
        )}
      </div>

      {/* Stock remaining bar */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: 4 }}>
          <span>Pozostało sztuk:</span>
          <span style={{ fontWeight: 700, color: '#f87171' }}>{product.quantity}</span>
        </div>
        <div style={{ width: '100%', height: 6, background: 'var(--bg-surface)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: `${Math.min(100, product.quantity * 8)}%`, height: '100%', background: 'var(--hotshot-gradient)', borderRadius: 3 }}></div>
        </div>
      </div>

      <button
        type="button"
        className="btn-hotshot-add"
        onClick={() => addToCart(product.id, 1, product.name)}
      >
        <i className="bi bi-cart-plus-fill"></i>
        <span>Dodaj do koszyka</span>
      </button>

      {/* Admin Button */}
      {isStaff && (
        <button
          type="button"
          onClick={onOpenAdminModal}
          style={{
            marginTop: '0.75rem',
            padding: '0.45rem',
            fontSize: '0.8rem',
            color: '#fbbf24',
            border: '1px dashed #fbbf24',
            borderRadius: 'var(--radius-sm)',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4
          }}
        >
          <i className="bi bi-gear-fill"></i>
          <span>Zmień Gorący Strzał (Admin)</span>
        </button>
      )}
    </div>
  );
};

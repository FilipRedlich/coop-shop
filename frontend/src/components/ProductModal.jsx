import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product.id, qty, product.name);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: 720 }} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem' }}>
          {/* Image */}
          <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={product.picture || '/static/shop/img/SUBCAT/CPU.jpg'}
              alt={product.name}
              style={{ maxHeight: 260, maxWidth: '100%', objectFit: 'contain' }}
              onError={(e) => { e.target.src = '/static/shop/img/SUBCAT/CPU.jpg'; }}
            />
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
              {product.category_name} &gt; {product.subcategory_name}
            </div>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '0.75rem' }}>
              {product.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fbbf24', fontSize: '0.9rem', marginBottom: '1rem' }}>
              <i className="bi bi-star-fill"></i>
              <span style={{ fontWeight: 700 }}>{product.rating}</span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginLeft: 4 }}>• W magazynie: {product.quantity} szt.</span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              {product.description || 'Najwyższej jakości sprzęt z pełną gwarancją producenta oraz natychmiastową wysyłką z magazynu centralnego.'}
            </p>

            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{product.current_price} zł</span>
              {product.is_discounted && (
                <>
                  <span style={{ fontSize: '1.1rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>{product.price} zł</span>
                  <span style={{ background: 'var(--danger)', color: '#fff', fontSize: '0.8rem', fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>
                    -{product.discount_percentage}%
                  </span>
                </>
              )}
            </div>

            {/* Quantity and CTA */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="qty-control" style={{ width: 120 }}>
                <button type="button" className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <div className="qty-value">{qty}</div>
                <button type="button" className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
              </div>

              <button
                type="button"
                className="btn-checkout"
                style={{ marginTop: 0, flex: 1 }}
                onClick={handleAdd}
              >
                <i className="bi bi-cart-plus-fill"></i>
                <span>Dodaj {qty > 1 ? `(${qty} szt.)` : ''} do koszyka</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

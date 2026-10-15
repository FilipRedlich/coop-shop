import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CartPage = ({ onOpenCheckout }) => {
  const { items, totalPrice, totalItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const numTotal = Number(totalPrice) || 0;
  const isFreeDelivery = numTotal >= 300 || numTotal === 0;
  const deliveryCost = isFreeDelivery ? 0 : 15.00;
  const finalTotal = (numTotal + deliveryCost).toFixed(2);

  if (items.length === 0) {
    return (
      <div className="container" style={{ marginTop: '3rem', textAlign: 'center' }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '4rem 2rem',
          maxWidth: 540,
          margin: '0 auto',
        }}>
          <i className="bi bi-cart-x" style={{ fontSize: '3.5rem', color: 'var(--text-dim)', marginBottom: '1.25rem', display: 'block' }}></i>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>Twój koszyk jest pusty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.5 }}>
            Nie dodałeś jeszcze żadnego produktu do koszyka. Sprawdź nasze najnowsze promocje i podzespoły komputerowe!
          </p>
          <Link to="/products" className="btn-checkout" style={{ display: 'inline-flex', width: 'auto', padding: '0.85rem 2rem' }}>
            Przejdź do zakupów
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
          Koszyk ({totalItems} {totalItems === 1 ? 'produkt' : totalItems < 5 ? 'produkty' : 'produktów'})
        </h1>
        <button
          type="button"
          onClick={clearCart}
          style={{ color: 'var(--text-dim)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}
          onMouseEnter={(e) => (e.target.style.color = 'var(--danger)')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--text-dim)')}
        >
          <i className="bi bi-trash"></i>
          <span>Wyczyść koszyk</span>
        </button>
      </div>

      <div className="cart-layout">
        {/* Items List */}
        <div className="cart-items-panel">
          {items.map((item) => (
            <div key={item.id} className="cart-item-row">
              {/* Thumbnail */}
              <img
                src={item.product.picture || '/static/shop/img/SUBCAT/CPU.jpg'}
                alt={item.product.name}
                className="cart-thumb"
                onError={(e) => { e.target.src = '/static/shop/img/SUBCAT/CPU.jpg'; }}
              />

              {/* Title & info */}
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 2 }}>
                  {item.product.subcategory_name}
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.35, color: '#fff', marginBottom: 4 }}>
                  {item.product.name}
                </h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Cena za szt.: <strong style={{ color: '#fff' }}>{item.product.current_price} zł</strong>
                </div>
              </div>

              {/* Quantity */}
              <div className="qty-control">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  title="Zmniejsz ilość"
                >
                  -
                </button>
                <div className="qty-value">{item.quantity}</div>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  title="Zwiększ ilość"
                >
                  +
                </button>
              </div>

              {/* Line total */}
              <div style={{ textAlign: 'right', fontWeight: 800, fontSize: '1.15rem', color: '#fff' }}>
                {item.line_total} zł
              </div>

              {/* Remove */}
              <button
                type="button"
                onClick={() => removeFromCart(item.product.id)}
                title="Usuń z koszyka"
                style={{ color: 'var(--text-dim)', fontSize: '1.1rem', transition: 'color 0.2s', textAlign: 'center' }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--danger)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--text-dim)')}
              >
                <i className="bi bi-x-circle"></i>
              </button>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="cart-summary-panel">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>Podsumowanie</h3>

          <div className="summary-row">
            <span>Wartość produktów:</span>
            <span style={{ fontWeight: 700, color: '#fff' }}>{totalPrice} zł</span>
          </div>

          <div className="summary-row">
            <span>Dostawa kurierem:</span>
            {isFreeDelivery ? (
              <span style={{ color: 'var(--success)', fontWeight: 700 }}>Darmowa</span>
            ) : (
              <span style={{ fontWeight: 700, color: '#fff' }}>15.00 zł</span>
            )}
          </div>

          {numTotal < 300 && (
            <div style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.65rem 0.85rem',
              fontSize: '0.8rem',
              color: 'var(--accent-primary)',
              marginBottom: '1rem',
            }}>
              Dodaj produkty za jeszcze <strong>{(300 - numTotal).toFixed(2)} zł</strong>, aby otrzymać darmową dostawę!
            </div>
          )}

          <div className="summary-row total">
            <span>Do zapłaty:</span>
            <span style={{ color: 'var(--accent-primary)' }}>{finalTotal} zł</span>
          </div>

          <button
            type="button"
            className="btn-checkout"
            onClick={onOpenCheckout}
          >
            <i className="bi bi-credit-card-fill"></i>
            <span>Przejdź do kasy</span>
          </button>

          <Link
            to="/products"
            style={{
              display: 'block',
              textAlign: 'center',
              color: 'var(--text-dim)',
              fontSize: '0.85rem',
              marginTop: '1rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--text-main)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--text-dim)')}
          >
            ← Kontynuuj zakupy
          </Link>
        </div>
      </div>
    </div>
  );
};

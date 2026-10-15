import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { api } from '../api';

export const OnSalePage = ({ onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProducts({ onSale: true })
      .then(setProducts)
      .catch((err) => console.error('Failed to load on-sale products:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(139, 92, 246, 0.15))',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: 'var(--radius-lg)',
        padding: '2.5rem',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'var(--danger)',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            padding: '3px 8px',
            borderRadius: 4,
            marginBottom: '0.75rem',
          }}>
            <i className="bi bi-tag-fill"></i>
            Strefa okazji i wyprzedaży
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Wyjątkowe rabaty nawet do -50%
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: 600 }}>
            Skorzystaj z limitowanych promocji na procesory, monitory, pamięci RAM i gotowe zestawy komputerowe. Liczba sztuk ograniczona!
          </p>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 2rem',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--danger)' }}>
            {products.length}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Aktywnych promocji
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>
          Ładowanie przecenionych produktów...
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>
          Obecnie brak aktywnych promocji. Sprawdź ponownie wkrótce!
        </div>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

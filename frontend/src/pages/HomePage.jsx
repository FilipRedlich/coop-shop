import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeroCarousel } from '../components/HeroCarousel';
import { HotshotCard } from '../components/HotshotCard';
import { ProductCard } from '../components/ProductCard';
import { api } from '../api';

export const HomePage = ({ onOpenAdminModal, onSelectProduct }) => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getCategories(),
      api.getProducts(),
    ])
      .then(([cats, prods]) => {
        setCategories(cats);
        setFeaturedProducts(prods);
      })
      .catch((err) => console.error('Failed to load home page data:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = featuredProducts.filter((p) => {
    if (activeTab === 'discounted') return p.is_discounted;
    if (activeTab === 'top-rated') return Number(p.rating) >= 4.8;
    return true;
  });

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero-section">
        <HeroCarousel />
        <HotshotCard
          onOpenAdminModal={onOpenAdminModal}
          onSelectProduct={onSelectProduct}
        />
      </section>

      {/* Value Propositions */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        margin: '3rem 0',
      }}>
        {[
          { icon: 'bi-truck', title: 'Darmowa dostawa', desc: 'Dla wszystkich zamówień od 300 zł' },
          { icon: 'bi-clock-history', title: 'Wysyłka w 24h', desc: 'Produkty wysyłane natychmiast z magazynu' },
          { icon: 'bi-shield-check', title: 'Pewna gwarancja', desc: 'Oryginalny sprzęt z pełną obsługą serwisu' },
          { icon: 'bi-arrow-counterclockwise', title: '14 dni na zwrot', desc: 'Bezproblemowy zwrot bez podawania przyczyny' },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(59, 130, 246, 0.1)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              flexShrink: 0,
            }}>
              <i className={`bi ${item.icon}`}></i>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff', marginBottom: 2 }}>{item.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Category quick links */}
      <section style={{ marginBottom: '3rem' }}>
        <div className="section-title-bar">
          <h2 className="section-title">Przeglądaj według kategorii</h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1rem',
        }}>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img
                src={cat.picture || '/static/shop/img/SUBCAT/PC.webp'}
                alt={cat.name}
                style={{ width: 64, height: 64, borderRadius: 'var(--radius-md)', objectFit: 'cover', marginBottom: '0.75rem' }}
                onError={(e) => { e.target.src = '/static/shop/img/SUBCAT/PC.webp'; }}
              />
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: 4 }}>
                {cat.name}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                {cat.subcategories?.length || 0} podkategorii
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="section-title-bar">
          <h2 className="section-title">Polecane produkty</h2>
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-surface)', padding: 4, borderRadius: 'var(--radius-md)' }}>
            {[
              { id: 'all', label: 'Wszystkie' },
              { id: 'top-rated', label: 'Top oceny' },
              { id: 'discounted', label: 'Zniżki' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.45rem 0.9rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-sm)',
                  background: activeTab === tab.id ? 'var(--bg-card)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-muted)',
                  transition: 'all 0.15s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-dim)' }}>
            Ładowanie produktów...
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.slice(0, 12).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

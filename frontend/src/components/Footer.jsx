import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useCart } from '../context/CartContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useCart();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await api.subscribeNewsletter(email);
      showToast(res.message, 'success');
      setEmail('');
    } catch (err) {
      showToast(err.message || 'Błąd zapisu do newslettera', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-grid">
          {/* About */}
          <div>
            <div className="brand-logo" style={{ marginBottom: '1rem' }}>
              <img src="/static/shop/img/shop_logo.svg" alt="Pestka" className="brand-icon" onError={(e) => { e.target.style.display = 'none'; }} />
              <span>PESTKA</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: 320 }}>
              Twój zaufany sklep ze sprzętem komputerowym, procesorami, kartami graficznymi i gotowymi zestawami do gier i pracy.
            </p>
            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '1.25rem' }}>
              <a href="#" aria-label="Facebook" style={{ color: 'inherit' }}><i className="bi bi-facebook"></i></a>
              <a href="#" aria-label="YouTube" style={{ color: 'inherit' }}><i className="bi bi-youtube"></i></a>
              <a href="#" aria-label="Instagram" style={{ color: 'inherit' }}><i className="bi bi-instagram"></i></a>
              <a href="#" aria-label="GitHub" style={{ color: 'inherit' }}><i className="bi bi-github"></i></a>
            </div>
          </div>

          {/* Catalog links */}
          <div>
            <h4 className="footer-col-title">Katalog</h4>
            <ul className="footer-links-list">
              <li><Link to="/products?category=1" className="footer-link">Podzespoły PC</Link></li>
              <li><Link to="/products?category=2" className="footer-link">Komputery stacjonarne</Link></li>
              <li><Link to="/products?category=3" className="footer-link">Strefa Gaming</Link></li>
              <li><Link to="/on-sale" className="footer-link" style={{ color: '#f87171' }}>Promocje i Wyprzedaże</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="footer-col-title">Obsługa klienta</h4>
            <ul className="footer-links-list">
              <li><span className="footer-link">Czas i koszt dostawy</span></li>
              <li><span className="footer-link">Zwroty i reklamacje (14 dni)</span></li>
              <li><span className="footer-link">Status zamówienia</span></li>
              <li><span className="footer-link">Gwarancja i serwis</span></li>
            </ul>
          </div>

          {/* Newsletter box */}
          <div>
            <h4 className="footer-col-title">Zapisz się na newsletter</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.4 }}>
              Otrzymuj unikalne kody rabatowe oraz powiadomienia o Gorącym Strzale jako pierwszy!
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 6 }}>
              <input
                type="email"
                required
                className="form-input"
                placeholder="Twój adres e-mail"
                style={{ padding: '0.6rem 0.85rem', fontSize: '0.85rem' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                style={{
                  background: 'var(--accent-primary)',
                  color: '#fff',
                  padding: '0 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
                disabled={loading}
              >
                {loading ? '...' : 'Zapisz'}
              </button>
            </form>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          color: 'var(--text-dim)',
          fontSize: '0.85rem',
        }}>
          <div>© {new Date().getFullYear()} PESTKA (coop-shop). Wszystkie prawa zastrzeżone.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Regulamin</span>
            <span>Polityka prywatności</span>
            <span>Pliki cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

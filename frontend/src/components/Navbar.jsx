import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { api } from '../api';

export const Navbar = ({ onOpenAuth }) => {
  const { user, isAuthenticated, isStaff, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    api.getCategories()
      .then((data) => {
        setCategories(data);
        if (data.length > 0) setActiveCategory(data[0]);
      })
      .catch((err) => console.error('Failed to load categories:', err));
  }, []);

  // Close mega menu on route change or click outside
  useEffect(() => {
    setIsMegaMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="navbar-wrapper" ref={menuRef}>
      <div className="container navbar-container">
        {/* Brand */}
        <Link to="/" className="brand-logo">
          <img src="/static/shop/img/shop_logo.svg" alt="Pestka" className="brand-icon" onError={(e) => { e.target.style.display = 'none'; }} />
          <span>PESTKA</span>
        </Link>

        {/* Search */}
        <form className="nav-search-bar" onSubmit={handleSearchSubmit}>
          <i className="bi bi-search nav-search-icon"></i>
          <input
            type="text"
            className="nav-search-input"
            placeholder="Szukaj procesorów, kart graficznych, laptopów..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Actions */}
        <nav className="nav-actions">
          <Link to="/on-sale" className={`nav-link-btn sale-link ${location.pathname === '/on-sale' ? 'active' : ''}`}>
            <i className="bi bi-tag-fill"></i>
            <span>Okazje</span>
          </Link>

          <Link to="/newsletter" className={`nav-link-btn ${location.pathname === '/newsletter' ? 'active' : ''}`}>
            <i className="bi bi-envelope-paper"></i>
            <span>Newsletter</span>
          </Link>

          {isAuthenticated ? (
            <div className="user-badge">
              <i className="bi bi-person-circle" style={{ color: 'var(--accent-primary)', fontSize: '1.1rem' }}></i>
              <span>{user.username}</span>
              {isStaff && (
                <a href="/admin/" target="_blank" rel="noreferrer" title="Panel administracyjny Django" style={{ color: '#fbbf24', marginLeft: 4 }}>
                  <i className="bi bi-shield-lock-fill"></i>
                </a>
              )}
              <button
                type="button"
                onClick={logout}
                title="Wyloguj się"
                style={{ marginLeft: 6, color: 'var(--text-dim)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--danger)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--text-dim)')}
              >
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </div>
          ) : (
            <button type="button" className="nav-link-btn" onClick={onOpenAuth}>
              <i className="bi bi-person"></i>
              <span>Konto</span>
            </button>
          )}

          <Link to="/cart" className="nav-cart-btn">
            <i className="bi bi-cart3"></i>
            <span>Koszyk</span>
            <span className="nav-cart-badge">{totalItems}</span>
          </Link>
        </nav>
      </div>

      {/* Category Navigation Bar */}
      <div className="category-bar-wrapper">
        <div className="container category-bar">
          <button
            type="button"
            className={`category-btn ${isMegaMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
            style={{ fontWeight: 700, color: isMegaMenuOpen ? 'var(--accent-primary)' : 'var(--text-main)' }}
          >
            <i className="bi bi-grid-fill"></i>
            <span>Wszystkie kategorie</span>
            <i className={`bi bi-chevron-${isMegaMenuOpen ? 'up' : 'down'}`} style={{ fontSize: '0.8rem' }}></i>
          </button>

          {categories.slice(0, 5).map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="category-btn"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Mega Dropdown */}
        {isMegaMenuOpen && (
          <div className="category-dropdown-mega">
            <div className="container mega-dropdown-grid">
              {/* Category List Left */}
              <div className="mega-cat-list">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`mega-cat-item ${activeCategory?.id === cat.id ? 'active' : ''}`}
                    onMouseEnter={() => setActiveCategory(cat)}
                    onClick={() => {
                      navigate(`/products?category=${cat.id}`);
                      setIsMegaMenuOpen(false);
                    }}
                  >
                    <span>{cat.name}</span>
                    <i className="bi bi-chevron-right" style={{ fontSize: '0.8rem' }}></i>
                  </button>
                ))}
              </div>

              {/* Subcategory Grid Right */}
              <div className="mega-subcat-grid">
                {activeCategory?.subcategories?.map((sub) => (
                  <Link
                    key={sub.id}
                    to={`/products?subcategory=${sub.id}`}
                    className="subcat-card"
                    onClick={() => setIsMegaMenuOpen(false)}
                  >
                    <img
                      src={sub.picture || '/static/shop/img/SUBCAT/CPU.jpg'}
                      alt={sub.name}
                      className="subcat-img"
                      onError={(e) => { e.target.src = '/static/shop/img/SUBCAT/CPU.jpg'; }}
                    />
                    <div>
                      <div className="subcat-name">{sub.name}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        {sub.product_count} produktów
                      </span>
                    </div>
                  </Link>
                ))}
                {(!activeCategory?.subcategories || activeCategory.subcategories.length === 0) && (
                  <div style={{ color: 'var(--text-dim)', padding: '1rem' }}>Brak podkategorii w tej sekcji.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

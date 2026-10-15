import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useCart } from '../context/CartContext';

export const AdminHotshotModal = ({ onClose, onUpdated }) => {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [discountPercent, setDiscountPercent] = useState('30');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { showToast } = useCart();

  useEffect(() => {
    api.getProducts()
      .then((data) => {
        setProducts(data);
        if (data.length > 0) setSelectedId(data[0].id);
      })
      .catch((err) => setError('Nie udało się pobrać listy produktów.'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId) return;

    setLoading(true);
    setError('');

    const multiplier = (1 - Number(discountPercent) / 100).toFixed(2);

    try {
      const res = await api.setHotshot(selectedId, multiplier);
      showToast(res.message, 'success');
      if (onUpdated) onUpdated();
      onClose();
    } catch (err) {
      setError(err.message || 'Błąd podczas zmiany Gorącego Strzału.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
          <i className="bi bi-shield-lock-fill" style={{ color: '#fbbf24', fontSize: '1.5rem' }}></i>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Zarządzaj Gorącym Strzałem (Admin)</h2>
        </div>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Wybierz produkt z katalogu:</label>
            <select
              className="form-input"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.price} zł)
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Wysokość rabatu:</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['15', '25', '30', '40', '50'].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDiscountPercent(pct)}
                  style={{
                    flex: 1,
                    padding: '0.6rem 0',
                    borderRadius: 'var(--radius-sm)',
                    background: discountPercent === pct ? 'var(--danger)' : 'var(--bg-surface)',
                    color: '#fff',
                    fontWeight: 700,
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  -{pct}%
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn-checkout"
            style={{ background: 'var(--hotshot-gradient)', marginTop: '1.5rem' }}
            disabled={loading}
          >
            <i className="bi bi-fire"></i>
            <span>{loading ? 'Zapisywanie...' : 'Ustaw jako Gorący Strzał'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

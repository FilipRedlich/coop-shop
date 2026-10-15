import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';

export const CheckoutModal = ({ onClose }) => {
  const { cart, clearCart, showToast } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    full_name: user?.username ? `${user.username}` : '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    payment_method: 'BLIK',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [completedOrder, setCompletedOrder] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.checkout(formData);
      setCompletedOrder(res.order);
      await clearCart();
      // Celebrate with confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      showToast('Dziękujemy za złożenie zamówienia!', 'success');
    } catch (err) {
      setError(err.message || 'Wystąpił błąd podczas składania zamówienia.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: 580 }} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>

        {completedOrder ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              color: 'var(--success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              margin: '0 auto 1.5rem auto',
            }}>
              <i className="bi bi-check-lg"></i>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Zamówienie przyjęte do realizacji!
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Numer Twojego zamówienia: <strong style={{ color: '#fff' }}>{completedOrder.order_number}</strong>
            </p>

            <div style={{ background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'left', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: 'var(--text-dim)' }}>Odbiorca:</span>
                <span style={{ fontWeight: 600 }}>{completedOrder.full_name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: 'var(--text-dim)' }}>Adres:</span>
                <span style={{ fontWeight: 600 }}>{completedOrder.address}, {completedOrder.postal_code} {completedOrder.city}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: 'var(--text-dim)' }}>Płatność:</span>
                <span style={{ fontWeight: 600 }}>{completedOrder.payment_method}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: 8, marginTop: 8 }}>
                <span style={{ color: 'var(--text-dim)' }}>Kwota łączna:</span>
                <span style={{ fontWeight: 800, color: 'var(--success)' }}>{completedOrder.total_price} zł</span>
              </div>
            </div>

            <button type="button" className="btn-checkout" onClick={onClose}>
              Wróć do sklepu
            </button>
          </div>
        ) : (
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Dostawa i Płatność
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Wartość koszyka: <strong>{cart.total_price} zł</strong> ({cart.total_items} szt.)
            </p>

            {error && <div className="form-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Imię i nazwisko *</label>
                  <input
                    type="text"
                    required
                    name="full_name"
                    className="form-input"
                    placeholder="Jan Kowalski"
                    value={formData.full_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Numer telefonu *</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    className="form-input"
                    placeholder="np. 500 600 700"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Adres e-mail *</label>
                <input
                  type="email"
                  required
                  name="email"
                  className="form-input"
                  placeholder="twoj@email.pl"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Ulica i numer domu/lokalu *</label>
                <input
                  type="text"
                  required
                  name="address"
                  className="form-input"
                  placeholder="ul. Marszałkowska 12/4"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Kod pocztowy *</label>
                  <input
                    type="text"
                    required
                    name="postal_code"
                    className="form-input"
                    placeholder="00-001"
                    value={formData.postal_code}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Miejscowość *</label>
                  <input
                    type="text"
                    required
                    name="city"
                    className="form-input"
                    placeholder="Warszawa"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Metoda płatności:</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                  {['BLIK', 'Karta', 'Przelew', 'Pobranie'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setFormData({ ...formData, payment_method: method })}
                      style={{
                        padding: '0.65rem 0',
                        borderRadius: 'var(--radius-sm)',
                        background: formData.payment_method === method ? 'var(--accent-primary)' : 'var(--bg-surface)',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn-checkout"
                disabled={loading}
              >
                <span>{loading ? 'Przetwarzanie...' : `Zamawiam i płacę (${cart.total_price} zł)`}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

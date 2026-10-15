import React, { useState } from 'react';
import { api } from '../api';
import { useCart } from '../context/CartContext';

export const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { showToast } = useCart();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await api.subscribeNewsletter(email);
      setSuccess(res.message);
      showToast(res.message, 'success');
      setEmail('');
    } catch (err) {
      setError(err.message || 'Błąd zapisu do newslettera.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: '3rem', maxWidth: 680 }}>
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '3rem 2.5rem',
        textAlign: 'center',
      }}>
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'rgba(59, 130, 246, 0.15)',
          color: 'var(--accent-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          margin: '0 auto 1.5rem auto',
        }}>
          <i className="bi bi-envelope-paper-heart-fill"></i>
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          Dołącz do Klubu PESTKA
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          Zapisz się do naszego oficjalnego newslettera i odbierz <strong>kod rabatowy -20 zł</strong> na pierwsze zakupy! Będziesz otrzymywać powiadomienia o nowych Gorących Strzałach i przecenach jako pierwszy.
        </p>

        {success && (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--success)', color: '#6ee7b7', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            <i className="bi bi-check-circle-fill" style={{ marginRight: 8 }}></i>
            {success}
          </div>
        )}

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
          <input
            type="email"
            required
            className="form-input"
            placeholder="Twój najlepszy adres e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="btn-checkout"
            style={{ marginTop: 0, width: 'auto', padding: '0 2rem', whiteSpace: 'nowrap' }}
            disabled={loading}
          >
            <span>{loading ? 'Zapisywanie...' : 'Zapisz się'}</span>
          </button>
        </form>

        {/* Benefits list */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '2rem',
          textAlign: 'left',
        }}>
          <div>
            <i className="bi bi-gift" style={{ color: 'var(--accent-primary)', fontSize: '1.3rem', display: 'block', marginBottom: 6 }}></i>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 4 }}>Kody rabatowe</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>Ekskluzywne kupony dla subskrybentów</p>
          </div>
          <div>
            <i className="bi bi-fire" style={{ color: 'var(--danger)', fontSize: '1.3rem', display: 'block', marginBottom: 6 }}></i>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 4 }}>Wcześniejszy dostęp</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>Informacje o Gorącym Strzale 15 minut wcześniej</p>
          </div>
          <div>
            <i className="bi bi-shield-lock" style={{ color: 'var(--success)', fontSize: '1.3rem', display: 'block', marginBottom: 6 }}></i>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 4 }}>Zero spamu</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>Możesz wypisać się w dowolnym momencie 1 kliknięciem</p>
          </div>
        </div>
      </div>
    </div>
  );
};

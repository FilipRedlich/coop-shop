import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const AuthModal = ({ onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const { refreshCart, showToast } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        await register(username, email, password);
        showToast('Konto zostało zarejestrowane i jesteś zalogowany!', 'success');
      } else {
        await login(username, password);
        showToast(`Zalogowano pomyślnie!`, 'success');
      }
      await refreshCart();
      onClose();
    } catch (err) {
      setError(err.message || 'Wystąpił błąd podczas autoryzacji.');
    } finally {
      setLoading(false);
    }
  };

  const setDemoCredentials = (u, p) => {
    setIsRegister(false);
    setUsername(u);
    setPassword(p);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>

        {/* Tab switch */}
        <div style={{ display: 'flex', background: 'var(--bg-surface)', padding: 4, borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
          <button
            type="button"
            onClick={() => { setIsRegister(false); setError(''); }}
            style={{
              flex: 1,
              padding: '0.65rem 0',
              fontWeight: 700,
              fontSize: '0.95rem',
              borderRadius: 'var(--radius-sm)',
              background: !isRegister ? 'var(--bg-card)' : 'transparent',
              color: !isRegister ? 'var(--accent-primary)' : 'var(--text-muted)',
              transition: 'all 0.2s',
            }}
          >
            Logowanie
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(true); setError(''); }}
            style={{
              flex: 1,
              padding: '0.65rem 0',
              fontWeight: 700,
              fontSize: '0.95rem',
              borderRadius: 'var(--radius-sm)',
              background: isRegister ? 'var(--bg-card)' : 'transparent',
              color: isRegister ? 'var(--accent-primary)' : 'var(--text-muted)',
              transition: 'all 0.2s',
            }}
          >
            Rejestracja
          </button>
        </div>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nazwa użytkownika / Login:</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="np. jan_kowalski"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {isRegister && (
            <div className="form-group">
              <label className="form-label">Adres e-mail:</label>
              <input
                type="email"
                required
                className="form-input"
                placeholder="np. jan@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Hasło:</label>
            <input
              type="password"
              required
              className="form-input"
              placeholder="Wprowadź hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn-checkout"
            disabled={loading}
          >
            <span>{loading ? 'Przetwarzanie...' : isRegister ? 'Zarejestruj się' : 'Zaloguj się'}</span>
          </button>
        </form>

        {/* Demo helpers */}
        {!isRegister && (
          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Konta testowe:</span>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: 8 }}>
              <button
                type="button"
                onClick={() => setDemoCredentials('admin', 'admin123')}
                style={{ fontSize: '0.75rem', background: 'var(--bg-surface)', padding: '4px 8px', borderRadius: 4, color: '#fbbf24', border: '1px solid var(--border-subtle)' }}
              >
                Admin (admin / admin123)
              </button>
              <button
                type="button"
                onClick={() => setDemoCredentials('klient', 'klient123')}
                style={{ fontSize: '0.75rem', background: 'var(--bg-surface)', padding: '4px 8px', borderRadius: 4, color: 'var(--accent-primary)', border: '1px solid var(--border-subtle)' }}
              >
                Klient (klient / klient123)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

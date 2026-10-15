import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { api } from '../api';

export const ProductsPage = ({ onSelectProduct }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryId = searchParams.get('category') || '';
  const subcategoryId = searchParams.get('subcategory') || '';
  const search = searchParams.get('search') || '';
  const ordering = searchParams.get('ordering') || '';

  useEffect(() => {
    api.getCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    api.getProducts({
      category: categoryId,
      subcategory: subcategoryId,
      search: search,
      ordering: ordering,
    })
      .then(setProducts)
      .catch((err) => console.error('Failed to load products:', err))
      .finally(() => setLoading(false));
  }, [categoryId, subcategoryId, search, ordering]);

  const handleSortChange = (e) => {
    const val = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (val) {
      newParams.set('ordering', val);
    } else {
      newParams.delete('ordering');
    }
    setSearchParams(newParams);
  };

  const clearFilter = (key) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    setSearchParams(newParams);
  };

  // Find active category or subcategory name for the heading
  let pageHeading = 'Wszystkie produkty';
  if (search) {
    pageHeading = `Wyniki wyszukiwania dla: "${search}"`;
  } else if (subcategoryId) {
    for (const cat of categories) {
      const foundSub = cat.subcategories?.find((s) => String(s.id) === String(subcategoryId));
      if (foundSub) {
        pageHeading = `${cat.name} > ${foundSub.name}`;
        break;
      }
    }
  } else if (categoryId) {
    const foundCat = categories.find((c) => String(c.id) === String(categoryId));
    if (foundCat) pageHeading = foundCat.name;
  }

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>{pageHeading}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Znaleziono {products.length} {products.length === 1 ? 'produkt' : products.length < 5 ? 'produkty' : 'produktów'}
          </p>
        </div>

        {/* Sort Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 600 }}>Sortuj:</span>
          <select
            className="form-input"
            style={{ width: 'auto', padding: '0.5rem 1rem' }}
            value={ordering}
            onChange={handleSortChange}
          >
            <option value="">Domyślnie</option>
            <option value="price">Cena: od najniższej</option>
            <option value="-price">Cena: od najwyższej</option>
            <option value="-rating">Najwyżej oceniane</option>
            <option value="name">Nazwa: A-Z</option>
          </select>
        </div>
      </div>

      {/* Active filters badges */}
      {(categoryId || subcategoryId || search) && (
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Filtry:</span>
          {search && (
            <span style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '3px 8px', borderRadius: 4, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6 }}>
              Szukaj: {search}
              <button type="button" onClick={() => clearFilter('search')} style={{ color: 'var(--text-dim)' }}><i className="bi bi-x"></i></button>
            </span>
          )}
          {categoryId && (
            <span style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '3px 8px', borderRadius: 4, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6 }}>
              Kategoria: #{categoryId}
              <button type="button" onClick={() => clearFilter('category')} style={{ color: 'var(--text-dim)' }}><i className="bi bi-x"></i></button>
            </span>
          )}
          {subcategoryId && (
            <span style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '3px 8px', borderRadius: 4, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6 }}>
              Podkategoria: #{subcategoryId}
              <button type="button" onClick={() => clearFilter('subcategory')} style={{ color: 'var(--text-dim)' }}><i className="bi bi-x"></i></button>
            </span>
          )}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>
          Ładowanie produktów...
        </div>
      ) : products.length === 0 ? (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '4rem 2rem',
          textAlign: 'center',
          maxWidth: 500,
          margin: '2rem auto',
        }}>
          <i className="bi bi-search" style={{ fontSize: '3rem', color: 'var(--text-dim)', marginBottom: '1rem', display: 'block' }}></i>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Brak produktów</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Nie znaleziono produktów spełniających podane kryteria. Spróbuj zmienić parametry wyszukiwania.
          </p>
          <button
            type="button"
            className="btn-add-cart"
            style={{ width: 'auto', display: 'inline-flex' }}
            onClick={() => setSearchParams({})}
          >
            Pokaż wszystkie produkty
          </button>
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

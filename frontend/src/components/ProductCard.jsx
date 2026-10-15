import React from 'react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product, onSelect }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div
        className="product-card-img-holder"
        onClick={() => onSelect && onSelect(product)}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={product.picture || '/static/shop/img/SUBCAT/CPU.jpg'}
          alt={product.name}
          className="product-card-img"
          onError={(e) => { e.target.src = '/static/shop/img/SUBCAT/CPU.jpg'; }}
        />
        {product.is_discounted && (
          <div className="badge-discount">
            -{product.discount_percentage}%
          </div>
        )}
      </div>

      <div className="product-cat-tag">
        {product.subcategory_name || 'Komputery'}
      </div>

      <h3
        className="product-title"
        onClick={() => onSelect && onSelect(product)}
        style={{ cursor: 'pointer' }}
        title={product.name}
      >
        {product.name}
      </h3>

      <div className="product-rating">
        <i className="bi bi-star-fill"></i>
        <span style={{ fontWeight: 700 }}>{product.rating}</span>
        <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', marginLeft: 4 }}>
          ({Math.floor(Number(product.rating) * 7 + 3)} opinii)
        </span>
      </div>

      <div className="product-price-row">
        <span className="card-current-price">{product.current_price} zł</span>
        {product.is_discounted && (
          <span className="card-old-price">{product.price} zł</span>
        )}
      </div>

      <button
        type="button"
        className="btn-add-cart"
        onClick={() => addToCart(product.id, 1, product.name)}
      >
        <i className="bi bi-cart-plus"></i>
        <span>Do koszyka</span>
      </button>
    </div>
  );
};

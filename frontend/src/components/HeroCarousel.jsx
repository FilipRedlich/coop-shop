import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    id: 1,
    image: '/static/shop/img/GALLERY/HALOWEEN_DEAL.png',
    title: 'Halloween Deal',
    subtitle: 'Wielkie promocje na podzespoły komputerowe i akcesoria',
    link: '/on-sale',
  },
  {
    id: 2,
    image: '/static/shop/img/GALLERY/MORE.png',
    title: 'Zbuduj Swój Wymarzony PC',
    subtitle: 'Najnowsze procesory Ryzen i karty graficzne GeForce RTX',
    link: '/products',
  },
];

export const HeroCarousel = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel-container">
      {SLIDES.map((slide, idx) => (
        <Link
          key={slide.id}
          to={slide.link}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: idx === currentIdx ? 1 : 0,
            pointerEvents: idx === currentIdx ? 'auto' : 'none',
            transition: 'opacity 0.6s ease-in-out',
          }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="carousel-slide"
            onError={(e) => {
              // Fallback gradient if image not loaded
              e.target.style.display = 'none';
            }}
          />
        </Link>
      ))}

      {/* Dots */}
      <div className="carousel-controls">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`carousel-dot ${idx === currentIdx ? 'active' : ''}`}
            onClick={() => setCurrentIdx(idx)}
            aria-label={`Przejdź do slajdu ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

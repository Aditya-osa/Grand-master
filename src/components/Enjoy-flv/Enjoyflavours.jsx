import React, { useRef } from 'react';
import './Enjoy-flv.css';
import { flavor1, flavor2, flavor3, flavor4 } from '../../assets/Flavors';

const FLAVOUR_ITEMS = [
  {
    id: 1,
    title: 'Zesty Lemon Toast',
    image: flavor1,
    alt: "Grand Master Zesty Lemon Vodka celebration at sunset beach",
  },
  {
    id: 2,
    title: 'Strawberry Beach Sunset',
    image: flavor2,
    alt: "Grand Master Strawberry Platinum Vodka cocktail on beach table",
  },
  {
    id: 3,
    title: 'Trio Collection',
    image: flavor3,
    alt: "Grand Master Cranberry, Blue Berry and Green Apple Vodka lineup on tropical beach",
  },
  {
    id: 4,
    title: 'Signature Coastline Flask',
    image: flavor4,
    alt: "Grand Master iconic bottle on beach towel by the sea",
  },
];

export default function Enjoyflavours() {
  const cardsContainerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = cardsContainerRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleExploreClick = (e) => {
    e.preventDefault();
    const target =
      document.getElementById('products') ||
      document.querySelector('.ag-hero') ||
      document.querySelector('[aria-label="Grand Master Products"]');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="enjoy-flavours-section"
      id="flavours"
      aria-label="Enjoy Unique Flavours"
    >
      <div className="enjoy-flavours-inner">
        {/* Top Header Row */}
        <div className="enjoy-flavours-header">
          {/* Left: Heading and Narrative Story */}
          <div className="enjoy-flavours-header-left">
            <h2 className="enjoy-flavours-title">ENJOY UNIQUE FLAVOURS</h2>
            <p className="enjoy-flavours-description">
              It is the perfect combination between quality distillate in an unique bottle shape and urban culture inspiration. GRAND MASTER’S represents the stubborn eager free spirits of the young generation. Its exquisite nature shines through limits and cultural dogmas.
            </p>
          </div>

          {/* Right: Navigation Controls & Explore Button */}
          <div className="enjoy-flavours-header-right">
            <div className="enjoy-flavours-controls" role="group" aria-label="Slider Navigation">
              <button
                type="button"
                className="enjoy-flavours-nav-btn"
                onClick={() => handleScroll('left')}
                aria-label="Previous flavours"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
              <button
                type="button"
                className="enjoy-flavours-nav-btn"
                onClick={() => handleScroll('right')}
                aria-label="Next flavours"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

            <a
              href="#products"
              className="enjoy-flavours-explore-btn"
              onClick={handleExploreClick}
              aria-label="Explore all Grand Master flavours"
            >
              <span>Explore All Flavours</span>
              <span className="enjoy-flavours-explore-arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>
          </div>
        </div>

        {/* 4 Cards Row */}
        <div
          className="enjoy-flavours-cards"
          ref={cardsContainerRef}
          role="region"
          aria-label="Flavours Gallery"
        >
          {FLAVOUR_ITEMS.map((item) => (
            <article
              key={item.id}
              className="enjoy-flavours-card"
              tabIndex={0}
              aria-label={item.title}
            >
              <div className="enjoy-flavours-img-wrap">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="enjoy-flavours-img"
                  loading="lazy"
                />
h              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

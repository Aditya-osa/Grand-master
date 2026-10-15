import React, { useRef } from 'react';
import './Enjoy-flv.css';
import { flavor1, flavor2, flavor3, flavor4 } from '../../assets/Flavors';
import bgImage from '../../assets/image copy 4.png';

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
      aria-label="Discover Distinctive Flavours"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="enjoy-flavours-inner">
        {/* Top Header Row */}
        <div className="enjoy-flavours-header">
          {/* Left: Heading and Narrative Story */}
          <div className="enjoy-flavours-header-left">
            <h2 className="enjoy-flavours-title">DISCOVER DISTINCTIVE FLAVOURS</h2>
            <p className="enjoy-flavours-description">
              From vibrant citrus to luscious berries, Grand Master's brings a bold world of flavour and contemporary style together. Discover a range crafted to stand out, with every variant bringing its own unique character.
            </p>
          </div>

          {/* Right: Navigation Controls & Explore Button */}
          <div className="enjoy-flavours-header-right">
            <div className="enjoy-flavours-controls" role="group" aria-label="Slider Navigation">
              
              
                
                
             
            </div>

            <a
              href="#products"
              className="enjoy-flavours-explore-btn"
              onClick={handleExploreClick}
              aria-label="Explore Flavours"
            >
              <span>EXPLORE FLAVOURS </span>
              <svg
                className="enjoy-flavours-explore-arrow"
                width="15"
                height="11"
                viewBox="0 0 16 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="2" y1="6" x2="14" y2="6" />
                <polyline points="9.5 2.5 14 6 9.5 9.5" />
              </svg>
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

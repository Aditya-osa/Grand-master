import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import bannerImg from '../../assets/image.png';
import bannerVideo from '../../assets/6a4659235173f72a046a6f90_6a5e3a721a51901c488abdee_banner video _mp4.mp4';
import { PRODUCTS_DATA as ALL_PRODUCTS, formatProductName } from './productData';
import ProductDetail from './ProductDetail';
import './products.css';

gsap.registerPlugin(ScrollTrigger);

const INITIAL_BATCH = 8;
const INCREMENT_BATCH = 4;

export default function Products() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const [activeDetailId, setActiveDetailId] = useState(() => {
    const hash = (window.location.hash || '').toLowerCase();
    if (hash.startsWith('#product-detail-')) return hash.replace('#product-detail-', '');
    if (hash.startsWith('#product-')) {
      const id = hash.replace('#product-', '');
      if (ALL_PRODUCTS.some((p) => p.id === id)) return id;
    }
    return null;
  });

  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const isInitialMount = useRef(true);

  // Sync hash changes for detail routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = (window.location.hash || '').toLowerCase();
      if (hash.startsWith('#product-detail-')) {
        const id = hash.replace('#product-detail-', '');
        setActiveDetailId(id);
      } else if (hash.startsWith('#product-')) {
        const id = hash.replace('#product-', '');
        if (ALL_PRODUCTS.some((p) => p.id === id)) {
          setActiveDetailId(id);
        } else {
          setActiveDetailId(null);
        }
      } else if (hash === '#products' || hash === '#collection') {
        setActiveDetailId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Entrance animations for the full-screen banner
  useEffect(() => {
    if (activeDetailId) return;

    const ctx = gsap.context(() => {
      const el = heroRef.current;
      if (!el) return;

      const badge = el.querySelector('.gm-products-banner-badge');
      const title = el.querySelector('.gm-products-banner-title');
      const desc = el.querySelector('.gm-products-banner-desc');
      const cards = el.querySelectorAll('.gm-product-card');
      const grid = el.querySelector('.gm-products-grid');

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (badge) {
        tl.fromTo(badge, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.15 });
      }
      if (title) {
        tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, badge ? '-=0.5' : 0);
      }
      if (desc) {
        tl.fromTo(desc, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, title ? '-=0.5' : 0);
      }

      if (cards && cards.length > 0 && grid) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [activeDetailId]);

  // Animate newly revealed products on "View More" click
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const newCards = document.querySelectorAll('.gm-product-card--new');
    if (newCards.length > 0) {
      gsap.fromTo(
        newCards,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all',
        }
      );
    }
  }, [visibleCount]);

  const handleScrollToGrid = (e) => {
    e.preventDefault();
    const target = document.getElementById('collection-grid');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + INCREMENT_BATCH, ALL_PRODUCTS.length));
  };

  const handleGoToDetail = (productId) => {
    setActiveDetailId(productId);
    window.location.hash = `#product-${productId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCollection = () => {
    setActiveDetailId(null);
    window.location.hash = '#products';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If a bottle detail is active, render the dedicated Product Detail Page
  if (activeDetailId) {
    return (
      <ProductDetail
        productId={activeDetailId}
        onBack={handleBackToCollection}
        onSelectProduct={handleGoToDetail}
      />
    );
  }

  const displayedProducts = ALL_PRODUCTS;

  return (
    <div className="gm-products-page-wrapper" id="products-page">
      {/* Global Brand Navbar */}
      <Navbar />

      <main className="gm-products-main" role="main" ref={heroRef}>
        {/* ====================================================================
            1. FULL-SCREEN PRODUCTS BANNER (min-height: 100svh / 100vh)
            Consistent with Contact Us banner design language
            ==================================================================== */}
        <section
          className="gm-products-banner"
          aria-label="Grand Master Spirits Collection Banner"
        >
          <div className="gm-products-banner-overlay" aria-hidden="true" />
          <video
            className="gm-products-banner-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={bannerImg}
          >
            <source src={bannerVideo} type="video/mp4" />
            <img
              src={bannerImg}
              alt="Grand Master Spirits Heritage Collection"
              className="gm-products-banner-image"
            />
          </video>

          {/* Giant Background Watermark Text matching Contact Us */}
       
          {/* Foreground Hero Content Lockup */}
          <div className="gm-products-banner-content">
            <span className="gm-products-banner-badge">DISCOVER THE COLLECTION</span>
            <h1 className="gm-products-banner-title">OUR PRODUCTS</h1>
            <p className="gm-products-banner-desc">
              Discover distinctive flavours, crafted to stand out.
            </p>
          </div>
        </section>

        {/* ====================================================================
            2. PRODUCTS COLLECTION SECTION (Directly Below Banner)
            ==================================================================== */}
        <section
          className="gm-products-collection"
          id="collection-grid"
          aria-label="Grand Master Platinum Vodka Range"
          ref={gridRef}
        >
          <div className="gm-products-container">
           

            {/* Product Cards Grid */}
            <div className="gm-products-grid">
              {displayedProducts.map((product, index) => {
                const isNewlyAdded = index >= INITIAL_BATCH;
                return (
                  <article
                    key={product.id + '-' + index}
                    className={`gm-product-card ${isNewlyAdded ? 'gm-product-card--new' : ''}`}
                    aria-label={product.name}
                  >
                    {/* Bottle Presentation Stage */}
                    <div 
                      className="gm-product-stage"
                      onClick={() => handleGoToDetail(product.id)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View detail of ${product.name}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleGoToDetail(product.id);
                        }
                      }}
                    >
                      <img
                        src={product.img}
                        alt={product.name}
                        className="gm-product-bottle-img"
                        loading="lazy"
                      />
                    </div>

                    {/* Product Metadata Details */}
                    <div className="gm-product-meta">
                      <span className="gm-product-tag">{product.tag}</span>
                      <h3 className="gm-product-name">
                        {(() => {
                          const { prefix, flavor } = formatProductName(product.name);
                          return prefix ? (
                            <>
                              <span className="gm-name-prefix">{prefix}</span>
                              <span className="gm-name-flavor">{flavor}</span>
                            </>
                          ) : (
                            product.name
                          );
                        })()}
                      </h3>

                      {/* View Button for Every Bottle -> Navigates to Detail Page */}
                      <button
                        type="button"
                        className="gm-hero-action-btn gm-card-view-btn"
                        onClick={() => handleGoToDetail(product.id)}
                        aria-label={`View detail of ${product.name}`}
                      >
                        <span>VIEW PRODUCT</span>
                        <span className="gm-skip-arrow">→</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}

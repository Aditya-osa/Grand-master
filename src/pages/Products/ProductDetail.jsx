import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { PRODUCTS_DATA } from './productData';
import './ProductDetail.css';

export default function ProductDetail({ productId = 'blueberry', onBack, onSelectProduct }) {
  const [selectedSize, setSelectedSize] = useState('750 ML');

  // Find the active product or fallback to blueberry
  const product = useMemo(() => {
    return PRODUCTS_DATA.find((p) => p.id === productId) || PRODUCTS_DATA[0];
  }, [productId]);

  // 4 other bottles for the bottom section
  const relatedBottles = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => p.id !== product.id).slice(0, 4);
  }, [product.id]);

  // Scroll to top when bottle changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[product.sizes.length - 1]);
    }
  }, [product]);

  const handleBack = (e) => {
    if (e) e.preventDefault();
    if (typeof onBack === 'function') {
      onBack();
    } else {
      window.location.hash = '#products';
    }
  };

  const handleSelectRelated = (relatedId) => {
    if (typeof onSelectProduct === 'function') {
      onSelectProduct(relatedId);
    } else {
      window.location.hash = `#product-${relatedId}`;
    }
  };

  return (
    <div className="gm-detail-page-wrapper" id="product-detail-page">
      {/* Global Navbar */}
      <Navbar />

      <main className="gm-detail-main" role="main">
        {/* Back navigation bar */}
        <div className="gm-detail-topbar">
          <div className="gm-detail-container">
            <a
              href="#products"
              onClick={handleBack}
              className="gm-detail-back-btn"
              aria-label="Back to Products Collection"
            >
              <i className="ri-arrow-left-line" aria-hidden="true"></i>
              <span>BACK TO COLLECTION</span>
            </a>
          </div>
        </div>

        {/* Hero Product Detail Section */}
        <section className="gm-detail-hero" aria-label={product.fullName}>
          <div className="gm-detail-container">
            <div className="gm-detail-grid">
              {/* Left Column: Premium Bottle Stage */}
              <div className="gm-detail-stage-wrap">
                <div className="gm-detail-stage">
                  <img
                    src={product.img}
                    alt={product.fullName}
                    className="gm-detail-bottle-img"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Right Column: Narrative & Technical Specifications */}
              <div className="gm-detail-info">
            

                <h1 className="gm-detail-title">{product.fullName}</h1>

                <p className="gm-detail-tagline">{product.tagline}</p>

                <div className="gm-detail-desc-box">
                  <p className="gm-detail-description">{product.description}</p>
                </div>

                {/* Specs Box: Alcohol Content & Bottle Sizes */}
                <div className="gm-detail-specs-grid">
                  <div className="gm-spec-card">
                    <span className="gm-spec-label">Alcohol Content:</span>
                    <span className="gm-spec-value gm-spec-highlight">{product.alcohol}</span>
                  </div>

                  <div className="gm-spec-card">
                    <span className="gm-spec-label">Size:</span>
                    <div className="gm-size-options" role="group" aria-label="Available bottle sizes">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          className={`gm-size-pill ${selectedSize === size ? 'active' : ''}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tasting & Pairings Card */}
                <div className="gm-detail-pairings-card">
                  <div className="gm-pairings-header">
                    <i className="ri-goblet-line gm-pairings-icon" aria-hidden="true"></i>
                    <span className="gm-pairings-title">Tasting & Pairings:</span>
                  </div>
                  <p className="gm-pairings-text">{product.pairings}</p>
                </div>

                {/* Direct Action */}
                <div className="gm-detail-actions">
                  <a
                    href="#contact"
                    className="gm-hero-action-btn gm-detail-inquire-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.hash = '#contact';
                    }}
                  >
                    <span>Inquire About This Spirit</span>
                    <span className="gm-skip-arrow">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            "and at the end show 4 bootel"
            4 Bottle Showcase from the Grand Master Collection
            ==================================================================== */}
        <section className="gm-detail-related" aria-label="Explore more spirits">
          <div className="gm-detail-container">
            <div className="gm-related-header">
            
              <h2 className="gm-related-title">EXPLORE MORE SPIRITS</h2>
              <p className="gm-related-subtitle">
                Quadruple-distilled handcrafted vodkas infused with signature fruit and botanical essences.
              </p>
            </div>

            <div className="gm-related-grid">
              {relatedBottles.map((relProduct) => (
                <article
                  key={relProduct.id}
                  className="gm-related-card"
                  aria-label={relProduct.fullName}
                >
                  <div
                    className="gm-related-stage"
                    onClick={() => handleSelectRelated(relProduct.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${relProduct.fullName}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectRelated(relProduct.id);
                      }
                    }}
                  >
                    <img
                      src={relProduct.img}
                      alt={relProduct.fullName}
                      className="gm-related-img"
                      loading="lazy"
                    />
                  </div>

                  <div className="gm-related-meta">
                    <span className="gm-related-tag">{relProduct.tag}</span>
                    <h3 className="gm-related-name">{relProduct.name}</h3>

                    {/* View Button for related bottle */}
                    <button
                      type="button"
                      className="gm-hero-action-btn gm-related-view-btn"
                      onClick={() => handleSelectRelated(relProduct.id)}
                      aria-label={`View ${relProduct.name}`}
                    >
                      <span>View</span>
                      <span className="gm-skip-arrow">→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
}

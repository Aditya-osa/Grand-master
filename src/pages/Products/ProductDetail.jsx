import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { PRODUCTS_DATA, getProductImage, findProductById, formatProductName } from './productData';
import { distillationImg } from '../../assets/process';
import { zestyLemonCocktail, tableSocialLounge } from '../../assets/WhatsApp Unknown 2026-10-10 at 1.15.53 PM';
import bcImg5 from '../../assets/BC/5.jpg';
import bcImg6 from '../../assets/BC/6.jpg';
import melonImg35 from '../../assets/Melo/35.jpg';
import melonImg36 from '../../assets/Melo/36.jpg';
import brandVideo from '../../assets/6a4659235173f72a046a6f90_6a5e3a721a51901c488abdee_banner video _mp4.mp4';
import './ProductDetail.css';

export default function ProductDetail({ 
  productId = 'blueberry', 
  initialSize = '750 ML', 
  onBack, 
  onSelectProduct 
}) {
  // Find the active product safely
  const product = useMemo(() => {
    return findProductById(productId);
  }, [productId]);

  const [selectedSize, setSelectedSize] = useState(() => {
    if (initialSize && product.sizes && product.sizes.includes(initialSize)) {
      return initialSize;
    }
    return product.sizes && product.sizes.includes('750 ML') ? '750 ML' : product.sizes?.[0] || '750 ML';
  });

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  // Gallery items for the thumbnail strip below the bottle (using existing assets only)
  const galleryItems = useMemo(() => {
    const img750 = product.img750 || product.img;
    const img180 = product.img180 || product.img750 || product.img;
    const isBlueCuracao = product.id === 'blue-curacao';
    const isMelon = product.id === 'melon';

    return [
      {
        id: 'bottle-750',
        type: 'image',
        label: '750 ML',
        thumbSrc: img750,
        mainSrc: img750,
        size: '750 ML',
        alt: `${product.fullName} - 750 ML`,
        isBottle: true,
        bottleClass: 'gm-bottle-750ml'
      },
      {
        id: 'bottle-180',
        type: 'image',
        label: '180 ML',
        thumbSrc: img180,
        mainSrc: img180,
        size: '180 ML',
        alt: `${product.fullName} - 180 ML`,
        isBottle: true,
        bottleClass: 'gm-bottle-180ml'
      },
      {
        id: 'bottle-detail',
        type: 'closeup',
        label: 'Detail',
        thumbSrc: img750,
        mainSrc: img750,
        alt: `${product.fullName} Artwork Close-up`,
        isBottle: false
      },
      {
        id: 'cocktail-serve',
        type: 'image',
        label: 'Serve',
        thumbSrc: isBlueCuracao ? bcImg5 : isMelon ? melonImg35 : zestyLemonCocktail,
        mainSrc: isBlueCuracao ? bcImg5 : isMelon ? melonImg35 : zestyLemonCocktail,
        alt: `${product.fullName} Signature Cocktail Serve`,
        isBottle: false
      },
      {
        id: 'craft-distill',
        type: 'image',
        label: 'Craft',
        thumbSrc: distillationImg,
        mainSrc: distillationImg,
        alt: 'Quadruple Distillation Craft',
        isBottle: false
      },
      {
        id: 'lifestyle-lounge',
        type: 'image',
        label: 'Lounge',
        thumbSrc: isBlueCuracao ? bcImg6 : isMelon ? melonImg36 : tableSocialLounge,
        mainSrc: isBlueCuracao ? bcImg6 : isMelon ? melonImg36 : tableSocialLounge,
        alt: 'Grand Master Lounge Serve',
        isBottle: false
      },
      {
        id: 'brand-video',
        type: 'video',
        label: 'Video',
        thumbSrc: img750,
        videoSrc: brandVideo,
        alt: 'Grand Master Brand Film',
        isVideo: true
      }
    ];
  }, [product]);

  // 4 other bottles for the bottom section
  const relatedBottles = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => p.id !== product.id).slice(0, 4);
  }, [product.id]);

  // Sync size on product or initialSize change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveMediaIndex(0);
    if (initialSize && product.sizes && product.sizes.includes(initialSize)) {
      setSelectedSize(initialSize);
    } else if (product.sizes && !product.sizes.includes(selectedSize)) {
      setSelectedSize(product.sizes.includes('750 ML') ? '750 ML' : product.sizes[0]);
    }
  }, [product, initialSize]);

  const handleBack = (e) => {
    if (e) e.preventDefault();
    if (typeof onBack === 'function') {
      onBack(selectedSize);
    } else {
      window.location.hash = '#products';
    }
  };

  const handleSelectRelated = (relatedId, size = selectedSize) => {
    if (typeof onSelectProduct === 'function') {
      onSelectProduct(relatedId, size);
    } else {
      window.location.hash = `#product-${relatedId}`;
    }
  };

  const handleThumbSelect = (index, item) => {
    setActiveMediaIndex(index);
    if (item.size) {
      setSelectedSize(item.size);
    }
  };

  const handleSizePillClick = (size) => {
    setSelectedSize(size);
    if (size === '180 ML') {
      setActiveMediaIndex(1);
    } else {
      setActiveMediaIndex(0);
    }
  };

  const activeItem = galleryItems[activeMediaIndex] || galleryItems[0];

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
              {/* Left Column: Premium Bottle Stage & Thumbnail Strip */}
              <div className="gm-detail-stage-wrap">
                <div
                  className={`gm-detail-stage gm-detail-stage--${activeItem.id} ${activeItem.isBottle ? 'gm-detail-stage--bottle' : 'gm-detail-stage--media'} gm-detail-stage--${activeItem.type}`}
                  style={{
                    borderColor: product.accentColor || 'rgb(173, 92, 92)',
                  }}
                >
                  {activeItem.type === 'video' ? (
                    <div className="gm-detail-video-wrapper">
                      <video
                        key={activeItem.videoSrc}
                        src={activeItem.videoSrc}
                        controls
                        autoPlay
                        playsInline
                        muted
                        loop
                        className="gm-detail-stage-video"
                      />
                    </div>
                  ) : activeItem.type === 'closeup' ? (
                    <div className="gm-detail-closeup-stage" title="Label & Bottle Craft Close-up">
                      <img
                        key={`closeup-${product.id}`}
                        src={activeItem.mainSrc}
                        alt={activeItem.alt}
                        className="gm-detail-closeup-img"
                        loading="eager"
                      />
                      <span className="gm-detail-closeup-tag">Artisan Seal Close-up</span>
                    </div>
                  ) : activeItem.isBottle ? (
                    <img
                      key={`${product.id}-${activeItem.size}`}
                      src={activeItem.mainSrc}
                      alt={activeItem.alt}
                      className={`gm-detail-bottle-img ${activeItem.bottleClass}`}
                      loading="eager"
                    />
                  ) : (
                    <div className="gm-detail-media-frame">
                      <img
                        key={activeItem.mainSrc}
                        src={activeItem.mainSrc}
                        alt={activeItem.alt}
                        className="gm-detail-media-img"
                        loading="eager"
                      />
                    </div>
                  )}
                </div>

                {/* Thumbnail Strip directly below bottle (styled exactly like user's reference) */}
                <div className="gm-detail-thumbs-strip" role="tablist" aria-label="Product views gallery">
                  {galleryItems.map((item, index) => {
                    const isActive = activeMediaIndex === index;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`gm-detail-thumb-card ${isActive ? 'is-active' : ''}`}
                        onClick={() => handleThumbSelect(index, item)}
                        title={item.label}
                      >
                        <div className="gm-detail-thumb-inner">
                          <img
                            src={item.thumbSrc}
                            alt={item.alt}
                            className={`gm-detail-thumb-img ${item.isBottle ? 'is-bottle' : ''}`}
                            loading="lazy"
                          />
                          {item.isVideo && (
                            <div className="gm-thumb-play-overlay" aria-hidden="true">
                              <span className="gm-thumb-play-icon">▶</span>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Narrative & Technical Specifications */}
              <div className="gm-detail-info">
                <span className="gm-detail-category-badge">{product.tag}</span>

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

                  <div className="gm-spec-card gm-spec-card--size">
                    <span className="gm-spec-label">Available Size:</span>
                    <div className="gm-size-options" role="group" aria-label="Available bottle sizes">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          className={`gm-size-pill ${selectedSize === size ? 'active' : ''}`}
                          onClick={() => handleSizePillClick(size)}
                          aria-pressed={selectedSize === size}
                        >
                          <span className="pill-indicator-dot" />
                          <span>{size}</span>
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
            4 Bottle Showcase from the Grand Master Collection
            ==================================================================== */}
        <section className="gm-detail-related" aria-label="Explore more spirits">
          <div className="gm-detail-container">
            <div className="gm-related-header">
              <span className="gm-related-eyebrow">GRAND MASTER RANGE</span>
              <h2 className="gm-related-title">EXPLORE MORE SPIRITS</h2>
              <p className="gm-related-subtitle">
                Quadruple-distilled handcrafted vodkas infused with signature fruit and botanical essences.
              </p>
            </div>

            <div className="gm-related-grid">
              {relatedBottles.map((relProduct) => {
                const relImg = getProductImage(relProduct, selectedSize);
                return (
                  <article
                    key={relProduct.id}
                    className="gm-related-card"
                    aria-label={relProduct.fullName}
                  >
                    <div
                      className="gm-related-stage"
                      onClick={() => handleSelectRelated(relProduct.id, selectedSize)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${relProduct.fullName}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectRelated(relProduct.id, selectedSize);
                        }
                      }}
                    >
                      <img
                        key={`${relProduct.id}-${selectedSize}`}
                        src={relImg}
                        alt={relProduct.fullName}
                        className="gm-related-img"
                        loading="lazy"
                      />
                    </div>

                    <div className="gm-related-meta">
                      <span className="gm-related-tag">{relProduct.tag}</span>
                      <h3 className="gm-related-name">
                        {(() => {
                          const { prefix, flavor } = formatProductName(relProduct.name);
                          return prefix ? (
                            <>
                              <span className="gm-name-prefix">{prefix}</span>
                              <span className="gm-name-flavor">{flavor}</span>
                            </>
                          ) : (
                            relProduct.name
                          );
                        })()}
                      </h3>

                      {/* View Button for related bottle */}
                      <button
                        type="button"
                        className="gm-hero-action-btn gm-related-view-btn"
                        onClick={() => handleSelectRelated(relProduct.id, selectedSize)}
                        aria-label={`View ${relProduct.name}`}
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

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
}

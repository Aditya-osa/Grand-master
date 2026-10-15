import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initHeroEntrance, initCarouselScroll } from '../../animations/heroAnimations';
import { formatProductName } from '../../pages/Products/productData';
import './Products.css';
import bgLeft from '../../assets/Bg (2)/1.png';
import bgRight from '../../assets/Bg (2)/2.png';

// 750 mL 3D Bottle Assets
import bottleStrawberry from '../../assets/750 ML 3D (1)/1.png';
import bottleBlueCuracao from '../../assets/750 ML 3D (1)/2.png';
import bottleBlueberry from '../../assets/750 ML 3D (1)/3.png';
import bottleCranberry from '../../assets/750 ML 3D (1)/4.png';
import bottleMango from '../../assets/750 ML 3D (1)/5.png';
import bottleMintyJamun from '../../assets/750 ML 3D (1)/6.png';
import bottleMelon from '../../assets/750 ML 3D (1)/7.png';
import bottleOrange from '../../assets/750 ML 3D (1)/8.png';
import bottleChocolate from '../../assets/750 ML 3D (1)/9.png';
import bottleGreenApple from '../../assets/750 ML 3D (1)/10.png';
import bottlePlain from '../../assets/750 ML 3D (1)/11.png';
import bottleZestyLemon from '../../assets/750 ML 3D (1)/12.png';
import bottleCoconut from '../../assets/750 ML 3D (1)/13.png';

gsap.registerPlugin(ScrollTrigger);

export const PRODUCTS = [
  { id: 'blueberry', name: "Grand Master's Blueberry", tag: 'Blue Berry', img: bottleBlueberry },
  { id: 'cranberry', name: "Grand Master's Cranberry", tag: 'Cranberry', img: bottleCranberry },
  { id: 'melon', name: "Grand Master's Melon", tag: 'Melon', img: bottleMelon },
  { id: 'blue-curacao', name: "Grand Master's Blue Curaçao", tag: 'Blue Curacao', img: bottleBlueCuracao },
  { id: 'green-apple', name: "Grand Master's Green Apple", tag: 'Green Apple', img: bottleGreenApple },
  { id: 'strawberry', name: "Grand Master's Strawberry", tag: 'Strawberry', img: bottleStrawberry },
  { id: 'zesty-lemon', name: "Grand Master's Zesty Lemon", tag: 'Zesty Lemon', img: bottleZestyLemon },
  { id: 'orange', name: "Grand Master's Orange", tag: 'Orange', img: bottleOrange },
  { id: 'chocolate', name: "Grand Master's Chocolate", tag: 'Chocolate', img: bottleChocolate },
  { id: 'mango', name: "Grand Master's Mango", tag: 'Mango', img: bottleMango },
  { id: 'plain', name: "Grand Master's Plain", tag: 'Plain', img: bottlePlain },
  { id: 'minty-jamun', name: "Grand Master's Minty Jamun", tag: 'Minty Jamun', img: bottleMintyJamun },
  { id: 'coconut', name: "Grand Master's Coconut", tag: 'Coconut', img: bottleCoconut },
];

export default function Products() {
  // Refs
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const promptRef = useRef(null);
  const infoRef = useRef(null);
  const bottleRefs = useRef([]);

  const setBottleRef = (el, i) => {
    if (el) bottleRefs.current[i] = el;
  };

  useEffect(() => {
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 2. Entrance Animation
    const bottleEls = bottleRefs.current.filter(Boolean);
    const entranceCtx = initHeroEntrance({
      containerRef,
      promptRef,
      infoRef,
      bottleEls,
    });

    // 3. Carousel Scroll with Real-time Center Magnification
    const carouselCtx = initCarouselScroll({
      containerRef,
      trackRef,
      getBottleEls: () => bottleRefs.current.filter(Boolean),
    });

    // Ensure ScrollTriggers are properly sorted by DOM order and refreshed
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 150);

    const handleImgLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleImgLoad);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener('load', handleImgLoad);
      entranceCtx?.revert();
      carouselCtx?.revert();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  const handleSkip = (e) => {
    if (e) e.preventDefault();
    const container = containerRef.current;
    if (container) {
      const pinSpacer = container.closest('.pin-spacer') || container;
      const targetY = pinSpacer.offsetTop + pinSpacer.offsetHeight;
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      ref={containerRef}
      className="ag-hero"
      id="products"
      aria-label="Grand Master Products"
    >
      {/* Bg (2) Background Stripes Layer */}
      <div className="ag-hero-bg-backdrop" aria-hidden="true">
        <img
          src={bgLeft}
          alt=""
          className="ag-hero-bg-stripe ag-hero-bg-left"
          loading="eager"
          decoding="async"
        />
        <img
          src={bgRight}
          alt=""
          className="ag-hero-bg-stripe ag-hero-bg-right"
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="brand-title">
        <svg
          className="ag-curved-title-svg"
          viewBox="0 0 920 310"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="The Flavour Collection"
          role="heading"
          aria-level="2"
        >
          <defs>
            <path
              id="gm-title-arc"
              d="M 100,290 A 360,280 0 0,1 820,290"
              fill="none"
            />
          </defs>
          <text className="ag-curved-title-text">
            <textPath
              href="#gm-title-arc"
              startOffset="50%"
              textAnchor="middle"
            >
              CRAFTED FLAVOURS
            </textPath>
          </text>
        </svg>

        <div 
          className="explore-shell"
          onClick={() => {
            window.location.hash = '#products';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          role="button"
          tabIndex={0}
          style={{ cursor: 'pointer' }}
          aria-label="View all flavours collection"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              window.location.hash = '#products';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <span>ALL FLAVOURS</span>
          <svg
            className="explore-arrow"
            width="15"
            height="11"
            viewBox="0 0 16 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="2" y1="6" x2="14" y2="6" />
            <polyline points="9.5 2.5 14 6 9.5 9.5" />
          </svg>
        </div>
      </div>
      <span id="shop" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true" />
      {/* Visual Stage: Bottles */}
      <div className="ag-stage">
        {/* Angled 10-degree Marquee Stage for Bottles */}
        <div className="ag-marquee-stage">
          <div ref={trackRef} className="ag-carousel-track">
            {PRODUCTS.map((product, idx) => (
              <div
                key={product.id}
                ref={(el) => setBottleRef(el, idx)}
                className="ag-carousel-item"
                data-index={idx}
                data-id={product.id}
                onClick={() => {
                  window.location.hash = `#product-${product.id}`;
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
                aria-label={`View details of ${product.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.hash = `#product-${product.id}`;
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="ag-carousel-img"
                  loading="eager"
                  decoding="async"
                  onLoad={() => ScrollTrigger.refresh()}
                />
                <div className="ag-bottle-info">
                  <span className="ag-bottle-name">
                    {(() => {
                      const { prefix, flavor } = formatProductName(product.name);
                      return prefix ? (
                        <>
                          <span className="ag-name-prefix">{prefix}</span>
                          <span className="ag-name-flavor">{flavor}</span>
                        </>
                      ) : (
                        product.name
                      );
                    })()}
                  </span>
                  <span className="ag-bottle-tag">{product.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>   
       
      </div>
      {/* Bottom Center: Skip Button & Scroll Prompt */}
      <div ref={promptRef} className="ag-scroll-prompt-wrap">
        <button
          type="button"
          className="ag-skip-btn"
          onClick={handleSkip}
          aria-label="Skip to next section"
        >
          <span>SKIP</span>
          <i className="ri-arrow-down-line" aria-hidden="true"></i>
        </button>
    
      </div>
    </section>
  );
}

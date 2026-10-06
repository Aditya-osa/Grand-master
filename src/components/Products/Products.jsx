import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initHeroEntrance, initCarouselScroll } from '../../animations/heroAnimations';
import './Products.css';

import bottle1 from '../../assets/bottles/strawberry-bottle.png'; // Strawberry (Transparent Cutout)
import bottle2 from '../../assets/bottles/chocolate-bottle.png'; // Chocolate (Transparent Cutout)
import bottle3 from '../../assets/bottles/all-flav/3.png'; // Mango
import bottle4 from '../../assets/bottles/all-flav/4.png'; // Melon
import bottle5 from '../../assets/bottles/all-flav/5.png'; // Blue Berry
import bottle6 from '../../assets/bottles/strawberry-bottle.png'; // Strawberry (Transparent Cutout)
import bottle7 from '../../assets/bottles/all-flav/7.png'; // Orange


gsap.registerPlugin(ScrollTrigger);

export const PRODUCTS = [
  { id: 'strawberry', name: "Grand Master's Strawberry", tag: 'Platinum Vodka', img: bottle1 },
  { id: 'chocolate', name: "Grand Master's Chocolate", tag: 'Platinum Vodka', img: bottle2 },
  { id: 'mango', name: "Grand Master's Mango", tag: 'Platinum Vodka', img: bottle3 },
  { id: 'melon', name: "Grand Master's Melon", tag: 'Platinum Vodka', img: bottle4 },
  { id: 'blueberry', name: "Grand Master's Blue Berry", tag: 'Platinum Vodka', img: bottle5 },
  { id: 'strawberry-2', name: "Grand Master's Strawberry", tag: 'Platinum Vodka', img: bottle6 },
  { id: 'orange', name: "Grand Master's Orange", tag: 'Platinum Vodka', img: bottle7 },
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

  return (
    <section ref={containerRef} className="ag-hero" aria-label="Grand Master Products">
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
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="ag-carousel-img"
                  loading={idx < 4 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <div className="ag-bottle-info">
                  <span className="ag-bottle-name">{product.name}</span>
                  <span className="ag-bottle-tag">{product.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Left: Vodka Drinks Hero Info Block matching screenshot */}
      <div ref={infoRef} className="ag-hero-info">
        {/* Curved heading */}
        <div className="ag-vodka-infused-wrap">
          <svg
            className="ag-vodka-infused-svg"
            viewBox="0 0 360 120"
            aria-hidden="true"
          >
            <defs>
              <path id="vodkaArcHero" d="M 35,100 Q 180,-10 325,100" />
            </defs>

            <text className="ag-vodka-infused-text" textAnchor="middle">
              <textPath href="#vodkaArcHero" startOffset="50%">
                Alcohol Infused
              </textPath>
            </text>
          </svg>
        </div>

        {/* Main title */}
        <h2 className="ag-hero-title">VODKA <br/>DRINKS</h2>

        {/* Description */}
        <p className="ag-hero-desc">
          Amazing, smooth, premium<br />
          vodkas for all occasions.
        </p>

        {/* Button */}
        <a href="#shop" className="ag-shop-btn">
          View More
        </a>
      </div>


      {/* Bottom Center: Scroll Prompt */}
      <div ref={promptRef} className="ag-scroll-prompt-wrap" aria-hidden="true">
        <span className="ag-scroll-prompt">SCROLL T DISCOER</span>
      </div>
    </section>
  );
}

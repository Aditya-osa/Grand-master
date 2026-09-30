import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initHeroEntrance, initCarouselScroll } from '../animations/heroAnimations';

import grandMasterLogo from '../assets/Logo.png';
import bottle1 from '../assets/bottles/strawberry-bottle.png'; // Strawberry (Transparent Cutout)
import bottle2 from '../All flav/2.png'; // Chocolate
import bottle3 from '../All flav/3.png'; // Mango
import bottle4 from '../All flav/4.png'; // Melon
import bottle5 from '../All flav/5.png'; // Blue Berry

gsap.registerPlugin(ScrollTrigger);

export const PRODUCTS = [
  { id: 'strawberry', name: "Grand Master's Strawberry", tag: 'Platinum Vodka', img: bottle1 },
  { id: 'chocolate', name: "Grand Master's Chocolate", tag: 'Platinum Vodka', img: bottle2 },
  { id: 'mango', name: "Grand Master's Mango", tag: 'Platinum Vodka', img: bottle3 },
  { id: 'melon', name: "Grand Master's Melon", tag: 'Platinum Vodka', img: bottle4 },
  { id: 'blueberry', name: "Grand Master's Blue Berry", tag: 'Platinum Vodka', img: bottle5 },
];

export default function Products() {
  // Refs
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const logoRef = useRef(null);
  const promptRef = useRef(null);
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
      logoRef,
      promptRef,
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
      {/* Top Header Controls */}
      <header className="ag-header">
        {/* Top-Center: Logo */}
        <div ref={logoRef} className="ag-brand-logo-wrap">
          <a href="#" className="ag-brand-link" aria-label="Grand Master Vodka Home">
            <img
              src={grandMasterLogo}
              alt="Grand Master"
              className="ag-brand-logo-img"
              width="160"
            />
          </a>
        </div>
      </header>

      {/* Visual Stage: Only Bottles */}
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Left: Privacy & Cookies */}
      <div className="ag-bottom-legal">
        <a href="#" className="ag-legal-link">Privacy &amp; Cookies</a>
      </div>

      {/* Bottom Center: Scroll Prompt */}
      <div ref={promptRef} className="ag-scroll-prompt-wrap" aria-hidden="true">
        <span className="ag-scroll-prompt">SCROLL TO DISCOVER</span>
      </div>
    </section>
  );
}

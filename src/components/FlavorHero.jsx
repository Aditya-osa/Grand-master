import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Assets
import grandMasterLogo from '../assets/Logo.png';
import strawberryBotanical from '../assets/Flav..strwa/4.png';
import strawberryBottle from '../assets/Flav..strwa/5.png';
import strawberrySelectorBottle from '../assets/bottles/strawberry-bottle.png';

import orangeBotanical from '../assets/Flav..Orang/6.png';
import orangeBottle from '../assets/Flav..Orang/7.png';
import orangeSelectorBottle from '../assets/bottles/orange-bottle.png';

import mangoBotanical from '../assets/Flav..mango/10.png';
import mangoBottle from '../assets/Flav..mango/11.png';
import mangoSelectorBottle from '../assets/bottles/mango-bottle.png';

import chocolateBottle from '../All flav/2.png';
import chocolateSelectorBottle from '../assets/bottles/chocolate-bottle.png';

import './FlavorHero.css';

gsap.registerPlugin(ScrollTrigger);

// Curated Luxury Flavor Master Records
export const FLAVORS = [
  {
    id: 'strawberry',
    name: 'STRAWBERRY',
    displayTitle: 'Strawberry',
    bottle: strawberryBottle,
    selectorBottle: strawberrySelectorBottle,
    botanical: strawberryBotanical,
    description: 'Pleasant mild aroma, complemented by sweet strawberry taste',
    supporting: 'GRANDMASTER’s Strawberry is enjoyable sweet and refreshing',
    badge: 'Sweet Infusion',
    theme: {
      bgColor: '#8c0c1e',
      bgGradient: 'radial-gradient(ellipse 80% 75% at 60% 50%, rgba(185, 20, 48, 0.6) 0%, rgba(110, 10, 26, 0.4) 45%, rgba(60, 5, 14, 0.95) 100%)',
      glow: 'rgba(235, 47, 85, 0.42)',
      accent: '#ffccd5',
    },
  },
  {
    id: 'chocolate',
    name: 'CHOCOLATE',
    displayTitle: 'Chocolate',
    bottle: chocolateBottle,
    selectorBottle: chocolateSelectorBottle,
    botanical: null,
    description: 'Decadent rich aroma, complemented by smooth velvety cocoa infusion',
    supporting: 'GRANDMASTER’s Chocolate is silky, indulgent and luxurious',
    badge: 'Velvet Cocoa',
    theme: {
      bgColor: '#3f1505',
      bgGradient: 'radial-gradient(ellipse 80% 75% at 60% 50%, rgba(110, 45, 18, 0.6) 0%, rgba(70, 25, 8, 0.4) 45%, rgba(30, 10, 3, 0.95) 100%)',
      glow: 'rgba(217, 119, 6, 0.32)',
      accent: '#fde68a',
    },
  },
  {
    id: 'orange',
    name: 'ORANGE',
    displayTitle: 'Orange',
    bottle: orangeBottle,
    selectorBottle: orangeSelectorBottle,
    botanical: orangeBotanical,
    description: 'Zesty vibrant aroma, complemented by bittersweet Mediterranean orange burst',
    supporting: 'GRANDMASTER’s Orange is crisp, invigorating and sun-drenched',
    badge: 'Citrus Burst',
    theme: {
      bgColor: '#a8350b',
      bgGradient: 'radial-gradient(ellipse 80% 75% at 60% 50%, rgba(220, 75, 15, 0.6) 0%, rgba(140, 45, 10, 0.4) 45%, rgba(70, 20, 5, 0.95) 100%)',
      glow: 'rgba(249, 115, 22, 0.42)',
      accent: '#fed7aa',
    },
  },
  {
    id: 'mango',
    name: 'MANGO',
    displayTitle: 'Mango',
    bottle: mangoBottle,
    selectorBottle: mangoSelectorBottle,
    botanical: mangoBotanical,
    description: 'Vibrant tropical aroma, complemented by succulent ripe mango sweetness',
    supporting: 'GRANDMASTER’s Mango is intensely aromatic, velvety and exotic',
    badge: 'Tropical Infusion',
    theme: {
      bgColor: '#944407',
      bgGradient: 'radial-gradient(ellipse 80% 75% at 60% 50%, rgba(215, 115, 15, 0.6) 0%, rgba(135, 60, 10, 0.4) 45%, rgba(65, 25, 4, 0.95) 100%)',
      glow: 'rgba(245, 158, 11, 0.42)',
      accent: '#fef08a',
    },
  },
];

// Luxury Spring / Deceleration Easing Curves
const LUXURY_EASE = [0.16, 1, 0.3, 1];

/**
 * FlavorHero - Interactive Flagship Flavor-Selection Hero Experience
 * Engineered with silky-smooth GSAP continuous dynamics and Framer Motion layout transitions
 */
export default function FlavorHero() {
  const [activeFlavor, setActiveFlavor] = useState(FLAVORS[0]);

  // Persistent Animation Refs (GSAP tier)
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const glowRef = useRef(null);
  const botanicalLayerRef = useRef(null);
  const bottleParallaxRef = useRef(null);
  const bottleFloatRef = useRef(null);

  // --------------------------------------------------------------------------
  // 1. GSAP Persistent Dynamics: Floating, Mouse Parallax, ScrollTrigger
  // Initialized once on mount so flavor changes never interrupt or reset loops
  // --------------------------------------------------------------------------
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1A. Slow Cinematic Continuous Floating (4.8s - 5.6s sine in/out)
      gsap.to(bottleFloatRef.current, {
        y: -12,
        rotationZ: 1.2,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      if (botanicalLayerRef.current) {
        gsap.to(botanicalLayerRef.current, {
          y: -16,
          x: 10,
          rotationZ: -1.6,
          duration: 5.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // 1B. GSAP ScrollTrigger Multi-Plane Parallax
      gsap.to(bottleParallaxRef.current, {
        y: -80,
        scale: 0.96,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      if (botanicalLayerRef.current) {
        gsap.to(botanicalLayerRef.current, {
          y: -130,
          x: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []); // Run ONCE on mount

  return (
    <div ref={heroRef} className="flavor-hero hero" aria-label="Grand Masters Vodka Flavor Selector">
      {/* ====================================================================
          TOP NAVIGATION BAR (Matches reference layout)
          ==================================================================== */}
      <header className="flavor-hero__nav" role="banner">
        <div className="flavor-hero__nav-inner">
          <nav className="flavor-hero__nav-links flavor-hero__nav-left" aria-label="Main Left">
            <a href="#about" className="flavor-hero__nav-item">ABOUT US</a>
            <a href="#flavours" className="flavor-hero__nav-item flavor-hero__nav-item--active">FLAVOURS</a>
          </nav>

          <div className="flavor-hero__brand-center">
            <a href="/" className="flavor-hero__brand-link" aria-label="Grand Master's Vodka Home">
              <img src={grandMasterLogo} alt="Grand Master's Vodka" className="flavor-hero__brand-logo" />
            </a>
          </div>

          <nav className="flavor-hero__nav-links flavor-hero__nav-right" aria-label="Main Right">
            <a href="#blog" className="flavor-hero__nav-item">BLOG</a>
            <a href="#contact" className="flavor-hero__nav-item">CONTACT US</a>
          </nav>
        </div>
      </header>

      {/* ====================================================================
          1. BACKGROUND LAYER (Silky color cross-fade)
          ==================================================================== */}
      <div
        ref={bgRef}
        className="flavor-hero__backdrop hero-background"
        style={{
          backgroundColor: activeFlavor.theme.bgColor,
          backgroundImage: activeFlavor.theme.bgGradient,
        }}
        aria-hidden="true"
      />
      
      <div
        ref={glowRef}
        className="flavor-hero__glow"
        style={{
          background: `radial-gradient(circle, ${activeFlavor.theme.glow} 0%, rgba(0,0,0,0) 75%)`,
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Editorial Watermark */}
      <div className="flavor-hero__watermark" aria-hidden="true">
        {activeFlavor.name}
      </div>

      {/* ====================================================================
          HERO STAGE: 2-COLUMN LAYOUT (Content | Center Bottle & Botanicals)
          ==================================================================== */}
      <div className="flavor-hero__container">
        
        {/* ------------------------------------------------------------------
            COLUMN 1: HERO EDITORIAL CONTENT (Left)
            Smooth cross-fade with subtle optical blur
            ------------------------------------------------------------------ */}
        <div className="flavor-hero__content hero-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFlavor.id}
              className="flavor-hero__text-block"
              initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -18, filter: 'blur(4px)' }}
              transition={{ duration: 0.55, ease: LUXURY_EASE }}
            >
              <span className="flavor-hero__eyebrow">
                GRANDMASTER'S VODKA
              </span>

              <h1 className="flavor-hero__title">
                {activeFlavor.name}
              </h1>

              <p className="flavor-hero__description">
                {activeFlavor.description}
              </p>

              <div className="flavor-hero__supporting-wrap">
                <p className="flavor-hero__supporting">
                  {activeFlavor.supporting}
                </p>
              </div>

              <div className="flavor-hero__tags">
                <span className="flavor-hero__tag">Platinum Vodka</span>
                <span className="flavor-hero__tag">{activeFlavor.badge}</span>
                <span className="flavor-hero__tag">Triple Distilled</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ------------------------------------------------------------------
            COLUMN 2: MAIN LARGE BOTTLE & BOTANICALS (Center)
            Sequence: First bottle arrives, then leaves and fruits emerge behind it
            ------------------------------------------------------------------ */}
        <div className="flavor-hero__stage">
          {/* BOTANICAL LAYER (Behind Bottle) - Enters after bottle is in place */}
          <div ref={botanicalLayerRef} className="flavor-hero__botanicals hero-botanicals botanical-layer">
            <AnimatePresence>
              {activeFlavor.botanical && (
                <motion.div
                  key={`botanical-${activeFlavor.id}`}
                  className="flavor-hero__botanical-wrapper"
                  initial={{ opacity: 0, scale: 0.85, y: 25, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.35, ease: LUXURY_EASE } }}
                  transition={{ duration: 0.85, ease: LUXURY_EASE, delay: 0.45 }}
                >
                  <img
                    src={activeFlavor.botanical}
                    alt=""
                    aria-hidden="true"
                    className="flavor-hero__botanical-img"
                    loading="eager"
                    decoding="async"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MAIN BOTTLE LAYER (In Front of Botanicals) - Arrives FIRST */}
          <div ref={bottleParallaxRef} className="flavor-hero__bottle-wrapper hero-bottle">
            <div ref={bottleFloatRef} className="flavor-hero__bottle-float">
              {/* Ground Studio Pedestal Shadow */}
              <div className="flavor-hero__bottle-shadow" aria-hidden="true" />

              <AnimatePresence>
                <motion.div
                  key={`bottle-${activeFlavor.id}`}
                  className="flavor-hero__bottle-motion"
                  initial={{ opacity: 0, scale: 0.93, y: 30, rotate: 1.5 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20, rotate: -1.5, transition: { duration: 0.5, ease: LUXURY_EASE } }}
                  transition={{ duration: 0.75, ease: LUXURY_EASE, delay: 0.05 }}
                >
                  <img
                    src={activeFlavor.bottle}
                    alt={`Grand Masters ${activeFlavor.displayTitle} Vodka`}
                    className="flavor-hero__bottle-img"
                    loading="eager"
                    decoding="async"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

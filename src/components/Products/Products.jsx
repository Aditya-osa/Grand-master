import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Products.css';

import bottleStrawberry from '../../assets/bottles/strawberry-bottle.png';
import bottleOrange from '../../assets/bottles/all-flav/7.png';
import bottleChocolate from '../../assets/bottles/chocolate-bottle.png';
import bottleMango from '../../assets/bottles/all-flav/3.png';

gsap.registerPlugin(ScrollTrigger);

export const PRODUCTS = [
  {
    id: 'mango',
    name: "Grand Master's Mango",
    flavor: 'Mango',
    tag: 'Platinum Fruit Vodka',
    volume: '750ml • 40% ABV',
    accentColor: '#eeff00',
    img: bottleMango,
    positionClass: 'gm-bottle-pos-top-right',
  },
  {
    id: 'strawberry',
    name: "Grand Master's Strawberry",
    flavor: 'Wild Strawberry',
    tag: 'Platinum Fruit Vodka',
    volume: '750ml • 40% ABV',
    accentColor: '#eeff00',
    img: bottleStrawberry,
    positionClass: 'gm-bottle-pos-top-right',
  },
  {
    id: 'orange',
    name: "Grand Master's Orange",
    flavor: 'Sicilian Orange',
    tag: 'Platinum Citrus Vodka',
    volume: '750ml • 40% ABV',
    accentColor: '#ffa500',
    img: bottleOrange,
    positionClass: 'gm-bottle-pos-bottom-left',
  },
  {
    id: 'chocolate',
    name: "Grand Master's Chocolate",
    flavor: 'Artisan Chocolate',
    tag: 'Platinum Infused Vodka',
    volume: '750ml • 40% ABV',
    accentColor: '#d4af37',
    img: bottleChocolate,
    positionClass: 'gm-bottle-pos-bottom-right',
  },
];

// All available flavours for quick switching if desired
const ALL_FLAVORS = [
  { id: 'strawberry', name: 'Strawberry', img: bottleStrawberry },
  { id: 'orange', name: 'Orange', img: bottleOrange },
  { id: 'chocolate', name: 'Chocolate', img: bottleChocolate },
  { id: 'mango', name: 'Mango', img: bottleMango },
];

export default function Products() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [selectedThirdBottle, setSelectedThirdBottle] = useState('chocolate');
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Smooth scroll trigger entrance animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Content fade & slide in
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      );

      // Bottles stagger entrance
      gsap.fromTo(
        '.gm-bottle-wrapper',
        { opacity: 0, scale: 0.88, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Determine bottle 3 image (Chocolate or Mango)
  const thirdBottleData =
    selectedThirdBottle === 'mango'
      ? {
          id: 'mango',
          name: "Grand Master's Mango",
          flavor: 'Alphonso Mango',
          tag: 'Platinum Tropical Vodka',
          volume: '750ml • 40% ABV',
          accentColor: '#ffaa00',
          img: bottleMango,
          positionClass: 'gm-bottle-pos-bottom-right',
        }
      : PRODUCTS[2];

  const showcaseBottles = [PRODUCTS[0], PRODUCTS[1], thirdBottleData];

  return (
    <section
      id="products"
      ref={sectionRef}
      className="gm-product-showcase"
      aria-label="Grand Master Fruit Vodka Showcase"
    >
      {/* 1. SECTION CONTENT (Top-Left Composition matching reference) */}
      <div ref={contentRef} className="gm-showcase-content">
        {/* Arched "Alcohol Infused" Badge */}
        <div className="gm-arc-badge" aria-hidden="true">
          <svg
            viewBox="0 0 320 85"
            className="gm-arc-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="gm-alcohol-curve"
              d="M 12 70 Q 115 8 285 40"
              fill="transparent"
            />
            <text className="gm-arc-text">
              <textPath href="#gm-alcohol-curve" startOffset="0%">
                Alcohol Infused
              </textPath>
            </text>
          </svg>
        </div>

        {/* Main Bold Display Headline */}
        <h2 className="gm-showcase-title">FRUIT VODKA</h2>

        {/* Description Subtext */}
        <p className="gm-showcase-desc">
          An amazing, all natural, organic vodka crafted for parties and celebrations.
        </p>

        {/* 3D Offset Yellow Shadow Pill Button */}
        <a href="#flavours" className="gm-showcase-btn">
          SHOP NOW
        </a>
      </div>

      {/* 2. THE THREE-BOTTLE COMPOSITION (Strictly NO leaves, only bottles) */}
      <div className="gm-bottles-stage" aria-label="Product Bottles Arrangement">
        {showcaseBottles.map((bottle, index) => (
          <div
            key={bottle.id}
            className={`gm-bottle-wrapper ${bottle.positionClass}`}
            onMouseEnter={() => setActiveTooltip(bottle.id)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            {/* Animated floating container */}
            <div className="gm-bottle-inner">
              {/* Floating ambient ground shadow */}
              <div className="gm-bottle-shadow" aria-hidden="true" />

              {/* Bottle Cutout Image */}
              <img
                src={bottle.img}
                alt={bottle.name}
                className="gm-bottle-img"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />

              {/* Sleek Minimal Flavor Badge */}
              <div
                className={`gm-bottle-badge ${
                  activeTooltip === bottle.id ? 'is-active' : ''
                }`}
                aria-hidden="true"
              >
                <span className="gm-badge-tag">{bottle.tag}</span>
                <span className="gm-badge-name">{bottle.name}</span>
                <span className="gm-badge-vol">{bottle.volume}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

     
    </section>
  );
}

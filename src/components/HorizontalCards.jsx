import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import step1Img from '../assets/process/step_1.png';
import step2Img from '../assets/process/step_2.png';
import step3Img from '../assets/process/step_3.png';
import step4Img from '../assets/process/step_4.png';
import step5Img from '../assets/process/step_5.png';

import './HorizontalCards.css';

gsap.registerPlugin(ScrollTrigger);

export const PROCESS_STEPS = [
  {
    id: 'harvest',
    stepNumber: '01',
    category: 'HARVEST & PURITY',
    title: 'Pure Grain Selection',
    subtitle: 'Finest Organic Winter Wheat',
    description:
      'Selected high-density winter wheat grains are triple-inspected for exceptional starch purity before milling, laying the flawless foundation for our spirit.',
    badge: 'Stage 01',
    spec: '100% Winter Grain',
    param: 'Starch Purity 99.8%',
    image: step1Img,
    accent: '#b8860b',
  },
  {
    id: 'mashing',
    stepNumber: '02',
    category: 'ENZYMATIC MASHING',
    title: 'Slow Fermentation',
    subtitle: 'Subterranean Spring Water',
    description:
      'Finely crushed grains marry natural subterranean spring water in temperature-calibrated vats, undergoing a slow 72-hour cool enzymatic fermentation.',
    badge: 'Stage 02',
    spec: 'Pure Spring Blend',
    param: '72-Hour Ferment',
    image: step2Img,
    accent: '#e94e1b',
  },
  {
    id: 'distillation',
    stepNumber: '03',
    category: 'COPPER EXTRACTION',
    title: 'Multi-Column Distillation',
    subtitle: 'Continuous Fractional Still',
    description:
      'Fractional vapor distillation through continuous tall copper columns purges harsh congeners, capturing exclusively the crystal-clear spirit heart.',
    badge: 'Stage 03',
    spec: 'Triple Distilled',
    param: 'Heart Cut Only',
    image: step3Img,
    accent: '#762530',
  },
  {
    id: 'filtration',
    stepNumber: '04',
    category: 'PURIFICATION',
    title: 'Deep Carbon Filtration',
    subtitle: 'Birch Charcoal & Platinum',
    description:
      'The spirit cascades under gravity through activated silver birch charcoal and micro-fine platinum media for unmatched crystalline smoothness.',
    badge: 'Stage 04',
    spec: 'Platinum Polished',
    param: 'Sub-Micron Purity',
    image: step4Img,
    accent: '#c93a0e',
  },
  {
    id: 'bottling',
    stepNumber: '05',
    category: 'BOTTLING & QUALITY',
    title: 'Master Batch Bottling',
    subtitle: 'Certified Gold Standard',
    description:
      'Blended to optimal 40% ABV with demineralized spring water, each signature bottle is hermetically sealed and inspected to deliver Grand Master excellence.',
    badge: 'Stage 05',
    spec: 'Batch Certified',
    param: '40% ABV Platinum',
    image: step5Img,
    accent: '#b8860b',
  },
];

/**
 * HorizontalCards - Vertical Stacked-Card Scroll Animation
 * Pure vertical physical card stack pinned with GSAP ScrollTrigger scrub.
 * Initially shows the front card with stacked layers behind.
 * As user scrolls, each card transitions one-by-one from behind to the front.
 */
export default function HorizontalCards() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressTextRef = useRef(null);
  const cardRefs = useRef([]);

  const setCardRef = (el, i) => {
    if (el) cardRefs.current[i] = el;
  };

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!section || cards.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

      // Cascading step offsets matching physical card deck reference
      const stepX = isMobile ? -10 : isTablet ? -14 : -18;
      const stepY = isMobile ? 8 : isTablet ? 10 : 12;

      // Optical centering offsets shifting stack slightly left for balanced editorial composition
      const baseOffsetX = isMobile ? 12 : isTablet ? -10 : -20;
      const baseOffsetY = isMobile ? -14 : isTablet ? -18 : -22;

      // Returns physical stacked deck properties simplified to 2-3 clean layers
      const getDepthProps = (depth) => {
        if (depth === 0) {
          // Hero front card: prominent, crisp, primary focus
          return {
            xPercent: -50,
            yPercent: -50,
            x: baseOffsetX,
            y: baseOffsetY,
            scale: 1.0,
            opacity: 1,
            zIndex: 35,
          };
        }
        if (depth === 1) {
          // 1st card behind: clean visible accent edge
          return {
            xPercent: -50,
            yPercent: -50,
            x: baseOffsetX + stepX * 1,
            y: baseOffsetY + stepY * 1,
            scale: 0.975,
            opacity: 0.85,
            zIndex: 25,
          };
        }
        if (depth === 2) {
          // 2nd card behind: soft background depth layer
          return {
            xPercent: -50,
            yPercent: -50,
            x: baseOffsetX + stepX * 2,
            y: baseOffsetY + stepY * 2,
            scale: 0.95,
            opacity: 0.50,
            zIndex: 15,
          };
        }
        // Further cards hidden cleanly behind the 2nd layer
        return {
          xPercent: -50,
          yPercent: -50,
          x: baseOffsetX + stepX * 2,
          y: baseOffsetY + stepY * 2,
          scale: 0.93,
          opacity: 0,
          zIndex: 5,
        };
      };

      // Set initial stacked physical deck position
      cards.forEach((card, idx) => {
        gsap.set(card, getDepthProps(idx));
      });

      if (prefersReducedMotion) return;

      const totalTransitions = cards.length - 1; // 4 transitions between 5 cards

      // Create the pinned ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerHeight * 3.6}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`;
            }
            if (progressTextRef.current) {
              const activeIndex = Math.min(
                cards.length - 1,
                Math.floor(self.progress * (cards.length - 0.05))
              );
              progressTextRef.current.textContent = `STAGE 0${activeIndex + 1} OF 0${cards.length}`;
            }
          },
        },
      });

      // Build sequential 1-by-1 card transitions
      for (let k = 0; k < totalTransitions; k++) {
        const stepLabel = `step-${k}`;
        tl.addLabel(stepLabel);

        // 1. Outgoing Card k: smoothly lifts upward, moves slightly right and fades away
        tl.to(
          cards[k],
          {
            y: baseOffsetY - 75,
            x: baseOffsetX + 14,
            scale: 0.98,
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
          },
          stepLabel
        );

        // 2. Incoming Card k+1 and remaining deck cards step forward one depth notch
        for (let j = k + 1; j < cards.length; j++) {
          const targetDepth = j - (k + 1);
          const targetProps = getDepthProps(targetDepth);

          tl.to(
            cards[j],
            {
              x: targetProps.x,
              y: targetProps.y,
              scale: targetProps.scale,
              opacity: targetProps.opacity,
              zIndex: targetProps.zIndex,
              duration: 1,
              ease: 'power2.inOut',
            },
            stepLabel
          );
        }

        // 3. Resting hold so each card remains centered and readable before next scroll segment
        tl.to({}, { duration: 0.55 });
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="distillation"
      className="stack-cards-section"
      aria-label="Grand Master Distillation Process"
    >
      <div className="stack-cards-viewport">
        {/* Section Editorial Header */}
        <header className="stack-cards-header">
          <div className="stack-cards-header-info">
            <div className="stack-cards-eyebrow-row">
              <span className="stack-cards-eyebrow-badge">HOUSE OF DEEJAY</span>
              <span className="stack-cards-eyebrow">CRAFT &amp; DISTILLATION</span>
            </div>
            <h2 className="stack-cards-title">THE FIVE-STAGE PROCESS</h2>
          </div>

          <div className="stack-cards-header-progress">
            <div className="stack-cards-counter-wrap">
              <span className="stack-cards-scroll-hint">PROGRESSION</span>
              <span ref={progressTextRef} className="stack-cards-counter">
                STAGE 01 OF 05
              </span>
            </div>
            <div className="stack-cards-progress-track">
              <div ref={progressBarRef} className="stack-cards-progress-bar" />
            </div>
          </div>
        </header>

        {/* Central Vertical Stack Stage */}
        <div ref={stageRef} className="stack-cards-stage">
          {PROCESS_STEPS.map((step, idx) => (
            <article
              key={step.id}
              ref={(el) => setCardRef(el, idx)}
              className="stack-card"
              style={{ '--card-accent': step.accent }}
            >
              {/* Card Watermark Number */}
              <div className="stack-card__watermark" aria-hidden="true">
                {step.stepNumber}
              </div>

              {/* Card Header */}
              <div className="stack-card__top">
                <span className="stack-card__badge">{step.badge}</span>
                <span className="stack-card__category">{step.category}</span>
              </div>

              {/* Archival Illustration Aperture */}
              <div className="stack-card__visual">
                <motion.div
                  className="stack-card__img-wrap"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="stack-card__img"
                    loading="lazy"
                  />
                </motion.div>
              </div>

              {/* Card Editorial Content */}
              <div className="stack-card__content">
                <span className="stack-card__subtitle">{step.subtitle}</span>
                <h3 className="stack-card__title">{step.title}</h3>
                <p className="stack-card__desc">{step.description}</p>
              </div>

              {/* Craft Specifications Metadata Panel */}
              <div className="stack-card__specs">
                <div className="stack-card__spec-item">
                  <span className="stack-card__spec-label">SPECIFICATION</span>
                  <span className="stack-card__spec-value">{step.spec}</span>
                </div>
                <div className="stack-card__spec-item stack-card__spec-item--right">
                  <span className="stack-card__spec-label">BENCHMARK</span>
                  <span className="stack-card__spec-value">{step.param}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

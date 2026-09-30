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
 * HorizontalCards - Authentic Luxury Distillery Process Section
 * Pinned GSAP ScrollTrigger horizontal translation with warm heritage palette (NO black, NO generic AI glassmorphism).
 */
export default function HorizontalCards() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressTextRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ----------------------------------------------------------------------
      // Desktop & Tablet (>= 769px): Pinned Horizontal Scrub
      // ----------------------------------------------------------------------
      mm.add('(min-width: 769px)', () => {
        if (prefersReducedMotion) return;

        const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        // 1. Horizontal Track Translation
        const trackTween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getDistance() * 1.15}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${self.progress})`;
              }
              if (progressTextRef.current) {
                const step = Math.min(5, Math.floor(self.progress * 5) + 1);
                progressTextRef.current.textContent = `STAGE 0${step} OF 05`;
              }
            },
          },
        });

        // 2. Subtle organic depth on card illustrations
        const cardImages = track.querySelectorAll('.hz-card__img');
        if (cardImages.length > 0) {
          gsap.fromTo(
            cardImages,
            { x: -14 },
            {
              x: 14,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: () => `+=${getDistance() * 1.15}`,
                scrub: 1,
              },
            }
          );
        }

        return () => {
          trackTween.scrollTrigger?.kill();
          trackTween.kill();
        };
      });

      // ----------------------------------------------------------------------
      // Mobile (<= 768px): Native touch-friendly card scroll
      // ----------------------------------------------------------------------
      mm.add('(max-width: 768px)', () => {
        gsap.set(track, { clearProps: 'all' });
      });

      return () => mm.revert();
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
      className="hz-cards-section"
      aria-label="Grand Master Distillation Process"
    >
      <div className="hz-cards-viewport">
        {/* Subtle Archival Warm Paper Watermark */}
        <div className="hz-cards-watermark" aria-hidden="true">
          DISTILLERY
        </div>

        {/* Section Editorial Header */}
        <header className="hz-cards-header">
          <div className="hz-cards-header-info">
            <div className="hz-cards-eyebrow-row">
              <span className="hz-cards-eyebrow-badge">HOUSE OF DEEJAY</span>
              <span className="hz-cards-eyebrow">CRAFT &amp; DISTILLATION</span>
            </div>
            <h2 className="hz-cards-title">THE FIVE-STAGE PROCESS</h2>
          </div>

          <div className="hz-cards-header-progress">
            <div className="hz-cards-counter-wrap">
              <span className="hz-cards-scroll-hint">PROGRESSION</span>
              <span ref={progressTextRef} className="hz-cards-counter">
                STAGE 01 OF 05
              </span>
            </div>
            <div className="hz-cards-progress-track">
              <div ref={progressBarRef} className="hz-cards-progress-bar" />
            </div>
          </div>
        </header>

        {/* Horizontal Moving Track */}
        <div ref={trackRef} className="hz-cards-track">
          {PROCESS_STEPS.map((step) => (
            <motion.article
              key={step.id}
              className="hz-card"
              style={{ '--card-accent': step.accent }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Card Watermark Number */}
              <div className="hz-card__watermark" aria-hidden="true">
                {step.stepNumber}
              </div>

              {/* Card Header */}
              <div className="hz-card__top">
                <span className="hz-card__badge">{step.badge}</span>
                <span className="hz-card__category">{step.category}</span>
              </div>

              {/* Archival Illustration Aperture */}
              <div className="hz-card__visual">
                <motion.div
                  className="hz-card__img-wrap"
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="hz-card__img"
                    loading="lazy"
                  />
                </motion.div>
              </div>

              {/* Card Editorial Content */}
              <div className="hz-card__content">
                <span className="hz-card__subtitle">{step.subtitle}</span>
                <h3 className="hz-card__title">{step.title}</h3>
                <p className="hz-card__desc">{step.description}</p>
              </div>

              {/* Craft Specifications Metadata Panel */}
              <div className="hz-card__specs">
                <div className="hz-card__spec-item">
                  <span className="hz-card__spec-label">SPECIFICATION</span>
                  <span className="hz-card__spec-value">{step.spec}</span>
                </div>
                <div className="hz-card__spec-item hz-card__spec-item--right">
                  <span className="hz-card__spec-label">BENCHMARK</span>
                  <span className="hz-card__spec-value">{step.param}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

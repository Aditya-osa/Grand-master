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
 * HorizontalCards - Pinned Horizontal Scroll Animation
 * Pure horizontal card track sliding smoothly on vertical page scroll.
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
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        return Math.max(0, track.scrollWidth - track.clientWidth);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollAmount() + 500}`,
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
                PROCESS_STEPS.length - 1,
                Math.floor(self.progress * (PROCESS_STEPS.length - 0.05))
              );
              progressTextRef.current.textContent = `STAGE 0${activeIndex + 1} OF 0${PROCESS_STEPS.length}`;
            }
          },
        },
      });

      tl.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
      });

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
        {/* Top Header above Cards */}
        <header className="stack-cards-top-header">
          <h2 className="stack-cards-top-title">PROCESS</h2>
          <div className="stack-cards-header-progress">
            
            <div className="stack-cards-progress-track">
              <div ref={progressBarRef} className="stack-cards-progress-bar" />
            </div>
          </div>
        </header>

        {/* Right Stage: Horizontal Cards Track */}
        <div className="stack-cards-stage">
          <div ref={trackRef} className="horizontal-cards-track">
            {PROCESS_STEPS.map((step) => (
              <article
                key={step.id}
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
      </div>
    </section>
  );
}

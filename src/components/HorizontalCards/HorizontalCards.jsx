import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import step1Img from '../../assets/process/step_1.png';
import step2Img from '../../assets/process/step_2.png';
import step3Img from '../../assets/process/step_3.png';
import step4Img from '../../assets/process/step_4.png';
import step5Img from '../../assets/process/step_5.png';

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
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressTextRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!section || !stage || !track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Helper to update progress bar and step counter
    const updateProgress = (progress) => {
      // Scale effective progress so 100% is reached when the track reaches the 5th card
      const effectiveProgress = Math.min(1, progress / 0.82);
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${effectiveProgress})`;
      }
      if (progressTextRef.current) {
        const stepCount = PROCESS_STEPS.length;
        const activeIndex = Math.min(
          stepCount - 1,
          Math.max(0, Math.floor(effectiveProgress * stepCount * 0.999))
        );
        progressTextRef.current.textContent = `STAGE 0${activeIndex + 1} OF 0${stepCount}`;
      }
    };

    const getScrollAmount = () => {
      const cards = track.querySelectorAll('.stack-card');
      if (!cards || cards.length === 0) {
        return Math.max(0, track.scrollWidth - stage.clientWidth);
      }
      const lastCard = cards[cards.length - 1];
      const stageWidth = stage.clientWidth;
      const trackStyles = window.getComputedStyle(track);
      const paddingRight =
        parseFloat(trackStyles.paddingRight) ||
        parseFloat(trackStyles.paddingLeft) ||
        60;

      // Exact right boundary of the 5th card + full right padding
      const totalTrackEnd = lastCard.offsetLeft + lastCard.offsetWidth + paddingRight;
      return Math.max(0, totalTrackEnd - stageWidth);
    };

    // Use GSAP matchMedia for fully responsive scroll trigger calculations
    const mm = gsap.matchMedia();

    // 1. Large Desktop & Desktop (1024px+)
    mm.add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollAmount() * 1.3 + 320}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateProgress(self.progress),
        },
      });

      tl.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        duration: 1,
      });

      // Dwell period so the 5th card is comfortably viewed before unpinning
      tl.to({}, { duration: 0.22 });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    // 2. Tablet (600px - 1023px)
    mm.add('(min-width: 600px) and (max-width: 1023px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollAmount() * 1.15 + 220}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateProgress(self.progress),
        },
      });

      tl.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        duration: 1,
      });

      tl.to({}, { duration: 0.18 });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    // 3. Mobile (320px - 599px)
    mm.add('(max-width: 599px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollAmount() * 1.05 + 140}`,
          pin: true,
          scrub: 0.35, // Snappier touch response for finger scrolling
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateProgress(self.progress),
        },
      });

      tl.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        duration: 1,
      });

      tl.to({}, { duration: 0.15 });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Refresh after layout and images settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      mm.revert();
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
            <span ref={progressTextRef} className="stack-cards-counter">
              STAGE 01 OF 05
            </span>
            <div className="stack-cards-progress-track">
              <div ref={progressBarRef} className="stack-cards-progress-bar" />
            </div>
          </div>
        </header>

        {/* Right Stage: Horizontal Cards Track */}
        <div ref={stageRef} className="stack-cards-stage">
          <div ref={trackRef} className="horizontal-cards-track">
            {PROCESS_STEPS.map((step) => (
              <article
                key={step.id}
                className="stack-card"
                data-step={step.id}
                style={{ '--card-accent': step.accent }}
              >
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
                      className={`stack-card__img ${step.id === 'harvest' ? 'stack-card__img--cover' : ''}`}
                      loading="lazy"
                    />
                  </motion.div>
                </div>

                {/* Card Editorial Content */}
                <div className="stack-card__content">
                  <h3 className="stack-card__title">{step.title}</h3>
                  <p className="stack-card__desc">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

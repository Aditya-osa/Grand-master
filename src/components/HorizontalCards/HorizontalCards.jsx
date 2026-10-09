import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  grainsImg,
  distillationImg,
  blendingImg,
  filtrationImg,
  bottlingImg,
} from '../../assets/process';

import './HorizontalCards.css';

gsap.registerPlugin(ScrollTrigger);

export const PROCESS_STEPS = [
  {
    id: 'grains',
    stepNumber: '01',
    title: 'Grains',
    description: 'From carefully selected grains, the finest ingredients are chosen.',
    image: grainsImg,
  },
  {
    id: 'distillation',
    stepNumber: '02',
    title: 'Distillation',
    description: 'The spirit undergoes a precise distillation process to achieve the desired character and quality.',
    image: distillationImg,
  },
  {
    id: 'blending',
    stepNumber: '03',
    title: 'Blending',
    description: 'Carefully selected ingredients are blended to create a smooth and balanced flavour.',
    image: blendingImg,
  },
  {
    id: 'filtration',
    stepNumber: '04',
    title: 'Filtration',
    description: 'The spirit is thoroughly filtered to ensure clarity, smoothness, and consistent quality.',
    image: filtrationImg,
  },
  {
    id: 'bottling',
    stepNumber: '05',
    title: 'Bottling',
    description: 'The finished spirit is carefully bottled and sealed to preserve its quality and freshness.',
    image: bottlingImg,
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
      if (!track || !stage) return 0;
      const scrollDistance = track.scrollWidth - stage.clientWidth;
      return Math.max(0, scrollDistance);
    };

    // Use GSAP matchMedia for fully responsive scroll trigger calculations
    const mm = gsap.matchMedia();

    // 1. Large Desktop & Desktop (1024px+)
    mm.add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * 1.2, getScrollAmount() * 1.35 + 350)}`,
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
      tl.to({}, { duration: 0.2 });

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
          end: () => `+=${Math.max(window.innerHeight, getScrollAmount() * 1.2 + 250)}`,
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

      tl.to({}, { duration: 0.16 });

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
          end: () => `+=${Math.max(window.innerHeight * 0.9, getScrollAmount() * 1.1 + 180)}`,
          pin: true,
          scrub: 0.4,
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

      tl.to({}, { duration: 0.12 });

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
    }, 250);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      mm.revert();
    };
  }, []);

  const handleScroll = (direction) => {
    const scrollStep = window.innerHeight * 0.6;
    window.scrollBy({
      top: direction === 'left' ? -scrollStep : scrollStep,
      behavior: 'smooth',
    });
  };

  const handleExploreClick = (e) => {
    e.preventDefault();
    const section = sectionRef.current;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          <div className="stack-cards-header-left">
            <h2 className="stack-cards-top-title">Process</h2>
            <p className="stack-cards-top-desc">
              It is the complete coordination among quality standards in an organization to ensure all the requirements.
            </p>
          </div>

          <div className="stack-cards-header-right">
            <div className="stack-cards-nav-controls" role="group" aria-label="Process Navigation">
              <button
                type="button"
                className="stack-cards-nav-btn"
                onClick={() => handleScroll('left')}
                aria-label="Previous process step"
              >
                ←
              </button>
              <button
                type="button"
                className="stack-cards-nav-btn"
                onClick={() => handleScroll('right')}
                aria-label="Next process step"
              >
                →
              </button>
            </div>
            <a
              href="#distillation"
              className="stack-cards-explore-btn"
              onClick={handleExploreClick}
            >
              View All Process
            </a>
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
                      loading="eager"
                      onLoad={() => ScrollTrigger.refresh()}
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

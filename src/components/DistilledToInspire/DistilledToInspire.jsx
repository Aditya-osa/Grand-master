import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DistilledToInspire.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * DistilledToInspire - Apple & Webflow scroll-driven gradient text reveal
 * Recreates https://gradient-text-scroll-effect.webflow.io/
 * Illuminates progressively from the end (bottom) of the paragraph to the top
 */
export default function DistilledToInspire() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const state = { p: 0 };

      gsap.to(state, {
        p: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=90%',
          pin: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: () => {
            const p = state.p;
            if (p >= 92) {
              // When scrolled through, all text is completely solid black
              textEl.style.backgroundImage = 'none';
              textEl.style.color = '#000000';
              textEl.style.webkitTextFillColor = '#000000';
            } else {
              textEl.style.color = 'transparent';
              textEl.style.webkitTextFillColor = 'transparent';
              const progressPoint = Math.min(100, p * 1.25);
              textEl.style.backgroundImage = `linear-gradient(to top, #000000 0%, #000000 ${progressPoint}%, rgba(0, 0, 0, 0.25) ${Math.min(100, progressPoint + 14)}%, rgba(0, 0, 0, 0.25) 100%)`;
            }
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="distilled-to-inspire" aria-label="Distilled to Inspire">
      <div className="distilled-to-inspire__inner">
        <div className="distilled-to-inspire__content">
          {/* Bold Heading */}
          <h2 className="distilled-to-inspire__title">
            DISTILLED TO INSPIRE
          </h2>

          {/* Amber Wavy Underline */}
          <svg
            className="distilled-to-inspire__wave"
            viewBox="0 0 56 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M2 7 C 6 2, 10 2, 14 7 C 18 12, 22 12, 26 7 C 30 2, 34 2, 38 7 C 42 12, 46 12, 50 7 C 52 4.5, 54 4.5, 54 7"
              stroke="#F5A623"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Inception Year Meta */}
          <p className="distilled-to-inspire__inception">
            <strong>Inception year-</strong> Since 2015
          </p>

          {/* Editorial Paragraph with Bottom-Up Reveal */}
          <div className="distilled-to-inspire__text-wrapper">
            <p ref={textRef} className="distilled-to-inspire__paragraph">
              Grand Masters vodka is produced by House of Deejay Distilleries Pvt Ltd. It is present in the major cities of Maharashtra and distributed in Africa and Middle East. Grand Master's includes flavoured Vodka, and is more for the Youth because of the blended flavours and the variety of Vodka it has to offer &amp; also for people who want to start drinking and try new things.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

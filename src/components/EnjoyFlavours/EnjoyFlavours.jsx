import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './EnjoyFlavours.css';

gsap.registerPlugin(ScrollTrigger);

export default function EnjoyFlavours() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  
  // Background typography refs
  const bgTextRef = useRef(null);

  // Main title word refs
  const enjoyWordRef = useRef(null);
  const uniqueWordRef = useRef(null);
  const flavoursWordRef = useRef(null);

  // Editorial description & final statement refs
  const descRef = useRef(null);
  const statementRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=300%', // 300vh scroll distance
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ======================================================================
      // SCROLL 0% -> 30%: INITIAL ZOOM & SCROLL HINT FADE
      // ======================================================================
      tl.to(
        scrollIndicatorRef.current,
        { opacity: 0, y: -20, duration: 0.15, ease: 'power1.out' },
        0
      );

      // Low-opacity background typography parallax depth motion
      if (bgTextRef.current) {
        tl.to(
          bgTextRef.current,
          { y: -100, scale: 1.1, opacity: 0.1, duration: 1, ease: 'none' },
          0
        );
      }

      // Main Title Initial Zoom (0% -> 30%)
      tl.to(
        enjoyWordRef.current,
        { scale: 1.5, duration: 0.3, ease: 'power2.inOut' },
        0
      );
      tl.to(
        uniqueWordRef.current,
        { scale: 1.5, duration: 0.3, ease: 'power2.inOut' },
        0
      );
      tl.to(
        flavoursWordRef.current,
        { scale: 1.5, duration: 0.3, ease: 'power2.inOut' },
        0
      );

      // ======================================================================
      // SCROLL 30% -> 60%: DRAMATIC WORD SPLIT & MAGNIFICATION
      // "ENJOY" moves LEFT, "FLAVOURS" moves RIGHT, "UNIQUE" stays CENTER
      // ======================================================================
      tl.to(
        enjoyWordRef.current,
        { xPercent: -110, yPercent: -30, scale: 2.2, opacity: 0.35, duration: 0.3, ease: 'power2.inOut' },
        0.3
      );

      tl.to(
        flavoursWordRef.current,
        { xPercent: 110, yPercent: -30, scale: 2.2, opacity: 0.35, duration: 0.3, ease: 'power2.inOut' },
        0.3
      );

      tl.to(
        uniqueWordRef.current,
        { yPercent: -70, scale: 0.85, opacity: 0.45, duration: 0.3, ease: 'power2.inOut' },
        0.3
      );

      // ======================================================================
      // SCROLL 60% -> 80%: WORDS MOVE AWAY + EDITORIAL DESCRIPTION REVEAL
      // ======================================================================
      tl.to(
        enjoyWordRef.current,
        { xPercent: -180, opacity: 0, duration: 0.2, ease: 'power2.in' },
        0.6
      );
      tl.to(
        flavoursWordRef.current,
        { xPercent: 180, opacity: 0, duration: 0.2, ease: 'power2.in' },
        0.6
      );
      tl.to(
        uniqueWordRef.current,
        { yPercent: -140, opacity: 0, duration: 0.2, ease: 'power2.in' },
        0.6
      );

      // Description smooth entrance (opacity 0->1, y 80px->0, scale 0.95->1)
      tl.to(
        descRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' },
        0.6
      );

      // ======================================================================
      // SCROLL 80% -> 100%: FINAL TYPOGRAPHY STATEMENT ("GRAND MASTER’S")
      // ======================================================================
      tl.to(
        descRef.current,
        { opacity: 0.25, y: -25, duration: 0.2, ease: 'power2.in' },
        0.8
      );

      tl.to(
        statementRef.current,
        { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' },
        0.8
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="enjoy-flavours-section"
      aria-label="Enjoy Unique Flavours Experience"
    >
      <div ref={viewportRef} className="enjoy-flavours-viewport">
        {/* Foreground Main Split Typography */}
        <div className="enjoy-flavours-title-wrap">
          <div className="enjoy-flavours-line-top">
            <span ref={enjoyWordRef} className="enjoy-flavours-word enjoy-flavours-word--enjoy">
              ENJOY
            </span>
            <span ref={uniqueWordRef} className="enjoy-flavours-word enjoy-flavours-word--unique">
              UNIQUE
            </span>
          </div>
          <div className="enjoy-flavours-line-bottom">
            <span ref={flavoursWordRef} className="enjoy-flavours-word enjoy-flavours-word--flavours">
              FLAVOURS
            </span>
          </div>
        </div>

        {/* Middle Stage: Editorial Description */}
        <div ref={descRef} className="enjoy-flavours-desc-wrap">
          <p className="enjoy-flavours-description">
            It is the perfect combination between quality distillate in a unique bottle shape and urban culture inspiration. GRAND MASTER’S represents the stubborn, eager, free spirits of the young generation. Its exquisite nature drives through limits and cultural dogmas.
          </p>
        </div>

        {/* Final Statement Typography */}
        <div ref={statementRef} className="enjoy-flavours-statement-wrap">
          <h3 className="enjoy-flavours-statement">GRAND MASTER’S</h3>
        </div>

        {/* Initial Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="enjoy-flavours-scroll-hint">
          <span className="enjoy-flavours-scroll-text">SCROLL TO EXPERIENCE</span>
          <div className="enjoy-flavours-scroll-bar" />
        </div>
      </div>
    </section>
  );
}

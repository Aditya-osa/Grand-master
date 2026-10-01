import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './EnjoyFlavours.css';

gsap.registerPlugin(ScrollTrigger);

export default function EnjoyFlavours() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  
  // Title container ref
  const titleWrapRef = useRef(null);

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
      // 1. SCROLL 0% -> 25%: SCROLL HINT FADES & TITLE SCALES UP SLIGHTLY
      // ======================================================================
      tl.to(
        scrollIndicatorRef.current,
        { opacity: 0, y: -20, duration: 0.15, ease: 'power1.out' },
        0
      );

      tl.to(
        titleWrapRef.current,
        { scale: 1.1, duration: 0.25, ease: 'power1.out' },
        0
      );

      // ======================================================================
      // 2. SCROLL 25% -> 55%: TITLE LIFTS & FADES OUT CLEANLY (NO OVERLAP)
      // ======================================================================
      tl.to(
        titleWrapRef.current,
        { opacity: 0, y: -80, scale: 1.2, duration: 0.3, ease: 'power2.in' },
        0.25
      );

      // ======================================================================
      // 3. SCROLL 45% -> 75%: EDITORIAL DESCRIPTION ENTERS CENTER
      // ======================================================================
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' },
        0.45
      );

      // ======================================================================
      // 4. SCROLL 75% -> 100%: FINAL TYPOGRAPHY STATEMENT ("GRAND MASTER’S")
      // ======================================================================
      tl.to(
        descRef.current,
        { opacity: 0.25, y: -30, duration: 0.25, ease: 'power2.in' },
        0.75
      );

      tl.fromTo(
        statementRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        0.75
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
        <div ref={titleWrapRef} className="enjoy-flavours-title-wrap">
          <div className="enjoy-flavours-line-top">
            <span className="enjoy-flavours-word enjoy-flavours-word--enjoy">
              ENJOY
            </span>
            <span className="enjoy-flavours-word enjoy-flavours-word--unique">
              UNIQUE
            </span>
          </div>
          <div className="enjoy-flavours-line-bottom">
            <span className="enjoy-flavours-word enjoy-flavours-word--flavours">
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

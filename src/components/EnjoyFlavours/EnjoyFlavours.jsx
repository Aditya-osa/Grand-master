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

  // Editorial description & scroll indicator refs
  const descRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Goonies initial states
      gsap.set(titleWrapRef.current, { opacity: 0.2, scale: 0.85 });
      gsap.set(descRef.current, { opacity: 0, y: 80 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=80%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ======================================================================
      // PHASE 1 (0.00 -> 0.45): GOONIES TITLE ZOOM & FADE OUT
      // ======================================================================
      tl.to(
        scrollIndicatorRef.current,
        { opacity: 0, duration: 0.1, ease: 'power1.out' },
        0
      );

      tl.to(
        titleWrapRef.current,
        { opacity: 1, scale: 1, duration: 0.22, ease: 'power1.out' },
        0
      );

      tl.to(
        titleWrapRef.current,
        { opacity: 0, scale: 1.35, y: -40, duration: 0.23, ease: 'power2.in' },
        0.22
      );

      // ======================================================================
      // PHASE 2 (0.45 -> 1.00): EDITORIAL DESCRIPTION REVEAL (COMES UP FROM BELOW)
      // Starts ONLY AFTER title is 100% invisible. Remains visible to avoid black void.
      // ======================================================================
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0.45
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

       

        {/* Initial Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="enjoy-flavours-scroll-hint">
          <span className="enjoy-flavours-scroll-text">SCROLL TO EXPERIENCE</span>
          <div className="enjoy-flavours-scroll-bar" />
        </div>
      </div>
    </section>
  );
}

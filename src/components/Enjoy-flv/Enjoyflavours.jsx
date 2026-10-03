import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import bgImage from '../../assets/WhatsApp Image 2026-10-03 at 12.31.13 PM.jpeg';
import './Enjoy-flv.css';

gsap.registerPlugin(ScrollTrigger);

export default function Enjoyflavours() {
  const sectionRef = useRef(null);
  const bgImageRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const text = textRef.current;
    const img = bgImageRef.current;
    const overlay = overlayRef.current;
    if (!section || !title || !text || !img || !overlay) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia(sectionRef);

    // Desktop Timeline (Extremely smooth, slow, cinematic camera push-in)
    mm.add('(min-width: 769px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2800', // Extended scroll distance so animation has plenty of room to breathe
          pin: true,
          anticipatePin: 1,
          scrub: 2.5, // High numeric scrub for ultra-smooth catch-up and zero jitter
          invalidateOnRefresh: true,
        },
      });

      // Initial state: starts at natural scale: 1 and transparent overlay
      gsap.set(title, { opacity: 1, scale: 1.35, y: 0, transformOrigin: 'center center' });
      gsap.set(text, { opacity: 0, y: 60, scale: 0.96, transformOrigin: 'center center' });
      gsap.set(img, { scale: 1.0, transformOrigin: 'center center', force3D: true });
      gsap.set(overlay, { opacity: 0, force3D: true });

      // Slow, continuous camera push-in: scale 1 -> 1.18 and gradual darkening 0 -> 0.42
      tl.to(img, {
        scale: 1.18,
        duration: 10,
        ease: 'none',
      }, 0);

      tl.to(overlay, {
        opacity: 0.45,
        duration: 10,
        ease: 'none',
      }, 0);

      // STAGE 1 (0% to 20%): Initial hero title display
      tl.to(title, { scale: 1.28, y: -10, duration: 2, ease: 'none' }, 0);

      // STAGE 2 (20% to 48%): Title smoothly ascends, scales, and fades out
      tl.to(title, { opacity: 0, y: -80, scale: 0.92, duration: 2.8, ease: 'power2.inOut' }, 2.0);

      // STAGE 3 (34% to 66%): Story paragraph glides in over the slowly zooming background
      tl.fromTo(
        text,
        { opacity: 0, y: 60, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 3.2, ease: 'power2.out' },
        3.4
      );

      // STAGE 4 (66% to 86%): Paragraph holds focus steadily
      tl.to(text, { y: -10, duration: 2.0, ease: 'none' }, 6.6);

      // STAGE 5 (86% to 100%): Final hold
      tl.to({}, { duration: 1.4 });
    });

    // Mobile & Tablet Timeline
    mm.add('(max-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2000',
          pin: true,
          anticipatePin: 1,
          scrub: 2.0,
          invalidateOnRefresh: true,
        },
      });

      // Initial state
      gsap.set(title, { opacity: 1, scale: 1.15, y: 0, transformOrigin: 'center center' });
      gsap.set(text, { opacity: 0, y: 40, scale: 0.96, transformOrigin: 'center center' });
      gsap.set(img, { scale: 1.0, transformOrigin: 'center center', force3D: true });
      gsap.set(overlay, { opacity: 0, force3D: true });

      // Mobile slow continuous zoom & darkening
      tl.to(img, { scale: 1.18, duration: 8, ease: 'none' }, 0);
      tl.to(overlay, { opacity: 0.45, duration: 8, ease: 'none' }, 0);

      // Title fade
      tl.to(title, { scale: 1.10, y: -6, duration: 1.5, ease: 'none' }, 0)
        .to(title, { opacity: 0, y: -50, scale: 0.92, duration: 2.0, ease: 'power2.inOut' }, 1.5);

      // Text entry
      tl.fromTo(
        text,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 2.5, ease: 'power2.out' },
        2.2
      );

      // Text hold
      tl.to(text, { y: -6, duration: 1.8, ease: 'none' }, 5.0);
      tl.to({}, { duration: 1.2 });
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="enjoy-flavours-section" aria-label="Enjoy Unique Flavours">
      {/* Layer 1: Full-Screen Background Image with Slow Smooth Scroll Zoom */}
      <div className="enjoy-flavours-bg-wrap">
        <img
          ref={bgImageRef}
          className="enjoy-flavours-bg-image hero-background-image"
          src={bgImage}
          alt="Grand Master Vineyard Landscape"
          loading="eager"
        />
        {/* Layer 1b: Progressive Dark Overlay (0 -> ~0.45) */}
        <div ref={overlayRef} className="enjoy-flavours-dark-overlay" aria-hidden="true" />
      </div>

      {/* Layer 2 (z-2): Centered Independent Foreground Typography */}
        <div className="enjoy-flavours-container">
        <h2 ref={titleRef} className="enjoy-flavours-title">
          ENJOY UNIQUE FLAVOURS
        </h2>
        <p ref={textRef} className="enjoy-flavours-text">
          IT IS THE PERFECT COMBINATION BETWEEN QUALITY DISTILLATE IN AN UNIQUE BOTTLE SHAPE AND URBAN CULTURE INSPIRATION. GRAND MASTER’S REPRESENTS THE STUBBORN EAGER, FREE SPIRITS OF THE YOUNG GENERATION. IT’S EXQUISITE NATURE DRIVES THROUGH LIMITS AND CULTURAL DOGMAS.
        </p>
      </div>
    </section>
  );
}

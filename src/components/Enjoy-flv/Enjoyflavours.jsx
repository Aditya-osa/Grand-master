import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import fgImage from '../../assets/a.png';
import bgImage from '../../assets/b.png';
import './Enjoy-flv.css';

gsap.registerPlugin(ScrollTrigger);

export default function Enjoyflavours() {
  const sectionRef = useRef(null);
  const bgImageRef = useRef(null);
  const fgImageRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const text = textRef.current;
    const bgImg = bgImageRef.current;
    const fgImg = fgImageRef.current;
    const overlay = overlayRef.current;
    if (!section || !title || !text || !bgImg || !fgImg || !overlay) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    // Desktop Timeline (Multi-layered 3D Parallax & Continuous Forward Camera Push-In)
    mm.add('(min-width: 769px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2400', // Perfectly paced scroll distance for fluid transition
          pin: true,
          anticipatePin: 1,
          scrub: 1.5, // Responsive scrub for instant catch-up and zero jumpiness
          invalidateOnRefresh: true,
        },
      });

      // Initial state: starts with cinematic darkness
      gsap.set(title, { opacity: 1, scale: 1.0, y: 0, transformOrigin: 'center center' });
      gsap.set(text, { opacity: 0, y: 45, scale: 1.0, transformOrigin: 'center center' });
      gsap.set(bgImg, { scale: 1.0, transformOrigin: 'center center', force3D: true });
      gsap.set(fgImg, { scale: 1.0, opacity: 1, transformOrigin: 'center center', force3D: true });
      gsap.set(overlay, { opacity: 0.42, force3D: true });

      // Layer 1: Background landscape continuous forward zoom-in (scale 1.0 -> 1.24)
      tl.to(bgImg, {
        scale: 1.24,
        duration: 10,
        ease: 'none',
      }, 0);

      // Layer 2: Foreground archway continuously pushes forward past the camera lens (scale 1.0 -> 1.85, fading outward)
      tl.to(fgImg, {
        scale: 1.85,
        opacity: 0.1,
        duration: 10,
        ease: 'none',
      }, 0);

      // Layer 3: Consistent atmospheric darkness throughout zoom
      tl.to(overlay, {
        opacity: 0.48,
        duration: 10,
        ease: 'none',
      }, 0);

      // STAGE 1 (0% to 20%): Initial hero title begins moving forward with the camera zoom
      tl.to(title, { scale: 1.08, y: -10, duration: 2, ease: 'none' }, 0);

      // STAGE 2 (20% to 44%): Title continues zooming forward as it floats up and dissolves (scale 1.08 -> 1.20, opacity -> 0)
      tl.to(title, { opacity: 0, y: -60, scale: 1.20, duration: 2.4, ease: 'power2.inOut' }, 2.0);

      // STAGE 3 (32% to 62%): Story paragraph glides into focal position and holds clean focus
      tl.fromTo(
        text,
        { opacity: 0, y: 45, scale: 1.0 },
        { opacity: 1, y: 0, scale: 1.02, duration: 3.0, ease: 'power2.out' },
        3.2
      );

      // STAGE 4 (62% to 80%): Paragraph holds steadily with subtle forward drift (scale 1.02 -> 1.04)
      tl.to(text, { scale: 1.04, y: -6, duration: 1.8, ease: 'none' }, 6.2);

      // STAGE 5 (80% to 95%): Narrative text softly ascends and dissolves for a graceful exit into the next section
      tl.to(text, { opacity: 0, y: -35, scale: 1.06, duration: 1.5, ease: 'power2.inOut' }, 8.0);

      // STAGE 6 (95% to 100%): Clean transition cushion
      tl.to({}, { duration: 0.5 }, 9.5);
    });

    // Mobile & Tablet Timeline
    mm.add('(max-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=1800',
          pin: true,
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Initial state
      gsap.set(title, { opacity: 1, scale: 1.0, y: 0, transformOrigin: 'center center' });
      gsap.set(text, { opacity: 0, y: 35, scale: 1.0, transformOrigin: 'center center' });
      gsap.set(bgImg, { scale: 1.0, transformOrigin: 'center center', force3D: true });
      gsap.set(fgImg, { scale: 1.0, opacity: 1, transformOrigin: 'center center', force3D: true });
      gsap.set(overlay, { opacity: 0.42, force3D: true });

      // Mobile layered continuous forward zoom-in
      tl.to(bgImg, { scale: 1.20, duration: 8, ease: 'none' }, 0);
      tl.to(fgImg, { scale: 1.55, opacity: 0.15, duration: 8, ease: 'none' }, 0);
      tl.to(overlay, { opacity: 0.48, duration: 8, ease: 'none' }, 0);

      // Title zooms in as it dissolves
      tl.to(title, { scale: 1.05, y: -6, duration: 1.5, ease: 'none' }, 0)
        .to(title, { opacity: 0, y: -35, scale: 1.12, duration: 1.8, ease: 'power2.inOut' }, 1.5);

      // Text entry
      tl.fromTo(
        text,
        { opacity: 0, y: 35, scale: 1.0 },
        { opacity: 1, y: 0, scale: 1.02, duration: 2.2, ease: 'power2.out' },
        2.2
      );

      // Text hold
      tl.to(text, { scale: 1.04, y: -4, duration: 1.8, ease: 'none' }, 4.4);

      // Smooth exit dissolve into next section
      tl.to(text, { opacity: 0, y: -25, scale: 1.05, duration: 1.4, ease: 'power2.inOut' }, 6.2);
      tl.to({}, { duration: 0.4 }, 7.6);
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      mm.revert();
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="enjoy-flavours-section" aria-label="Enjoy Unique Flavours">
      {/* Visual Canvas Layers */}
      <div className="enjoy-flavours-bg-wrap">
        {/* Layer 1: Background Landscape (b.png) */}
        <img
          ref={bgImageRef}
          className="enjoy-flavours-bg-image"
          src={bgImage}
          alt="Grand Master Vineyard Landscape Background"
          loading="eager"
        />

        {/* Layer 2: Foreground Arch & Chairs (a.png) */}
        <img
          ref={fgImageRef}
          className="enjoy-flavours-fg-image"
          src={fgImage}
          alt="Grand Master Archway and Trellis Foreground"
          loading="eager"
        />

        {/* Layer 3: Progressive Atmospheric Dark Overlay */}
        <div ref={overlayRef} className="enjoy-flavours-dark-overlay" aria-hidden="true" />
      </div>

      {/* Layer 4: Centered Independent Foreground Typography */}
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

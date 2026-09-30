import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import strawberryBottle from '../All flav/1.png';
import './StrawberryHero.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * StrawberryHero - Luxury Advertising Hero for Grandmaster's Vodka – Strawberry
 */
export default function StrawberryHero() {
  const heroRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const supportRef = useRef(null);
  const bottleRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Cinematic Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1.0 },
          '-=0.5'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.85 },
          '-=0.6'
        )
        .fromTo(
          supportRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.85 },
          '-=0.55'
        )
        .fromTo(
          bottleRef.current,
          { opacity: 0, y: 45, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'power2.out' },
          '-=1.1'
        )
        .fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 1.5, ease: 'sine.out' },
          '-=1.2'
        );

      // 2. Smooth Scroll Parallax Transition into next section
      gsap.to([eyebrowRef.current, titleRef.current, descRef.current, supportRef.current], {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      gsap.to(bottleRef.current, {
        yPercent: -10,
        scale: 1.02,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      gsap.to(glowRef.current, {
        opacity: 0.35,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="strawberry-hero" aria-label="Grandmaster's Vodka Strawberry Product Hero">
      {/* Studio Ambient Atmosphere & Lighting */}
      <div className="strawberry-hero__backdrop" aria-hidden="true" />
      <div ref={glowRef} className="strawberry-hero__glow" aria-hidden="true" />

      <div className="strawberry-hero__container">
        {/* LEFT COLUMN: Editorial Luxury Copy */}
        <div className="strawberry-hero__content">
          <div className="strawberry-hero__text-block">
            {/* Small Elegant Eyebrow */}
            <span ref={eyebrowRef} className="strawberry-hero__eyebrow">
              GRANDMASTER'S VODKA
            </span>

            {/* Large Product Heading */}
            <h1 ref={titleRef} className="strawberry-hero__title">
              Strawberry
            </h1>

            {/* Product Description */}
            <p ref={descRef} className="strawberry-hero__description">
              Pleasant mild aroma, complemented by sweet strawberry taste
            </p>

            {/* Supporting Tasting Note */}
            <p ref={supportRef} className="strawberry-hero__supporting">
              GRANDMASTER’s Strawberry is enjoyable sweet and refreshing
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Dominant Luxury Bottle Presentation */}
        <div className="strawberry-hero__visual">
          <div className="strawberry-hero__bottle-wrapper">
            {/* Subtle Pedestal Studio Shadow */}
            <div className="strawberry-hero__bottle-shadow" aria-hidden="true" />
            
            <img
              ref={bottleRef}
              src={strawberryBottle}
              alt="Grandmaster's Vodka Strawberry Platinum Edition"
              className="strawberry-hero__image"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import leavesFruitImage from '../assets/Flav..mango/10.png';
import bottleImage from '../assets/Flav..mango/11.png';
import './MangoHero.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * MangoHero - Grand Masters Mango Vodka Cinematic Showcase Section
 * 
 * Architecture:
 * - Framer Motion: Initial entrance orchestrations (bottle arrives first at 0.2s, leaves/fruit at 0.75s)
 * - GSAP: Continuous floating and ScrollTrigger scrub parallax
 * - Clean separation: Outer containers handle Framer Motion, inner containers handle GSAP
 */
export default function MangoHero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const glowRef = useRef(null);

  // Parallax & ScrollTrigger refs (Middle tier)
  const botanicalsParallaxRef = useRef(null);
  const bottleParallaxRef = useRef(null);

  // Continuous Floating refs (Inner tier)
  const botanicalsFloatRef = useRef(null);
  const bottleFloatRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // ----------------------------------------------------------------------
      // 1. GSAP CONTINUOUS FLOATING ANIMATIONS
      // ----------------------------------------------------------------------
      
      // Bottle subtle floating: y: ±10px, rotateZ: ±1.2deg (starts after bottle entrance)
      gsap.to(bottleFloatRef.current, {
        y: 11,
        rotationZ: 1.2,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5,
      });

      // Leaves + Fruit independent floating: y: ±16px, x: ±10px, rotate: ±1.8deg (starts after botanicals entrance)
      gsap.to(botanicalsFloatRef.current, {
        y: -16,
        x: 9,
        rotationZ: -1.8,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2.15,
      });

      // Ambient Studio Glow breathing
      gsap.to(glowRef.current, {
        scale: 1.08,
        opacity: 0.45,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // ----------------------------------------------------------------------
      // 2. GSAP SCROLLTRIGGER PARALLAX (Different speeds for depth)
      // ----------------------------------------------------------------------

      // Bottle: y: 0 -> -80px, scale: 1 -> 0.96
      gsap.to(bottleParallaxRef.current, {
        y: -80,
        scale: 0.96,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      // Leaves + Fruit: y: 0 -> -140px, x: 0 -> 30px (Stronger depth/parallax)
      gsap.to(botanicalsParallaxRef.current, {
        y: -140,
        x: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      // Background lighting shift on scroll
      gsap.to(glowRef.current, {
        y: -50,
        scale: 1.15,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      /*
      // ----------------------------------------------------------------------
      // 3. GSAP 3D MOUSE PARALLAX (quickTo for silky 60/120fps performance)
      // ----------------------------------------------------------------------
      const xToBg = gsap.quickTo(bgRef.current, 'x', { duration: 0.9, ease: 'power2.out' });
      const yToBg = gsap.quickTo(bgRef.current, 'y', { duration: 0.9, ease: 'power2.out' });

      const xToBottle = gsap.quickTo(bottleParallaxRef.current, 'x', { duration: 0.6, ease: 'power2.out' });
      const yToBottle = gsap.quickTo(bottleParallaxRef.current, 'y', { duration: 0.6, ease: 'power2.out' });
      const rotToBottle = gsap.quickTo(bottleParallaxRef.current, 'rotation', { duration: 0.6, ease: 'power2.out' });

      const xToBotanicals = gsap.quickTo(botanicalsParallaxRef.current, 'x', { duration: 0.75, ease: 'power2.out' });
      const yToBotanicals = gsap.quickTo(botanicalsParallaxRef.current, 'y', { duration: 0.75, ease: 'power2.out' });
      const rotToBotanicals = gsap.quickTo(botanicalsParallaxRef.current, 'rotation', { duration: 0.75, ease: 'power2.out' });

      const handleMouseMove = (e) => {
        const rect = hero.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        xToBg(nx * 7);
        yToBg(ny * 7);

        xToBottle(nx * 14);
        yToBottle(ny * 12);
        rotToBottle(nx * 1.0);

        xToBotanicals(nx * 28);
        yToBotanicals(ny * 22);
        rotToBotanicals(nx * -1.8);
      };

      const handleMouseLeave = () => {
        xToBg(0);
        yToBg(0);
        xToBottle(0);
        yToBottle(0);
        rotToBottle(0);
        xToBotanicals(0);
        yToBotanicals(0);
        rotToBotanicals(0);
      };

      hero.addEventListener('mousemove', handleMouseMove);
      hero.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        hero.removeEventListener('mousemove', handleMouseMove);
        hero.removeEventListener('mouseleave', handleMouseLeave);
      };
      */
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // --------------------------------------------------------------------------
  // Framer Motion Animation Variants for Staggered Editorial Content
  // --------------------------------------------------------------------------
  const contentContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.15,
      },
    },
  };

  const contentItemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section ref={heroRef} className="mango-hero hero" aria-label="Grandmaster's Vodka Mango Product Hero">
      {/* 1. BACKGROUND LAYER */}
      <div ref={bgRef} className="mango-hero__backdrop hero-background" aria-hidden="true" />
      <div ref={glowRef} className="mango-hero__glow" aria-hidden="true" />

      {/* Atmospheric Subtle Luxury Watermark */}
      <div className="mango-hero__watermark" aria-hidden="true">
        GRANDMASTER
      </div>

      <div className="mango-hero__container">
        {/* 4. TEXT / CONTENT LAYER */}
        <motion.div
          className="mango-hero__content hero-content"
          variants={contentContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mango-hero__text-block">
            {/* Small Elegant Eyebrow */}
            <motion.span variants={contentItemVariants} className="mango-hero__eyebrow">
              GRANDMASTER'S VODKA
            </motion.span>

            {/* Large Product Heading */}
            <motion.h1 variants={contentItemVariants} className="mango-hero__title">
              Mango
            </motion.h1>

            {/* Product Description */}
            <motion.p variants={contentItemVariants} className="mango-hero__description">
              Vibrant tropical aroma, complemented by succulent ripe mango sweetness
            </motion.p>

            {/* Supporting Tasting Note */}
            <motion.div variants={contentItemVariants} className="mango-hero__supporting-wrap">
              <p className="mango-hero__supporting">
                GRANDMASTER’s Mango is intensely aromatic, velvety and exotic
              </p>
            </motion.div>

            {/* Premium Tasting Feature Tags */}
            <motion.div variants={contentItemVariants} className="mango-hero__tags">
              <span className="mango-hero__tag">Platinum Edition</span>
              <span className="mango-hero__tag">Tropical Infusion</span>
              <span className="mango-hero__tag">Triple Distilled</span>
            </motion.div>
          </div>
        </motion.div>

        {/* VISUAL STAGE: BOTANICALS & BOTTLE LAYERS */}
        <div className="mango-hero__stage">
          {/* 2. LEAVES + FRUIT IMAGE LAYER (ONE ASSET, BEHIND BOTTLE - ENTERS AFTER BOTTLE) */}
          <motion.div
            className="mango-hero__botanicals hero-botanicals"
            initial={{ opacity: 0, y: 50, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.75 }}
          >
            <div ref={botanicalsParallaxRef} className="mango-hero__botanicals-parallax">
              <div ref={botanicalsFloatRef} className="mango-hero__botanicals-float">
                <img
                  src={leavesFruitImage}
                  alt=""
                  aria-hidden="true"
                  className="mango-hero__botanicals-img"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </motion.div>

          {/* 3. BOTTLE IMAGE LAYER (ONE ASSET, IN FRONT OF BOTANICALS - ENTERS FIRST) */}
          <motion.div
            className="mango-hero__bottle hero-bottle"
            initial={{ opacity: 0, y: 80, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div ref={bottleParallaxRef} className="mango-hero__bottle-parallax">
              <div ref={bottleFloatRef} className="mango-hero__bottle-float">
                {/* Subtle Studio Pedestal Shadow */}
                <div className="mango-hero__bottle-shadow" aria-hidden="true" />
                
                <img
                  src={bottleImage}
                  alt="Grand Masters Mango Vodka"
                  className="mango-hero__bottle-img"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MainSection from './MainSection';
import './BannerHero.css';

/**
 * BannerHero Component
 * 6-Stage Interactive Hero section (Orange -> Mango -> Strawberry -> Chocolate -> Melon -> Blueberry).
 * Implements sequenced product reveals with bottle priority, staggered fruits & leaves,
 * calm/graceful timing, custom idle float dynamics, and reversible navigation.
 */
export default function BannerHero() {
  const heroRef = useRef(null);
  const tlRef = useRef(null);
  const entryTlRef = useRef(null);
  const currentFlavourRef = useRef(0); // 0 = Orange, 1 = Mango, 2 = Strawberry, 3 = Chocolate, 4 = Melon, 5 = Blueberry
  const isAnimatingRef = useRef(false);

  const handleSkipHero = () => {
    const heroEl = heroRef.current;

    // Stop current animations
    if (entryTlRef.current) {
      entryTlRef.current.pause();
    }

    if (tlRef.current) {
      tlRef.current.pause();
    }

    // Mark hero as completed
    currentFlavourRef.current = 5;
    isAnimatingRef.current = false;

    // Allow normal page scrolling
    if (heroEl) {
      heroEl.removeAttribute('data-lenis-prevent');
    }

    // Scroll to the section immediately after Hero
    const nextSection = heroEl?.nextElementSibling;

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    // Reset state on mount
    const urlParams = new URLSearchParams(window.location.search);
    const initialFlavour = parseInt(urlParams.get('flavour') || '0', 10);
    currentFlavourRef.current = isNaN(initialFlavour) ? 0 : initialFlavour;
    isAnimatingRef.current = initialFlavour === 0; // Lock interactions until entrance animation completes

    // Prevent Lenis interference while inside Hero flavour stages
    heroEl.setAttribute('data-lenis-prevent', 'true');

    const updateLenisPrevent = () => {
      if (!heroEl) return;
      if (currentFlavourRef.current < 5 || isAnimatingRef.current) {
        heroEl.setAttribute('data-lenis-prevent', 'true');
      } else {
        heroEl.removeAttribute('data-lenis-prevent');
      }
    };

    const mm = gsap.matchMedia(heroEl);

    // =========================================================================
    // 1. DESKTOP & LAPTOP (min-width: 1024px)
    // =========================================================================
    mm.add('(min-width: 1024px)', () => {
      const entryTl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
      entryTlRef.current = entryTl;

      const DURATION = 1.5;
      const EASE = "power3.out";

      entryTl
        .fromTo("#fanta", { y: "-65vh", opacity: 0, rotate: 12 }, { y: "0vh", opacity: 1, rotate: 14, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo("#orange-text", { x: "-60vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".decor-orange", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: DURATION, ease: EASE, force3D: true, stagger: 0.03 }, 0)
        .fromTo("#info-orange", { y: "35vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0);

      const tl = gsap.timeline({ paused: true });
      tlRef.current = tl;

      tl.addLabel('flavour-0', 0);

      // =======================================================================
      // STAGE 1 -> STAGE 2: ORANGE -> MANGO
      // =======================================================================
      // 1. Orange Exits First (0.0s -> 0.55s)
      tl.to("#fanta", { y: "100vh", opacity: 0, rotate: 14, duration: 0.55, ease: "power2.in" }, 0)
        .to("#orange-text", { x: "-100vw", opacity: 0, duration: 0.55, ease: "power2.in" }, 0)
        .to("#info-orange", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 0)
        .to(".decor-orange", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in", stagger: 0.02 }, 0.02)
        
        // Background crossfade: Orange -> Mango
        .to(".bg-orange", { opacity: 0, duration: 1.5, ease: "power2.inOut" }, 0)
        .to(".bg-mango", { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 0);

      // 2. All Mango Elements Enter (0.45s)
      const MANGO_START_DESK = 0.45;
      tl.fromTo("#fanta-mango", 
          { y: "-65vh", opacity: 0, rotate: -8 }, 
          { y: "0vh", opacity: 1, rotate: 14, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_DESK
        )
        .fromTo("#mango-text", 
          { x: "100vw", opacity: 0 }, 
          { x: "0vw", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_DESK
        )
        .fromTo(".mango-top-left", 
          { x: "-30vw", y: -20, rotate: -30, opacity: 0 }, 
          { x: 0, y: 0, rotate: -12, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_DESK
        )
        .fromTo(".mango-top-right", 
          { x: "30vw", y: -15, rotate: 35, opacity: 0 }, 
          { x: 0, y: 0, rotate: 15, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_DESK
        )
        .fromTo(".mango-bottom-right", 
          { x: "30vw", y: "30vh", rotate: -25, opacity: 0 }, 
          { x: 0, y: 0, rotate: 8, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_DESK
        )
        .fromTo(".mango-leaf-left-1", 
          { x: "-25vw", y: -30, rotate: 0, opacity: 0 }, 
          { x: 0, y: 0, rotate: 25, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_DESK
        )
        .fromTo(".mango-leaf-top-mid", 
          { y: "-40vh", rotate: -35, opacity: 0 }, 
          { x: 0, y: 0, rotate: -15, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_DESK
        )
       
        .fromTo(".mango-leaf-bottom-mid", 
          { y: "30vh", rotate: 5, opacity: 0 }, 
          { x: 0, y: 0, rotate: 25, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_DESK
        )
        .fromTo("#info-mango", 
          { y: "35vh", opacity: 0 }, 
          { y: "0vh", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_DESK
        );

      // Resting Label for Mango
      tl.addLabel('flavour-1', 2.00);

      // =======================================================================
      // STAGE 2 -> STAGE 3: MANGO -> STRAWBERRY
      // =======================================================================
      tl.to("#fanta-mango", { y: "100vh", opacity: 0, rotate: 14, duration: 0.55, ease: "power2.in" }, 2.00)
        .to("#mango-text", { x: "-100vw", opacity: 0, duration: 0.55, ease: "power2.in" }, 2.00)
        .to("#info-mango", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 2.00)
        .to(".decor-mango", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 2.00)
        .to(".bg-mango", { opacity: 0, duration: 1.2, ease: "power2.inOut" }, 2.00)
        .to(".bg-strawberry", { opacity: 1, duration: 1.2, ease: "power2.inOut" }, 2.00);

      // Strawberry Elements Enter At (2.45s)
      const STRAWBERRY_START_DESK = 2.45;
      tl.fromTo("#fanta2", 
          { y: "-65vh", opacity: 0, rotate: -8 }, 
          { y: "0vh", opacity: 1, rotate: 14, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          STRAWBERRY_START_DESK
        )
        .fromTo("#strawberry-text", 
          { x: "100vw", opacity: 0 }, 
          { x: "0vw", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          STRAWBERRY_START_DESK
        )
        .fromTo(".decor-strawberry", 
          { opacity: 0, scale: 0.9 }, 
          { opacity: 1, scale: 1, duration: DURATION, ease: EASE, force3D: true, stagger: 0.03, immediateRender: false }, 
          STRAWBERRY_START_DESK
        )
        .fromTo("#info-strawberry", 
          { y: "35vh", opacity: 0 }, 
          { y: "0vh", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          STRAWBERRY_START_DESK
        );

      // Resting Label for Strawberry
      tl.addLabel('flavour-2', 4.00);

      // =======================================================================
      // STAGE 3 -> STAGE 4: STRAWBERRY -> CHOCOLATE
      // =======================================================================
      tl.to("#fanta2", { y: "100vh", opacity: 0, rotate: 14, duration: 0.55, ease: "power2.in" }, 4.00)
        .to("#strawberry-text", { x: "100vw", opacity: 0, duration: 0.55, ease: "power2.in" }, 4.00)
        .to("#info-strawberry", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 4.00)
        .to(".decor-strawberry", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 4.00)
        .to(".bg-strawberry", { opacity: 0, duration: 1.2, ease: "power2.inOut" }, 4.00)
        .to(".bg-chocolate", { opacity: 1, duration: 1.2, ease: "power2.inOut" }, 4.00);

      // Chocolate Elements Enter Simultaneously (Matching Reference Layout)
      const CHOCOLATE_START_DESK = 4.45;
      tl.fromTo("#fanta3", 
          { y: "-65vh", opacity: 0, rotate: 12 }, 
          { y: "0vh", opacity: 1, rotate: 14, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_DESK
        )
        .fromTo("#chocolate-text", 
          { x: "-100vw", opacity: 0 }, 
          { x: "0vw", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_DESK
        )
        .fromTo(".chocolate-top-left", 
          { x: "-30vw", y: -20, rotate: -25, opacity: 0 }, 
          { x: 0, y: 0, rotate: -6, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_DESK
        )
        .fromTo(".chocolate-mint-top", 
          { y: "-40vh", rotate: -10, opacity: 0 }, 
          { x: 0, y: 0, rotate: 20, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_DESK
        )
        .fromTo(".chocolate-coffee-beans", 
          { x: "30vw", y: -15, rotate: 25, opacity: 0 }, 
          { x: 0, y: 0, rotate: -5, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_DESK
        )
        .fromTo(".chocolate-mint-single", 
          { x: "-25vw", y: 20, rotate: -15, opacity: 0 }, 
          { x: 0, y: 0, rotate: 18, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_DESK
        )
        .fromTo(".chocolate-shavings", 
          { x: "25vw", y: "30vh", rotate: -15, opacity: 0 }, 
          { x: 0, y: 0, rotate: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_DESK
        )
        .fromTo(".chocolate-mint-bottom", 
          { x: "25vw", y: "25vh", rotate: -10, opacity: 0 }, 
          { x: 0, y: 0, rotate: -30, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_DESK
        )
        .fromTo("#info-chocolate", 
          { y: "35vh", opacity: 0 }, 
          { y: "0vh", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_DESK
        );

      tl.addLabel('flavour-3', 6.00);

      // =======================================================================
      // STAGE 4 -> STAGE 5: CHOCOLATE -> MELON
      // =======================================================================
      tl.to("#fanta3", { y: "100vh", opacity: 0, rotate: 14, duration: 0.55, ease: "power2.in" }, 6.00)
        .to("#chocolate-text", { x: "-100vw", opacity: 0, duration: 0.6, ease: "power2.in" }, 6.00)
        .to("#info-chocolate", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 6.00)
        .to(".decor-chocolate", { y: "100vh", opacity: 0, duration: 0.6, ease: "power2.in" }, 6.00)
        .to(".bg-chocolate", { opacity: 0, duration: 1.2, ease: "power2.inOut" }, 6.00)
        .to(".bg-melon", { opacity: 1, duration: 1.2, ease: "power2.inOut" }, 6.00)
        .fromTo("#fanta4", { y: "-100vh", opacity: 0, rotate: 14 }, { y: "0vh", opacity: 1, rotate: 14, duration: 0.7, ease: "power2.out", immediateRender: false }, 6.50)
        .fromTo("#melon-text", { x: "100vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: 0.7, ease: "power2.out", immediateRender: false }, 6.50)
        .fromTo("#info-melon", { y: "100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.7, ease: "power2.out", immediateRender: false }, 6.50)
        .fromTo(".decor-melon", 
          { opacity: 0, scale: 0.9 }, 
          { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out", force3D: true, stagger: 0.03, immediateRender: false }, 
          6.50
        );

      tl.addLabel('flavour-4', 7.20);

      // =======================================================================
      // STAGE 5 -> STAGE 6: MELON -> BLUEBERRY
      // =======================================================================
      tl.to("#fanta4", { y: "100vh", opacity: 0, rotate: 14, duration: 0.55, ease: "power2.in" }, 7.20)
        .to("#melon-text", { x: "100vw", opacity: 0, duration: 0.55, ease: "power2.in" }, 7.20)
        .to("#info-melon", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 7.20)
        .to(".decor-melon", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 7.20)
        .to(".bg-melon", { opacity: 0, duration: 1.2, ease: "power2.inOut" }, 7.20)
        .to(".bg-blueberry", { opacity: 1, duration: 1.2, ease: "power2.inOut" }, 7.20);

      const BLUEBERRY_START_DESK = 7.65;
      tl.fromTo("#fanta-blueberry", 
          { y: "-65vh", opacity: 0, rotate: -8 }, 
          { y: "0vh", opacity: 1, rotate: 14, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          BLUEBERRY_START_DESK
        )
        .fromTo("#blueberry-text", 
          { x: "100vw", opacity: 0 }, 
          { x: "0vw", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          BLUEBERRY_START_DESK
        )
        .fromTo(".decor-blueberry", 
          { opacity: 0, scale: 0.9 }, 
          { opacity: 1, scale: 1, duration: DURATION, ease: EASE, force3D: true, stagger: 0.03, immediateRender: false }, 
          BLUEBERRY_START_DESK
        )
        .fromTo("#info-blueberry", 
          { y: "35vh", opacity: 0 }, 
          { y: "0vh", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          BLUEBERRY_START_DESK
        );

      tl.addLabel('flavour-5', 9.20);

      if (initialFlavour > 0) {
        entryTl.progress(1);
        tl.seek(`flavour-${initialFlavour}`);
        isAnimatingRef.current = false;
      }
    });

    // =========================================================================
    // 2. TABLET (min-width: 600px and max-width: 1023px)
    // =========================================================================
    mm.add('(min-width: 600px) and (max-width: 1023px)', () => {
      const entryTl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
      entryTlRef.current = entryTl;

      const DURATION = 1.3;
      const EASE = "power3.out";

      entryTl
        .fromTo("#fanta", { y: "-55vh", opacity: 0, rotate: 12 }, { y: "0vh", opacity: 1, rotate: 14, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo("#orange-text", { x: "-50vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".decor-orange", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: DURATION, ease: EASE, force3D: true, stagger: 0.03 }, 0)
        .fromTo("#info-orange", { y: "28vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0);

      const tl = gsap.timeline({ paused: true });
      tlRef.current = tl;

      tl.addLabel('flavour-0', 0);

      // Staged Transition 1: Orange -> Mango
      tl.to("#fanta", { y: "100vh", opacity: 0, rotate: 14, duration: 0.55, ease: "power2.in" }, 0)
        .to("#orange-text", { x: "-100vw", opacity: 0, duration: 0.55, ease: "power2.in" }, 0)
        .to("#info-orange", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 0)
        .to(".decor-orange", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in", stagger: 0.02 }, 0.02)
        .to(".bg-orange", { opacity: 0, duration: 1.4, ease: "power2.inOut" }, 0)
        .to(".bg-mango", { opacity: 1, duration: 1.4, ease: "power2.inOut" }, 0);

      // Mango Elements Enter (0.40s)
      const MANGO_START_TAB = 0.40;
      tl.fromTo("#fanta-mango", 
          { y: "-55vh", opacity: 0, rotate: -8 }, 
          { y: "0vh", opacity: 1, rotate: 14, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_TAB
        )
        .fromTo("#mango-text", 
          { x: "100vw", opacity: 0 }, 
          { x: "0vw", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_TAB
        )
        .fromTo(".mango-top-left", 
          { x: "-20vw", y: -15, opacity: 0 }, 
          { x: 0, y: 0, rotate: -12, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_TAB
        )
        .fromTo(".mango-top-right", 
          { x: "20vw", y: -10, opacity: 0 }, 
          { x: 0, y: 0, rotate: 15, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_TAB
        )
        .fromTo(".mango-bottom-right", 
          { x: "20vw", y: "20vh", opacity: 0 }, 
          { x: 0, y: 0, rotate: 8, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_TAB
        )
        .fromTo(".mango-leaf-left-1", 
          { x: "-18vw", y: -20, opacity: 0 }, 
          { x: 0, y: 0, rotate: 25, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_TAB
        )
        .fromTo(".mango-leaf-top-mid", 
          { y: "-30vh", opacity: 0 }, 
          { x: 0, y: 0, rotate: -15, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_TAB
        )
        
        .fromTo(".mango-leaf-bottom-mid", 
          { y: "20vh", opacity: 0 }, 
          { x: 0, y: 0, rotate: 25, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_TAB
        )
        .fromTo("#info-mango", 
          { y: "28vh", opacity: 0 }, 
          { y: "0vh", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_TAB
        );

      tl.addLabel('flavour-1', 1.75);

      // Staged Transition 2: Mango -> Strawberry
      tl.to("#fanta-mango", { y: "100vh", opacity: 0, rotate: 14, duration: 0.55, ease: "power2.in" }, 1.75)
        .to("#mango-text", { x: "-100vw", opacity: 0, duration: 0.55, ease: "power2.in" }, 1.75)
        .to("#info-mango", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 1.75)
        .to(".decor-mango", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 1.75)
        .to(".bg-mango", { opacity: 0, duration: 1.2, ease: "power2.inOut" }, 1.75)
        .to(".bg-strawberry", { opacity: 1, duration: 1.2, ease: "power2.inOut" }, 1.75);

      const STRAWBERRY_START_TAB = 2.15;
      tl.fromTo("#fanta2", 
          { y: "-55vh", opacity: 0, rotate: -8 }, 
          { y: "0vh", opacity: 1, rotate: 14, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          STRAWBERRY_START_TAB
        )
        .fromTo("#strawberry-text", 
          { x: "100vw", opacity: 0 }, 
          { x: "0vw", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          STRAWBERRY_START_TAB
        )
        .fromTo(".decor-strawberry", 
          { opacity: 0, scale: 0.9 }, 
          { opacity: 1, scale: 1, duration: DURATION, ease: EASE, force3D: true, stagger: 0.03, immediateRender: false }, 
          STRAWBERRY_START_TAB
        )
        .fromTo("#info-strawberry", 
          { y: "28vh", opacity: 0 }, 
          { y: "0vh", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          STRAWBERRY_START_TAB
        );

      tl.addLabel('flavour-2', 3.50);

      // Staged Transition 3: Strawberry -> Chocolate
      tl.to("#fanta2", { y: "100vh", opacity: 0, rotate: 14, duration: 0.55, ease: "power2.in" }, 3.50)
        .to("#strawberry-text", { x: "100vw", opacity: 0, duration: 0.55, ease: "power2.in" }, 3.50)
        .to("#info-strawberry", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 3.50)
        .to(".decor-strawberry", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 3.50)
        .to(".bg-strawberry", { opacity: 0, duration: 1.2, ease: "power2.inOut" }, 3.50)
        .to(".bg-chocolate", { opacity: 1, duration: 1.2, ease: "power2.inOut" }, 3.50);

      const CHOCOLATE_START_TAB = 3.90;
      tl.fromTo("#fanta3", 
          { y: "-55vh", opacity: 0, rotate: 12 }, 
          { y: "0vh", opacity: 1, rotate: 14, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_TAB
        )
        .fromTo("#chocolate-text", 
          { x: "-100vw", opacity: 0 }, 
          { x: "0vw", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_TAB
        )
        .fromTo(".chocolate-top-left", 
          { x: "-20vw", y: -15, opacity: 0 }, 
          { x: 0, y: 0, rotate: -6, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_TAB
        )
        .fromTo(".chocolate-mint-top", 
          { y: "-30vh", opacity: 0 }, 
          { x: 0, y: 0, rotate: 20, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_TAB
        )
        .fromTo(".chocolate-coffee-beans", 
          { x: "20vw", y: -10, opacity: 0 }, 
          { x: 0, y: 0, rotate: -5, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_TAB
        )
        .fromTo(".chocolate-mint-single", 
          { x: "-18vw", y: 15, opacity: 0 }, 
          { x: 0, y: 0, rotate: 18, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_TAB
        )
        .fromTo(".chocolate-shavings", 
          { x: "20vw", y: "20vh", opacity: 0 }, 
          { x: 0, y: 0, rotate: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_TAB
        )
        .fromTo(".chocolate-mint-bottom", 
          { x: "18vw", y: "18vh", opacity: 0 }, 
          { x: 0, y: 0, rotate: -30, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_TAB
        )
        .fromTo("#info-chocolate", 
          { y: "28vh", opacity: 0 }, 
          { y: "0vh", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_TAB
        );

      tl.addLabel('flavour-3', 5.25);

      // Staged Transition 4: Chocolate -> Melon
      tl.to("#fanta3", { y: "100vh", opacity: 0, rotate: 14, duration: 0.55, ease: "power2.in" }, 5.25)
        .to("#chocolate-text", { x: "-100vw", opacity: 0, duration: 0.55, ease: "power2.in" }, 5.25)
        .to("#info-chocolate", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 5.25)
        .to(".decor-chocolate", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 5.25)
        .to(".bg-chocolate", { opacity: 0, duration: 1.2, ease: "power2.inOut" }, 5.25)
        .to(".bg-melon", { opacity: 1, duration: 1.2, ease: "power2.inOut" }, 5.25)
        .fromTo("#fanta4", { y: "-100vh", opacity: 0, rotate: 14 }, { y: "0vh", opacity: 1, rotate: 14, duration: 0.65, ease: "power2.out", immediateRender: false }, 5.75)
        .fromTo("#melon-text", { x: "100vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: 0.65, ease: "power2.out", immediateRender: false }, 5.75)
        .fromTo("#info-melon", { y: "100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.65, ease: "power2.out", immediateRender: false }, 5.75)
        .fromTo(".decor-melon", 
          { opacity: 0, scale: 0.9 }, 
          { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out", force3D: true, stagger: 0.03, immediateRender: false }, 
          5.75
        );

      tl.addLabel('flavour-4', 6.50);

      // =======================================================================
      // STAGE 5 -> STAGE 6: MELON -> BLUEBERRY
      // =======================================================================
      tl.to("#fanta4", { y: "100vh", opacity: 0, rotate: 14, duration: 0.55, ease: "power2.in" }, 6.50)
        .to("#melon-text", { x: "100vw", opacity: 0, duration: 0.55, ease: "power2.in" }, 6.50)
        .to("#info-melon", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 6.50)
        .to(".decor-melon", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 6.50)
        .to(".bg-melon", { opacity: 0, duration: 1.2, ease: "power2.inOut" }, 6.50)
        .to(".bg-blueberry", { opacity: 1, duration: 1.2, ease: "power2.inOut" }, 6.50);

      const BLUEBERRY_START_TAB = 6.95;
      tl.fromTo("#fanta-blueberry", 
          { y: "-55vh", opacity: 0, rotate: -8 }, 
          { y: "0vh", opacity: 1, rotate: 14, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          BLUEBERRY_START_TAB
        )
        .fromTo("#blueberry-text", 
          { x: "100vw", opacity: 0 }, 
          { x: "0vw", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          BLUEBERRY_START_TAB
        )
        .fromTo(".decor-blueberry", 
          { opacity: 0, scale: 0.9 }, 
          { opacity: 1, scale: 1, duration: DURATION, ease: EASE, force3D: true, stagger: 0.03, immediateRender: false }, 
          BLUEBERRY_START_TAB
        )
        .fromTo("#info-blueberry", 
          { y: "28vh", opacity: 0 }, 
          { y: "0vh", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          BLUEBERRY_START_TAB
        );

      tl.addLabel('flavour-5', 8.25);

      if (initialFlavour > 0) {
        entryTl.progress(1);
        tl.seek(`flavour-${initialFlavour}`);
        isAnimatingRef.current = false;
      }
    });

    // =========================================================================
    // 3. MOBILE & SMALL MOBILE (max-width: 599px)
    // =========================================================================
    mm.add('(max-width: 599px)', () => {
      const entryTl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
      entryTlRef.current = entryTl;

      const DURATION = 1.1;
      const EASE = "power3.out";

      entryTl
        .fromTo("#fanta", { y: "-45vh", opacity: 0, rotate: 12 }, { y: "0vh", opacity: 1, rotate: 14, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo("#orange-text", { x: "-40vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".decor-orange", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: DURATION, ease: EASE, force3D: true, stagger: 0.03 }, 0)
        .fromTo("#info-orange", { y: "20vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0);

      const tl = gsap.timeline({ paused: true });
      tlRef.current = tl;

      tl.addLabel('flavour-0', 0);

      // Staged Transition 1: Orange -> Mango
      tl.to("#fanta", { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" }, 0)
        .to("#orange-text", { x: "-100vw", opacity: 0, duration: 0.5, ease: "power2.in" }, 0)
        .to("#info-orange", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 0)
        .to(".decor-orange", { y: "100vh", opacity: 0, duration: 0.45, ease: "power2.in", stagger: 0.02 }, 0.02)
        .to(".bg-orange", { opacity: 0, duration: 1.3, ease: "power2.inOut" }, 0)
        .to(".bg-mango", { opacity: 1, duration: 1.3, ease: "power2.inOut" }, 0);

      // Mango Elements Enter (0.35s)
      const MANGO_START_MOB = 0.35;
      tl.fromTo("#fanta-mango", 
          { y: "-45vh", opacity: 0, rotate: -8 }, 
          { y: "0vh", opacity: 1, rotate: 14, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_MOB
        )
        .fromTo("#mango-text", 
          { x: "100vw", opacity: 0 }, 
          { x: "0vw", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_MOB
        )
        .fromTo(".mango-top-left", 
          { x: "-15vw", y: -10, opacity: 0 }, 
          { x: 0, y: 0, rotate: -12, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_MOB
        )
        .fromTo(".mango-top-right", 
          { x: "15vw", y: -10, opacity: 0 }, 
          { x: 0, y: 0, rotate: 15, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_MOB
        )
        .fromTo(".mango-bottom-right", 
          { x: "15vw", y: "15vh", opacity: 0 }, 
          { x: 0, y: 0, rotate: 8, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_MOB
        )
        .fromTo(".mango-leaf-left-1", 
          { x: "-12vw", y: -15, opacity: 0 }, 
          { x: 0, y: 0, rotate: 25, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_MOB
        )
        .fromTo(".mango-leaf-top-mid", 
          { y: "-20vh", opacity: 0 }, 
          { x: 0, y: 0, rotate: -15, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_MOB
        )
        
        .fromTo(".mango-leaf-bottom-mid", 
          { y: "15vh", opacity: 0 }, 
          { x: 0, y: 0, rotate: 25, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_MOB
        )
        .fromTo("#info-mango", 
          { y: "20vh", opacity: 0 }, 
          { y: "0vh", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          MANGO_START_MOB
        );

      tl.addLabel('flavour-1', 1.50);

      // Staged Transition 2: Mango -> Strawberry
      tl.to("#fanta-mango", { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" }, 1.50)
        .to("#mango-text", { x: "-100vw", opacity: 0, duration: 0.5, ease: "power2.in" }, 1.50)
        .to("#info-mango", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 1.50)
        .to(".decor-mango", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 1.50)
        .to(".bg-mango", { opacity: 0, duration: 1.1, ease: "power2.inOut" }, 1.50)
        .to(".bg-strawberry", { opacity: 1, duration: 1.1, ease: "power2.inOut" }, 1.50);

      // All Strawberry Elements Enter At The Exact Same Time (1.85s)
      const STRAWBERRY_START_MOB = 1.85;
      tl.fromTo("#fanta2", 
          { y: "-45vh", opacity: 0, rotate: -8 }, 
          { y: "0vh", opacity: 1, rotate: 14, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          STRAWBERRY_START_MOB
        )
        .fromTo("#strawberry-text", 
          { x: "100vw", opacity: 0 }, 
          { x: "0vw", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          STRAWBERRY_START_MOB
        )
        .fromTo(".decor-strawberry", 
          { opacity: 0, scale: 0.9 }, 
          { opacity: 1, scale: 1, duration: DURATION, ease: EASE, force3D: true, stagger: 0.03, immediateRender: false }, 
          STRAWBERRY_START_MOB
        )
        .fromTo("#info-strawberry", 
          { y: "20vh", opacity: 0 }, 
          { y: "0vh", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          STRAWBERRY_START_MOB
        );

      tl.addLabel('flavour-2', 3.00);

      // Staged Transition 3: Strawberry -> Chocolate
      tl.to("#fanta2", { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" }, 3.00)
        .to("#strawberry-text", { x: "100vw", opacity: 0, duration: 0.5, ease: "power2.in" }, 3.00)
        .to("#info-strawberry", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 3.00)
        .to(".decor-strawberry", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 3.00)
        .to(".bg-strawberry", { opacity: 0, duration: 1.1, ease: "power2.inOut" }, 3.00)
        .to(".bg-chocolate", { opacity: 1, duration: 1.1, ease: "power2.inOut" }, 3.00);

      const CHOCOLATE_START_MOB = 3.35;
      tl.fromTo("#fanta3", 
          { y: "-45vh", opacity: 0, rotate: 12 }, 
          { y: "0vh", opacity: 1, rotate: 14, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_MOB
        )
        .fromTo("#chocolate-text", 
          { x: "-100vw", opacity: 0 }, 
          { x: "0vw", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_MOB
        )
        .fromTo(".chocolate-top-left", 
          { x: "-15vw", y: -10, opacity: 0 }, 
          { x: 0, y: 0, rotate: -6, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_MOB
        )
        .fromTo(".chocolate-mint-top", 
          { y: "-20vh", opacity: 0 }, 
          { x: 0, y: 0, rotate: 20, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_MOB
        )
        .fromTo(".chocolate-coffee-beans", 
          { x: "15vw", y: -10, opacity: 0 }, 
          { x: 0, y: 0, rotate: -5, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_MOB
        )
        .fromTo(".chocolate-mint-single", 
          { x: "-12vw", y: 10, opacity: 0 }, 
          { x: 0, y: 0, rotate: 18, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_MOB
        )
        .fromTo(".chocolate-shavings", 
          { x: "15vw", y: "15vh", opacity: 0 }, 
          { x: 0, y: 0, rotate: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_MOB
        )
        .fromTo(".chocolate-mint-bottom", 
          { x: "12vw", y: "12vh", opacity: 0 }, 
          { x: 0, y: 0, rotate: -30, opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_MOB
        )
        .fromTo("#info-chocolate", 
          { y: "20vh", opacity: 0 }, 
          { y: "0vh", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          CHOCOLATE_START_MOB
        );

      tl.addLabel('flavour-3', 4.50);

      // Staged Transition 4: Chocolate -> Melon
      tl.to("#fanta3", { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" }, 4.50)
        .to("#chocolate-text", { x: "-100vw", opacity: 0, duration: 0.5, ease: "power2.in" }, 4.50)
        .to("#info-chocolate", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 4.50)
        .to(".decor-chocolate", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 4.50)
        .to(".bg-chocolate", { opacity: 0, duration: 1.1, ease: "power2.inOut" }, 4.50)
        .to(".bg-melon", { opacity: 1, duration: 1.1, ease: "power2.inOut" }, 4.50)
        .fromTo("#fanta4", { y: "-100vh", opacity: 0, rotate: 14 }, { y: "0vh", opacity: 1, rotate: 14, duration: 0.6, ease: "power2.out", immediateRender: false }, 4.90)
        .fromTo("#melon-text", { x: "100vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: 0.6, ease: "power2.out", immediateRender: false }, 4.90)
        .fromTo("#info-melon", { y: "100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.6, ease: "power2.out", immediateRender: false }, 4.90)
        .fromTo(".decor-melon", 
          { opacity: 0, scale: 0.9 }, 
          { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out", force3D: true, stagger: 0.03, immediateRender: false }, 
          4.90
        );

      tl.addLabel('flavour-4', 5.60);

      // Staged Transition 5: Melon -> Blueberry
      tl.to("#fanta4", { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" }, 5.60)
        .to("#melon-text", { x: "100vw", opacity: 0, duration: 0.5, ease: "power2.in" }, 5.60)
        .to("#info-melon", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 5.60)
        .to(".decor-melon", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 5.60)
        .to(".bg-melon", { opacity: 0, duration: 1.1, ease: "power2.inOut" }, 5.60)
        .to(".bg-blueberry", { opacity: 1, duration: 1.1, ease: "power2.inOut" }, 5.60);

      const BLUEBERRY_START_MOB = 5.95;
      tl.fromTo("#fanta-blueberry", 
          { y: "-45vh", opacity: 0, rotate: -8 }, 
          { y: "0vh", opacity: 1, rotate: 14, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          BLUEBERRY_START_MOB
        )
        .fromTo("#blueberry-text", 
          { x: "100vw", opacity: 0 }, 
          { x: "0vw", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          BLUEBERRY_START_MOB
        )
        .fromTo(".decor-blueberry", 
          { opacity: 0, scale: 0.9 }, 
          { opacity: 1, scale: 1, duration: DURATION, ease: EASE, force3D: true, stagger: 0.03, immediateRender: false }, 
          BLUEBERRY_START_MOB
        )
        .fromTo("#info-blueberry", 
          { y: "20vh", opacity: 0 }, 
          { y: "0vh", opacity: 1, duration: DURATION, ease: EASE, force3D: true, immediateRender: false }, 
          BLUEBERRY_START_MOB
        );

      tl.addLabel('flavour-5', 7.10);

      if (initialFlavour > 0) {
        entryTl.progress(1);
        tl.seek(`flavour-${initialFlavour}`);
        isAnimatingRef.current = false;
      }
    });

    const gotoNextFlavour = () => {
      if (currentFlavourRef.current >= 5 || isAnimatingRef.current) return;
      if (entryTlRef.current && entryTlRef.current.isActive()) {
        entryTlRef.current.progress(1);
      }
      const target = currentFlavourRef.current + 1;
      isAnimatingRef.current = true;
      updateLenisPrevent();
      if (tlRef.current) {
        const isMobile = window.matchMedia('(max-width: 599px)').matches;
        const isTablet = window.matchMedia('(min-width: 600px) and (max-width: 1023px)').matches;
        const transDuration = isMobile ? 1.25 : (isTablet ? 1.45 : 1.65);

        tlRef.current.tweenTo(`flavour-${target}`, {
          duration: transDuration,
          ease: "power2.inOut",
          onComplete: () => {
            currentFlavourRef.current = target;
            isAnimatingRef.current = false;
            updateLenisPrevent();
          },
        });
      }
    };

    const gotoPrevFlavour = () => {
      if (currentFlavourRef.current <= 0 || isAnimatingRef.current) return;
      const target = currentFlavourRef.current - 1;
      isAnimatingRef.current = true;
      updateLenisPrevent();
      if (tlRef.current) {
        const isMobile = window.matchMedia('(max-width: 599px)').matches;
        const isTablet = window.matchMedia('(min-width: 600px) and (max-width: 1023px)').matches;
        const transDuration = isMobile ? 1.25 : (isTablet ? 1.45 : 1.65);

        tlRef.current.tweenTo(`flavour-${target}`, {
          duration: transDuration,
          ease: "power2.inOut",
          onComplete: () => {
            currentFlavourRef.current = target;
            isAnimatingRef.current = false;
            updateLenisPrevent();
          },
        });
      }
    };

    const isAtTop = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      return Math.round(scrollY) <= 8;
    };

    let wasScrolledDown = false;
    let topArrivalTimestamp = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      if (scrollY > 15) {
        wasScrolledDown = true;
      } else if (scrollY <= 8 && wasScrolledDown) {
        wasScrolledDown = false;
        topArrivalTimestamp = Date.now();
      }
    };

    // 1. Mouse Wheel Trigger
    const handleWheel = (e) => {
      if (isAnimatingRef.current) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }

      const atTop = isAtTop();

      if (atTop) {
        if (e.deltaY > 0) {
          // Scrolling DOWN
          if (currentFlavourRef.current < 5) {
            e.preventDefault();
            e.stopImmediatePropagation();
            gotoNextFlavour();
          }
          // If currentFlavour === 5, allow natural page scroll down into next sections!
        } else if (e.deltaY < 0) {
          // Scrolling UP
          if (currentFlavourRef.current > 0) {
            if (currentFlavourRef.current === 5 && Date.now() - topArrivalTimestamp < 250) {
              e.preventDefault();
              e.stopImmediatePropagation();
              return;
            }
            e.preventDefault();
            e.stopImmediatePropagation();
            gotoPrevFlavour();
          } else if (currentFlavourRef.current === 0) {
            // Already in Orange at top: prevent overscroll bounce
            e.preventDefault();
            e.stopImmediatePropagation();
          }
        }
      }
    };

    // 2. Touch Swipe Trigger for Mobile
    let touchStartY = 0;
    let touchStartX = 0;
    let isTouchTracking = false;

    const handleTouchStart = (e) => {
      if (!e.touches || !e.touches[0]) return;
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      isTouchTracking = true;
    };

    const handleTouchMove = (e) => {
      if (!isTouchTracking || !e.touches || !e.touches[0]) return;
      const deltaY = touchStartY - e.touches[0].clientY;
      const deltaX = touchStartX - e.touches[0].clientX;

      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        if (isAnimatingRef.current) {
          if (e.cancelable) e.preventDefault();
          e.stopImmediatePropagation();
          return;
        }

        const atTop = isAtTop();
        if (atTop) {
          if (currentFlavourRef.current < 5 && deltaY > 0) {
            if (e.cancelable) e.preventDefault();
            e.stopImmediatePropagation();
          } else if (currentFlavourRef.current > 0 && deltaY < 0) {
            if (e.cancelable) e.preventDefault();
            e.stopImmediatePropagation();
          }
        }
      }
    };

    const handleTouchEnd = (e) => {
      if (!isTouchTracking || !e.changedTouches || !e.changedTouches[0]) return;
      isTouchTracking = false;

      if (isAnimatingRef.current) return;

      const deltaY = touchStartY - e.changedTouches[0].clientY;
      const deltaX = touchStartX - e.changedTouches[0].clientX;

      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        const atTop = isAtTop();
        if (atTop) {
          // Mobile swipe up (deltaY > 30) -> Next flavour
          if (deltaY > 30 && currentFlavourRef.current < 5) {
            gotoNextFlavour();
          }
          // Mobile swipe down (deltaY < -30) -> Previous flavour
          else if (deltaY < -30 && currentFlavourRef.current > 0) {
            gotoPrevFlavour();
          }
        }
      }
    };

    // 3. Arrow Keys and Page Keys Trigger
    const handleKeyDown = (e) => {
      if (isAnimatingRef.current) {
        if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(e.key)) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
        return;
      }

      const atTop = isAtTop();

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (atTop && currentFlavourRef.current < 5) {
          e.preventDefault();
          e.stopImmediatePropagation();
          gotoNextFlavour();
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (atTop && currentFlavourRef.current > 0) {
          e.preventDefault();
          e.stopImmediatePropagation();
          gotoPrevFlavour();
        } else if (atTop && currentFlavourRef.current === 0) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true, capture: true });
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart, { capture: true });
      window.removeEventListener('touchmove', handleTouchMove, { capture: true });
      window.removeEventListener('touchend', handleTouchEnd, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('scroll', handleScroll);

      if (entryTlRef.current) {
        entryTlRef.current.kill();
        entryTlRef.current = null;
      }
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="banner-hero-container"
      id="main"
      data-lenis-prevent="true"
      aria-label="Grand Master Hero Banner"
    >
      <MainSection />

      <button
        type="button"
        className="gm-skip-hero"
        onClick={(e) => {
          e.stopPropagation();
          handleSkipHero();
        }}
      >
        <span>SKIP</span>
        <span className="gm-skip-arrow">→</span>
      </button>
    </section>
  );
}

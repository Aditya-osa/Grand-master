import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MainSection from './MainSection';
import './BannerHero.css';

/**
 * BannerHero Component
 * 4-Stage Interactive Hero section (Orange -> Strawberry -> Chocolate -> Melon).
 * Implements sequenced Strawberry product reveal with bottle priority, staggered fruits,
 * custom idle float dynamics, and reversible scroll navigation.
 */
export default function BannerHero() {
  const heroRef = useRef(null);
  const tlRef = useRef(null);
  const entryTlRef = useRef(null);
  const currentFlavourRef = useRef(0); // 0 = Orange, 1 = Strawberry, 2 = Chocolate, 3 = Melon
  const isAnimatingRef = useRef(false);
  const idleTweensRef = useRef([]);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    // Reset state on mount
    currentFlavourRef.current = 0;
    isAnimatingRef.current = true; // Lock interactions until entrance animation completes

    // Prevent Lenis interference while inside Hero flavour stages
    heroEl.setAttribute('data-lenis-prevent', 'true');

    const updateLenisPrevent = () => {
      if (!heroEl) return;
      if (currentFlavourRef.current < 3 || isAnimatingRef.current) {
        heroEl.setAttribute('data-lenis-prevent', 'true');
      } else {
        heroEl.removeAttribute('data-lenis-prevent');
      }
    };

    const stopIdleFloat = () => {
      idleTweensRef.current.forEach((t) => t && t.kill());
      idleTweensRef.current = [];
    };

    const startIdleFloat = (flavourIndex) => {
      stopIdleFloat();
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      const isTablet = window.matchMedia('(min-width: 600px) and (max-width: 1023px)').matches;

      if (flavourIndex === 0) {
        if (isDesktop) {
          idleTweensRef.current = [
            gsap.to(".orange-top-left", { y: "+=10", x: "+=5", rotate: "+=3", duration: 3.6, repeat: -1, yoyo: true, ease: "sine.inOut" }),
            gsap.to(".orange-top-right", { y: "-=12", x: "-=6", rotate: "-=4", duration: 4.0, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 }),
            gsap.to(".leaf-left-1", { y: "+=8", rotate: "+=5", duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 }),
            gsap.to(".leaf-left-2", { y: "+=10", rotate: "-=4", duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.4 }),
            gsap.to(".leaf-right-1", { y: "-=7", x: "+=4", rotate: "+=4", duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.1 }),
            gsap.to(".orange-bottom-right", { y: "-=12", rotate: "+=3", duration: 4.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 }),
            gsap.to(".leaf-bottom-mid", { y: "+=8", rotate: "-=4", duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 }),
          ];
        } else if (isTablet) {
          idleTweensRef.current = [
            gsap.to(".orange-top-left", { y: "+=6", x: "+=3", rotate: "+=2", duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut" }),
            gsap.to(".orange-top-right", { y: "-=7", x: "-=3", rotate: "-=2", duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 }),
            gsap.to(".leaf-left-1", { y: "+=5", rotate: "+=3", duration: 3.0, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 }),
            gsap.to(".leaf-left-2", { y: "+=6", rotate: "-=3", duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.4 }),
            gsap.to(".leaf-right-1", { y: "-=5", x: "+=2", rotate: "+=3", duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.1 }),
            gsap.to(".orange-bottom-right", { y: "-=7", rotate: "+=2", duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 }),
            gsap.to(".leaf-bottom-mid", { y: "+=5", rotate: "-=2", duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 }),
          ];
        } else {
          idleTweensRef.current = [
            gsap.to(".orange-top-left", { y: "+=3.5", x: "+=1.5", rotate: "+=1.2", duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut" }),
            gsap.to(".orange-top-right", { y: "-=4", x: "-=1.5", rotate: "-=1.2", duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 }),
            gsap.to(".leaf-left-1", { y: "+=3", rotate: "+=1.8", duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 }),
            gsap.to(".leaf-left-2", { y: "+=3.5", rotate: "-=1.8", duration: 3.0, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.4 }),
            gsap.to(".leaf-right-1", { y: "-=3", x: "+=1", rotate: "+=1.8", duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.1 }),
            gsap.to(".orange-bottom-right", { y: "-=4", rotate: "+=1.2", duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 }),
            gsap.to(".leaf-bottom-mid", { y: "+=3", rotate: "-=1.2", duration: 3.0, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 }),
          ];
        }
      } else if (flavourIndex === 1) {
        if (isDesktop) {
          idleTweensRef.current = [
            // Main strawberry: y: ±10px, rotation ±3°, duration 3.5s
            gsap.to(".strawberry-top-left", { y: "+=10", x: "+=4", rotate: "+=3", duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut" }),
            // Secondary strawberry: y: ±12px, x: ±5px, rotation ±4°, duration 4.0s
            gsap.to(".strawberry-top-right", { y: "-=12", x: "-=5", rotate: "-=4", duration: 4.0, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 }),
            // Left leaf: y: ±8px, rotation ±5°, duration 3.2s
            gsap.to(".strawberry-leaf-bottom-left", { y: "+=8", rotate: "+=5", duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.4 }),
            // Right leaf: y: ±7px, x: ±4px, rotation ±4°, duration 2.8s
            gsap.to(".strawberry-leaf-right-mid", { y: "-=7", x: "+=4", rotate: "-=4", duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.1 }),
            // Bottom strawberry/fruit: y: ±12px, rotation ±3°, duration 4.2s
            gsap.to(".strawberry-bottom-mid", { y: "-=12", rotate: "+=3", duration: 4.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 }),
            // Top mid leaf
            gsap.to(".strawberry-leaf-top-mid", { y: "+=6", rotate: "+=4", duration: 3.0, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 }),
            // Bottom small strawberry
            gsap.to(".strawberry-bottom-small", { y: "+=5", rotate: "-=2", duration: 3.0, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 }),
            // Bottom leaf cluster
            gsap.to(".strawberry-leaf-cluster", { y: "+=6", rotate: "-=3", duration: 3.3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 }),
          ];
        } else if (isTablet) {
          idleTweensRef.current = [
            gsap.to(".strawberry-top-left", { y: "+=6", x: "+=2.5", rotate: "+=2", duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut" }),
            gsap.to(".strawberry-top-right", { y: "-=7", x: "-=3", rotate: "-=2.5", duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 }),
            gsap.to(".strawberry-leaf-bottom-left", { y: "+=5", rotate: "+=3", duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.4 }),
            gsap.to(".strawberry-leaf-right-mid", { y: "-=5", x: "+=2.5", rotate: "-=2.5", duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.1 }),
            gsap.to(".strawberry-bottom-mid", { y: "-=7", rotate: "+=2", duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 }),
            gsap.to(".strawberry-leaf-top-mid", { y: "+=4", rotate: "+=2.5", duration: 3.0, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 }),
            gsap.to(".strawberry-bottom-small", { y: "+=4", rotate: "-=1.5", duration: 3.0, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 }),
            gsap.to(".strawberry-leaf-cluster", { y: "+=4", rotate: "-=2", duration: 3.3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 }),
          ];
        } else {
          idleTweensRef.current = [
            gsap.to(".strawberry-top-left", { y: "+=3.5", x: "+=1.5", rotate: "+=1.2", duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut" }),
            gsap.to(".strawberry-top-right", { y: "-=4", x: "-=1.5", rotate: "-=1.5", duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 }),
            gsap.to(".strawberry-leaf-bottom-left", { y: "+=3", rotate: "+=1.8", duration: 3.0, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.4 }),
            gsap.to(".strawberry-leaf-right-mid", { y: "-=3", x: "+=1.2", rotate: "-=1.5", duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.1 }),
            gsap.to(".strawberry-bottom-mid", { y: "-=4", rotate: "+=1.2", duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 }),
            gsap.to(".strawberry-leaf-top-mid", { y: "+=2.5", rotate: "+=1.5", duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 }),
            gsap.to(".strawberry-bottom-small", { y: "+=2.5", rotate: "-=1", duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 }),
            gsap.to(".strawberry-leaf-cluster", { y: "+=2.5", rotate: "-=1.2", duration: 3.0, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 }),
          ];
        }
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
          startIdleFloat(0);
        },
      });
      entryTlRef.current = entryTl;

      const DURATION = 1.5;
      const EASE = "power3.out";

      entryTl
        .fromTo("#fanta", { y: "-65vh", opacity: 0, rotate: 12 }, { y: "0vh", opacity: 1, rotate: 14, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".bottle-ground-shadow", { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo("#orange-text", { x: "-60vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".orange-top-left", { x: "-30vw", y: -20, rotate: -15, opacity: 0 }, { x: 0, y: 0, rotate: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".orange-top-right", { x: "30vw", y: -15, rotate: 35, opacity: 0 }, { x: 0, y: 0, rotate: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".leaf-left-1", { x: "-25vw", y: -30, rotate: 0, opacity: 0 }, { x: 0, y: 0, rotate: 25, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".leaf-left-2", { y: "-40vh", rotate: -35, opacity: 0 }, { y: 0, rotate: -15, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".leaf-right-1", { x: "25vw", y: -10, rotate: 90, opacity: 0 }, { x: 0, y: 0, rotate: 70, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".orange-bottom-right", { x: "30vw", y: "30vh", rotate: -35, opacity: 0 }, { x: 0, y: 0, rotate: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".leaf-bottom-mid", { y: "30vh", rotate: 5, opacity: 0 }, { y: 0, rotate: -25, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo("#info-orange", { y: "35vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0);

      const tl = gsap.timeline({ paused: true });
      tlRef.current = tl;

      tl.addLabel('flavour-0', 0);

      // =======================================================================
      // STAGE 1 -> STAGE 2: ORANGE -> STRAWBERRY (Sequenced Theatrical Reveal)
      // =======================================================================
      // 1. Complete Orange Exit First (0.0s -> 0.55s) with staggered departure
      tl.to("#fanta", { y: "100vh", opacity: 0, rotate: 14, duration: 0.55, ease: "power2.in" }, 0)
        .to("#orange-text", { x: "-100vw", opacity: 0, duration: 0.55, ease: "power2.in" }, 0)
        .to("#info-orange", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 0)
        .to(".orange-top-left", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 0.02)
        .to(".orange-top-right", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 0.04)
        .to(".leaf-left-1", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 0.06)
        .to(".leaf-left-2", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 0.08)
        .to(".leaf-right-1", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 0.10)
        .to(".orange-bottom-right", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 0.12)
        .to(".leaf-bottom-mid", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 0.14)
        
        // Smooth background crossfade into rich strawberry palette
        .to(".bg-orange", { opacity: 0, duration: 1.3, ease: "power2.inOut" }, 0)
        .to(".bg-strawberry", { opacity: 1, duration: 1.3, ease: "power2.inOut" }, 0)

        // 2. Strawberry Bottle Enters FIRST (0.45s -> 1.45s) — physical, heavy focus like Orange entry
        .fromTo("#fanta2", 
          { y: "-65vh", opacity: 0, rotate: -8 }, 
          { y: "0vh", opacity: 1, rotate: 14, duration: 1.0, ease: "power3.out", force3D: true, immediateRender: false }, 
          0.45
        )

        // 3. Giant STRAWBERRY Text Enters from Right (0.75s -> 1.55s)
        .fromTo("#strawberry-text", 
          { x: "100vw", opacity: 0 }, 
          { x: "0vw", opacity: 1, duration: 0.8, ease: "power3.out", force3D: true, immediateRender: false }, 
          0.75
        )

        // 4. Strawberry Fruits & Leaves Enter One by One (Staggered graceful arcs)
        // Main Whole Strawberry (Top Left)
        .fromTo(".strawberry-top-left", 
          { x: "-30vw", y: -20, rotate: -30, opacity: 0 }, 
          { x: 0, y: 0, rotate: -12, opacity: 1, duration: 0.75, ease: "power3.out", force3D: true, immediateRender: false }, 
          0.95
        )
        // Cut Strawberry Pair (Top Right)
        .fromTo(".strawberry-top-right", 
          { x: "30vw", y: -15, rotate: 35, opacity: 0 }, 
          { x: 0, y: 0, rotate: 5, opacity: 1, duration: 0.75, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.10
        )
        // Bottom Ripe Strawberry (Bottom Mid/Right)
        .fromTo(".strawberry-bottom-mid", 
          { x: "30vw", y: "30vh", rotate: -25, opacity: 0 }, 
          { x: 0, y: 0, rotate: 8, opacity: 1, duration: 0.75, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.25
        )
        // Bottom Small Accent Strawberry
        .fromTo(".strawberry-bottom-small", 
          { x: "20vw", y: "25vh", rotate: 15, opacity: 0 }, 
          { x: 0, y: 0, rotate: -15, opacity: 1, duration: 0.7, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.38
        )
        // Top Mid Mint Leaf
        .fromTo(".strawberry-leaf-top-mid", 
          { y: "-40vh", rotate: -45, opacity: 0 }, 
          { y: 0, rotate: -25, opacity: 1, duration: 0.65, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.48
        )
        // Right Mid Mint Leaf
        .fromTo(".strawberry-leaf-right-mid", 
          { x: "25vw", y: -10, rotate: 85, opacity: 0 }, 
          { x: 0, y: 0, rotate: 55, opacity: 1, duration: 0.65, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.58
        )
        // Bottom Left Mint Leaf
        .fromTo(".strawberry-leaf-bottom-left", 
          { x: "-25vw", y: -30, rotate: -10, opacity: 0 }, 
          { x: 0, y: 0, rotate: -35, opacity: 1, duration: 0.65, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.68
        )
        // Bottom Leaf Cluster
        .fromTo(".strawberry-leaf-cluster", 
          { y: "30vh", rotate: -20, opacity: 0 }, 
          { y: 0, rotate: 10, opacity: 1, duration: 0.65, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.76
        )

        // 5. Strawberry Info Box Enters from Below (1.80s -> 2.40s)
        .fromTo("#info-strawberry", 
          { y: "100vh", opacity: 0 }, 
          { y: "0vh", opacity: 1, duration: 0.65, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.80
        );

      // Resting Label for Strawberry (2.45s)
      tl.addLabel('flavour-1', 2.45);

      // =======================================================================
      // STAGE 2 -> STAGE 3: STRAWBERRY -> CHOCOLATE
      // =======================================================================
      tl.to("#fanta2", { y: "100vh", opacity: 0, rotate: 14, duration: 0.55, ease: "power2.in" }, 2.45)
        .to("#strawberry-text", { x: "100vw", opacity: 0, duration: 0.55, ease: "power2.in" }, 2.45)
        .to("#info-strawberry", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 2.45)
        .to(".decor-strawberry", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 2.45)
        .to(".bg-strawberry", { opacity: 0, duration: 1.1, ease: "power2.inOut" }, 2.45)
        .to(".bg-chocolate", { opacity: 1, duration: 1.1, ease: "power2.inOut" }, 2.45)
        .fromTo("#fanta3", { y: "-100vh", opacity: 0, rotate: 14 }, { y: "0vh", opacity: 1, rotate: 14, duration: 0.65, ease: "power2.out", immediateRender: false }, 2.95)
        .fromTo("#chocolate-text", { x: "-100vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: 0.65, ease: "power2.out", immediateRender: false }, 2.95)
        .fromTo("#info-chocolate", { y: "100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.65, ease: "power2.out", immediateRender: false }, 2.95);

      tl.addLabel('flavour-2', 3.6);

      // =======================================================================
      // STAGE 3 -> STAGE 4: CHOCOLATE -> MELON
      // =======================================================================
      tl.to("#fanta3", { y: "100vh", opacity: 0, rotate: 14, duration: 0.55, ease: "power2.in" }, 3.6)
        .to("#chocolate-text", { x: "-100vw", opacity: 0, duration: 0.55, ease: "power2.in" }, 3.6)
        .to("#info-chocolate", { y: "100vh", opacity: 0, duration: 0.55, ease: "power2.in" }, 3.6)
        .to(".bg-chocolate", { opacity: 0, duration: 1.1, ease: "power2.inOut" }, 3.6)
        .to(".bg-melon", { opacity: 1, duration: 1.1, ease: "power2.inOut" }, 3.6)
        .fromTo("#fanta4", { y: "-100vh", opacity: 0, rotate: 14 }, { y: "0vh", opacity: 1, rotate: 14, duration: 0.65, ease: "power2.out", immediateRender: false }, 4.10)
        .fromTo("#melon-text", { x: "100vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: 0.65, ease: "power2.out", immediateRender: false }, 4.10)
        .fromTo("#info-melon", { y: "100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.65, ease: "power2.out", immediateRender: false }, 4.10);

      tl.addLabel('flavour-3', 4.75);
    });

    // =========================================================================
    // 2. TABLET (min-width: 600px and max-width: 1023px)
    // =========================================================================
    mm.add('(min-width: 600px) and (max-width: 1023px)', () => {
      const entryTl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
          startIdleFloat(0);
        },
      });
      entryTlRef.current = entryTl;

      const DURATION = 1.3;
      const EASE = "power3.out";

      entryTl
        .fromTo("#fanta", { y: "-55vh", opacity: 0, rotate: 12 }, { y: "0vh", opacity: 1, rotate: 14, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".bottle-ground-shadow", { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo("#orange-text", { x: "-50vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".orange-top-left", { x: "-20vw", y: -15, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".orange-top-right", { x: "20vw", y: -10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".leaf-left-1", { x: "-18vw", y: -20, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".leaf-left-2", { y: "-30vh", opacity: 0 }, { y: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".leaf-right-1", { x: "18vw", opacity: 0 }, { x: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".orange-bottom-right", { x: "20vw", y: "20vh", opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".leaf-bottom-mid", { y: "20vh", opacity: 0 }, { y: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo("#info-orange", { y: "28vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0);

      const tl = gsap.timeline({ paused: true });
      tlRef.current = tl;

      tl.addLabel('flavour-0', 0);

      // Staged Transition 1: Orange -> Strawberry
      tl.to("#fanta", { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" }, 0)
        .to("#orange-text", { x: "-100vw", opacity: 0, duration: 0.5, ease: "power2.in" }, 0)
        .to("#info-orange", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 0)
        .to(".orange-top-left", { y: "100vh", opacity: 0, duration: 0.45, ease: "power2.in" }, 0.02)
        .to(".orange-top-right", { y: "100vh", opacity: 0, duration: 0.45, ease: "power2.in" }, 0.04)
        .to(".leaf-left-1", { y: "100vh", opacity: 0, duration: 0.45, ease: "power2.in" }, 0.06)
        .to(".leaf-left-2", { y: "100vh", opacity: 0, duration: 0.45, ease: "power2.in" }, 0.08)
        .to(".leaf-right-1", { y: "100vh", opacity: 0, duration: 0.45, ease: "power2.in" }, 0.10)
        .to(".orange-bottom-right", { y: "100vh", opacity: 0, duration: 0.45, ease: "power2.in" }, 0.12)
        .to(".leaf-bottom-mid", { y: "100vh", opacity: 0, duration: 0.45, ease: "power2.in" }, 0.14)
        .to(".bg-orange", { opacity: 0, duration: 1.1, ease: "power2.inOut" }, 0)
        .to(".bg-strawberry", { opacity: 1, duration: 1.1, ease: "power2.inOut" }, 0)

        // Strawberry bottle first
        .fromTo("#fanta2", 
          { y: "-55vh", opacity: 0, rotate: -8 }, 
          { y: "0vh", opacity: 1, rotate: 14, duration: 0.8, ease: "power3.out", force3D: true, immediateRender: false }, 
          0.45
        )
        // Strawberry giant text
        .fromTo("#strawberry-text", 
          { x: "100vw", opacity: 0 }, 
          { x: "0vw", opacity: 1, duration: 0.65, ease: "power3.out", force3D: true, immediateRender: false }, 
          0.70
        )
        // Staggered strawberry items
        .fromTo(".strawberry-top-left", 
          { x: "-20vw", y: -15, opacity: 0 }, 
          { x: 0, y: 0, rotate: -12, opacity: 1, duration: 0.6, ease: "power3.out", force3D: true, immediateRender: false }, 
          0.90
        )
        .fromTo(".strawberry-top-right", 
          { x: "20vw", y: -10, opacity: 0 }, 
          { x: 0, y: 0, rotate: 5, opacity: 1, duration: 0.6, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.02
        )
        .fromTo(".strawberry-bottom-mid", 
          { x: "20vw", y: "20vh", opacity: 0 }, 
          { x: 0, y: 0, rotate: 8, opacity: 1, duration: 0.6, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.14
        )
        .fromTo(".strawberry-bottom-small", 
          { x: "15vw", y: "18vh", opacity: 0 }, 
          { x: 0, y: 0, rotate: -15, opacity: 1, duration: 0.55, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.24
        )
        .fromTo(".strawberry-leaf-top-mid", 
          { y: "-30vh", opacity: 0 }, 
          { y: 0, rotate: -25, opacity: 1, duration: 0.5, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.32
        )
        .fromTo(".strawberry-leaf-right-mid", 
          { x: "18vw", opacity: 0 }, 
          { x: 0, rotate: 55, opacity: 1, duration: 0.5, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.40
        )
        .fromTo(".strawberry-leaf-bottom-left", 
          { x: "-18vw", y: -20, opacity: 0 }, 
          { x: 0, rotate: -35, opacity: 1, duration: 0.5, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.48
        )
        .fromTo(".strawberry-leaf-cluster", 
          { y: "20vh", opacity: 0 }, 
          { y: 0, rotate: 10, opacity: 1, duration: 0.5, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.54
        )
        .fromTo("#info-strawberry", 
          { y: "100vh", opacity: 0 }, 
          { y: "0vh", opacity: 1, duration: 0.55, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.55
        );

      tl.addLabel('flavour-1', 2.2);

      tl.to("#fanta2", { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" }, 2.2)
        .to("#strawberry-text", { x: "100vw", opacity: 0, duration: 0.5, ease: "power2.in" }, 2.2)
        .to("#info-strawberry", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 2.2)
        .to(".decor-strawberry", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 2.2)
        .to(".bg-strawberry", { opacity: 0, duration: 1.0, ease: "power2.inOut" }, 2.2)
        .to(".bg-chocolate", { opacity: 1, duration: 1.0, ease: "power2.inOut" }, 2.2)
        .fromTo("#fanta3", { y: "-100vh", opacity: 0, rotate: 14 }, { y: "0vh", opacity: 1, rotate: 14, duration: 0.55, ease: "power2.out", immediateRender: false }, 2.65)
        .fromTo("#chocolate-text", { x: "-100vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: 0.55, ease: "power2.out", immediateRender: false }, 2.65)
        .fromTo("#info-chocolate", { y: "100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.55, ease: "power2.out", immediateRender: false }, 2.65);

      tl.addLabel('flavour-2', 3.2);

      tl.to("#fanta3", { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" }, 3.2)
        .to("#chocolate-text", { x: "-100vw", opacity: 0, duration: 0.5, ease: "power2.in" }, 3.2)
        .to("#info-chocolate", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 3.2)
        .to(".bg-chocolate", { opacity: 0, duration: 1.0, ease: "power2.inOut" }, 3.2)
        .to(".bg-melon", { opacity: 1, duration: 1.0, ease: "power2.inOut" }, 3.2)
        .fromTo("#fanta4", { y: "-100vh", opacity: 0, rotate: 14 }, { y: "0vh", opacity: 1, rotate: 14, duration: 0.55, ease: "power2.out", immediateRender: false }, 3.65)
        .fromTo("#melon-text", { x: "100vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: 0.55, ease: "power2.out", immediateRender: false }, 3.65)
        .fromTo("#info-melon", { y: "100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.55, ease: "power2.out", immediateRender: false }, 3.65);

      tl.addLabel('flavour-3', 4.2);
    });

    // =========================================================================
    // 3. MOBILE & SMALL MOBILE (max-width: 599px)
    // =========================================================================
    mm.add('(max-width: 599px)', () => {
      const entryTl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
          startIdleFloat(0);
        },
      });
      entryTlRef.current = entryTl;

      const DURATION = 1.1;
      const EASE = "power3.out";

      entryTl
        .fromTo("#fanta", { y: "-45vh", opacity: 0, rotate: 12 }, { y: "0vh", opacity: 1, rotate: 14, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".bottle-ground-shadow", { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo("#orange-text", { x: "-40vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".orange-top-left", { x: "-15vw", y: -10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".orange-top-right", { x: "15vw", y: -10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".leaf-left-1", { x: "-12vw", y: -15, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".leaf-left-2", { y: "-20vh", opacity: 0 }, { y: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".leaf-right-1", { x: "12vw", opacity: 0 }, { x: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".orange-bottom-right", { x: "15vw", y: "15vh", opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo(".leaf-bottom-mid", { y: "15vh", opacity: 0 }, { y: 0, opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0)
        .fromTo("#info-orange", { y: "20vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: DURATION, ease: EASE, force3D: true }, 0);

      const tl = gsap.timeline({ paused: true });
      tlRef.current = tl;

      tl.addLabel('flavour-0', 0);

      tl.to("#fanta", { y: "100vh", opacity: 0, rotate: 14, duration: 0.45, ease: "power2.in" }, 0)
        .to("#orange-text", { x: "-100vw", opacity: 0, duration: 0.45, ease: "power2.in" }, 0)
        .to("#info-orange", { y: "100vh", opacity: 0, duration: 0.45, ease: "power2.in" }, 0)
        .to(".orange-top-left", { y: "100vh", opacity: 0, duration: 0.4, ease: "power2.in" }, 0.02)
        .to(".orange-top-right", { y: "100vh", opacity: 0, duration: 0.4, ease: "power2.in" }, 0.04)
        .to(".leaf-left-1", { y: "100vh", opacity: 0, duration: 0.4, ease: "power2.in" }, 0.06)
        .to(".leaf-left-2", { y: "100vh", opacity: 0, duration: 0.4, ease: "power2.in" }, 0.08)
        .to(".leaf-right-1", { y: "100vh", opacity: 0, duration: 0.4, ease: "power2.in" }, 0.10)
        .to(".orange-bottom-right", { y: "100vh", opacity: 0, duration: 0.4, ease: "power2.in" }, 0.12)
        .to(".leaf-bottom-mid", { y: "100vh", opacity: 0, duration: 0.4, ease: "power2.in" }, 0.14)
        .to(".bg-orange", { opacity: 0, duration: 1.0, ease: "power2.inOut" }, 0)
        .to(".bg-strawberry", { opacity: 1, duration: 1.0, ease: "power2.inOut" }, 0)

        // Strawberry bottle first
        .fromTo("#fanta2", 
          { y: "-45vh", opacity: 0, rotate: -8 }, 
          { y: "0vh", opacity: 1, rotate: 14, duration: 0.75, ease: "power3.out", force3D: true, immediateRender: false }, 
          0.45
        )
        // Strawberry giant text
        .fromTo("#strawberry-text", 
          { x: "100vw", opacity: 0 }, 
          { x: "0vw", opacity: 1, duration: 0.6, ease: "power3.out", force3D: true, immediateRender: false }, 
          0.68
        )
        // Staggered strawberry items
        .fromTo(".strawberry-top-left", 
          { x: "-15vw", y: -10, opacity: 0 }, 
          { x: 0, y: 0, rotate: -12, opacity: 1, duration: 0.55, ease: "power3.out", force3D: true, immediateRender: false }, 
          0.85
        )
        .fromTo(".strawberry-top-right", 
          { x: "15vw", y: -10, opacity: 0 }, 
          { x: 0, y: 0, rotate: 5, opacity: 1, duration: 0.55, ease: "power3.out", force3D: true, immediateRender: false }, 
          0.96
        )
        .fromTo(".strawberry-bottom-mid", 
          { x: "15vw", y: "15vh", opacity: 0 }, 
          { x: 0, y: 0, rotate: 8, opacity: 1, duration: 0.55, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.07
        )
        .fromTo(".strawberry-bottom-small", 
          { x: "12vw", y: "12vh", opacity: 0 }, 
          { x: 0, y: 0, rotate: -15, opacity: 1, duration: 0.5, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.16
        )
        .fromTo(".strawberry-leaf-top-mid", 
          { y: "-20vh", opacity: 0 }, 
          { y: 0, rotate: -25, opacity: 1, duration: 0.45, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.24
        )
        .fromTo(".strawberry-leaf-right-mid", 
          { x: "12vw", opacity: 0 }, 
          { x: 0, rotate: 55, opacity: 1, duration: 0.45, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.31
        )
        .fromTo(".strawberry-leaf-bottom-left", 
          { x: "-12vw", y: -15, opacity: 0 }, 
          { x: 0, rotate: -35, opacity: 1, duration: 0.45, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.38
        )
        .fromTo(".strawberry-leaf-cluster", 
          { y: "15vh", opacity: 0 }, 
          { y: 0, rotate: 10, opacity: 1, duration: 0.45, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.44
        )
        .fromTo("#info-strawberry", 
          { y: "100vh", opacity: 0 }, 
          { y: "0vh", opacity: 1, duration: 0.5, ease: "power3.out", force3D: true, immediateRender: false }, 
          1.45
        );

      tl.addLabel('flavour-1', 2.0);

      tl.to("#fanta2", { y: "100vh", opacity: 0, rotate: 14, duration: 0.45, ease: "power2.in" }, 2.0)
        .to("#strawberry-text", { x: "100vw", opacity: 0, duration: 0.45, ease: "power2.in" }, 2.0)
        .to("#info-strawberry", { y: "100vh", opacity: 0, duration: 0.45, ease: "power2.in" }, 2.0)
        .to(".decor-strawberry", { y: "100vh", opacity: 0, duration: 0.45, ease: "power2.in" }, 2.0)
        .to(".bg-strawberry", { opacity: 0, duration: 0.9, ease: "power2.inOut" }, 2.0)
        .to(".bg-chocolate", { opacity: 1, duration: 0.9, ease: "power2.inOut" }, 2.0)
        .fromTo("#fanta3", { y: "-100vh", opacity: 0, rotate: 14 }, { y: "0vh", opacity: 1, rotate: 14, duration: 0.55, ease: "power2.out", immediateRender: false }, 2.45)
        .fromTo("#chocolate-text", { x: "-100vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: 0.55, ease: "power2.out", immediateRender: false }, 2.45)
        .fromTo("#info-chocolate", { y: "100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.55, ease: "power2.out", immediateRender: false }, 2.45);

      tl.addLabel('flavour-2', 3.0);

      tl.to("#fanta3", { y: "100vh", opacity: 0, rotate: 14, duration: 0.45, ease: "power2.in" }, 3.0)
        .to("#chocolate-text", { x: "-100vw", opacity: 0, duration: 0.45, ease: "power2.in" }, 3.0)
        .to("#info-chocolate", { y: "100vh", opacity: 0, duration: 0.45, ease: "power2.in" }, 3.0)
        .to(".bg-chocolate", { opacity: 0, duration: 0.9, ease: "power2.inOut" }, 3.0)
        .to(".bg-melon", { opacity: 1, duration: 0.9, ease: "power2.inOut" }, 3.0)
        .fromTo("#fanta4", { y: "-100vh", opacity: 0, rotate: 14 }, { y: "0vh", opacity: 1, rotate: 14, duration: 0.55, ease: "power2.out", immediateRender: false }, 3.45)
        .fromTo("#melon-text", { x: "100vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: 0.55, ease: "power2.out", immediateRender: false }, 3.45)
        .fromTo("#info-melon", { y: "100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.55, ease: "power2.out", immediateRender: false }, 3.45);

      tl.addLabel('flavour-3', 4.0);
    });

    const gotoNextFlavour = () => {
      if (currentFlavourRef.current >= 3 || isAnimatingRef.current) return;
      if (entryTlRef.current && entryTlRef.current.isActive()) {
        entryTlRef.current.progress(1);
      }
      const target = currentFlavourRef.current + 1;
      isAnimatingRef.current = true;
      stopIdleFloat();
      updateLenisPrevent();
      if (tlRef.current) {
        tlRef.current.tweenTo(`flavour-${target}`, {
          duration: 0.95,
          ease: "power2.inOut",
          onComplete: () => {
            currentFlavourRef.current = target;
            isAnimatingRef.current = false;
            updateLenisPrevent();
            startIdleFloat(target);
          },
        });
      }
    };

    const gotoPrevFlavour = () => {
      if (currentFlavourRef.current <= 0 || isAnimatingRef.current) return;
      const target = currentFlavourRef.current - 1;
      isAnimatingRef.current = true;
      stopIdleFloat();
      updateLenisPrevent();
      if (tlRef.current) {
        tlRef.current.tweenTo(`flavour-${target}`, {
          duration: 0.95,
          ease: "power2.inOut",
          onComplete: () => {
            currentFlavourRef.current = target;
            isAnimatingRef.current = false;
            updateLenisPrevent();
            startIdleFloat(target);
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
          if (currentFlavourRef.current < 3) {
            e.preventDefault();
            e.stopImmediatePropagation();
            gotoNextFlavour();
          }
          // If currentFlavour === 3, allow natural page scroll down into next sections!
        } else if (e.deltaY < 0) {
          // Scrolling UP
          if (currentFlavourRef.current > 0) {
            if (currentFlavourRef.current === 3 && Date.now() - topArrivalTimestamp < 250) {
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
          if (currentFlavourRef.current < 3 && deltaY > 0) {
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
          if (deltaY > 30 && currentFlavourRef.current < 3) {
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
        if (atTop && currentFlavourRef.current < 3) {
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

      stopIdleFloat();

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
    </section>
  );
}

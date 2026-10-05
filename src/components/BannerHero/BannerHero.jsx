import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MainSection from './MainSection';
import './BannerHero.css';

/**
 * BannerHero Component
 * 4-Stage Interactive Hero section (Orange -> Strawberry -> Chocolate -> Melon).
 * Preserves exact GSAP timeline animations, layout, typography, timing, wheel, touch, and key interactions.
 */
export default function BannerHero() {
  const heroRef = useRef(null);
  const tlRef = useRef(null);
  const entryTlRef = useRef(null);
  const currentFlavourRef = useRef(0); // 0 = Orange, 1 = Strawberry, 2 = Chocolate, 3 = Melon
  const isAnimatingRef = useRef(false);

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

    const mm = gsap.matchMedia(heroEl);

    // =========================================================================
    // 1. DESKTOP & LAPTOP (min-width: 1024px)
    // =========================================================================
    mm.add('(min-width: 1024px)', () => {
      const startIdleFloat = () => {
        if (currentFlavourRef.current !== 0) return;
        gsap.to(".orange-top-left", { y: "+=10", x: "+=5", rotate: "+=3", duration: 3.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".orange-top-right", { y: "-=12", x: "-=6", rotate: "-=4", duration: 4.0, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 });
        gsap.to(".leaf-left-1", { y: "+=8", rotate: "+=5", duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 });
        gsap.to(".leaf-left-2", { y: "+=10", rotate: "-=4", duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.4 });
        gsap.to(".leaf-right-1", { y: "-=7", x: "+=4", rotate: "+=4", duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.1 });
        gsap.to(".orange-bottom-right", { y: "-=12", rotate: "+=3", duration: 4.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 });
        gsap.to(".leaf-bottom-mid", { y: "+=8", rotate: "-=4", duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
      };

      const entryTl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
          startIdleFloat();
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

      // Transition 1: Orange -> Strawberry
      tl.to("#fanta", { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" }, 0)
        .to("#orange-text", { x: "-100vw", opacity: 0, duration: 0.5, ease: "power2.in" }, 0)
        .to("#info-orange", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 0)
        .to(".decor-orange", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 0)
        .to(".bg-orange", { opacity: 0, duration: 1.0, ease: "power2.inOut" }, 0)
        .to(".bg-strawberry", { opacity: 1, duration: 1.0, ease: "power2.inOut" }, 0)
        .fromTo("#fanta2", { y: "-100vh", opacity: 0, rotate: 14 }, { y: "0vh", opacity: 1, rotate: 14, duration: 0.5, ease: "power2.out" }, 0.5)
        .fromTo("#strawberry-text", { x: "100vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: 0.5, ease: "power2.out" }, 0.5)
        .fromTo("#info-strawberry", { y: "100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.5, ease: "power2.out" }, 0.5)
        .fromTo(".decor-strawberry", { y: "-100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.5, ease: "power2.out" }, 0.5);

      tl.addLabel('flavour-1', 1.0);

      // Transition 2: Strawberry -> Chocolate
      tl.to("#fanta2", { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" }, 1.0)
        .to("#strawberry-text", { x: "100vw", opacity: 0, duration: 0.5, ease: "power2.in" }, 1.0)
        .to("#info-strawberry", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 1.0)
        .to(".decor-strawberry", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 1.0)
        .to(".bg-strawberry", { opacity: 0, duration: 1.0, ease: "power2.inOut" }, 1.0)
        .to(".bg-chocolate", { opacity: 1, duration: 1.0, ease: "power2.inOut" }, 1.0)
        .fromTo("#fanta3", { y: "-100vh", opacity: 0, rotate: 14 }, { y: "0vh", opacity: 1, rotate: 14, duration: 0.5, ease: "power2.out" }, 1.5)
        .fromTo("#chocolate-text", { x: "-100vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: 0.5, ease: "power2.out" }, 1.5)
        .fromTo("#info-chocolate", { y: "100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.5, ease: "power2.out" }, 1.5);

      tl.addLabel('flavour-2', 2.0);

      // Transition 3: Chocolate -> Melon
      tl.to("#fanta3", { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" }, 2.0)
        .to("#chocolate-text", { x: "-100vw", opacity: 0, duration: 0.5, ease: "power2.in" }, 2.0)
        .to("#info-chocolate", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 2.0)
        .to(".bg-chocolate", { opacity: 0, duration: 1.0, ease: "power2.inOut" }, 2.0)
        .to(".bg-melon", { opacity: 1, duration: 1.0, ease: "power2.inOut" }, 2.0)
        .fromTo("#fanta4", { y: "-100vh", opacity: 0, rotate: 14 }, { y: "0vh", opacity: 1, rotate: 14, duration: 0.5, ease: "power2.out" }, 2.5)
        .fromTo("#melon-text", { x: "100vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: 0.5, ease: "power2.out" }, 2.5)
        .fromTo("#info-melon", { y: "100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.5, ease: "power2.out" }, 2.5);

      tl.addLabel('flavour-3', 3.0);
    });

    // =========================================================================
    // 2. TABLET (min-width: 600px and max-width: 1023px)
    // =========================================================================
    mm.add('(min-width: 600px) and (max-width: 1023px)', () => {
      const startIdleFloat = () => {
        if (currentFlavourRef.current !== 0) return;
        gsap.to(".orange-top-left", { y: "+=6", x: "+=3", rotate: "+=2", duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".orange-top-right", { y: "-=7", x: "-=3", rotate: "-=2", duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 });
        gsap.to(".leaf-left-1", { y: "+=5", rotate: "+=3", duration: 3.0, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 });
        gsap.to(".leaf-left-2", { y: "+=6", rotate: "-=3", duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.4 });
        gsap.to(".leaf-right-1", { y: "-=5", x: "+=2", rotate: "+=3", duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.1 });
        gsap.to(".orange-bottom-right", { y: "-=7", rotate: "+=2", duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 });
        gsap.to(".leaf-bottom-mid", { y: "+=5", rotate: "-=2", duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
      };

      const entryTl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
          startIdleFloat();
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

      tl.to("#fanta", { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" }, 0)
        .to("#orange-text", { x: "-100vw", opacity: 0, duration: 0.5, ease: "power2.in" }, 0)
        .to("#info-orange", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 0)
        .to(".decor-orange", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 0)
        .to(".bg-orange", { opacity: 0, duration: 1.0, ease: "power2.inOut" }, 0)
        .to(".bg-strawberry", { opacity: 1, duration: 1.0, ease: "power2.inOut" }, 0)
        .fromTo("#fanta2", { y: "-100vh", opacity: 0, rotate: 14 }, { y: "0vh", opacity: 1, rotate: 14, duration: 0.5, ease: "power2.out" }, 0.5)
        .fromTo("#strawberry-text", { x: "100vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: 0.5, ease: "power2.out" }, 0.5)
        .fromTo("#info-strawberry", { y: "100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.5, ease: "power2.out" }, 0.5)
        .fromTo(".decor-strawberry", { y: "-100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.5, ease: "power2.out" }, 0.5);

      tl.addLabel('flavour-1', 1.0);

      tl.to("#fanta2", { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" }, 1.0)
        .to("#strawberry-text", { x: "100vw", opacity: 0, duration: 0.5, ease: "power2.in" }, 1.0)
        .to("#info-strawberry", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 1.0)
        .to(".decor-strawberry", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 1.0)
        .to(".bg-strawberry", { opacity: 0, duration: 1.0, ease: "power2.inOut" }, 1.0)
        .to(".bg-chocolate", { opacity: 1, duration: 1.0, ease: "power2.inOut" }, 1.0)
        .fromTo("#fanta3", { y: "-100vh", opacity: 0, rotate: 14 }, { y: "0vh", opacity: 1, rotate: 14, duration: 0.5, ease: "power2.out" }, 1.5)
        .fromTo("#chocolate-text", { x: "-100vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: 0.5, ease: "power2.out" }, 1.5)
        .fromTo("#info-chocolate", { y: "100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.5, ease: "power2.out" }, 1.5);

      tl.addLabel('flavour-2', 2.0);

      tl.to("#fanta3", { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" }, 2.0)
        .to("#chocolate-text", { x: "-100vw", opacity: 0, duration: 0.5, ease: "power2.in" }, 2.0)
        .to("#info-chocolate", { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" }, 2.0)
        .to(".bg-chocolate", { opacity: 0, duration: 1.0, ease: "power2.inOut" }, 2.0)
        .to(".bg-melon", { opacity: 1, duration: 1.0, ease: "power2.inOut" }, 2.0)
        .fromTo("#fanta4", { y: "-100vh", opacity: 0, rotate: 14 }, { y: "0vh", opacity: 1, rotate: 14, duration: 0.5, ease: "power2.out" }, 2.5)
        .fromTo("#melon-text", { x: "100vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: 0.5, ease: "power2.out" }, 2.5)
        .fromTo("#info-melon", { y: "100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.5, ease: "power2.out" }, 2.5);

      tl.addLabel('flavour-3', 3.0);
    });

    // =========================================================================
    // 3. MOBILE & SMALL MOBILE (max-width: 599px)
    // =========================================================================
    mm.add('(max-width: 599px)', () => {
      const startIdleFloat = () => {
        if (currentFlavourRef.current !== 0) return;
        gsap.to(".orange-top-left", { y: "+=3.5", x: "+=1.5", rotate: "+=1.2", duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".orange-top-right", { y: "-=4", x: "-=1.5", rotate: "-=1.2", duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 });
        gsap.to(".leaf-left-1", { y: "+=3", rotate: "+=1.8", duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 });
        gsap.to(".leaf-left-2", { y: "+=3.5", rotate: "-=1.8", duration: 3.0, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.4 });
        gsap.to(".leaf-right-1", { y: "-=3", x: "+=1", rotate: "+=1.8", duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.1 });
        gsap.to(".orange-bottom-right", { y: "-=4", rotate: "+=1.2", duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 });
        gsap.to(".leaf-bottom-mid", { y: "+=3", rotate: "-=1.2", duration: 3.0, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
      };

      const entryTl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
          startIdleFloat();
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
        .to(".decor-orange", { y: "100vh", opacity: 0, duration: 0.45, ease: "power2.in" }, 0)
        .to(".bg-orange", { opacity: 0, duration: 0.9, ease: "power2.inOut" }, 0)
        .to(".bg-strawberry", { opacity: 1, duration: 0.9, ease: "power2.inOut" }, 0)
        .fromTo("#fanta2", { y: "-100vh", opacity: 0, rotate: 14 }, { y: "0vh", opacity: 1, rotate: 14, duration: 0.45, ease: "power2.out" }, 0.45)
        .fromTo("#strawberry-text", { x: "100vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: 0.45, ease: "power2.out" }, 0.45)
        .fromTo("#info-strawberry", { y: "100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.45, ease: "power2.out" }, 0.45)
        .fromTo(".decor-strawberry", { y: "-100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.45, ease: "power2.out" }, 0.45);

      tl.addLabel('flavour-1', 1.0);

      tl.to("#fanta2", { y: "100vh", opacity: 0, rotate: 14, duration: 0.45, ease: "power2.in" }, 1.0)
        .to("#strawberry-text", { x: "100vw", opacity: 0, duration: 0.45, ease: "power2.in" }, 1.0)
        .to("#info-strawberry", { y: "100vh", opacity: 0, duration: 0.45, ease: "power2.in" }, 1.0)
        .to(".decor-strawberry", { y: "100vh", opacity: 0, duration: 0.45, ease: "power2.in" }, 1.0)
        .to(".bg-strawberry", { opacity: 0, duration: 0.9, ease: "power2.inOut" }, 1.0)
        .to(".bg-chocolate", { opacity: 1, duration: 0.9, ease: "power2.inOut" }, 1.0)
        .fromTo("#fanta3", { y: "-100vh", opacity: 0, rotate: 14 }, { y: "0vh", opacity: 1, rotate: 14, duration: 0.45, ease: "power2.out" }, 1.45)
        .fromTo("#chocolate-text", { x: "-100vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: 0.45, ease: "power2.out" }, 1.45)
        .fromTo("#info-chocolate", { y: "100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.45, ease: "power2.out" }, 1.45);

      tl.addLabel('flavour-2', 2.0);

      tl.to("#fanta3", { y: "100vh", opacity: 0, rotate: 14, duration: 0.45, ease: "power2.in" }, 2.0)
        .to("#chocolate-text", { x: "-100vw", opacity: 0, duration: 0.45, ease: "power2.in" }, 2.0)
        .to("#info-chocolate", { y: "100vh", opacity: 0, duration: 0.45, ease: "power2.in" }, 2.0)
        .to(".bg-chocolate", { opacity: 0, duration: 0.9, ease: "power2.inOut" }, 2.0)
        .to(".bg-melon", { opacity: 1, duration: 0.9, ease: "power2.inOut" }, 2.0)
        .fromTo("#fanta4", { y: "-100vh", opacity: 0, rotate: 14 }, { y: "0vh", opacity: 1, rotate: 14, duration: 0.45, ease: "power2.out" }, 2.45)
        .fromTo("#melon-text", { x: "100vw", opacity: 0 }, { x: "0vw", opacity: 1, duration: 0.45, ease: "power2.out" }, 2.45)
        .fromTo("#info-melon", { y: "100vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.45, ease: "power2.out" }, 2.45);

      tl.addLabel('flavour-3', 3.0);
    });

    const gotoNextFlavour = () => {
      if (currentFlavourRef.current >= 3 || isAnimatingRef.current) return;
      if (entryTlRef.current && entryTlRef.current.isActive()) {
        entryTlRef.current.progress(1);
      }
      const target = currentFlavourRef.current + 1;
      isAnimatingRef.current = true;
      updateLenisPrevent();
      if (tlRef.current) {
        tlRef.current.tweenTo(`flavour-${target}`, {
          duration: 0.7,
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
        tlRef.current.tweenTo(`flavour-${target}`, {
          duration: 0.7,
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

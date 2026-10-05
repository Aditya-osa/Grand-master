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

    const ctx = gsap.context(() => {
      // 1. Initial Page Entrance Animation with customized directions & easing per element
      const entryTl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });

      entryTlRef.current = entryTl;

      entryTl.from("#fanta", {
        y: "-100vh",
        opacity: 0,
        rotate: 14,
        duration: 1.4,
        ease: "power3.out",
      })
      .from(".bottle-ground-shadow", {
        scale: 0.3,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      }, "-=1.2")
      // ORANGE title: Left -> Center (Large text reveals/slides from left)
      .fromTo("#orange-text",
        { x: "-100vw", opacity: 0 },
        { x: "0vw", opacity: 1, duration: 1.3, ease: "power3.out" },
        "-=1.1"
      )
      // 🍊 Large orange — top-left: Left -> Right (Slight floating movement)
      .fromTo(".orange-top-left",
        { x: "-70vw", y: -20, rotate: -12, opacity: 0 },
        { x: 0, y: 0, rotate: 0, opacity: 1, duration: 1.4, ease: "power3.out" },
        "-=1.1"
      )
      // 🍊 Orange + leaf — top-right: Right -> Left (Soft slide + rotation)
      .fromTo(".orange-top-right",
        { x: "70vw", rotate: 40, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1, duration: 1.4, ease: "power3.out" },
        "-=1.1"
      )
      // 🌿 Mint — left side: Left -> Right (Small diagonal movement)
      .fromTo(".leaf-left-1",
        { x: "-50vw", y: -40, rotate: -10, opacity: 0 },
        { x: 0, y: 0, rotate: 25, opacity: 1, duration: 1.2, ease: "power2.out" },
        "-=1.05"
      )
      // 🌿 Mint — top-center: Top -> Down (Drop in gently)
      .fromTo(".leaf-left-2",
        { y: "-80vh", rotate: -45, opacity: 0 },
        { y: 0, rotate: -15, opacity: 1, duration: 1.3, ease: "power3.out" },
        "-=1.1"
      )
      // 🌿 Small mint — right: Right -> Left (Fast, subtle movement)
      .fromTo(".leaf-right-1",
        { x: "45vw", rotate: 95, opacity: 0 },
        { x: 0, rotate: 70, opacity: 1, duration: 0.85, ease: "power2.out" },
        "-=1.0"
      )
      // 🍊 Orange slices — bottom-right: Bottom-right -> Up/Left (Larger movement, slight rotation)
      .fromTo(".orange-bottom-right",
        { x: "60vw", y: "50vh", rotate: -45, opacity: 0 },
        { x: 0, y: 0, rotate: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
        "-=1.15"
      )
      // 🌿 Mint — bottom-center-left: Bottom -> Up (Gentle float)
      .fromTo(".leaf-bottom-mid",
        { y: "50vh", rotate: 10, opacity: 0 },
        { y: 0, rotate: -25, opacity: 1, duration: 1.3, ease: "power2.out" },
        "-=1.0"
      )
      .from("#info-orange", {
        y: "100vh",
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
      }, "-=0.8");

      // 2. Master Timeline for 4 Flavour Transitions
      // Stage 0: Orange (0.0s)
      // Stage 1: Strawberry (1.0s)
      // Stage 2: Chocolate (2.0s)
      // Stage 3: Melon (3.0s)
      const tl = gsap.timeline({
        paused: true,
      });

      tlRef.current = tl;

      tl.addLabel('flavour-0', 0);

      // =========================================================================
      // TRANSITION 1: Orange -> Strawberry (0.0s -> 1.0s)
      // =========================================================================
      // Exit Orange (0.0s -> 0.5s)
      tl.to("#fanta",
        { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" },
        0
      )
      .to("#orange-text",
        { x: "-100vw", opacity: 0, duration: 0.5, ease: "power2.in" },
        0
      )
      .to("#info-orange",
        { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" },
        0
      )
      .to(".decor-orange",
        { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" },
        0
      )
      // Background Crossfade: Orange -> Strawberry (0.0s -> 1.0s)
      .to(".bg-orange",
        { opacity: 0, duration: 1.0, ease: "power2.inOut" },
        0
      )
      .to(".bg-strawberry",
        { opacity: 1, duration: 1.0, ease: "power2.inOut" },
        0
      )
      // Enter Strawberry (0.5s -> 1.0s) (Enters from RIGHT: 100vw)
      .fromTo("#fanta2",
        { y: "-100vh", opacity: 0, rotate: 14 },
        { y: "0vh", opacity: 1, rotate: 14, duration: 0.5, ease: "power2.out" },
        0.5
      )
      .fromTo("#strawberry-text",
        { x: "100vw", opacity: 0 },
        { x: "0vw", opacity: 1, duration: 0.5, ease: "power2.out" },
        0.5
      )
      .fromTo("#info-strawberry",
        { y: "100vh", opacity: 0 },
        { y: "0vh", opacity: 1, duration: 0.5, ease: "power2.out" },
        0.5
      );

      tl.addLabel('flavour-1', 1.0);

      // =========================================================================
      // TRANSITION 2: Strawberry -> Chocolate (1.0s -> 2.0s)
      // =========================================================================
      // Exit Strawberry (1.0s -> 1.5s) (Exits to RIGHT: 100vw)
      tl.to("#fanta2",
        { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" },
        1.0
      )
      .to("#strawberry-text",
        { x: "100vw", opacity: 0, duration: 0.5, ease: "power2.in" },
        1.0
      )
      .to("#info-strawberry",
        { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" },
        1.0
      )
      // Background Crossfade: Strawberry -> Chocolate (1.0s -> 2.0s)
      .to(".bg-strawberry",
        { opacity: 0, duration: 1.0, ease: "power2.inOut" },
        1.0
      )
      .to(".bg-chocolate",
        { opacity: 1, duration: 1.0, ease: "power2.inOut" },
        1.0
      )
      // Enter Chocolate (1.5s -> 2.0s) (Enters from LEFT: -100vw)
      .fromTo("#fanta3",
        { y: "-100vh", opacity: 0, rotate: 14 },
        { y: "0vh", opacity: 1, rotate: 14, duration: 0.5, ease: "power2.out" },
        1.5
      )
      .fromTo("#chocolate-text",
        { x: "-100vw", opacity: 0 },
        { x: "0vw", opacity: 1, duration: 0.5, ease: "power2.out" },
        1.5
      )
      .fromTo("#info-chocolate",
        { y: "100vh", opacity: 0 },
        { y: "0vh", opacity: 1, duration: 0.5, ease: "power2.out" },
        1.5
      );

      tl.addLabel('flavour-2', 2.0);

      // =========================================================================
      // TRANSITION 3: Chocolate -> Melon (2.0s -> 3.0s)
      // =========================================================================
      // Exit Chocolate (2.0s -> 2.5s) (Exits to LEFT: -100vw)
      tl.to("#fanta3",
        { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" },
        2.0
      )
      .to("#chocolate-text",
        { x: "-100vw", opacity: 0, duration: 0.5, ease: "power2.in" },
        2.0
      )
      .to("#info-chocolate",
        { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" },
        2.0
      )
      // Background Crossfade: Chocolate -> Melon (2.0s -> 3.0s)
      .to(".bg-chocolate",
        { opacity: 0, duration: 1.0, ease: "power2.inOut" },
        2.0
      )
      .to(".bg-melon",
        { opacity: 1, duration: 1.0, ease: "power2.inOut" },
        2.0
      )
      // Enter Melon (2.5s -> 3.0s) (Enters from RIGHT: 100vw)
      .fromTo("#fanta4",
        { y: "-100vh", opacity: 0, rotate: 14 },
        { y: "0vh", opacity: 1, rotate: 14, duration: 0.5, ease: "power2.out" },
        2.5
      )
      .fromTo("#melon-text",
        { x: "100vw", opacity: 0 },
        { x: "0vw", opacity: 1, duration: 0.5, ease: "power2.out" },
        2.5
      )
      .fromTo("#info-melon",
        { y: "100vh", opacity: 0 },
        { y: "0vh", opacity: 1, duration: 0.5, ease: "power2.out" },
        2.5
      );

      tl.addLabel('flavour-3', 3.0);
    }, heroEl);

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
      ctx.revert();
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

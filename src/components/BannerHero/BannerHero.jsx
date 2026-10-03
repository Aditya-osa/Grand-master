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
    isAnimatingRef.current = false;

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
      // 1. Initial Page Entrance Animation (Orange bottle from UP, decor elements from DOWN)
      const entryTl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });

      entryTlRef.current = entryTl;

      entryTl.fromTo("#fanta",
        { y: "-100vh", opacity: 0, scale: 0.94, rotate: 14 },
        { y: "0vh", opacity: 1, scale: 1, rotate: 14, duration: 1.4, ease: "power3.out" }
      )
      .fromTo("#bottle-spotlight, #bottle-glow",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" },
        0
      )
      .from("#orange-text", {
        x: "-100vw",
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      }, "-=1.0")
      .from(".decor-orange", {
        y: "100vh",
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out",
      }, "-=1.0")
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
      tl.fromTo("#fanta",
        { y: "0vh", opacity: 1, rotate: 14 },
        { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" },
        0
      )
      .fromTo("#bottle-spotlight, #bottle-glow",
        { scale: 1, opacity: 1 },
        { scale: 0.85, opacity: 0.45, duration: 0.5, ease: "power2.in" },
        0
      )
      .fromTo("#orange-text",
        { x: "0vw", opacity: 1 },
        { x: "-100vw", opacity: 0, duration: 0.5, ease: "power2.in" },
        0
      )
      .fromTo("#info-orange",
        { y: "0vh", opacity: 1 },
        { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" },
        0
      )
      .fromTo(".decor-orange",
        { y: "0vh", opacity: 1 },
        { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" },
        0
      )
      // Background: Orange -> Strawberry (0.0s -> 1.0s)
      .fromTo(".one",
        { background: "linear-gradient(135deg, #e76d1c, #d56600)" },
        { background: "linear-gradient(135deg, #eb2d55, #b41432)", duration: 1.0, ease: "power2.inOut" },
        0
      )
      // Enter Strawberry (0.5s -> 1.0s)
      .fromTo("#fanta2",
        { y: "-100vh", opacity: 0, rotate: 14 },
        { y: "0vh", opacity: 1, rotate: 14, duration: 0.5, ease: "power2.out" },
        0.5
      )
      .to("#bottle-spotlight, #bottle-glow",
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
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
      // Exit Strawberry (1.0s -> 1.5s)
      tl.fromTo("#fanta2",
        { y: "0vh", opacity: 1, rotate: 14 },
        { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" },
        1.0
      )
      .to("#bottle-spotlight, #bottle-glow",
        { scale: 0.85, opacity: 0.45, duration: 0.5, ease: "power2.in" },
        1.0
      )
      .fromTo("#strawberry-text",
        { x: "0vw", opacity: 1 },
        { x: "100vw", opacity: 0, duration: 0.5, ease: "power2.in" },
        1.0
      )
      .fromTo("#info-strawberry",
        { y: "0vh", opacity: 1 },
        { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" },
        1.0
      )
      // Background: Strawberry -> Chocolate (1.0s -> 2.0s)
      .to(".one",
        { background: "linear-gradient(135deg, #3d1c14, #180905)", duration: 1.0, ease: "power2.inOut" },
        1.0
      )
      // Enter Chocolate (1.5s -> 2.0s) (Enters from LEFT: -100vw)
      .fromTo("#fanta3",
        { y: "-100vh", opacity: 0, rotate: 14 },
        { y: "0vh", opacity: 1, rotate: 14, duration: 0.5, ease: "power2.out" },
        1.5
      )
      .to("#bottle-spotlight, #bottle-glow",
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
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
      tl.fromTo("#fanta3",
        { y: "0vh", opacity: 1, rotate: 14 },
        { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" },
        2.0
      )
      .to("#bottle-spotlight, #bottle-glow",
        { scale: 0.85, opacity: 0.45, duration: 0.5, ease: "power2.in" },
        2.0
      )
      .fromTo("#chocolate-text",
        { x: "0vw", opacity: 1 },
        { x: "-100vw", opacity: 0, duration: 0.5, ease: "power2.in" },
        2.0
      )
      .fromTo("#info-chocolate",
        { y: "0vh", opacity: 1 },
        { y: "100vh", opacity: 0, duration: 0.5, ease: "power2.in" },
        2.0
      )
      // Background: Chocolate -> Melon (2.0s -> 3.0s)
      .to(".one",
        { background: "linear-gradient(135deg, #389e27, #1b6312)", duration: 1.0, ease: "power2.inOut" },
        2.0
      )
      // Enter Melon (2.5s -> 3.0s) (Enters from RIGHT: 100vw)
      .fromTo("#fanta4",
        { y: "-100vh", opacity: 0, rotate: 14 },
        { y: "0vh", opacity: 1, rotate: 14, duration: 0.5, ease: "power2.out" },
        2.5
      )
      .to("#bottle-spotlight, #bottle-glow",
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
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

      // Subtle ambient breathing aura when bottle is held
      gsap.to(["#bottle-spotlight", "#bottle-glow"], {
        scale: 1.025,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
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

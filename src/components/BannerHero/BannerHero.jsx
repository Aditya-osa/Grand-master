import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MainSection from './MainSection';
import './BannerHero.css';

/**
 * BannerHero Component
 * Fully integrated Hero section from Bannerinhtml.
 * Preserves exact GSAP timeline animations, layout, typography, timing, wheel, touch, and key interactions.
 */
export default function BannerHero() {
  const heroRef = useRef(null);
  const tlRef = useRef(null);
  const entryTlRef = useRef(null);
  const currentFlavourRef = useRef(0); // 0 = Orange, 1 = Strawberry
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    // Reset state on mount
    currentFlavourRef.current = 0;
    isAnimatingRef.current = false;

    // Ensure hero prevents Lenis interference while in Orange state
    heroEl.setAttribute('data-lenis-prevent', 'true');

    const updateLenisPrevent = () => {
      if (!heroEl) return;
      if (currentFlavourRef.current === 0 || isAnimatingRef.current) {
        heroEl.setAttribute('data-lenis-prevent', 'true');
      } else {
        heroEl.removeAttribute('data-lenis-prevent');
      }
    };

    const ctx = gsap.context(() => {
      // 1. Initial Page Entrance Animation (Bottle from UP, Orange decor elements from DOWN)
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

      // 2. Master Timeline for Flavour Change (Orange -> Strawberry)
      const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          currentFlavourRef.current = 1;
          isAnimatingRef.current = false;
          updateLenisPrevent();
        },
        onReverseComplete: () => {
          currentFlavourRef.current = 0;
          isAnimatingRef.current = false;
          updateLenisPrevent();
        },
      });

      tlRef.current = tl;

      // Step 1: Exit Orange elements cleanly (0s -> 0.5s)
      tl.fromTo("#fanta",
        { y: "0vh", opacity: 1, rotate: 14 },
        { y: "100vh", opacity: 0, rotate: 14, duration: 0.5, ease: "power2.in" },
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

      // Background Transition (0s -> 1.0s)
      .fromTo(".one",
        { background: "linear-gradient(135deg, #ea7b00, #d56600)" },
        { background: "linear-gradient(135deg, #eb2d55, #b41432)", duration: 1.0, ease: "power2.inOut" },
        0
      )

      // Step 2: Enter Strawberry elements cleanly (0.5s -> 1.0s)
      // Bottle comes from UP (-100vh -> 0vh)
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
    }, heroEl);

    const gotoStrawberry = () => {
      if (currentFlavourRef.current === 1 || isAnimatingRef.current) return;
      if (entryTlRef.current && entryTlRef.current.isActive()) {
        entryTlRef.current.progress(1);
      }
      isAnimatingRef.current = true;
      updateLenisPrevent();
      if (tlRef.current) tlRef.current.play();
    };

    const gotoOrange = () => {
      if (currentFlavourRef.current === 0 || isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      updateLenisPrevent();
      if (tlRef.current) tlRef.current.reverse();
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
      // If mid-animation, always prevent default and stop propagation to prevent jumps
      if (isAnimatingRef.current) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }

      const atTop = isAtTop();

      if (atTop) {
        if (e.deltaY > 0) {
          // Scrolling DOWN
          if (currentFlavourRef.current === 0) {
            e.preventDefault();
            e.stopImmediatePropagation();
            gotoStrawberry();
          }
          // If currentFlavour === 1, allow natural page scroll down into next sections!
        } else if (e.deltaY < 0) {
          // Scrolling UP
          if (currentFlavourRef.current === 1) {
            // If just arrived at top from lower section, absorb trailing scroll inertia
            if (Date.now() - topArrivalTimestamp < 250) {
              e.preventDefault();
              e.stopImmediatePropagation();
              return;
            }
            e.preventDefault();
            e.stopImmediatePropagation();
            gotoOrange();
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
          if (currentFlavourRef.current === 0) {
            if (e.cancelable) e.preventDefault();
            e.stopImmediatePropagation();
          } else if (currentFlavourRef.current === 1 && deltaY < 0) {
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
          // Mobile swipe up (deltaY > 30) -> Strawberry
          if (deltaY > 30 && currentFlavourRef.current === 0) {
            gotoStrawberry();
          }
          // Mobile swipe down (deltaY < -30) -> Orange
          else if (deltaY < -30 && currentFlavourRef.current === 1) {
            gotoOrange();
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
        if (atTop && currentFlavourRef.current === 0) {
          e.preventDefault();
          e.stopImmediatePropagation();
          gotoStrawberry();
        }
        // If currentFlavour === 1, allow ArrowDown/PageDown to scroll into next sections
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (atTop && currentFlavourRef.current === 1) {
          e.preventDefault();
          e.stopImmediatePropagation();
          gotoOrange();
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

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes entrance animations for UI controls, background shapes, and initial bottle presentation
 */
export const initHeroEntrance = ({
  containerRef,
  logoRef,
  promptRef,
  infoRef,
  langRef,
  menuRef,
  bottleEls,
}) => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ctx = gsap.context(() => {
    const navElements = [langRef?.current, menuRef?.current].filter(Boolean);

    if (prefersReduced) {
      gsap.set(
        [
          logoRef?.current,
          promptRef?.current,
          infoRef?.current,
          ...navElements,
          ...bottleEls,
        ],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: 'all',
        }
      );
      return;
    }

    if (navElements.length) {
      gsap.set(navElements, { opacity: 0, y: -15 });
    }

    if (logoRef?.current) {
      gsap.set(logoRef.current, { opacity: 0, y: -24 });
    }

    if (promptRef?.current) {
      gsap.set(promptRef.current, { opacity: 0, y: 15 });
    }

    if (infoRef?.current) {
      gsap.set(infoRef.current, { opacity: 0, y: 30 });
    }

    // Set initial bottle states
    gsap.set(bottleEls, {
      opacity: 0,
      y: 50,
      scale: 0.8,
    });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (navElements.length) {
      tl.to(navElements, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 });
    }

    if (logoRef?.current) {
      tl.to(logoRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, '-=0.6');
    }

    if (infoRef?.current) {
      tl.to(infoRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.7');
    }

    // Stagger bottles into view
    tl.to(
      bottleEls,
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: 'elastic.out(1, 0.85)',
      },
      '-=0.7'
    );

    if (promptRef?.current) {
      tl.to(promptRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5');
    }

    // Gentle ambient float on bottles
    bottleEls.forEach((el, i) => {
      gsap.to(el, {
        y: (i % 2 === 0 ? '-=' : '+=') + 8,
        duration: 3 + (i % 3) * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.2 + i * 0.15,
      });
    });

    // Slow infinite rotation on circular typography badge


    if (promptRef?.current) {
      gsap.to(promptRef.current, {
        y: 6,
        opacity: 0.65,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5,
      });
    }
  }, containerRef);

  return ctx;
};

/**
 * Continuous right-to-left scrolling carousel with angled track and real-time center magnification
 */
export const initCarouselScroll = ({ containerRef, trackRef, getBottleEls }) => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return null;

  const ctx = gsap.context(() => {
    const track = trackRef.current;
    if (!track) return;

    const INITIAL_FOCAL_INDEX = 2; // Index 2 (Cipolla in Agrodolce) starts centered as shown in screenshot

    const getStartX = () => {
      const bottleEls = getBottleEls();
      if (bottleEls.length > INITIAL_FOCAL_INDEX && bottleEls[INITIAL_FOCAL_INDEX] && bottleEls[0]) {
        return -(bottleEls[INITIAL_FOCAL_INDEX].offsetLeft - bottleEls[0].offsetLeft);
      }
      return 0;
    };

    const getTravelDistance = () => {
      const bottleEls = getBottleEls();
      const lastIndex = bottleEls.length - 1;
      if (bottleEls[lastIndex] && bottleEls[INITIAL_FOCAL_INDEX]) {
        // Stop exactly when the last bottle reaches the center spotlight (zero empty space)
        return bottleEls[lastIndex].offsetLeft - bottleEls[INITIAL_FOCAL_INDEX].offsetLeft;
      }
      return window.innerWidth * 0.45;
    };

    // Real-time bottle center proximity & magnification engine
    const updateBottleScales = () => {
      const isMobile = window.innerWidth <= 768;
      const isSmallMobile = window.innerWidth <= 480;
      const centerX = window.innerWidth / 2;
      const maxDistance = isMobile ? window.innerWidth * 0.45 : Math.min(window.innerWidth * 0.38, 380);
      const bottleEls = getBottleEls();

      const baseScale = isSmallMobile ? 0.78 : isMobile ? 0.82 : 0.85;
      const maxBoost = isSmallMobile ? 0.32 : isMobile ? 0.42 : 0.55;

      bottleEls.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const bottleCenter = rect.left + rect.width / 2;
        const dist = Math.abs(centerX - bottleCenter);

        // 1 at exact center, drops smoothly to 0 at edge of active zone
        const proximity = Math.max(0, 1 - dist / maxDistance);
        // Smooth sine curve for natural organic magnification
        const smoothCurve = Math.sin((proximity * Math.PI) / 2);

        // Center magnification: responsive scale
        const targetScale = baseScale + smoothCurve * maxBoost;
        const targetZIndex = smoothCurve > 0.55 ? 30 : smoothCurve > 0.2 ? 20 : 10;
        
        // Counter-rotate when centered (+4deg) like the reference; tilt outwards when left (-16deg) or right (+14deg)
        const baseTilt = bottleCenter < centerX ? -16 : 14;
        const targetRotation = (1 - smoothCurve) * baseTilt + smoothCurve * 4;
        
        // Subtle focus blur on flanking bottles for photographic depth of field
        const blurAmount = Math.max(0, (1 - smoothCurve) * (isMobile ? 0.4 : 0.7));

        gsap.set(el, {
          scale: targetScale,
          rotation: targetRotation,
          zIndex: targetZIndex,
          filter: blurAmount > 0.05 ? `blur(${blurAmount}px)` : 'none',
        });
      });
    };

    // Set initial position with Mango in the center
    gsap.set(track, { x: getStartX() });
    updateBottleScales();

    // ScrollTrigger timeline driving the right-to-left track translation
    const st = gsap.fromTo(
      track,
      { x: () => getStartX() },
      {
        x: () => getStartX() - getTravelDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${getTravelDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: () => {
            updateBottleScales();
          },
        },
      }
    );

    const handleResize = () => {
      ScrollTrigger.refresh();
      updateBottleScales();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      st.scrollTrigger?.kill();
    };
  }, containerRef);

  return ctx;
};

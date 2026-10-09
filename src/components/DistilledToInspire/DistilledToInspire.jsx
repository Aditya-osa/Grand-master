import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DistilledToInspire.css';

gsap.registerPlugin(ScrollTrigger);

// High-quality YouTube video specified by user
const YOUTUBE_VIDEO_ID = '1z5FCi-XpHQ';

/**
 * DistilledToInspire
 * Apple & Webflow scroll-driven gradient text reveal with interactive video player
 */
export default function DistilledToInspire() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const renderGradient = (p) => {
      if (p >= 96) {
        textEl.style.backgroundImage = 'none';
        textEl.style.color = '#000000';
        textEl.style.webkitTextFillColor = '#000000';
      } else {
        textEl.style.color = 'transparent';
        textEl.style.webkitTextFillColor = 'transparent';
        const p1 = Math.max(0, p * 1.05 - 4);
        const p2 = Math.min(100, p1 + 10);
        const p3 = Math.min(100, p1 + 22);
        const p4 = Math.min(100, p1 + 36);
        textEl.style.backgroundImage = `linear-gradient(to bottom, #000000 0%, #000000 ${p1}%, rgba(0, 0, 0, 0.82) ${p2}%, rgba(0, 0, 0, 0.48) ${p3}%, rgba(0, 0, 0, 0.25) ${p4}%, rgba(0, 0, 0, 0.25) 100%)`;
      }
    };

    const mm = gsap.matchMedia();

    // 1. Desktop & Laptop (1024px+)
    mm.add('(min-width: 1024px)', () => {
      const state = { p: 0 };
      const tween = gsap.to(state, {
        p: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 40%',
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: () => renderGradient(state.p),
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    // 2. Tablet (600px - 1023px)
    mm.add('(min-width: 600px) and (max-width: 1023px)', () => {
      const state = { p: 0 };
      const tween = gsap.to(state, {
        p: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 40%',
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: () => renderGradient(state.p),
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    // 3. Mobile (320px - 599px)
    mm.add('(max-width: 599px)', () => {
      const state = { p: 0 };
      const tween = gsap.to(state, {
        p: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 45%',
          scrub: 0.4,
          invalidateOnRefresh: true,
          onUpdate: () => renderGradient(state.p),
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      mm.revert();
    };
  }, []);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleDiscoverClick = (e) => {
    e.preventDefault();
    const target = document.getElementById('products') || document.querySelector('#products');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="distilled-to-inspire" id="distilled" aria-label="Distilled to Inspire">
      <div className="distilled-to-inspire__inner">
        {/* Left Side: Brand Typography, Editorial Text with Scroll-Driven Reveal */}
        <div className="distilled-to-inspire__content">
          {/* Bold Heading */}
          <h2 className="distilled-to-inspire__title">
            DISTILLED TO INSPIRE
          </h2>

         

          {/* Inception Year Meta */}
          <p className="distilled-to-inspire__inception">
            <strong>Crafted </strong> Since 2015
          </p>

          {/* Editorial Paragraph with Scroll Gradient Reveal */}
          <div className="distilled-to-inspire__text-wrapper">
            <p ref={textRef} className="distilled-to-inspire__paragraph">
              Grand Masters vodka is produced by House of Deejay Distilleries Pvt Ltd. It is present in the major cities of Maharashtra and distributed in Africa and Middle East. Grand Master's includes flavoured vodka, and is more for the Youth because of the blended flavours and the variety of Vodka it has to offer &amp; also for people who want to start drinking and try new things.
            </p>
          </div>

          {/* Discover Our Flavors Button */}
          <a
            href="#products"
            onClick={handleDiscoverClick}
            className="distilled-to-inspire__btn"
            id="discover-flavors-btn"
          >
            <span>Discover Our Flavors</span>
          </a>
        </div>

        {/* Right Side: YouTube Video Player Container */}
        <div className="distilled-to-inspire__video-side">
          <div className="distilled-to-inspire__video-card">
            {isPlaying ? (
              <div className="distilled-to-inspire__iframe-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title="Grand Master - Distilled to Inspire"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="distilled-to-inspire__iframe"
                />
              </div>
            ) : (
              <div
                className="distilled-to-inspire__poster-wrapper"
                onClick={handlePlayClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handlePlayClick();
                }}
                aria-label="Play Grand Master Distillery Video"
              >
                <img
                  src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`}
                  alt="Grand Master Vodka Distillery Production Line"
                  className="distilled-to-inspire__poster-img"
                  loading="lazy"
                />
                <div className="distilled-to-inspire__poster-overlay" />

                {/* Central Circular Play Button */}
                <button
                  type="button"
                  className="distilled-to-inspire__play-btn"
                  onClick={handlePlayClick}
                  aria-label="Play video"
                >
                  <div className="distilled-to-inspire__play-circle">
                    <svg
                      viewBox="0 0 24 24"
                      className="distilled-to-inspire__play-svg"
                      aria-hidden="true"
                    >
                      <polygon points="8 5 19 12 8 19 8 5" fill="currentColor" />
                    </svg>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

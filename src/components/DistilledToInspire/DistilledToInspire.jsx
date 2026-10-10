import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DistilledToInspire.css';

gsap.registerPlugin(ScrollTrigger);

// High-quality YouTube video specified by user
const YOUTUBE_VIDEO_ID = '1z5FCi-XpHQ';

/**
 * DistilledToInspire
 * Editorial Brand & Craft Section with YouTube Video Player
 * Matches reference image with pixel-perfect precision
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
      if (p >= 75) {
        textEl.style.backgroundImage = 'none';
        textEl.style.color = '#732f03';
        textEl.style.webkitTextFillColor = '#732f03';
      } else {
        textEl.style.color = 'transparent';
        textEl.style.webkitTextFillColor = 'transparent';
        const p1 = Math.max(0, p * 1.3 - 2);
        const p2 = Math.min(100, p1 + 10);
        const p3 = Math.min(100, p1 + 22);
        const p4 = Math.min(100, p1 + 35);
        textEl.style.backgroundImage = `linear-gradient(to bottom, #732f03 0%, #732f03 ${p1}%, rgba(115, 47, 3, 0.82) ${p2}%, rgba(115, 47, 3, 0.45) ${p3}%, rgba(115, 47, 3, 0.2) ${p4}%, rgba(115, 47, 3, 0.2) 100%)`;
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
          start: 'top 85%',
          end: 'top 45%',
          scrub: 0.5,
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
          start: 'top 85%',
          end: 'top 45%',
          scrub: 0.5,
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
          start: 'top 90%',
          end: 'top 50%',
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
        {/* Left Side: Brand Typography, Editorial Text */}
        <div className="distilled-to-inspire__content">
          {/* Bold Heading */}
          <h2 className="distilled-to-inspire__title">
            DISTILLED TO INSPIRE
          </h2>

          {/* Inception Subtitle */}
          <p className="distilled-to-inspire__inception">
            Crafted Since 2015
          </p>

          {/* Editorial Paragraph with Scroll Gradient Reveal */}
          <div className="distilled-to-inspire__text-wrapper">
            <p ref={textRef} className="distilled-to-inspire__paragraph">
              Crafted by House of Deejay Distilleries, Grand Master’s<br className="desktop-br" /> brings together distinctive vodka flavours, contemporary <br className="desktop-br" />packaging and a spirit of experimentation.
            </p>
          </div>

          {/* Discover Our Story Button */}
          <a
            href="#products"
            onClick={handleDiscoverClick}
            className="distilled-to-inspire__btn"
            id="discover-story-btn"
          >
            <span>Discover Our Story</span>
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
                  src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`;
                  }}
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
                      <polygon points="9 6 18 12 9 18 9 6" fill="currentColor" />
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

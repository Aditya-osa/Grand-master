import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import videoPoster from '../../assets/image copy 3.png';
import distilleryVideo from '../../assets/1792047869658684 (1).mp4';
import './DistilledToInspire.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * DistilledToInspire
 * Editorial Brand & Craft Section with Orynex-inspired Cinematic Video Scroll Interaction
 * In About Us (centered=true): Video is left-aligned beneath "✦ OUR STORY" alongside headline & metrics,
 * expanding smoothly to full cinematic container on scroll.
 */
export default function DistilledToInspire({ centered = false }) {
  const [isPlaying, setIsPlaying] = useState(centered);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const topGridRef = useRef(null);
  const rightColRef = useRef(null);
  const videoCardRef = useRef(null);
  const videoRef = useRef(null);
  const eyebrowRef = useRef(null);

  // Play / Pause toggle handler
  const handleTogglePlay = (e) => {
    if (e) {
      e.stopPropagation();
    }
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch((err) => {
        console.warn('Playback resume error:', err);
      });
    } else {
      video.pause();
    }
  };

  // Sync isPlaying state with actual HTML5 video events & manage autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    if (centered) {
      // About Us page: Ambient ambient autoplay
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setIsPlaying(false);
        });
      }
    } else {
      // Home page: paused by default, user must click to play
      video.pause();
      setIsPlaying(false);
    }

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, [centered]);

  // GSAP ScrollTrigger timeline matching Orynex scroll-driven scaling & pinning
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      if (centered) {
        // Desktop / Laptop (>= 992px):
        // Video is left-aligned beneath "✦ OUR STORY", right column text is left-aligned & STICKY.
        // Glitch-free ScrollTrigger scrubs video scale & focus smoothly while text remains locked in view.
        mm.add('(min-width: 992px)', () => {
          if (!trackRef.current || !videoCardRef.current) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: trackRef.current,
              start: 'top 80px',
              end: 'bottom bottom',
              scrub: 0.8,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Guarantee initial starting state
          gsap.set(videoCardRef.current, {
            width: 440,
            height: 295,
            y: 0,
            borderRadius: 18,
          });

          // Phase 1 (0 -> 0.32): Video comes further down, right column text eases out
          tl.to(
            videoCardRef.current,
            {
              y: 150,
              duration: 0.32,
              ease: 'power1.out',
            },
            0
          );

          if (rightColRef.current) {
            tl.to(
              rightColRef.current,
              {
                opacity: 0,
                y: -28,
                duration: 0.28,
                ease: 'power1.out',
              },
              0
            );
          }

          if (eyebrowRef.current) {
            tl.to(
              eyebrowRef.current,
              {
                opacity: 0,
                y: -20,
                duration: 0.28,
                ease: 'power1.out',
              },
              0
            );
          }

          // Phase 2 (0.32 -> 1.0): Video then scales big to full cinematic width and height
          tl.to(
            videoCardRef.current,
            {
              width: () => (topGridRef.current ? topGridRef.current.offsetWidth : 1360),
              height: () => Math.min(window.innerHeight * 0.74, 700),
              y: 80,
              borderRadius: 14,
              boxShadow: '0 32px 80px rgba(74, 34, 19, 0.24)',
              duration: 0.68,
              ease: 'power1.inOut',
            },
            0.32
          );
        });

        // Tablet (768px - 991px): Proportional expansion
        mm.add('(min-width: 768px) and (max-width: 991px)', () => {
          if (!videoCardRef.current) return;

          gsap.fromTo(
            videoCardRef.current,
            {
              scale: 0.95,
              borderRadius: '18px',
            },
            {
              scale: 1,
              borderRadius: '12px',
              ease: 'none',
              scrollTrigger: {
                trigger: videoCardRef.current,
                start: 'top 85%',
                end: 'center 45%',
                scrub: 0.8,
              },
            }
          );
        });

        // Mobile (< 768px): Natural in-view scrub scaling without pin lock
        mm.add('(max-width: 767px)', () => {
          if (!videoCardRef.current) return;

          gsap.fromTo(
            videoCardRef.current,
            {
              scale: 0.94,
              borderRadius: '16px',
            },
            {
              scale: 1,
              borderRadius: '12px',
              ease: 'none',
              scrollTrigger: {
                trigger: videoCardRef.current,
                start: 'top 85%',
                end: 'center 50%',
                scrub: 0.8,
              },
            }
          );
        });
      } else {
        // Non-centered Home Page 2-Column Variant: Subtle cinematic scroll focus
        mm.add('(min-width: 768px)', () => {
          if (!videoCardRef.current) return;

          gsap.fromTo(
            videoCardRef.current,
            {
              scale: 0.94,
              opacity: 0.94,
            },
            {
              scale: 1,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: videoCardRef.current,
                start: 'top 85%',
                end: 'center 50%',
                scrub: 0.8,
              },
            }
          );
        });
      }
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [centered]);

  const handleDiscoverClick = (e) => {
    e.preventDefault();
    const target = document.getElementById('products') || document.querySelector('#products');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`distilled-to-inspire ${centered ? 'distilled-to-inspire--about-layout' : ''}`}
      id="distilled"
      aria-label="Distilled to Inspire"
    >
      {centered ? (
        /* ====================================================================
           ABOUT US VARIANT: Matches Orynex layout exactly
           - Left Column: "✦ OUR STORY" + Left-Aligned Video Card
           - Right Column: Bold Editorial Headline + Two Metric Cards (98% & 35K+)
           - Scroll interaction: Video expands from left to cinematic full-width
           ==================================================================== */
        <div ref={trackRef} className="distilled-about-track">
          {/* Centered Eyebrow without Star */}
          {/* <div ref={eyebrowRef} className="distilled-about-center-header">
            <span className="distilled-about-eyebrow">OUR STORY</span>
          </div> */}

          <div ref={topGridRef} className="distilled-about-grid">
            
            {/* Left Column: Left-Aligned Video */}
            <div className="distilled-about-col-left">
              {/* Video Player Card (Left-Aligned matching screenshot) */}
              <div
                ref={videoCardRef}
                className="distilled-about-video-card"
                onClick={handleTogglePlay}
                role="region"
                aria-label="Grand Master Distillery Video Presentation"
              >
                <div className="distilled-to-inspire__video-wrapper">
                  <video
                    ref={videoRef}
                    src={distilleryVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="distilled-to-inspire__video-element"
                  >
                    <source src={distilleryVideo} type="video/mp4" />
                    <source src={distilleryVideo} type="video/quicktime" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Subtle dark gradient overlay at bottom matching Orynex (.vedio-layner) */}
                  <div className="distilled-video-gradient" aria-hidden="true" />

                  {/* Minimal circular play/pause button at bottom-right matching Orynex */}
                  <button
                    type="button"
                    className="distilled-video-play-btn"
                    onClick={handleTogglePlay}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    title={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? (
                      <svg
                        viewBox="0 0 24 24"
                        className="distilled-video-btn-icon"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <rect x="6" y="5" width="3.5" height="14" rx="1" />
                        <rect x="14.5" y="5" width="3.5" height="14" rx="1" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        className="distilled-video-btn-icon icon-play--offset"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <polygon points="7,5 19,12 7,19" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Text, Title & Paragraphs (Same Position, Left-Aligned) */}
            <div ref={rightColRef} className="distilled-about-col-right distilled-about-sticky-col">
              <h2 className="distilled-about-title">
                CRAFTED TO STAND OUT
              </h2>

              <p className="distilled-about-subtitle">
                A legacy of flavour since 2015
              </p>

              <div className="distilled-about-text-wrapper">
                <p className="distilled-about-paragraph">
                  Grand Master's Vodka brings together quality distillation, distinctive flavours, and the spirit of modern urban culture. Crafted by House of Deejay Distilleries Pvt. Ltd. since 2015, the brand combines carefully selected grains, a refined filtration process, and a diverse range of flavour blends to create a distinctive vodka experience. Inspired by individuality and a bold, contemporary outlook, Grand Master's celebrates a world where tradition meets modernity and every flavour has its own identity.
                </p>
              </div>

            </div>

          </div>
        </div>
      ) : (
        /* ====================================================================
           HOME PAGE SPLIT LAYOUT (centered=false)
           ==================================================================== */
        <div className="distilled-to-inspire__inner">
          <div className="distilled-to-inspire__content">
            <h2 className="distilled-to-inspire__title">
              CRAFTED TO STAND OUT
            </h2>

            <p className="distilled-to-inspire__inception">
              A legacy of flavour since 2015
            </p>

            <div className="distilled-to-inspire__text-wrapper">
              <p className="distilled-to-inspire__paragraph">
                Grand Master's Vodka brings together quality distillation, distinctive flavours, and the spirit of modern urban culture. Crafted by House of Deejay Distilleries Pvt. Ltd. since 2015, the brand combines carefully selected grains, a refined filtration process, and a diverse range of flavour blends to create a distinctive vodka experience. Inspired by individuality and a bold, contemporary outlook, Grand Master's celebrates a world where tradition meets modernity and every flavour has its own identity.
              </p>
            </div>

            <a
              href="#products"
              onClick={handleDiscoverClick}
              className="distilled-to-inspire__btn"
              id="discover-story-btn"
              aria-label="Our Story"
            >
              <span>OUR STORY</span>
              <span className="distilled-to-inspire__btn-arrow" aria-hidden="true">→</span>
            </a>
          </div>

          <div className="distilled-to-inspire__video-side">
            <div
              ref={videoCardRef}
              className="distilled-to-inspire__video-card"
              onClick={handleTogglePlay}
              role="region"
              aria-label="Grand Master Distillery Video Presentation"
            >
              <div className="distilled-to-inspire__video-wrapper">
                <video
                  ref={videoRef}
                  src={distilleryVideo}
                  poster={videoPoster}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="distilled-to-inspire__video-element"
                >
                  <source src={distilleryVideo} type="video/mp4" />
                  <source src={distilleryVideo} type="video/quicktime" />
                  Your browser does not support the video tag.
                </video>

                {/* Poster dark overlay for contrast */}
                <div
                  className={`distilled-to-inspire__poster-overlay ${isPlaying ? 'distilled-to-inspire__poster-overlay--hidden' : ''}`}
                  aria-hidden="true"
                />

                {/* Central Circular Play Button as it was before with original styling */}
                <button
                  type="button"
                  className={`distilled-to-inspire__play-btn ${isPlaying ? 'distilled-to-inspire__play-btn--playing' : ''}`}
                  onClick={handleTogglePlay}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  title={isPlaying ? 'Pause video' : 'Play video'}
                >
                  <div className="distilled-to-inspire__play-circle">
                    {isPlaying ? (
                      <svg
                        viewBox="0 0 24 24"
                        className="distilled-to-inspire__play-svg icon-pause"
                        aria-hidden="true"
                      >
                        <rect x="6" y="5" width="3.5" height="14" rx="1" fill="currentColor" />
                        <rect x="14.5" y="5" width="3.5" height="14" rx="1" fill="currentColor" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        className="distilled-to-inspire__play-svg"
                        aria-hidden="true"
                      >
                        <polygon points="8 5 19 12 8 19 8 5" fill="currentColor" />
                      </svg>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

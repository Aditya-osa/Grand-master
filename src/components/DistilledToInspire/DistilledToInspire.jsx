import React, { useState, useRef, useEffect } from 'react';
import videoPoster from '../../assets/image copy 3.png';
import distilleryVideo from '../../assets/1791798325702656.mov';
import './DistilledToInspire.css';

/**
 * DistilledToInspire
 * Editorial Brand & Craft Section with Video Player
 * Matches reference image with pixel-perfect precision
 */
export default function DistilledToInspire({ centered = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Playback error:', err);
      });
    }
  }, [isPlaying]);

  const handleDiscoverClick = (e) => {
    e.preventDefault();
    const target = document.getElementById('products') || document.querySelector('#products');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className={`distilled-to-inspire ${centered ? 'distilled-to-inspire--centered' : ''}`}
      id="distilled"
      aria-label="Distilled to Inspire"
    >
      <div className="distilled-to-inspire__inner">
        {/* Left Side (or Top when centered): Brand Typography, Editorial Text */}
        <div className="distilled-to-inspire__content">
          {/* Bold Heading */}
          <h2 className="distilled-to-inspire__title">
            DISTILLED TO INSPIRE
          </h2>

          {/* Inception Subtitle */}
          <p className="distilled-to-inspire__inception">
            Crafted Since 2015
          </p>

          {/* Editorial Paragraph */}
          <div className="distilled-to-inspire__text-wrapper">
            <p className="distilled-to-inspire__paragraph">
              Grand Masters vodka is produced by House of Deejay Distilleries Pvt Ltd. It is present in the major cities of Maharashtra and distributed in Africa and Middle East. Grand Master’s includes flavoured Vodka.
              <br /><br />
              Grand Master’s is more for the Youth because of the blended flavours and the variety of Vodka it has to offer &amp; also for people who want to start drinking and try new things.
            </p>
          </div>

          {/* Discover Our Story Button (shown on home, hidden when centered in about us) */}
          {!centered && (
            <a
              href="#products"
              onClick={handleDiscoverClick}
              className="distilled-to-inspire__btn"
              id="discover-story-btn"
              aria-label="Discover Our Story"
            >
              <span>Our Story</span>
              <span className="distilled-to-inspire__btn-arrow" aria-hidden="true">→</span>
            </a>
          )}
        </div>

        {/* Right Side: Video Player Container */}
        <div className="distilled-to-inspire__video-side">
          <div className="distilled-to-inspire__video-card">
            {isPlaying ? (
              <div className="distilled-to-inspire__video-wrapper">
                <video
                  ref={videoRef}
                  src={distilleryVideo}
                  poster={videoPoster}
                  controls
                  autoPlay
                  playsInline
                  className="distilled-to-inspire__video-element"
                >
                  <source src={distilleryVideo} type="video/mp4" />
                  <source src={distilleryVideo} type="video/quicktime" />
                  Your browser does not support the video tag.
                </video>
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
                  src={videoPoster}
                  alt="Grand Master Vodka Distillery Video Poster"
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

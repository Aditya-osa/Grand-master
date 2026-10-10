import React, { useState } from 'react';
import videoPoster from '../../assets/image copy 3.png';
import './DistilledToInspire.css';

// High-quality YouTube video specified by user
const YOUTUBE_VIDEO_ID = '1z5FCi-XpHQ';

/**
 * DistilledToInspire
 * Editorial Brand & Craft Section with YouTube Video Player
 * Matches reference image with pixel-perfect precision
 */
export default function DistilledToInspire() {
  const [isPlaying, setIsPlaying] = useState(false);

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
    <section className="distilled-to-inspire" id="distilled" aria-label="Distilled to Inspire">
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

          {/* Editorial Paragraph */}
          <div className="distilled-to-inspire__text-wrapper">
            <p className="distilled-to-inspire__paragraph">
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

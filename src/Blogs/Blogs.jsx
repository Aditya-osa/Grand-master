import React, { useState } from 'react';
import './Blogs.css';
import { blogs } from './blogsData';

export { blogs };

export function BlogCard({ blog }) {
  const [imgError, setImgError] = useState(false);

  const handleCardClick = () => {
    window.location.hash = `#blog-detail-${blog.id}`;
    window.dispatchEvent(new Event('hashchange'));
    window.dispatchEvent(new CustomEvent('gm-navigate', { detail: `blog-detail-${blog.id}` }));
  };

  return (
    <article
      className="gm-insight-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className="gm-insight-img-wrap">
        {(blog.thumbnail || blog.image) && !imgError ? (
          <img
            src={blog.thumbnail || blog.image}
            alt={blog.title}
            className="gm-insight-img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="gm-insight-placeholder">
            <span>GM</span>
          </div>
        )}
      </div>
      <span className="gm-insight-tag">{blog.category}</span>
      <h3 className="gm-insight-card-title">{blog.title}</h3>
      <button
        type="button"
        className="gm-insight-read-more-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleCardClick();
        }}
        aria-label={`Read more: ${blog.title}`}
      >
        <span>Read More</span>
        <span className="gm-read-more-arrow" aria-hidden="true">&rarr;</span>
      </button>
    </article>
  );
}

export default function Blogs() {
  const [showAll, setShowAll] = useState(false);

  const displayedBlogs = showAll ? blogs : blogs.slice(0, 3);

  const handleViewAll = () => {
    window.location.hash = '#blogs';
    window.dispatchEvent(new Event('hashchange'));
    window.dispatchEvent(new CustomEvent('gm-navigate', { detail: 'blogs' }));
  };

  return (
    <section className="gm-blogs-section" id="blogs" aria-label="Stories, Flavours & Insights">
      <div className="gm-blogs-inner">
        {/* Top Header Row: Heading and Subtitle on Left, Explore All Articles Button on Right */}
        <div className="gm-blogs-header">
          <div className="gm-blogs-header-left">
            <h2 className="gm-blogs-heading">STORIES, FLAVOURS &amp; INSIGHTS</h2>
            <p className="gm-blogs-subheading">
              Explore the world of Grand Master&apos;s through flavour guides, cocktail inspiration, and insights into our distinctive collection.
            </p>
          </div>
          <button
            type="button"
            className="gm-blogs-view-btn"
            id="view-all-insights-btn"
            onClick={handleViewAll}
            aria-label="Explore all articles"
          >
            <span>EXPLORE ALL ARTICLES</span>
            <span className="gm-blogs-arrow" aria-hidden="true">&rarr;</span>
          </button>
        </div>

        {/* 3-Column Grid */}
        <div className="gm-blogs-insights-grid">
          {displayedBlogs.map((blog) => (
            <BlogCard key={blog.id || blog.title} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}

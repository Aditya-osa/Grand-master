import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogs } from '../components/Blogs/Blogs';
import blogBannerImg from '../assets/daa4059b-45b0-48df-a1d7-8655210f3760.png';
import bannerVideo from '../assets/6a4659235173f72a046a6f90_6a5e3a721a51901c488abdee_banner video _mp4.mp4';
import './BlogPage.css';



export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === 'ALL' ||
      (blog.category && blog.category.toUpperCase() === selectedCategory);
    const matchesSearch =
      !searchQuery.trim() ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="gm-blog-page-wrapper" id="blogs-page">
      {/* Global Brand Navbar */}
      <Navbar />

      {/* ====================================================================
          HERO BANNER - Clean Video Presentation
          ==================================================================== */}
      <section className="gm-blog-banner" aria-label="Grand Master Journal & Insights">
        <div className="blog-banner-overlay" aria-hidden="true" />
        <video
          className="blog-banner-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={blogBannerImg}
        >
          <source src={bannerVideo} type="video/mp4" />
          <img
            src={blogBannerImg}
            alt="Grand Master Vodka Journal Experience"
            className="blog-banner-bg"
          />
        </video>
      </section>

      {/* ====================================================================
          MAIN CONTENT AREA - 2-COLUMN EDITORIAL GRID
          ==================================================================== */}
      <main className="gm-blog-main-content" role="main">
        {/* ====================================================================
            STORIES GRID (2-Column Layout)
            ==================================================================== */}
        <section className="gm-stories-grid-section" aria-label="Stories List">
          <div className="gm-stories-header">
            <h2 className="gm-stories-title">
              {selectedCategory === 'ALL' ? 'Featured Stories' : `${selectedCategory}`}
            </h2>
            <span className="gm-stories-count">
              {filteredBlogs.length} {filteredBlogs.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="gm-no-results">
              <i className="ri-file-search-line gm-no-results-icon" aria-hidden="true"></i>
              <h3>No articles found</h3>
              <p>We couldn't find any articles matching your search. Try different keywords or select All Stories.</p>
              <button
                type="button"
                className="gm-reset-filters-btn"
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="gm-stories-grid">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog.id || blog.title}
                  className="gm-story-card"
                  onClick={() => {
                    window.location.hash = `#blog-detail-${blog.id}`;
                    window.dispatchEvent(new Event('hashchange'));
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="gm-story-img-wrap">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="gm-story-img"
                      loading="lazy"
                    />
                    <span className="gm-story-tag">{blog.category}</span>
                  </div>
                  <div className="gm-story-body">
                    <div className="gm-story-meta">
                      <span className="gm-story-date">{blog.date}</span>
                      <span className="gm-meta-divider">•</span>
                      <span className="gm-story-time">{blog.readTime}</span>
                      {blog.byline && (
                        <>
                          <span className="gm-meta-divider">•</span>
                          <span className="gm-story-byline">{blog.byline}</span>
                        </>
                      )}
                    </div>
                    <h3 className="gm-story-title">{blog.title}</h3>
                    <p className="gm-story-excerpt">{blog.description}</p>
                    <div className="gm-story-footer">
                      <a
                        href={`#blog-detail-${blog.id}`}
                        className="gm-story-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.hash = `#blog-detail-${blog.id}`;
                          window.dispatchEvent(new Event('hashchange'));
                        }}
                      >
                        <span>Read Story</span>
                        <i className="ri-arrow-right-up-line" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
}

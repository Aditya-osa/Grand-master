import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogs } from '../components/Blogs/Blogs';
import { distillationImg } from '../assets/process';
import './BlogPage.css';

const CATEGORIES = [
  'ALL',
  'NEWS',
  'SPIRITS & CRAFT',
  'PURITY & WATER',
  'LIFESTYLE & TASTE'
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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

  const featuredBlog = blogs[0];
  const gridBlogs = selectedCategory === 'ALL' && !searchQuery.trim() 
    ? filteredBlogs.slice(1) 
    : filteredBlogs;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <div className="gm-blog-page-wrapper" id="blogs-page">
      {/* Global Brand Navbar with Home Styling */}
      <Navbar />

      {/* ====================================================================
          HERO BANNER
          ==================================================================== */}
      <section className="gm-blog-banner" aria-label="Grand Master Journal & Insights">
        <div className="blog-banner-overlay" aria-hidden="true" />
        <img
          src={distillationImg}
          alt="Grand Master Copper Stills"
          className="blog-banner-bg"
        />
        <div className="blog-banner-content">
          <span className="blog-banner-subtitle">THE DISTILLER'S CHRONICLES</span>
          <h1 className="blog-banner-title">JOURNAL & INSIGHTS</h1>
          <p className="blog-banner-desc">
            Explore tales of relentless craftsmanship, purity at the source, and contemporary spirit culture curated by Grand Master.
          </p>
        </div>
      </section>

      {/* ====================================================================
          MAIN CONTENT AREA
          ==================================================================== */}
      <main className="gm-blog-main-content" role="main">
        {/* Category Filters Bar & Search */}
        <div className="gm-blog-toolbar">
          <div className="gm-blog-categories" role="tablist" aria-label="Blog Categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`gm-category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'ALL' ? 'All Stories' : cat}
              </button>
            ))}
          </div>

          <div className="gm-blog-search-wrap">
            <i className="ri-search-line gm-search-icon" aria-hidden="true"></i>
            <input
              type="text"
              className="gm-blog-search-input"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search articles"
            />
            {searchQuery && (
              <button
                type="button"
                className="gm-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <i className="ri-close-circle-fill"></i>
              </button>
            )}
          </div>
        </div>

        {/* ====================================================================
            FEATURED HERO ARTICLE (Only shown on "ALL" with no search query)
            ==================================================================== */}
        {selectedCategory === 'ALL' && !searchQuery.trim() && featuredBlog && (
          <section className="gm-featured-story-section" aria-label="Featured Story">
            <article className="gm-featured-card">
              <div className="gm-featured-img-wrap">
                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className="gm-featured-img"
                  loading="lazy"
                />
                <span className="gm-featured-badge">FEATURED STORY</span>
              </div>
              <div className="gm-featured-info">
                <div className="gm-featured-meta">
                  <span className="gm-featured-tag">{featuredBlog.category}</span>
                  <span className="gm-meta-divider">•</span>
                  <span className="gm-featured-date">{featuredBlog.date}</span>
                  <span className="gm-meta-divider">•</span>
                  <span className="gm-featured-time">{featuredBlog.readTime}</span>
                </div>
                <h2 className="gm-featured-title">{featuredBlog.title}</h2>
                <p className="gm-featured-desc">{featuredBlog.description}</p>
                <a href="#blogs-page" className="gm-featured-read-link">
                  <span>Read Full Story</span>
                  <i className="ri-arrow-right-line" aria-hidden="true"></i>
                </a>
              </div>
            </article>
          </section>
        )}

        {/* ====================================================================
            STORIES GRID
            ==================================================================== */}
        <section className="gm-stories-grid-section" aria-label="Stories List">
          <div className="gm-stories-header">
            <h2 className="gm-stories-title">
              {selectedCategory === 'ALL' ? 'Latest Stories' : `${selectedCategory}`}
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
              {gridBlogs.map((blog) => (
                <article key={blog.id || blog.title} className="gm-story-card">
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
                    </div>
                    <h3 className="gm-story-title">{blog.title}</h3>
                    <p className="gm-story-excerpt">{blog.description}</p>
                    <div className="gm-story-footer">
                      <a href="#blogs-page" className="gm-story-link">
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

        {/* ====================================================================
            NEWSLETTER / SUBSCRIPTION CTA
            ==================================================================== */}
        <section className="gm-blog-newsletter-section" aria-labelledby="newsletter-heading">
          <div className="gm-newsletter-card">
            <div className="gm-newsletter-content">
              <span className="gm-newsletter-tag">EXCLUSIVE UPDATES</span>
              <h2 id="newsletter-heading" className="gm-newsletter-title">
                STAY IN THE KNOW
              </h2>
              <p className="gm-newsletter-desc">
                Subscribe to receive private invitations to limited batch reserve releases, cocktail masterclasses, and tasting notes from our cellar.
              </p>
            </div>

            <form className="gm-newsletter-form" onSubmit={handleSubscribe}>
              <div className="gm-newsletter-input-group">
                <input
                  type="email"
                  className="gm-newsletter-input"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" className="gm-newsletter-submit-btn">
                  <span>Subscribe</span>
                  <i className="ri-send-plane-fill" aria-hidden="true"></i>
                </button>
              </div>
              {subscribed && (
                <p className="gm-newsletter-success" role="status">
                  <i className="ri-checkbox-circle-fill"></i> Thank you for subscribing to Grand Master.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
}

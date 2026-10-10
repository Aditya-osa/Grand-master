import React, { useState } from 'react';
import './Blogs.css';
import blogImg1 from '../../assets/image copy.png';
import blogImg2 from '../../assets/image copy 2.png';
import blogImg3 from '../../assets/image.png';

export const blogs = [
  {
    id: 1,
    category: 'NEWS',
    title: "Grandmaster's Vodka keeps the doctor away!",
    description:
      'Crafted with relentless precision, Grand Master delivers an uncompromising standard of purity and character for celebratory moments.',
    image: blogImg1,
    date: 'October 2026',
    readTime: '4 min read',
    link: '#',
  },
  {
    id: 2,
    category: 'NEWS',
    title: 'All over the world eating and drinking.',
    description:
      'Continuous fractional distillation through tall copper columns purges impurities to capture only the crystal-clear spirit heart.',
    image: blogImg2,
    date: 'September 2026',
    readTime: '5 min read',
    link: '#',
  },
  {
    id: 3,
    category: 'NEWS',
    title: "Grand Master's Cranberry Vodka",
    description:
      'A refined fusion of sun-ripened botanicals and vibrant fruits, crafted to elevate celebratory moments with unmatched distinction.',
    image: blogImg3,
    date: 'August 2026',
    readTime: '6 min read',
    link: '#',
  },
  {
    id: 4,
    category: 'SPIRITS & CRAFT',
    title: 'The Art of Fractional Column Distillation',
    description:
      'Explore how continuous multi-column copper extraction purges harsh congeners, capturing only the crystal-clear spirit heart for an extraordinarily smooth finish.',
    image: '/Assets/7.png',
    date: 'July 2026',
    readTime: '4 min read',
    link: '#',
  },
  {
    id: 5,
    category: 'PURITY & WATER',
    title: 'Purity at the Source: Protecting Subterranean Springs',
    description:
      'Why mineral-calibrated subterranean spring water is the indispensable soul of Grand Master vodka, delivering unmatched softness with every pour.',
    image: '/Assets/Blue-berry.png',
    date: 'June 2026',
    readTime: '4 min read',
    link: '#',
  },
  {
    id: 6,
    category: 'LIFESTYLE & TASTE',
    title: 'Curating a Contemporary Spirit Experience',
    description:
      'Blending timeless distillation discipline with contemporary flavor discovery, creating vibrant moments crafted for the modern luxury connoisseur.',
    image: '/Assets/orange2.png',
    date: 'May 2026',
    readTime: '5 min read',
    link: '#',
  },
];

export function BlogCard({ blog }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="gm-insight-card">
      <div className="gm-insight-img-wrap">
        {blog.image && !imgError ? (
          <img
            src={blog.image}
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
    </article>
  );
}

export default function Blogs() {
  const [showAll, setShowAll] = useState(false);

  const displayedBlogs = showAll ? blogs : blogs.slice(0, 3);

  return (
    <section className="gm-blogs-section" id="blogs" aria-label="Blog and Insights">
      <div className="gm-blogs-inner">
        {/* Top Header Row: Heading on Left, View All Insights Button on Right */}
        <div className="gm-blogs-header">
          <h2 className="gm-blogs-heading">Blog and Insights</h2>
          <button
            type="button"
            className="gm-blogs-view-btn"
            id="view-all-insights-btn"
            onClick={() => setShowAll((prev) => !prev)}
            aria-label={showAll ? 'Show less insights' : 'View all insights'}
          >
            <span>{showAll ? 'Show Less' : 'View All Insights'}</span>
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
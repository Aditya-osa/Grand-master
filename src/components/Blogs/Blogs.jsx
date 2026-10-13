import React, { useState } from 'react';
import './Blogs.css';
import {
  bottlesMasterFruit,
  zestyLemonCocktail,
  drinkDifferentColors,
  tableSocialLounge,
  podiumBottlesStudio,
} from '../../assets/WhatsApp Unknown 2026-10-10 at 1.15.53 PM';
import productionBottling from '../../assets/image copy 3.png';

export const blogs = [
  {
    id: 1,
    category: 'FLAVOUR GUIDE',
    title: 'Vodka Flavours Explained: A Guide to Fruit, Citrus and Classic Profiles',
    description:
      'Understand classic and flavoured vodka profiles, from fruit and citrus notes to coffee and chocolate, with this neutral guide to tasting vocabulary.',
    image: bottlesMasterFruit,
    date: 'October 2026',
    readTime: '4 min read',
    byline: 'Grand Master Editorial',
    slug: '/vodka-flavours-guide/',
    seoTitle: 'Vodka Flavours Explained: A Guide to Fruit, Citrus and Classic Profiles',
    primaryKeyword: 'vodka flavours',
    metaDescription:
      'Understand classic and flavoured vodka profiles, from fruit and citrus notes to coffee and chocolate, with this neutral guide to tasting vocabulary.',
    internalLinks: [
      'https://www.grandmasters.co/flavours/',
      'https://www.grandmasters.co/',
      'https://www.grandmasters.co/blog/',
    ],
    link: '#',
  },
  {
    id: 2,
    category: 'FLAVOUR NOTES',
    title: 'Green Apple Flavour Notes: Understanding Crisp, Tart and Fruity Descriptions',
    description:
      'Learn what crisp, tart and fresh mean in green-apple flavour descriptions, and how to read product labels accurately.',
    image: zestyLemonCocktail,
    date: 'October 2026',
    readTime: '4 min read',
    byline: 'Grand Master Editorial',
    slug: '/green-apple-flavour-notes/',
    seoTitle: 'Green Apple Flavour Notes: Understanding Crisp, Tart and Fruity Descriptions',
    primaryKeyword: 'green apple vodka',
    metaDescription:
      'Learn what crisp, tart and fresh mean in green-apple flavour descriptions, and how to read product labels accurately.',
    internalLinks: [
      'https://www.grandmasters.co/flavours/',
      'https://www.grandmasters.co/blog/',
    ],
    link: '#',
  },
  {
    id: 3,
    category: 'FLAVOUR NOTES',
    title: 'Cranberry Flavour Notes: Tartness, Aroma and How to Read Labels',
    description:
      'A neutral guide to cranberry flavour vocabulary, common tasting descriptors and the product-label details readers should check.',
    image: drinkDifferentColors,
    date: 'September 2026',
    readTime: '4 min read',
    byline: 'Grand Master Editorial',
    slug: '/cranberry-flavour-notes-guide/',
    seoTitle: 'Cranberry Flavour Notes: Tartness, Aroma and How to Read Labels',
    primaryKeyword: 'cranberry vodka',
    metaDescription:
      'A neutral guide to cranberry flavour vocabulary, common tasting descriptors and the product-label details readers should check.',
    internalLinks: [
      'https://www.grandmasters.co/flavours/',
      'https://www.grandmasters.co/grand-masters-cranberry-vodka/',
      'https://www.grandmasters.co/blog/',
    ],
    link: '#',
  },
  {
    id: 4,
    category: 'CITRUS & TASTING',
    title: 'Orange and Citrus Flavours: A Practical Guide to Common Tasting Terms',
    description:
      'Explore common citrus tasting terms such as zesty, peel-like and bright, plus tips for interpreting flavoured-spirit labels.',
    image: tableSocialLounge,
    date: 'September 2026',
    readTime: '4 min read',
    byline: 'Grand Master Editorial',
    slug: '/orange-citrus-flavour-guide/',
    seoTitle: 'Orange and Citrus Flavours: A Practical Guide to Common Tasting Terms',
    primaryKeyword: 'orange flavoured vodka',
    metaDescription:
      'Explore common citrus tasting terms such as zesty, peel-like and bright, plus tips for interpreting flavoured-spirit labels.',
    internalLinks: [
      'https://www.grandmasters.co/flavours/',
      'https://www.grandmasters.co/',
    ],
    link: '#',
  },
  {
    id: 5,
    category: 'SPECIALTY PROFILES',
    title: 'Coffee and Chocolate Flavour Profiles: Aroma Words Explained',
    description:
      'Learn how coffee- and chocolate-inspired flavour descriptions use aroma, roast, cocoa and sweetness terminology.',
    image: podiumBottlesStudio,
    date: 'August 2026',
    readTime: '4 min read',
    byline: 'Grand Master Editorial',
    slug: '/coffee-chocolate-flavour-profiles/',
    seoTitle: 'Coffee and Chocolate Flavour Profiles: Aroma Words Explained',
    primaryKeyword: 'coffee flavoured vodka',
    metaDescription:
      'Learn how coffee- and chocolate-inspired flavour descriptions use aroma, roast, cocoa and sweetness terminology.',
    internalLinks: [
      'https://www.grandmasters.co/flavours/',
      'https://www.grandmasters.co/',
    ],
    link: '#',
  },
  {
    id: 6,
    category: 'PRODUCTION & CRAFT',
    title: 'How Vodka Is Made: Grains, Fermentation, Distillation and Filtration',
    description:
      'Understand the main stages commonly used in vodka production, from raw materials and fermentation to distillation, filtration and bottling.',
    image: productionBottling,
    date: 'August 2026',
    readTime: '5 min read',
    byline: 'Master Distiller',
    slug: '/how-vodka-is-made/',
    seoTitle: 'How Vodka Is Made: Grains, Fermentation, Distillation and Filtration',
    primaryKeyword: 'how vodka is made',
    metaDescription:
      'Understand the main stages commonly used in vodka production, from raw materials and fermentation to distillation, filtration and bottling.',
    internalLinks: [
      'https://www.grandmasters.co/',
      'https://www.grandmasters.co/flavours/',
    ],
    link: '#',
  },
];

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
    <section className="gm-blogs-section" id="blogs" aria-label="Blog and Insights">
      <div className="gm-blogs-inner">
        {/* Top Header Row: Heading on Left, View All Insights Button on Right */}
        <div className="gm-blogs-header">
          <h2 className="gm-blogs-heading">Blog and Insights</h2>
          <button
            type="button"
            className="gm-blogs-view-btn"
            id="view-all-insights-btn"
            onClick={handleViewAll}
            aria-label="View all insights"
          >
            <span>View All Insights</span>
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
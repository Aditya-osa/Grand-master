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
    category: 'MIXOLOGY & COCKTAILS',
    title: 'The Golden Hour Spritz: A Masterclass in Citrus Mixology',
    description:
      'Shaken over crystal ice, garnished with fresh mint sprigs, and topped with artisanal tonic. Inside our signature serve featuring Grand Master Zesty Lemon Platinum Vodka.',
    image: zestyLemonCocktail,
    date: 'October 2026',
    readTime: '3 min read',
    byline: 'Grand Master Mixology Lab',
    link: '#',
  },
  {
    id: 2,
    category: 'FLAVOUR CRAFT',
    title: 'From Fresh Orchard to Copper Pot: The Anatomy of Real Infusions',
    description:
      'Crisp green apple, sun-ripened strawberry, Alphonso mango, honeydew melon, and zesty lemon. Exploring how real fruit character elevates each platinum distillation run.',
    image: bottlesMasterFruit,
    date: 'October 2026',
    readTime: '4 min read',
    byline: 'House of Deejay Distillers',
    link: '#',
  },
  {
    id: 3,
    category: 'CULTURE & CELEBRATIONS',
    title: 'Drink A Little Different: Challenging the Ordinary Vodka Standard',
    description:
      'Vodka was never meant to be muted. Why Grand Master is championing vibrant palettes, bold flavor experimentation, and fearless celebration.',
    image: drinkDifferentColors,
    date: 'September 2026',
    readTime: '5 min read',
    byline: 'The Editorial Desk',
    link: '#',
  },
  {
    id: 4,
    category: 'CULTURE & CELEBRATIONS',
    title: 'After Dark: How Flavour-Forward Spirits Transform the Social Table',
    description:
      'From chilled coconut to bold mixberry, discovering how distinct flavour profiles are redefining table service, spirited pairings, and shared celebrations.',
    image: tableSocialLounge,
    date: 'September 2026',
    readTime: '4 min read',
    byline: 'Grand Master Editorial',
    link: '#',
  },
  {
    id: 5,
    category: 'BEHIND THE BOTTLE',
    title: 'Sculpted for Distinction: The Story Behind Our Undulating Waves',
    description:
      'Every curve reflects a wave of flavor. An inside look at the tactile design philosophy, radiant colourways, and bespoke bottle architecture of Grand Master.',
    image: podiumBottlesStudio,
    date: 'August 2026',
    readTime: '4 min read',
    byline: 'Brand Design Atelier',
    link: '#',
  },
  {
    id: 6,
    category: 'BEHIND THE BOTTLE',
    title: 'Crafted at House of Deejay: Continuous Purity on the Bottling Line',
    description:
      'Inside our active distillery floor. Continuous fractional distillation purges harsh congeners, sealing pure platinum character into every single bottle.',
    image: productionBottling,
    date: 'August 2026',
    readTime: '5 min read',
    byline: 'Master Distiller',
    link: '#',
  },
];

export function BlogCard({ blog }) {
  const [imgError, setImgError] = useState(false);

  const handleCardClick = () => {
    window.location.hash = '#blogs';
    window.dispatchEvent(new Event('hashchange'));
    window.dispatchEvent(new CustomEvent('gm-navigate', { detail: 'blogs' }));
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
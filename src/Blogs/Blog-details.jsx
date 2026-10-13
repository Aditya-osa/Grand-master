import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogs } from '../components/Blogs/Blogs';
import './Blog-details.css';

// Editorial content for each article with volume, quotes, and degustation notes removed for a cleaner reading experience
export const BLOG_EXTENDED_CONTENT = {
  1: {
    subtitle:
      'Inside our signature sunset serve featuring Grand Master Zesty Lemon Vodka, cold-infused Mediterranean citrus oils, and crisp effervescent botanicals.',
    intro:
      'The golden hour is more than just a fleeting window of afternoon light—it is a sensory ritual. Crafted to capture the transition from sunlit afternoons to electric evenings, The Golden Hour Spritz showcases the bright, aromatic Mediterranean citrus profile of Grand Master Zesty Lemon Platinum Vodka.',
    tags: ['Mixology', 'Zesty Lemon', 'Cocktail Recipes', 'Summer Serve'],
    author: 'Grand Master Mixology Atelier',
    date: 'October 14, 2026',
    readTime: '4 min read',
    sections: [
      {
        heading: 'The Alchemy of Pure Citrus',
        paragraphs: [
          'Unlike conventional flavoured spirits that rely on heavy syrups and artificial essences, Grand Master Zesty Lemon is cold-infused with real lemon peel botanical oils. The result is a vibrant, sparkling citrus aroma that blossoms the moment it touches crystal ice, without a trace of cloying sweetness.',
          'Temperature management is the secret to an extraordinary spritz. Always chill your glassware in advance and use dense, hand-cut clear ice rocks to prevent premature dilution while sipping.',
        ],
      },
      {
        heading: 'The Master Serve Formulation',
        paragraphs: [
          'To prepare the signature serve at home or behind a professional bar, gather the following hand-selected ingredients and chilled mixers:',
        ],
        ingredients: [
          '60 ml Grand Master Zesty Lemon Platinum Vodka',
          '30 ml Freshly strained Meyer lemon juice',
          '20 ml Artisanal elderflower cordial or simple syrup',
          '90 ml Dry sparkling Indian tonic or mineral club soda',
          'Garnish: Fresh garden mint sprig & flamed lemon peel twist',
        ],
      },
      {
        heading: 'Method & Service Technique',
        paragraphs: [
          'Follow these barcraft steps to assemble the cocktail with proper aromatic release and effervescence:',
        ],
        steps: [
          'Fill a chilled crystal balloon glass or stemmed wine glass with dense ice rocks.',
          'Pour Grand Master Zesty Lemon, strained lemon juice, and elderflower cordial directly over ice.',
          'Gently roll with a teardrop bar spoon for ten seconds to chill without diluting volatile oils.',
          'Slowly top with sparkling tonic water along the spiral of the spoon to preserve effervescence.',
          'Express lemon peel oils over the surface, slap the mint sprig to release aromatics, and float as garnish.',
        ],
      },
    ],
  },
  2: {
    subtitle:
      'Exploring how hand-selected orchard fruits, cold maceration, and fractional distillation preserve pure botanical character in every distillation run.',
    intro:
      'At House of Deejay Distillers, our philosophy rejects the shortcut of synthetic food flavorings. Every bottle in the Grand Master collection begins with hand-selected, orchard-grown fruits distilled alongside pure grain spirits.',
    tags: ['Flavour Craft', 'Distillation', 'Real Fruit', 'House of Deejay'],
    author: 'House of Deejay Distillers',
    date: 'October 10, 2026',
    readTime: '5 min read',
    sections: [
      {
        heading: 'From Orchard Harvesting to Distillation Floors',
        paragraphs: [
          'Whether it is the tart juiciness of field cranberries, the lush fragrance of Alphonso mangoes, or the crisp bite of green apples, timing is critical. Fruits are cold-pressed at the precise peak of their sugar-to-acid ratio to preserve delicate volatile aromatics that high-heat industrial processes destroy.',
        ],
        bullets: [
          'Green Apples: Hand-picked Granny Smith apples cold-pressed within 24 hours of harvest.',
          'Field Cranberries: Northern bog berries selected for vibrant tart acidity and deep crimson hues.',
          'Wild Blueberries: Small mountain berries prized for their intense floral aromatics.',
          'Honeydew Melon: Ripe melons gently macerated to capture dewy, refreshing sweetness.',
        ],
      },
      {
        heading: 'Continuous Fractional Rectification',
        paragraphs: [
          'Our continuous multi-column rectification columns strip away harsh congeners and fusel alcohols, leaving behind a 96% pure platinum spirit. When blended with pure mountain-filtered water and infused with fruit essences, the vodka retains absolute crystal clarity while delivering opulent flavor.',
          'Every batch is tested via gas chromatography and evaluated by our sensory panel before bottling, guaranteeing that what reaches your glass is pure platinum spirit with zero throat burn.',
        ],
      },
    ],
  },
  3: {
    subtitle:
      'Vodka was never meant to be silent. Why Grand Master is championing vibrant palettes, bold flavor experimentation, and fearless celebration.',
    intro:
      'For decades, standard vodka marketing insisted that the best vodka was the one with the least personality. It was marketed as invisible, silent, and strictly functional. Grand Master was born out of a desire to challenge that outdated orthodoxy.',
    tags: ['Culture', 'Drink Different', 'Modern Spirits', 'Celebration'],
    author: 'The Editorial Desk',
    date: 'September 28, 2026',
    readTime: '5 min read',
    sections: [
      {
        heading: 'The Death of Neutrality',
        paragraphs: [
          'The modern generation of cocktail enthusiasts and spirit lovers does not celebrate boring drinks. Today’s consumers demand expressive aromatics, fearless visual vibrancy, and drinks that spark conversation across social tables.',
          'By introducing bold chromatic bottles with undulating waves and sophisticated fruit infusions, Grand Master turned every bottle into an invitation to live loud, celebrate uninhibitedly, and Drink A Little Different.',
        ],
      },
      {
        heading: 'A Cultural Shift in Social Lounges',
        paragraphs: [
          'From rooftop sunset sessions to high-energy late-night lounges, Grand Master represents confidence, authenticity, and unapologetic self-expression.',
        ],
        bullets: [
          'Bold chromatic bottles that catch ambient lighting and refract vivid colors.',
          'Tactile undulating glass waves engineered for both balance and distinction.',
          'Complex natural infusions engineered to be enjoyed neat, on rocks, or mixed.',
        ],
      },
    ],
  },
  4: {
    subtitle:
      'From interactive tableside tasting flights to late-night pours, discovering how distinct flavour profiles are redefining nightlife hospitality.',
    intro:
      'Nightlife is evolving from high-volume routine to curated sensory journeys. Across premier lounges and private club tables, Grand Master flavoured vodkas are transforming traditional table service into interactive mixology hubs.',
    tags: ['Hospitality', 'Nightlife', 'Tableside Flights', 'Culinary Pairings'],
    author: 'Grand Master Hospitality Desk',
    date: 'September 18, 2026',
    readTime: '4 min read',
    sections: [
      {
        heading: 'The Interactive Table Experience',
        paragraphs: [
          'Instead of standard generic mixers, modern hosts are presenting flights of chilled Grand Master bottles—Blueberry, Melon, and Blue Curacao—accompanied by fresh botanical garnishes and artisanal sparkling sodas, allowing guests to tailor their own serves.',
        ],
      },
      {
        heading: 'Pairing Spirits with Modern Gastronomy',
        paragraphs: [
          'Spirits are increasingly enjoyed alongside curated culinary courses across contemporary lounges:',
        ],
        bullets: [
          'Melon & Blueberry: Clean complements to spicy Southeast Asian skewers and glazed duck.',
          'Zesty Lemon: Cuts cleanly through rich artisanal cheese and charcuterie boards.',
          'Green Apple: An exceptional companion to fresh sushi, ceviche, and crisp salads.',
        ],
      },
    ],
  },
  5: {
    subtitle:
      'An inside look at the ergonomic glassware architecture, tactile ridges, and platinum crown seal behind Grand Master bottles.',
    intro:
      'Before a spirit touches your lips, it first engages your eyes and your hands. The Grand Master bottle is an intentional piece of sculpture—engineered to feel substantial, balanced, and instantly unmistakable on any back bar in the world.',
    tags: ['Bottle Design', 'Glassware', 'Ergonomics', 'Craft'],
    author: 'Brand Design Atelier',
    date: 'August 30, 2026',
    readTime: '4 min read',
    sections: [
      {
        heading: 'The Undulating Wave Motif',
        paragraphs: [
          'The distinctive ribbon waves wrapped around each bottle are not merely decorative. They symbolize the continuous flow of fractional distillation and the ripple of bold fruit flavor. Under back-bar illumination, the raised glass ridges refract light through the liquid, creating an alluring kinetic glow.',
        ],
      },
      {
        heading: 'Weight, Balance, and Bartender Grip',
        paragraphs: [
          'Designed in collaboration with ergonomic glassware artisans, the neck length and bottle balance are calibrated specifically for precise free-pouring during busy bar shifts.',
        ],
        bullets: [
          'Calibrated neck length for clean free-pouring during high-volume bar shifts.',
          'Weighted solid glass pedestal base for maximum stability on crowded tables.',
          'Embossed platinum crest seal reinforcing strict standards of purity and polish.',
        ],
      },
    ],
  },
  6: {
    subtitle:
      'Inside our active distillery floor: fractional multi-column rectification, sub-zero chill filtration, and the quality testing protocol.',
    intro:
      'Behind every bottle of Grand Master lies an uncompromising technological infrastructure. Located at House of Deejay Distillers, our modern multi-column distillation towers operate with surgical precision.',
    tags: ['Distillery', 'Purity Protocol', 'Fractional Column', 'House of Deejay'],
    author: 'Master Distiller',
    date: 'August 14, 2026',
    readTime: '5 min read',
    sections: [
      {
        heading: 'Continuous Fractional Rectification',
        paragraphs: [
          'Traditional pot stills leave behind trace congeners that can cause harsh ethanol bite. Our multi-stage continuous fractionating columns separate heads, hearts, and tails with microscopic thermal accuracy, capturing only the purest heart of the distillate.',
        ],
      },
      {
        heading: 'Sub-Zero Polish & Birch Charcoal Filtration',
        paragraphs: [
          'Prior to bottling, the liquid undergoes proprietary sub-zero chill filtration followed by a pass through activated birch charcoal matrix beds. This process polishes the spirit to a state of absolute clarity, resulting in an exceptionally silky mouthfeel.',
        ],
        bullets: [
          'Sub-zero chill stabilization to freeze out micro-impurities.',
          'Gravity filtration through an activated birch charcoal matrix for silky texture.',
          'Comprehensive gas chromatography testing on every batch prior to bottling.',
        ],
      },
    ],
  },
};

export default function BlogDetails({ blogId: propBlogId, onBack, onSelectBlog }) {
  const [copied, setCopied] = useState(false);

  // Extract ID from prop or URL hash
  const activeId = useMemo(() => {
    if (propBlogId) return Number(propBlogId);
    const hash = (window.location.hash || '').toLowerCase();
    if (hash.startsWith('#blog-detail-')) {
      const parsed = parseInt(hash.replace('#blog-detail-', ''), 10);
      if (!isNaN(parsed)) return parsed;
    }
    if (hash.startsWith('#blog-')) {
      const parsed = parseInt(hash.replace('#blog-', ''), 10);
      if (!isNaN(parsed)) return parsed;
    }
    return 1;
  }, [propBlogId]);

  // Find active blog or fallback to first
  const blog = useMemo(() => {
    return blogs.find((b) => b.id === activeId) || blogs[0];
  }, [activeId]);

  // Extended article data
  const articleData = BLOG_EXTENDED_CONTENT[blog.id] || BLOG_EXTENDED_CONTENT[1];

  // 3 Related Articles for clean minimal preview
  const relatedBlogs = useMemo(() => {
    return blogs.filter((b) => b.id !== blog.id).slice(0, 3);
  }, [blog.id]);

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCopied(false);
  }, [blog.id]);

  const handleBackToBlog = (e) => {
    if (e) e.preventDefault();
    if (typeof onBack === 'function') {
      onBack();
    } else {
      window.location.hash = '#blogs';
      window.dispatchEvent(new Event('hashchange'));
    }
  };

  const handleSelectRelated = (id) => {
    if (typeof onSelectBlog === 'function') {
      onSelectBlog(id);
    } else {
      window.location.hash = `#blog-detail-${id}`;
      window.dispatchEvent(new Event('hashchange'));
    }
  };

  const handleNavigateHome = (e) => {
    if (e) e.preventDefault();
    window.location.hash = '#home';
    window.dispatchEvent(new Event('hashchange'));
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <div className="gm-single-blog-wrapper" id="single-blog-page">
      {/* Global Brand Navbar */}
      <Navbar />

      <main className="gm-single-blog-main" role="main">
        {/* ====================================================================
            1. BREADCRUMB & TOP BACK TO BLOG LINK
            Home / Blog / Article Title
            ==================================================================== */}
        <section className="gm-blog-top-bar" aria-label="Breadcrumb navigation">
          <div className="gm-blog-reading-container">
            <div className="gm-blog-top-bar-inner">
              <nav className="gm-blog-breadcrumb" aria-label="Breadcrumb">
                <a href="#home" onClick={handleNavigateHome} className="breadcrumb-link">
                  Home
                </a>
                <span className="breadcrumb-sep">/</span>
                <a href="#blogs" onClick={handleBackToBlog} className="breadcrumb-link">
                  Blog
                </a>
                <span className="breadcrumb-sep">/</span>
                <span className="breadcrumb-current" aria-current="page">
                  {blog.title}
                </span>
              </nav>

              <a
                href="#blogs"
                onClick={handleBackToBlog}
                className="gm-back-to-blog-link"
                aria-label="Back to Blog"
              >
                <span className="back-arrow" aria-hidden="true">←</span>
                <span>Back to Blog</span>
              </a>
            </div>
          </div>
        </section>

        {/* ====================================================================
            2. ARTICLE HEADER
            Small category label, large editorial title, short excerpt, byline
            ==================================================================== */}
        <header className="gm-article-header">
          <div className="gm-blog-reading-container">
            <span className="gm-article-category-label">{blog.category}</span>

            <h1 className="gm-article-editorial-title">{blog.title}</h1>

            <p className="gm-article-short-excerpt">{articleData.subtitle}</p>

            <div className="gm-article-byline-strip">
              <span className="byline-author">
                By {articleData.author || blog.byline || 'Grand Master Editorial'}
              </span>
              <span className="byline-divider">•</span>
              <time className="byline-date">{articleData.date || blog.date}</time>
              <span className="byline-divider">•</span>
              <span className="byline-read-time">{articleData.readTime || blog.readTime}</span>
            </div>
          </div>
        </header>

        {/* ====================================================================
            3. FEATURED IMAGE
            One large image with natural proportions & clean spacing
            ==================================================================== */}
        <section className="gm-article-featured-image-section" aria-label="Featured photography">
          <div className="gm-blog-reading-container">
            <figure className="gm-featured-figure">
              <img
                src={blog.image}
                alt={blog.title}
                className="gm-featured-img"
                loading="eager"
              />
              <figcaption className="gm-featured-caption">
                Photograph from House of Deejay Distillers archive.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ====================================================================
            4. ARTICLE BODY
            Readable paragraphs, elegant H2/H3 headings, bullet lists
            (Volume, promotional quotes, and degustation notes removed)
            ==================================================================== */}
        <article className="gm-article-content-body" aria-label="Article text">
          <div className="gm-blog-reading-container">
            {/* Opening Intro Paragraph */}
            {articleData.intro && (
              <p className="article-lead">{articleData.intro}</p>
            )}

            {/* Sections */}
            {articleData.sections &&
              articleData.sections.map((section, idx) => (
                <section key={idx} className="article-section-block">
                  <h2>{section.heading}</h2>

                  {section.paragraphs &&
                    section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}

                  {/* Ingredients List */}
                  {section.ingredients && (
                    <ul className="article-ingredients-list">
                      {section.ingredients.map((ing, iIdx) => (
                        <li key={iIdx}>{ing}</li>
                      ))}
                    </ul>
                  )}

                  {/* Bullet Points */}
                  {section.bullets && (
                    <ul className="article-bullets-list">
                      {section.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {/* Step-by-Step Instructions */}
                  {section.steps && (
                    <ol className="article-steps-list">
                      {section.steps.map((step, sIdx) => (
                        <li key={sIdx}>{step}</li>
                      ))}
                    </ol>
                  )}
                </section>
              ))}
          </div>
        </article>

        {/* ====================================================================
            5. ARTICLE FOOTER
            Subtle divider, relevant tags, simple social sharing icons
            ==================================================================== */}
        <footer className="gm-article-footer-section">
          <div className="gm-blog-reading-container">
            <div className="gm-article-footer-inner">
              {/* Relevant Tags */}
              <div className="gm-article-tags-wrap">
                <span className="tags-label">Tags:</span>
                <div className="gm-tags-list">
                  {articleData.tags.map((tag, idx) => (
                    <span key={idx} className="gm-tag-item">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Simple Social Sharing Icons */}
              <div className="gm-article-share-wrap">
                <span className="share-label">Share:</span>
                <div className="gm-share-icons-group">
                  <button
                    type="button"
                    className={`gm-share-icon-btn ${copied ? 'copied' : ''}`}
                    onClick={handleCopyLink}
                    aria-label="Copy article link"
                    title={copied ? 'Link Copied!' : 'Copy Link'}
                  >
                    <i className={copied ? 'ri-check-line' : 'ri-link'} aria-hidden="true"></i>
                  </button>

                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      blog.title
                    )}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gm-share-icon-btn"
                    aria-label="Share on X"
                    title="Share on X"
                  >
                    <i className="ri-twitter-x-line" aria-hidden="true"></i>
                  </a>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `${blog.title} - ${window.location.href}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gm-share-icon-btn"
                    aria-label="Share on WhatsApp"
                    title="Share on WhatsApp"
                  >
                    <i className="ri-whatsapp-line" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Back to Blog Link */}
            <div className="gm-bottom-back-row">
              <a
                href="#blogs"
                onClick={handleBackToBlog}
                className="gm-back-to-blog-link"
                aria-label="Back to all articles"
              >
                <span className="back-arrow" aria-hidden="true">←</span>
                <span>Back to all articles</span>
              </a>
            </div>
          </div>
        </footer>

        {/* ====================================================================
            6. RELATED BLOGS
            Display 2–3 related article previews using clean, minimal layout
            ==================================================================== */}
        <section className="gm-related-blogs-section" aria-label="Related articles">
          <div className="gm-blog-reading-container">
            <div className="gm-related-blogs-header">
              <h2 className="gm-related-blogs-title">Related Articles</h2>
              <p className="gm-related-blogs-subtitle">More stories from the Grand Master journal</p>
            </div>

            <div className="gm-related-blogs-grid">
              {relatedBlogs.map((rel) => (
                <article
                  key={rel.id}
                  className="gm-related-blog-card"
                  onClick={() => handleSelectRelated(rel.id)}
                >
                  <div className="gm-related-thumb-frame">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="gm-related-thumb-img"
                      loading="lazy"
                    />
                  </div>

                  <div className="gm-related-blog-details">
                    <span className="gm-related-cat-label">{rel.category}</span>
                    <h3 className="gm-related-blog-title">{rel.title}</h3>
                    <div className="gm-related-blog-meta">
                      <span>{rel.date}</span>
                      <span className="meta-dot">•</span>
                      <span>{rel.readTime}</span>
                    </div>

                    <a
                      href={`#blog-detail-${rel.id}`}
                      className="gm-related-read-more-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectRelated(rel.id);
                      }}
                    >
                      <span>Read More</span>
                      <span className="read-more-arrow" aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
}

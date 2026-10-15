import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogs } from '../components/Blogs/Blogs';
import './Blog-details.css';

// Editorial content for each article extracted faithfully from the Grand Master SEO blog drafts PDF
export const BLOG_EXTENDED_CONTENT = {
  1: {
    subtitle:
      'Understand classic and flavoured vodka profiles, from fruit and citrus notes to coffee and chocolate, with this neutral guide to tasting vocabulary.',
    intro:
      'Vodka is often described as a neutral spirit, but products can differ in aroma, texture and flavour. Flavoured varieties add another layer, ranging from fruit-inspired notes to dessert-style or botanical profiles. Knowing the vocabulary makes product descriptions easier to understand and helps readers compare styles without relying on vague claims.',
    tags: ['Vodka Flavours', 'Fruit & Citrus', 'Classic Profiles', 'Tasting Vocabulary', 'Sensory Guide'],
    author: 'Grand Master Editorial',
    date: 'October 2026',
    readTime: '4 min read',
    primaryKeyword: 'vodka flavours',
    seoTitle: 'Vodka Flavours Explained: A Guide to Fruit, Citrus and Classic Profiles',
    suggestedSlug: '/vodka-flavours-guide/',
    internalLinks: [
      { text: 'Grand Master Flavours', url: 'https://www.grandmasters.co/flavours/' },
      { text: 'Grand Master Official Home', url: 'https://www.grandmasters.co/' },
      { text: 'Grand Master Journal & Blog', url: 'https://www.grandmasters.co/blog/' },
    ],
    sections: [
      {
        heading: 'What does “classic” vodka mean?',
        paragraphs: [
          'A classic or plain vodka is generally intended to have a relatively restrained aroma and flavour. Depending on the product and production method, people may notice subtle cereal, mineral or peppery notes. Descriptions such as “clean” or “neutral” are tasting terms, not guarantees that a spirit is safer or healthier.',
        ],
      },
      {
        heading: 'Fruit and citrus profiles',
        paragraphs: [
          'Fruit-flavoured varieties may draw on familiar flavour cues such as cranberry, mango, green apple, orange, watermelon or mixed berries. Citrus profiles are often described as bright or zesty, while berry profiles may be characterised as tart, sweet-smelling or jammy. Actual flavour depends on the product, so use the producer’s verified tasting notes rather than assuming all products taste alike.',
        ],
      },
      {
        heading: 'Dessert-inspired and unusual profiles',
        paragraphs: [
          'Chocolate, coffee or cinnamon-inspired profiles use familiar aroma references. These terms describe flavour direction; they do not necessarily mean the product contains the food itself. Check the label and product information for accurate ingredient and allergen details.',
        ],
      },
      {
        heading: 'How to read a flavour description',
        paragraphs: [
          'Look for the specific flavour named on the label, the alcohol-by-volume (ABV) statement, bottle size, producer information and any legally required warnings. “Natural,” “premium,” “smooth” and similar terms should not be treated as proof of a measurable quality unless the producer can substantiate the claim.',
        ],
      },
      {
        heading: 'Explore the range',
        paragraphs: [
          'Grand Master’s lists multiple flavoured and plain vodka varieties on its Flavours page. Availability can differ by location and is subject to local law. Consult the official product information for the current range rather than relying on an old article or third-party listing.',
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'A useful flavour guide explains sensory vocabulary clearly and avoids health promises. For factual product details, refer to the current label and the producer’s official flavour listing. Alcohol is for adults of legal drinking age only; do not drink and drive.',
        ],
      },
      {
        heading: 'Suggested SEO Implementation',
        paragraphs: [
          'Use the primary keyword naturally in the page title, opening paragraph and one relevant subheading where appropriate. Link to the official Flavours page and one closely related article. Add a descriptive image alt text that accurately describes the image. Before publishing, confirm all product claims against current labels and obtain compliance approval.',
        ],
      },
    ],
  },
  2: {
    subtitle:
      'Learn what crisp, tart and fresh mean in green-apple flavour descriptions, and how to read product labels accurately.',
    intro:
      'Green apple is a familiar flavour reference because it can suggest a combination of fresh fruit aroma, gentle sweetness and tartness. On a product page, the phrase “green apple” is a flavour cue—not a promise that every brand will taste identical.',
    tags: ['Green Apple Vodka', 'Flavour Notes', 'Crisp & Tart', 'Tasting Descriptors', 'Label Reading'],
    author: 'Grand Master Editorial',
    date: 'October 2026',
    readTime: '4 min read',
    primaryKeyword: 'green apple vodka',
    seoTitle: 'Green Apple Flavour Notes: Understanding Crisp, Tart and Fruity Descriptions',
    suggestedSlug: '/green-apple-flavour-notes/',
    internalLinks: [
      { text: 'Grand Master Flavours', url: 'https://www.grandmasters.co/flavours/' },
      { text: 'Grand Master Journal & Blog', url: 'https://www.grandmasters.co/blog/' },
    ],
    sections: [
      {
        heading: 'What does “crisp” mean?',
        paragraphs: [
          'In tasting language, “crisp” usually describes a clean, bright impression rather than a literal physical quality. “Tart” refers to a sharp, sour-like flavour impression, while “fresh” commonly describes an aroma associated with recently cut fruit. These are descriptive terms and can vary from person to person.',
        ],
      },
      {
        heading: 'Green apple versus other fruit profiles',
        paragraphs: [
          'Compared with berry-inspired descriptions, green apple is often associated with a sharper fruit impression. Mango is commonly described as fuller and tropical; orange suggests citrus; cranberry is frequently described as tart. These are general sensory associations, not fixed rules or a guarantee of a particular product’s profile.',
        ],
      },
      {
        heading: 'How flavour is presented on a label',
        paragraphs: [
          'Read the full product name and label. A flavour name does not, by itself, establish the exact ingredients or amount of fruit used. For ingredient, allergen and production details, consult the manufacturer’s verified information and the package label.',
        ],
      },
      {
        heading: 'A note on responsible communication',
        paragraphs: [
          'A flavour description should never imply that a beverage is healthy, improves performance or makes a person more confident. Alcohol carries health and safety risks, and flavour does not change that. Content should be intended for adults of legal drinking age and comply with applicable advertising rules.',
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'Green apple flavour language is most useful when it is specific and honest. Use verified product information for exact claims, and treat sensory words as descriptive guidance rather than objective guarantees.',
        ],
      },
      {
        heading: 'Suggested SEO Implementation',
        paragraphs: [
          'Use the primary keyword naturally in the page title, opening paragraph and one relevant subheading where appropriate. Link to the official Flavours page and one closely related article. Add a descriptive image alt text that accurately describes the image. Before publishing, confirm all product claims against current labels and obtain compliance approval.',
        ],
      },
    ],
  },
  3: {
    subtitle:
      'A neutral guide to cranberry flavour vocabulary, common tasting descriptors and the product-label details readers should check.',
    intro:
      'Cranberry is commonly associated with a tart, berry-like flavour and a vivid red fruit reference. In beverage descriptions, it can signal a sharper profile than sweeter berry notes. The exact aroma and taste depend on the product formulation and should be confirmed from its label or verified product information.',
    tags: ['Cranberry Vodka', 'Tartness & Aroma', 'Berry Profiles', 'Label Guide', 'Sensory Language'],
    author: 'Grand Master Editorial',
    date: 'September 2026',
    readTime: '4 min read',
    primaryKeyword: 'cranberry vodka',
    seoTitle: 'Cranberry Flavour Notes: Tartness, Aroma and How to Read Labels',
    suggestedSlug: '/cranberry-flavour-notes-guide/',
    internalLinks: [
      { text: 'Grand Master Flavours', url: 'https://www.grandmasters.co/flavours/' },
      { text: 'Grand Master Cranberry Vodka', url: 'https://www.grandmasters.co/grand-masters-cranberry-vodka/' },
      { text: 'Grand Master Journal & Blog', url: 'https://www.grandmasters.co/blog/' },
    ],
    sections: [
      {
        heading: 'Understanding tart, sweet and fruity',
        paragraphs: [
          'Tartness is a sensory impression associated with acidity. Sweetness describes a different taste dimension, while “fruity” refers to aroma or flavour reminiscent of fruit. A product can be described as fruity and tart at the same time; one word does not determine the whole profile.',
        ],
      },
      {
        heading: 'Cranberry compared with mixed berries',
        paragraphs: [
          'Cranberry descriptions often emphasise sharpness, while mixed-berry descriptions may suggest a broader blend of berry-like aromas. These are broad conventions, not universal definitions. Do not assume a product contains a particular fruit unless the ingredient list or producer confirms it.',
        ],
      },
      {
        heading: 'What to check on the bottle',
        paragraphs: [
          'Review the product name, ABV, net quantity, manufacturer details and statutory warnings. Do not infer nutritional, medical or safety benefits from a fruit flavour name. If ingredient or allergen details matter, check the package and ask the manufacturer for clarification.',
        ],
      },
      {
        heading: 'Responsible content and product accuracy',
        paragraphs: [
          'Keep flavour descriptions factual and avoid claims that alcohol reduces stress, improves health or leads to social success. Ensure any public-facing material follows applicable Indian law and platform policies. Availability and permitted sale vary by state.',
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'Cranberry is a useful example of how flavour vocabulary helps people interpret a product description. For the precise characteristics of a particular bottle, use verified product details rather than generalisations.',
        ],
      },
      {
        heading: 'Suggested SEO Implementation',
        paragraphs: [
          'Use the primary keyword naturally in the page title, opening paragraph and one relevant subheading where appropriate. Link to the official Flavours page and one closely related article. Add a descriptive image alt text that accurately describes the image. Before publishing, confirm all product claims against current labels and obtain compliance approval.',
        ],
      },
    ],
  },
  4: {
    subtitle:
      'Explore common citrus tasting terms such as zesty, peel-like and bright, plus tips for interpreting flavoured-spirit labels.',
    intro:
      'Citrus is a broad flavour family that can include orange, lemon, lime and grapefruit-like notes. In tasting language, citrus often suggests a bright aroma, a peel-like character or a tart impression. These words are descriptive and do not replace the ingredient information on a label.',
    tags: ['Orange Flavoured Vodka', 'Citrus Tasting Terms', 'Zesty & Juicy', 'Product Evaluation', 'Sensory Guide'],
    author: 'Grand Master Editorial',
    date: 'September 2026',
    readTime: '4 min read',
    primaryKeyword: 'orange flavoured vodka',
    seoTitle: 'Orange and Citrus Flavours: A Practical Guide to Common Tasting Terms',
    suggestedSlug: '/orange-citrus-flavour-guide/',
    internalLinks: [
      { text: 'Grand Master Flavours', url: 'https://www.grandmasters.co/flavours/' },
      { text: 'Grand Master Official Home', url: 'https://www.grandmasters.co/' },
    ],
    sections: [
      {
        heading: 'Three common citrus descriptors',
        paragraphs: [
          '“Zesty” usually refers to a lively citrus aroma, often reminiscent of peel. “Juicy” suggests an impression associated with the fruit itself. “Bitter” may refer to a peel-like edge. Different people can interpret the same aroma differently, so descriptions should be clear rather than overstated.',
        ],
      },
      {
        heading: 'Orange compared with other citrus notes',
        paragraphs: [
          'Orange is often associated with a rounded, sweet-smelling citrus aroma, while lemon and lime are commonly described as sharper. Actual products can differ substantially depending on flavouring and formulation. Do not present these broad associations as a guarantee about a specific product.',
        ],
      },
      {
        heading: 'How to evaluate a product page',
        paragraphs: [
          'Check whether the page identifies the exact flavour, manufacturer and ABV. Verify any claims about ingredients or production with official product information. Words such as “natural” or “authentic” should be used only when their meaning is clear and substantiated.',
        ],
      },
      {
        heading: 'Responsible communication',
        paragraphs: [
          'Citrus flavour does not reduce alcohol-related risks. Avoid health claims, claims about improved mood or performance, and messaging aimed at people under the legal drinking age. Publishing alcohol-related content in India requires careful legal and platform-policy review.',
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'Clear citrus descriptions help readers understand flavour terminology without exaggerating what a product offers. Keep the wording specific, label-led and factual.',
        ],
      },
      {
        heading: 'Suggested SEO Implementation',
        paragraphs: [
          'Use the primary keyword naturally in the page title, opening paragraph and one relevant subheading where appropriate. Link to the official Flavours page and one closely related article. Add a descriptive image alt text that accurately describes the image. Before publishing, confirm all product claims against current labels and obtain compliance approval.',
        ],
      },
    ],
  },
  5: {
    subtitle:
      'Compare plain and flavoured vodka by flavour profile, label details and common terminology in this straightforward guide.',
    intro:
      'Plain vodka and flavoured vodka differ primarily in their intended flavour profile. Plain vodka is generally positioned as relatively neutral, while flavoured varieties are designed to present an additional aroma or taste. Both remain alcoholic beverages, and flavour does not remove alcohol-related risks.',
    tags: ['Plain Vodka', 'Flavoured Vodka', 'Tasting Differences', 'Label Reading', 'Spirit Guide'],
    author: 'Grand Master Editorial',
    date: 'August 2026',
    readTime: '4 min read',
    primaryKeyword: 'plain vodka vs flavoured vodka',
    seoTitle: 'Plain Vodka vs Flavoured Vodka: Key Differences Explained',
    suggestedSlug: '/plain-vodka-vs-flavoured-vodka/',
    internalLinks: [
      { text: 'Grand Master Flavours', url: 'https://www.grandmasters.co/flavours/' },
      { text: 'Grand Master Official Home', url: 'https://www.grandmasters.co/' },
    ],
    sections: [
      {
        heading: 'What is plain vodka?',
        paragraphs: [
          'Plain vodka is typically described with restrained aroma and flavour. Depending on the product, people may notice subtle cereal, mineral or peppery notes. The term “plain” does not mean alcohol-free or risk-free.',
        ],
      },
      {
        heading: 'What is flavoured vodka?',
        paragraphs: [
          'Flavoured vodka uses a defined flavour direction, which may be fruit-inspired, citrus-like, berry-based or dessert-inspired. The name alone does not establish the exact ingredients. For specific ingredient information, consult the product label and verified manufacturer details.',
        ],
      },
      {
        heading: 'How to compare labels',
        paragraphs: [
          'Compare ABV, bottle size, manufacturer, ingredient statements where provided and statutory warnings. Do not assume flavoured products have less alcohol or fewer calories unless reliable product data confirms the relevant figure. Avoid treating marketing words such as “smooth” as a health or safety claim.',
        ],
      },
      {
        heading: 'Product range information',
        paragraphs: [
          'Grand Master’s official Flavours page lists plain vodka and a range of flavoured varieties. Check the current page for the producer’s latest published range, and confirm local availability through lawful, authorised channels.',
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'The distinction is about flavour presentation, not safety. Clear product descriptions should explain the profile accurately, avoid unsupported claims and follow applicable alcohol-marketing rules.',
        ],
      },
      {
        heading: 'Suggested SEO Implementation',
        paragraphs: [
          'Use the primary keyword naturally in the page title, opening paragraph and one relevant subheading where appropriate. Link to the official Flavours page and one closely related article. Add a descriptive image alt text that accurately describes the image. Before publishing, confirm all product claims against current labels and obtain compliance approval.',
        ],
      },
    ],
  },
  6: {
    subtitle:
      'Understand the main stages commonly used in vodka production, from raw materials and fermentation to distillation, filtration and bottling.',
    intro:
      'Vodka production combines raw materials, fermentation, distillation and, where used, filtration and blending. The exact process varies by producer and local regulations. This overview explains common terms without making assumptions about a specific bottle’s production beyond information the producer has verified.',
    tags: ['How Vodka Is Made', 'Fermentation & Distillation', 'Grain Spirits', 'Filtration', 'Distillery Craft'],
    author: 'Master Distiller',
    date: 'August 2026',
    readTime: '5 min read',
    primaryKeyword: 'how vodka is made',
    seoTitle: 'How Vodka Is Made: Grains, Fermentation, Distillation and Filtration',
    suggestedSlug: '/how-vodka-is-made/',
    internalLinks: [
      { text: 'Grand Master Official Home', url: 'https://www.grandmasters.co/' },
      { text: 'Grand Master Flavours', url: 'https://www.grandmasters.co/flavours/' },
    ],
    sections: [
      {
        heading: '1. Raw materials',
        paragraphs: [
          'Vodka can be made from agricultural materials that provide fermentable sugars or starch, including grains and other permitted sources. The chosen material and preparation affect the production process, but the label and producer’s documentation are the best sources for a particular product’s raw materials.',
        ],
      },
      {
        heading: '2. Fermentation',
        paragraphs: [
          'During fermentation, yeast converts available sugars into alcohol and other compounds. Producers manage this stage to create a suitable fermented base for distillation. Technical details differ from one facility and product to another.',
        ],
      },
      {
        heading: '3. Distillation',
        paragraphs: [
          'Distillation separates components according to their volatility and is used to concentrate alcohol. Equipment, operating conditions and the producer’s process influence the resulting spirit. Avoid interpreting words such as “multiple distilled” as an automatic guarantee of safety or superior quality.',
        ],
      },
      {
        heading: '4. Filtration and flavouring',
        paragraphs: [
          'Some producers filter spirit to adjust clarity or sensory characteristics. Flavoured products may also involve blending or the addition of flavouring ingredients. The precise methods and ingredients should be stated only when confirmed by the manufacturer.',
        ],
      },
      {
        heading: '5. Quality checks and bottling',
        paragraphs: [
          'Commercial production typically includes checks and packaging controls required by the producer and applicable law. For product-specific details, consult official documentation and the label rather than assuming every vodka follows an identical process.',
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'Understanding the production stages makes technical product descriptions easier to interpret. The most reliable brand content distinguishes general industry information from verified claims about a particular product. Alcohol is for adults of legal drinking age only.',
        ],
      },
      {
        heading: 'Suggested SEO Implementation',
        paragraphs: [
          'Use the primary keyword naturally in the page title, opening paragraph and one relevant subheading where appropriate. Link to the official Flavours page and one closely related article. Add a descriptive image alt text that accurately describes the image. Before publishing, confirm all product claims against current labels and obtain compliance approval.',
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

  // Scroll to top on article change and update document title
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCopied(false);
    if (blog) {
      document.title = `${blog.seoTitle || blog.title} | Grand Master Vodka`;
    }
  }, [blog]);

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

            {/* Official Resources & Internal Links */}
            {articleData.internalLinks && articleData.internalLinks.length > 0 && (
              <section className="article-section-block article-resources-block">
                <h2>Official Resources & Links</h2>
                <ul className="article-bullets-list">
                  {articleData.internalLinks.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={link.url}
                        target={link.url.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        style={{ color: 'var(--gm-brand-accent, #732f03)', textDecoration: 'underline' }}
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
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
                      src={rel.thumbnail || rel.image}
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

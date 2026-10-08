import React from 'react';
import logoImg from '../../assets/Logo.png';
import './Footer.css';

const FOOTER_NAV = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#distilled' },
  { name: 'Flavours', href: '#flavours' },
  { name: 'Process', href: '#distillation' },
  { name: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4l16 16M4 20L20 4" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="gm-footer-wrapper" role="contentinfo">
      <div className="gm-footer-container">
        {/* Main Centered Content */}
        <div className="gm-footer-main">
          {/* Centered Brand / Logo */}
          <div className="gm-footer-brand">
            <a href="#main" className="gm-footer-logo-link" aria-label="Grand Master Vodka Home">
              <img src={logoImg} alt="Grand Master Vodka" className="gm-footer-logo-img" />
            </a>
          </div>

          {/* Centered Horizontal Navigation Links */}
          <nav className="gm-footer-nav" aria-label="Footer Navigation">
            <ul className="gm-footer-nav-list">
              {FOOTER_NAV.map((link) => (
                <li key={link.name} className="gm-footer-nav-item">
                  <a href={link.href} className="gm-footer-nav-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Centered Social Channels */}
          <div className="gm-footer-socials" role="list" aria-label="Social Links">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.url}
                className="gm-footer-social-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Grand Master on ${item.name}`}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="gm-footer-divider" aria-hidden="true" />

        {/* Bottom Bar: Copyright on Left, Legal/Attribution on Right */}
        <div className="gm-footer-bottom">
          <p className="gm-footer-copyright">
            &copy; {new Date().getFullYear()} Grand Master Vodka. 
          </p>
          <div className="gm-footer-meta">
            <span className="gm-footer-tag">Enjoy Responsibly</span>
            <span className="gm-footer-bullet" aria-hidden="true">&bull;</span>
            <a
              href="https://www.dwebbox.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="gm-footer-creator-link"
              aria-label="Website designed and developed by 10dumbs"
            >
              Created by 10dumbs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import logoImg from '../../assets/Logo.png';
import './Footer.css';

const FOOTER_NAV = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Products', href: '#products' },
  { name: 'Blogs', href: '#blogs' },
  { name: 'Contact', href: '#contact' },

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
              href="https://www.10dumbs.com/"
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

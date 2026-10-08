import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const open = isMenuOpen !== undefined ? isMenuOpen : internalMenuOpen;

  const setOpen = (valueOrUpdater) => {
    const nextVal = typeof valueOrUpdater === 'function' ? valueOrUpdater(open) : valueOrUpdater;
    if (typeof setIsMenuOpen === 'function') {
      setIsMenuOpen(nextVal);
    }
    setInternalMenuOpen(nextVal);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      setIsScrolled(scrollY > 20);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const handleToggleClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setOpen(!open);
  };

  const handleCloseClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setOpen(false);
  };

  const navigateTo = (page, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setOpen(false);

    const target = (page || '').replace('#', '').toLowerCase();

    // Notify listeners via custom event with clean target
    window.dispatchEvent(
      new CustomEvent('gm-navigate', {
        detail: target || 'home',
      })
    );

    if (target === 'contact') {
      window.location.hash = '#contact';
      window.dispatchEvent(new Event('hashchange'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'home' || target === '') {
      if (window.location.hash) {
        try {
          history.pushState('', document.title, window.location.pathname + window.location.search);
        } catch {
          window.location.hash = '';
        }
      }
      window.dispatchEvent(new Event('hashchange'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // For products, shop, or other anchor targets
    const hash = '#' + target;
    window.location.hash = hash;
    window.dispatchEvent(new Event('hashchange'));
    setTimeout(() => {
      const element = document.getElementById(target) || document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 250);
  };

  return (
    <>
      <nav className={`gm-main-nav ${isScrolled ? 'scrolled' : ''}`}>
        <a 
          href="#home" 
          className="logo-link" 
          aria-label="Grand Master Vodka Home"
          onClick={(e) => navigateTo('home', e)}
        >
          <img src="/Assets/logo1.png" alt="Grand Master Logo" className="nav-logo" />
        </a>

        <div className="nav-actions">
          <button
            type="button"
            className="menu-toggle-btn"
            id="menu-toggle"
            onClick={handleToggleClick}
            aria-label="Toggle Navigation Menu"
            aria-expanded={open}
          >
            <i className={open ? 'ri-close-line' : 'ri-menu-fill'}></i>
          </button>
        </div>
      </nav>

      {/* Backdrop for closing drawer when clicking outside */}
      <div 
        className={`menu-backdrop ${open ? 'active' : ''}`} 
        onClick={handleCloseClick}
        aria-hidden={!open}
      />

      {/* Sliding Menu Drawer (Rendered outside nav so backdrop-filter does not trap fixed position) */}
      <div 
        className={`menu-overlay ${open ? 'active' : ''}`} 
        id="menu-overlay"
        aria-hidden={!open}
      >
        <button
          type="button"
          className="menu-close-btn"
          id="menu-close"
          onClick={handleCloseClick}
          aria-label="Close Navigation Menu"
        >
          <i className="ri-close-line"></i>
        </button>

        <div className="menu-content">
          <div className="menu-header">
            <span className="menu-tagline">Grand Master's Vodka</span>
            <div className="menu-divider"></div>
          </div>

          <div className="cntr-nav">
            <a 
              href="#home" 
              onClick={(e) => navigateTo('home', e)} 
              data-text="Home"
            >
              <span className="nav-text">Home</span>
            </a>
            <a 
              href="#products" 
              onClick={(e) => navigateTo('products', e)} 
              data-text="Products"
            >
              <span className="nav-text">Products</span>
            </a>
            <a 
              href="#shop" 
              onClick={(e) => navigateTo('products', e)} 
              data-text="Shop"
            >
              <span className="nav-text">Shop</span>
            </a>
            <a 
              href="#contact" 
              onClick={(e) => navigateTo('contact', e)} 
              data-text="Contact"
            >
              <span className="nav-text">Contact</span>
            </a>
          </div>

          <div className="menu-footer">
            <span className="social-label">Follow The Experience</span>
            <div className="social-icons">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <i className="ri-instagram-line"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter X">
                <i className="ri-twitter-x-line"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <i className="ri-youtube-fill"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;


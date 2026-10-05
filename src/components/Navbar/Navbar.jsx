import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const open = isMenuOpen !== undefined ? isMenuOpen : internalMenuOpen;
  const setOpen = setIsMenuOpen || setInternalMenuOpen;

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
  }, [open, setOpen]);

  const handleToggleClick = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleCloseClick = () => {
    setOpen(false);
  };

  const handleNavLinkClick = () => {
    setOpen(false);
  };

  return (
    <>
      <nav className={`gm-main-nav ${isScrolled ? 'scrolled' : ''}`}>
        <a href="#" className="logo-link" aria-label="Grand Master Vodka Home">
          <img src="/Assets/logo1.png" alt="Grand Master Logo" className="nav-logo" />
        </a>

        <div className="nav-actions">
          <button
            type="button"
            className="menu-toggle-btn"
            id="menu-toggle"
            onClick={handleToggleClick}
            aria-label="Open Navigation Menu"
            aria-expanded={open}
          >
            <i className="ri-menu-fill"></i>
          </button>
        </div>

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
              <a href="#" onClick={handleNavLinkClick} data-text="Home">
             
                <span className="nav-text">Home</span>
              </a>
              <a href="#products" onClick={handleNavLinkClick} data-text="Products">
              
                <span className="nav-text">Products</span>
              </a>
              <a href="#shop" onClick={handleNavLinkClick} data-text="Shop">
              
                <span className="nav-text">Shop</span>
              </a>
              <a href="#contact" onClick={handleNavLinkClick} data-text="Contact">
             
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
      </nav>

      {/* Backdrop for closing drawer when clicking outside */}
      <div 
        className={`menu-backdrop ${open ? 'active' : ''}`} 
        onClick={handleCloseClick}
        aria-hidden="true"
      />
    </>
  );
};

export default Navbar;


import React from 'react';

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const handleToggleClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen(true);
  };

  const handleCloseClick = () => {
    setIsMenuOpen(false);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav>
      <a href="#" className="logo-link">
        <img src="Assets/logo1.png" alt="Logo" className="nav-logo" />
      </a>
      <i 
        className="ri-menu-fill" 
        id="menu-toggle"
        onClick={handleToggleClick}
      ></i>
      <div 
        className={`menu-overlay ${isMenuOpen ? 'active' : ''}`} 
        id="menu-overlay"
      >
        <i 
          className="ri-close-line" 
          id="menu-close"
          onClick={handleCloseClick}
        ></i>
        <div className="menu-content">
          <div className="cntr-nav">
            <a href="#" onClick={handleNavLinkClick}>Home</a>
            <a href="#" onClick={handleNavLinkClick}>Products</a>
            <a href="#" onClick={handleNavLinkClick}>Shop</a>
            <a href="#" onClick={handleNavLinkClick}>Contact</a>
          </div>
          <div className="social-icons">
            <a href="#"><i className="ri-instagram-line"></i></a>
            <a href="#"><i className="ri-twitter-x-line"></i></a>
            <a href="#"><i className="ri-facebook-fill"></i></a>
            <a href="#"><i className="ri-youtube-fill"></i></a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

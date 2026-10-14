import React from 'react';
import orangeImg from '../../assets/Fruits Icon/1.png';
import melonImg from '../../assets/Fruits Icon/2.png';
import chocolateImg from '../../assets/Fruits Icon/3.png';
import strawberryImg from '../../assets/Fruits Icon/4.png';
import greenAppleImg from '../../assets/Fruits Icon/5.png';
import mangoImg from '../../assets/Fruits Icon/6.png';
import blueberryImg from '../../assets/Fruits Icon/7.png';
import lemonImg from '../../assets/Fruits Icon/8.png';

import coconutImg from '../../assets/Fruits Icon/10.png';
import cranberryImg from '../../assets/Fruits Icon/11.png';
import './AmazingFlavors.css';

const FLAVORS = [
  {
    id: 'orange',
    name: 'ORANGE FIZZ',
    image: orangeImg,
    alt: 'Grand Master Orange Fizz',
  },
  {
    id: 'blueberry',
    name: 'BLUEBERRY',
    image: blueberryImg,
    alt: 'Grand Master Blueberry',
  },
  {
    id: 'chocolate',
    name: 'CHOCOLATE',
    image: chocolateImg,
    alt: 'Grand Master Rich Chocolate',
  },
  {
    id: 'mango',
    name: 'MANGO SPLASH',
    image: mangoImg,
    alt: 'Grand Master Mango Splash',
  },
  {
    id: 'melon',
    name: 'MELON',
    image: melonImg,
    alt: 'Grand Master Sweet Melon',
  },
  {
    id: 'strawberry',
    name: 'STRAWBERRY',
    image: strawberryImg,
    alt: 'Grand Master Strawberry',
  },
  {
    id: 'green-apple',
    name: 'GREEN APPLE',
    image: greenAppleImg,
    alt: 'Grand Master Green Apple',
  },
  {
    id: 'zesty-lemon',
    name: 'ZESTY LEMON',
    image: lemonImg,
    alt: 'Grand Master Zesty Lemon',
  },
  
  {
    id: 'coconut',
    name: 'COCONUT',
    image: coconutImg,
    alt: 'Grand Master Coconut',
  },
  {
    id: 'cranberry',
    name: 'CRANBERRY',
    image: cranberryImg,
    alt: 'Grand Master Cranberry',
  },
];

export default function AmazingFlavors() {
  const handleFlavorClick = (flavorId) => {
    window.location.hash = `#product-${flavorId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="gm-amazing-flavors-section" aria-label="Grand Master Amazing Flavors">
      <div className="gm-amazing-flavors-inner">
        {/* Slanted "AMAZING" Badge + Bold "FLAVORS" Title Lockup */}
        <div className="gm-amazing-title-lockup">
          <h2 className="gm-flavors-main-title">FLAVORS</h2>
        </div>

        {/* 11 Flavor Ingredients Flex / Grid Layout */}
        <div className="gm-amazing-flavors-grid">
          {FLAVORS.map((flavor) => (
            <div 
              key={flavor.id} 
              className="gm-flavor-item" 
              data-flavor={flavor.id}
              onClick={() => handleFlavorClick(flavor.id)}
              role="button"
              tabIndex={0}
              aria-label={`View details of ${flavor.name} Grand Master Vodka`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleFlavorClick(flavor.id);
                }
              }}
            >
              <div className="gm-flavor-img-wrap">
                <img
                  src={flavor.image}
                  alt={flavor.alt}
                  className="gm-flavor-img"
                  loading="lazy"
                />
              </div>
              <span className="gm-flavor-label">{flavor.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

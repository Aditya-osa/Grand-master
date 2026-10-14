import React from 'react';
import blueberryImg from '../../assets/BLUE BERRY/1.png';
import chocolateImg from '../../assets/CHOCOLATE/chocolate-squares.png';
import mangoImg from '../../assets/MANGO/3.png';
import melonImg from '../../assets/Melon copy/5.png';
import strawberryImg from '../../assets/STRAWBERRY (1)/5.png';
import './AmazingFlavors.css';

const orangeImg = '/Assets/Orange/3.png';

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
    name: 'SWEET MELON',
    image: melonImg,
    alt: 'Grand Master Sweet Melon',
  },
  {
    id: 'strawberry',
    name: 'STRAWBERRY',
    image: strawberryImg,
    alt: 'Grand Master Strawberry',
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

        {/* 6 Flavor Ingredients Horizontal Row */}
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

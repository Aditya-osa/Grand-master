import React from 'react';
import InfoBox from './InfoBox';
import Decorations from './Decorations';
import chocolateBottle from '../../assets/bottles/chocolate-bottle.png';
import melonBottle from '../../assets/bottles/all-flav/4.png';

const MainSection = () => {
  return (
    <div className="one">
      {/* Background Flavour Gradients for smooth GPU-accelerated transitions */}
      <div className="hero-bg bg-orange" />
      <div className="hero-bg bg-strawberry" />
      <div className="hero-bg bg-chocolate" />
      <div className="hero-bg bg-melon" />

      {/* Background Giant Text */}
      <h1 id="orange-text">ORANGE</h1>
      <h1 id="strawberry-text">STRAWBERRY</h1>
      <h1 id="chocolate-text">CHOCOLATE</h1>
      <h1 id="melon-text">MELON</h1>

      {/* 3D Ground Contact Shadow underneath bottle */}
      <div className="bottle-ground-shadow" aria-hidden="true" />
     
      {/* Tilted Bottles for each flavour */}
      <img id="fanta" src="/Assets/7.png" alt="Grand Master Orange Vodka" />
      <img id="fanta2" src="/Assets/5.png" alt="Grand Master Strawberry Vodka" />
      <img id="fanta3" src="/Assets/chocolate.png" alt="Grand Master Chocolate Vodka" />
      <img id="fanta4" src={melonBottle} alt="Grand Master Melon Vodka" />
    
      {/* Bottom Left Info Boxes */}
      <InfoBox />

      {/* Floating Orange & Mint Decor Items from Assets/Orange */}
      <Decorations />
    </div>
  );
};

export default MainSection;

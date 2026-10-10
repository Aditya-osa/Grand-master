import React from 'react';
import InfoBox from './InfoBox';
import Decorations from './Decorations';
import chocolateBottle from '../../assets/bottles/chocolate-bottle.png';
import melonBottle from '../../assets/bottles/all-flav/melon-bottle-hd.png';
import mangoBottle from '../../assets/bottles/all-flav/3.png';
import blueberryBottle from '../../assets/bottles/Blue berry bottle.png';

const MainSection = () => {
  return (
    <div className="one">
      {/* Background Flavour Gradients for smooth GPU-accelerated transitions */}
      <div className="hero-bg bg-orange" />
      {/* <div className="hero-bg bg-mango" /> */}
      <div className="hero-bg bg-strawberry" />
      {/* <div className="hero-bg bg-chocolate" /> */}
      <div className="hero-bg bg-melon" />
      <div className="hero-bg bg-blueberry" />

      {/* Background Giant Text */}
      <h1 id="orange-text">ORANGE</h1>
      {/* <h1 id="mango-text">MANGO</h1> */}
      <h1 id="strawberry-text">STRAWBERRY</h1>
      {/* <h1 id="chocolate-text">CHOCOLATE</h1> */}
      <h1 id="melon-text">MELON</h1>
      <h1 id="blueberry-text">BLUEBERRY</h1>
     
      {/* Tilted Bottles for each flavour */}
      <img id="fanta" src="/Assets/7.png" alt="Grand Master Orange Vodka" />
      {/* <img id="fanta-mango" src={mangoBottle} alt="Grand Master Mango Vodka" /> */}
      <img id="fanta2" src="/Assets/5.png" alt="Grand Master Strawberry Vodka" />
      {/* <img id="fanta3" src={chocolateBottle} alt="Grand Master Chocolate Vodka" /> */}
      <img id="fanta4" src={melonBottle} alt="Grand Master Melon Vodka" />
      <img id="fanta-blueberry" src={blueberryBottle} alt="Grand Master Blueberry Vodka" />
    
      {/* Bottom Left Info Boxes */}
      <InfoBox />

      {/* Floating Orange & Mint Decor Items from Assets/Orange */}
      <Decorations />
    </div>
  );
};

export default MainSection;

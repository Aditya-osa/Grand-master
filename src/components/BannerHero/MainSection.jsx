import React from 'react';
import InfoBox from './InfoBox';
import Decorations from './Decorations';
import chocolateBottle from '../../assets/bottles/all-flav/2.png';
import melonBottle from '../../assets/bottles/all-flav/4.png';

const MainSection = () => {
  return (
    <div className="one">
      {/* Background Giant Text */}
      <h1 id="orange-text">ORANGE</h1>
      <h1 id="strawberry-text">STRAWBERRY</h1>
      <h1 id="chocolate-text">CHOCOLATE</h1>
      <h1 id="melon-text">MELON</h1>
     
      {/* Cinematic Studio Spotlight & Bottle Glow */}
      <div className="bottle-focus-light" id="bottle-spotlight" aria-hidden="true" />
      <div className="bottle-ambient-glow" id="bottle-glow" aria-hidden="true" />

      {/* Tilted Bottles for each flavour */}
      <img id="fanta" src="/Assets/7.png" alt="Grand Master Orange Vodka" />
      <img id="fanta2" src="/Assets/5.png" alt="Grand Master Strawberry Vodka" />
      <img id="fanta3" src={chocolateBottle} alt="Grand Master Chocolate Vodka" />
      <img id="fanta4" src={melonBottle} alt="Grand Master Melon Vodka" />
    
      {/* Bottom Left Info Boxes */}
      <InfoBox />

      {/* Floating Orange & Mint Decor Items from Assets/Orange */}
      <Decorations />
    </div>
  );
};

export default MainSection;

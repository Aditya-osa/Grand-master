import React from 'react';
import InfoBox from './InfoBox';
import Decorations from './Decorations';

const MainSection = () => {
  return (
    <div className="one">
      {/* Background Giant Text */}
      <h1 id="orange-text">ORANGE</h1>
      <h1 id="strawberry-text">STRAWBERRY</h1>
     
      {/* Tilted Bottles */}
      <img id="fanta" src="Assets/7.png" alt="Orange Fanta" />
      <img id="fanta2" src="Assets/5.png" alt="Strawberry Fanta" />
    
      {/* Bottom Left Info Boxes */}
      <InfoBox />

      {/* Floating Orange & Mint Decor Items from Assets/Orange */}
      <Decorations />
    </div>
  );
};

export default MainSection;

import React from 'react';
import InfoBox from './InfoBox';
import Decorations from './Decorations';
import bottleOrange from '../../assets/750 ML 3D (1)/8.png';
import bottleStrawberry from '../../assets/750 ML 3D (1)/1.png';
import bottleMelon from '../../assets/750 ML 3D (1)/7.png';
import bottleBlueberry from '../../assets/750 ML 3D (1)/3.png';
import bgOrange from '../../assets/Background Banner/1.jpg';
import bgStrawberry from '../../assets/Background Banner/2.jpg';
import bgMelon from '../../assets/Background Banner/4.jpg';
import bgBlueberry from '../../assets/Background Banner/3.jpg';

const MainSection = () => {
  return (
    <div className="one">
      {/* Background Flavour Gradients for smooth GPU-accelerated transitions */}
      <div className="hero-bg bg-orange" style={{ backgroundImage: `url(${bgOrange})` }} />
      {/* <div className="hero-bg bg-mango" /> */}
      <div className="hero-bg bg-strawberry" style={{ backgroundImage: `url(${bgStrawberry})` }} />
      {/* <div className="hero-bg bg-chocolate" /> */}
      <div className="hero-bg bg-melon" style={{ backgroundImage: `url(${bgMelon})` }} />
      <div className="hero-bg bg-blueberry" style={{ backgroundImage: `url(${bgBlueberry})` }} />

      {/* Background Giant Text */}
      
      <h1 id="orange-text">ORANGE</h1>
      {/* <h1 id="mango-text">MANGO</h1> */}
      <h1 id="strawberry-text">STRAWBERRY</h1>
      {/* <h1 id="chocolate-text">CHOCOLATE</h1> */}
      <h1 id="melon-text">MELON</h1>
      <h1 id="blueberry-text">BLUEBERRY</h1>
     
      {/* Tilted Bottles for each flavour */}
      <img id="fanta" src={bottleOrange} alt="Grand Master Orange Vodka" />
      {/* <img id="fanta-mango" alt="Grand Master Mango Vodka" /> */}
      <img id="fanta2" src={bottleStrawberry} alt="Grand Master Strawberry Vodka" />
      {/* <img id="fanta3" alt="Grand Master Chocolate Vodka" /> */}
      <img id="fanta4" src={bottleMelon} alt="Grand Master Melon Vodka" />
      <img id="fanta-blueberry" src={bottleBlueberry} alt="Grand Master Blueberry Vodka" />
    
      {/* Bottom Left Info Boxes */}
      <InfoBox />

      {/* Floating Orange & Mint Decor Items from Assets/Orange */}
      <Decorations />
    </div>
  );
};

export default MainSection;

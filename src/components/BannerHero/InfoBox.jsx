import React from 'react';

const InfoBox = () => {
  return (
    <>
      <div className="info-box" id="info-orange">
        <h2>ORANGE</h2>
        <p>Pleasant citrus aroma, complemented by refreshing orange taste</p>
        <button className="pill-btn" type="button">Buy Now</button>
      </div>
      <div className="info-box" id="info-strawberry">
        <h2>MORE THAN A VODKA</h2>
        <p>Bolder flavours<br /> brighter movements </p>
        <button className="pill-btn" type="button">Buy Now</button>
      </div>
    </>
  );
};

export default InfoBox;

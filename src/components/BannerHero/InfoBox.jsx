import React from 'react';

const InfoBox = () => {
  return (
    <>
      <div className="info-box" id="info-orange">
        <h2>ORANGE</h2>
        <p>Pleasant citrus aroma, complemented by refreshing orange taste</p>
      </div>
      <div className="info-box" id="info-strawberry">
        <h2>STRAWBERRY</h2>
        <p>Pleasant mild aroma, complemented by sweet strawberry taste</p>
      </div>
      <div className="info-box" id="info-chocolate">
        <h2>CHOCOLATE</h2>
        <p>Decadent dark cocoa notes, crafted for an indulgent refined palate</p>
        <button className="pill-btn" aria-label="Explore Chocolate" />
      </div>
      <div className="info-box" id="info-melon">
        <h2>MELON</h2>
        <p>Crisp honeydew melon aroma, delivering a refreshing vibrant finish</p>
      </div>
    </>
  );
};

export default InfoBox;

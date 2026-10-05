import React from 'react';
import {
  strawberryWhole,
  strawberryLeaf1,
  strawberryCut,
  strawberryLeaf2,
  strawberryRipe,
  strawberrySmall,
  strawberryLeafCluster,
} from '../../assets/STRAWBERRY';

const Decorations = () => {
  return (
    <>
      {/* 🍊 Orange Stage Floating Decor */}
      <img className="decor decor-orange orange-top-left" src="/Assets/Orange/1.png" alt="Orange Slice" />
      <img className="decor decor-orange orange-top-right" src="/Assets/Orange/2.png" alt="Orange" />
      <img className="decor decor-orange orange-bottom-right" src="/Assets/Orange/3.png" alt="Orange Slices" />
      <img className="decor decor-orange leaf-left-1" src="/Assets/Orange/leaf1.png" alt="Mint Leaf" />
      <img className="decor decor-orange leaf-left-2" src="/Assets/Orange/5.png" alt="Mint Leaf" />
      <img className="decor decor-orange leaf-right-1" src="/Assets/Orange/6.png" alt="Mint Leaf" />
      <img className="decor decor-orange leaf-bottom-mid" src="/Assets/Orange/7.png" alt="Mint Leaf" />

      {/* 🍓 Strawberry Stage Floating Decor (Positioned & Scaled to Reference) */}
      <img className="decor decor-strawberry strawberry-top-left" src={strawberryWhole} alt="Fresh Strawberry" />
      <img className="decor decor-strawberry strawberry-leaf-top-mid" src={strawberryLeaf1} alt="Top Mint Leaf" />
      <img className="decor decor-strawberry strawberry-top-right" src={strawberryCut} alt="Cut Strawberry Pair" />
      <img className="decor decor-strawberry strawberry-leaf-right-mid" src={strawberryLeaf2} alt="Right Mint Leaf" />
      <img className="decor decor-strawberry strawberry-leaf-bottom-left" src={strawberryLeaf1} alt="Bottom Left Mint Leaf" />
      <img className="decor decor-strawberry strawberry-bottom-mid" src={strawberryRipe} alt="Ripe Strawberry Bottom" />
      <img className="decor decor-strawberry strawberry-bottom-small" src={strawberrySmall} alt="Small Strawberry Bottom" />
      <img className="decor decor-strawberry strawberry-leaf-cluster" src={strawberryLeafCluster} alt="Strawberry Leaf Cluster" />
    </>
  );
};

export default Decorations;

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
import {
  chocolateSquares,
  mintLeavesPair1,
  mintLeavesPair2,
  chocolateShavings,
  mintLeafSingle,
  coffeeBeans,
} from '../../assets/CHOCOLATE';

// Melon Assets
import melonWhole from '../../assets/MELON/Melon.png';
import melonHalf from '../../assets/MELON/Half-melon.png';
import melonSlice from '../../assets/MELON/half-melon-1.png';
import melonLeaf1 from '../../assets/MELON/leaf-1.png';
import melonLeaf2 from '../../assets/MELON/leaf-2.png';
import melon3Leaf from '../../assets/MELON/3leaf.png';

const Decorations = () => {
  return (
    <>
      {/* 🍈 Melon Stage Floating Decor */}
      <img className="decor decor-melon melon-top-left" src={melonWhole} alt="Melon" />
      <img className="decor decor-melon melon-top-right" src={melonHalf} alt="Half Melon" />
      <img className="decor decor-melon melon-bottom-right" src={melonSlice} alt="Melon Slice" />
      <img className="decor decor-melon melon-leaf-top-mid" src={melonLeaf1} alt="Mint Leaf" />
      <img className="decor decor-melon melon-leaf-mid-right" src={melon3Leaf} alt="Mint Leaves" />
      <img className="decor decor-melon melon-leaf-bottom-mid" src={melonLeaf2} alt="Mint Leaf" />
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

      {/* 🍫 Chocolate Stage Floating Decor (Matching Reference Layout) */}
      <img className="decor decor-chocolate chocolate-top-left" src={chocolateSquares} alt="Chocolate Squares Stack" />
      <img className="decor decor-chocolate chocolate-mint-top" src={mintLeavesPair1} alt="Top Mint Leaves" />
      <img className="decor decor-chocolate chocolate-coffee-beans" src={coffeeBeans} alt="Coffee Beans Cluster" />
      <img className="decor decor-chocolate chocolate-mint-single" src={mintLeafSingle} alt="Single Mint Leaf Left" />
      <img className="decor decor-chocolate chocolate-shavings" src={chocolateShavings} alt="Chocolate Shavings and Chunks" />
      <img className="decor decor-chocolate chocolate-mint-bottom" src={mintLeavesPair2} alt="Bottom Right Mint Leaves" />
    </>
  );
};

export default Decorations;

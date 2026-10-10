import React from 'react';
import strawberry1 from '../../assets/STRAWBERRY (1)/1.png';
import strawberry2 from '../../assets/STRAWBERRY (1)/2.png';
import strawberry3 from '../../assets/STRAWBERRY (1)/3.png';
import strawberry4 from '../../assets/STRAWBERRY (1)/4.png';
import strawberry5 from '../../assets/STRAWBERRY (1)/5.png';
import strawberry6 from '../../assets/STRAWBERRY (1)/6.png';
import strawberry7 from '../../assets/STRAWBERRY (1)/7.png';
import strawberry8 from '../../assets/STRAWBERRY (1)/8.png';
import {
  chocolateSquares,
  mintLeavesPair1,
  mintLeavesPair2,
  chocolateShavings,
  mintLeafSingle,
  coffeeBeans,
} from '../../assets/CHOCOLATE';

// Mango Assets
import {
  mangoChunks,
  mangoLeaf1,
  mangoWhole,
  mangoLeaf2,
  mangoSlice,
} from '../../assets/MANGO';

// Melon Assets (from src/assets/Melon copy)
import melon1 from '../../assets/Melon copy/1.png';
import melon2 from '../../assets/Melon copy/2.png';
import melon3 from '../../assets/Melon copy/3.png';
import melon4 from '../../assets/Melon copy/4.png';
import melon5 from '../../assets/Melon copy/5.png';
import melon6 from '../../assets/Melon copy/6.png';
import melon7 from '../../assets/Melon copy/7.png';
import melon8 from '../../assets/Melon copy/8.png';

// Blueberry Assets
import blueberry1 from '../../assets/BLUE BERRY/1.png';
import blueberry2 from '../../assets/BLUE BERRY/2.png';
import blueberry3 from '../../assets/BLUE BERRY/3.png';
import blueberry4 from '../../assets/BLUE BERRY/4.png';
import blueberry5 from '../../assets/BLUE BERRY/5.png';
import blueberry6 from '../../assets/BLUE BERRY/6.png';
import blueberry7 from '../../assets/BLUE BERRY/7.png';
import blueberry8 from '../../assets/BLUE BERRY/8.png';

const Decorations = () => {
  return (
    <>
      {/* 🫐 Blueberry Stage Floating Decor */}
      <img className="decor decor-blueberry blueberry-top-left blueberry-cluster-left" src={blueberry2} alt="Blueberry Cluster Top Left" />
      <img className="decor decor-blueberry blueberry-leaf-top-mid blueberry-mint-top-left" src={blueberry3} alt="Mint Leaf Top Left" />
      <img className="decor decor-blueberry blueberry-top-right blueberry-cluster-right" src={blueberry6} alt="Blueberry Cluster Top Right" />
      <img className="decor decor-blueberry blueberry-bottom-right blueberry-trio-right" src={blueberry4} alt="Blueberry Trio Bottom Right" />
      <img className="decor decor-blueberry blueberry-leaf-bottom-mid blueberry-mint-mid-right" src={blueberry5} alt="Mint Leaf Mid Right" />
      <img className="decor decor-blueberry blueberry-branch-top-right" src={blueberry7} alt="Blueberry Branch Top Right" />
      <img className="decor decor-blueberry blueberry-leaf-bottom-left" src={blueberry1} alt="Blueberry Leaves Bottom Left" />
      <img className="decor decor-blueberry blueberry-mint-bottom-right" src={blueberry8} alt="Mint Leaf Bottom Right" />

      {/* 🥭 Mango Stage Floating Decor (Orange-like layout and structure) */}
      <img className="decor decor-mango mango-top-left" src={mangoSlice} alt="Mango Sliced Cheek" />
      <img className="decor decor-mango mango-top-right" src={mangoWhole} alt="Whole Golden Mango" />
      <img className="decor decor-mango mango-bottom-right" src={mangoChunks} alt="Mango Chunks" />
      <img className="decor decor-mango mango-leaf-left-1" src={mangoLeaf1} alt="Mint Leaf" />
      <img className="decor decor-mango mango-leaf-top-mid" src={mangoLeaf2} alt="Mint Leaf" />
      <img className="decor decor-mango mango-leaf-bottom-mid" src={mangoLeaf2} alt="Mint Leaf" />

      {/* 🍈 Melon Stage Floating Decor (Matching Reference Image) */}
      <img className="decor decor-melon melon-top-left melon-whole-left" src={melon1} alt="Whole Melon Top Left" />
      <img className="decor decor-melon melon-leaf-top-mid melon-mint-top-left" src={melon2} alt="Mint Leaf Top Left" />
      <img className="decor decor-melon melon-leaf-bottom-left" src={melon3} alt="Melon Leaf Bottom Left" />
      <img className="decor decor-melon melon-bottom-right melon-slice-mid-right" src={melon4} alt="Melon Slice Mid Right" />
      <img className="decor decor-melon melon-top-right melon-cluster-right" src={melon5} alt="Melon Cluster Top Right" />
      <img className="decor decor-melon melon-branch-top-right" src="/Assets/Orange/2.png" alt="Melon Branch Top Right" />
      <img className="decor decor-melon melon-leaf-bottom-mid melon-mint-mid-right" src={melon7} alt="Mint Leaf Mid Right" />
      <img className="decor decor-melon melon-mint-bottom-right" src={melon8} alt="Mint Leaf Bottom Right" />
      {/* 🍊 Orange Stage Floating Decor */}
      <img className="decor decor-orange orange-top-left orange-slice-left" src="/Assets/Orange/1.png" alt="Orange Slices" />
      <img className="decor decor-orange leaf-right-1 orange-branch-top-right" src="/Assets/Orange/2.png" alt="Orange Leaves Top Right" />
      <img className="decor decor-orange orange-top-right orange-whole-right" src="/Assets/Orange/3.png" alt="Orange and Slice" />
      <img className="decor decor-orange orange-bottom-right orange-wedge-bottom-right" src="/Assets/Orange/4.png" alt="Orange Slice Wedge" />
      <img className="decor decor-orange orange-branch-bottom-left" src="/Assets/Orange/5.png" alt="Orange Leaves Bottom Left" />
      <img className="decor decor-orange leaf-left-1 orange-mint-top-left" src="/Assets/Orange/6.png" alt="Mint Leaf Top Left" />
      <img className="decor decor-orange leaf-bottom-mid orange-mint-mid-right" src="/Assets/Orange/7.png" alt="Mint Leaf Mid Right" />
      <img className="decor decor-orange orange-mint-bottom-right" src="/Assets/Orange/8.png" alt="Mint Leaf Bottom Right" />

      {/* 🍓 Strawberry Stage Floating Decor */}
      <img className="decor decor-strawberry strawberry-top-left strawberry-single-left" src={strawberry1} alt="Fresh Strawberry Left" />
      <img className="decor decor-strawberry strawberry-leaf-bottom-left" src={strawberry2} alt="Strawberry Leaves Bottom Left" />
      <img className="decor decor-strawberry strawberry-leaf-top-mid strawberry-mint-top-left" src={strawberry3} alt="Mint Leaf Top Left" />
      <img className="decor decor-strawberry strawberry-bottom-right strawberry-single-right" src={strawberry4} alt="Fresh Strawberry Bottom Right" />
      <img className="decor decor-strawberry strawberry-top-right strawberry-pair-right" src={strawberry5} alt="Strawberry Pair Top Right" />
      <img className="decor decor-strawberry strawberry-leaf-top-right" src={strawberry6} alt="Strawberry Leaves Top Right" />
      <img className="decor decor-strawberry strawberry-leaf-bottom-mid strawberry-mint-mid-right" src={strawberry7} alt="Mint Leaf Mid Right" />
      <img className="decor decor-strawberry strawberry-mint-bottom-right" src={strawberry8} alt="Mint Leaf Bottom Right" />

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

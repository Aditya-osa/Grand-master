import React from 'react';
import Navbar from '../components/Navbar';
import BannerHero from '../components/BannerHero';
import Products from '../components/Products';
import DistilledToInspire from '../components/DistilledToInspire';
import HorizontalCards from '../components/HorizontalCards';
import Footer from '../components/Footer';
import Enjoyflavours from '../components/Enjoy-flv/Enjoyflavours';
import Blogs from '../components/Blogs/Blogs';

/**
 * Home Page Component
 * Renders GM Navbar, BannerHero, Distilled to Inspire, Products, Enjoy Flavours, Horizontal Cards, Blog and Insights, and Footer.
 */
export default function Home() {
  return (
    <div className="gm-home-wrapper" id="home">
      <Navbar />
      <main className="gm-home-page" role="main">
        <BannerHero />
        <DistilledToInspire />
        <Enjoyflavours />
        <Products />
        <HorizontalCards />
        <Blogs />
        <Footer />
      </main>
    </div>
  );
}


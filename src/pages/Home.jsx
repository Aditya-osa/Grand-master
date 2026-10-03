import React from 'react';
import Navbar from '../components/Navbar';
import BannerHero from '../components/BannerHero';
import Products from '../components/Products';
import DistilledToInspire from '../components/DistilledToInspire';
import HorizontalCards from '../components/HorizontalCards';
import Footer from '../components/Footer';

/**
 * Home Page Component
 * Renders GM Navbar, Bannerinhtml Hero, Products, Distilled to Inspire, Horizontal Cards, and Footer.
 * Enjoy Flavours has been removed and replaced by BannerHero.
 */
export default function Home() {
  return (
    <div className="gm-home-wrapper">
      <Navbar />
      <main className="gm-home-page" role="main">
        <BannerHero />
        <DistilledToInspire />
        <Products />

        <HorizontalCards />
        <Footer />
      </main>
    </div>
  );
}

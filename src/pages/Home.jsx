import React from 'react';
import FlavorHero from '../components/FlavorHero';
import Products from '../components/Products';
import DistilledToInspire from '../components/DistilledToInspire';
import HorizontalCards from '../components/HorizontalCards';
import Footer from '../components/Footer/Footer';

/**
 * Home Page Component
 * Renders the Interactive Flagship Flavor Hero, Products carousel, Distilled to Inspire, Process Cards, and Footer
 */
export default function Home() {
  return (
    <main className="gm-home-page" role="main">
      <FlavorHero />
      <Products />
      <DistilledToInspire />
      <HorizontalCards />
      <Footer />
    </main>
  );
}

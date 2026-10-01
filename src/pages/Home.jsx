import React from 'react';
import FlavorHero from '../components/FlavorHero';
import Products from '../components/Products';
import DistilledToInspire from '../components/DistilledToInspire';
import EnjoyFlavours from '../components/EnjoyFlavours/EnjoyFlavours';
import HorizontalCards from '../components/HorizontalCards';
import Footer from '../components/Footer/Footer';

/**
 * Home Page Component
 * Renders Flavor Hero, Products, Distilled to Inspire, Enjoy Flavours Cinematic Scroll, Process Cards, and Footer
 */
export default function Home() {
  return (
    <main className="gm-home-page" role="main">
      <FlavorHero />
      <Products />
      <DistilledToInspire />
      <EnjoyFlavours />
      <HorizontalCards />
      <Footer />
    </main>
  );
}

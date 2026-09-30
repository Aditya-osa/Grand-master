import React from 'react';
import StrawberryHero from '../components/StrawberryHero';
import Products from '../components/Products';
import DistilledToInspire from '../components/DistilledToInspire';
import Footer from '../components/Footer/Footer';

/**
 * Home Page Component
 * Renders StrawberryHero, Products carousel, Distilled to Inspire, and Footer in cinematic sequence
 */
export default function Home() {
  return (
    <main className="gm-home-page" role="main">
      <StrawberryHero />
      <Products />
      <DistilledToInspire />
      <Footer />
    </main>
  );
}

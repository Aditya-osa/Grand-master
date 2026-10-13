import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import DistilledToInspire from "../components/DistilledToInspire";
import AmazingFlavors from "../components/AmazingFlavors";
import HorizontalCards from "../components/HorizontalCards";
import Blogs from "../components/Blogs/Blogs";
import Footer from "../components/Footer";
import aboutBannerImg from "../assets/image.png";
import "./Abouts.css";

function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="gm-about-page-wrapper" id="about">
      {/* Brand Navigation */}
      <Navbar />

      {/* ====================================================================
          HERO BANNER - Real Grand Master Craft Photography (Like Blogs Page)
          ==================================================================== */}
      <section className="gm-about-banner" aria-label="Grand Master Heritage & Craft">
        <img
          src={aboutBannerImg}
          alt="Grand Master Crafted Spirits & Flavours"
          className="about-banner-bg"
        />
      </section>

      {/* Main Content */}
      <main className="gm-about-main" role="main">
        {/* DISTILLED TO INSPIRE Section: Center-aligned content with video below */}
        <DistilledToInspire centered={true} />

        {/* AMAZING FLAVORS Section: Slanted badge, bold title & 6 flavor ingredients */}
        <AmazingFlavors />

        {/* Process Section (Pinned Horizontal Cards) */}
        <HorizontalCards />

        {/* Blog and Insights Section */}
        <Blogs />
      </main>

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}

export default About;
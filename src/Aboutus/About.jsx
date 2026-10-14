import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import DistilledToInspire from "../components/DistilledToInspire";
import AmazingFlavors from "../components/AmazingFlavors";
import HorizontalCards from "../components/HorizontalCards";
import Blogs from "../components/Blogs/Blogs";
import Footer from "../components/Footer";
import aboutBannerImg from "../assets/image.png";
import bannerVideo from "../assets/6a4659235173f72a046a6f90_6a5e3a721a51901c488abdee_banner video _mp4.mp4";
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
          HERO BANNER - Matching Products, Blog & Contact
          ==================================================================== */}
      <section className="gm-about-banner" aria-label="Grand Master Heritage & Craft">
        <div className="about-banner-overlay" aria-hidden="true" />
        <video
          className="about-banner-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={aboutBannerImg}
        >
          <source src={bannerVideo} type="video/mp4" />
          <img
            src={aboutBannerImg}
            alt="Grand Master Crafted Spirits & Flavours"
            className="about-banner-bg"
          />
        </video>

        {/* Foreground Hero Content Lockup */}
        <div className="about-banner-content">
          <h1 className="about-banner-title">ABOUT US</h1>
          <p className="about-banner-desc">
            Discover the legacy, passionate craftsmanship, and distinct heritage behind Grand Master spirits.
          </p>
        </div>
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
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../Navbar";
import DistilledToInspire from "../DistilledToInspire";
import AmazingFlavors from "../AmazingFlavors";
import HorizontalCards from "../HorizontalCards";
import Blogs from "../../Blogs/Blogs";
import Footer from "../Footer";
import aboutBannerImg from "../assets/image.png";
import bannerVideo from "../assets/6a4659235173f72a046a6f90_6a5e3a721a51901c488abdee_banner video _mp4.mp4";
import "../../Aboutus/Abouts.css";

gsap.registerPlugin(ScrollTrigger);

function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
      ScrollTrigger.refresh();
    };
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
          <span className="about-banner-subtitle ">THE STORY BEHIND THE BRAND</span>
          <h1 className="about-banner-title">CRAFTED WITH <br/> CHARACTER</h1>
          <p className="about-banner-desc">
            Discover the spirit of Grand Master's
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="gm-about-main" role="main">
        {/* DISTILLED TO INSPIRE Section: Center-aligned content with video below */}
       

        {/* AMAZING FLAVORS Section: Slanted badge, bold title & 6 flavor ingredients */}
        <AmazingFlavors />

        {/* Process Section (Pinned Horizontal Cards) */}
        <HorizontalCards />

        {/* Blog and Insights Section */}
        <Blogs />

        {/* Brand Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default About;
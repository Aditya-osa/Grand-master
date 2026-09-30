import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import FooterNav from './FooterNav';
import FooterSocial from './FooterSocial';
import FooterBackgroundText from './FooterBackgroundText';
import logoImg from '../../assets/Logo.png';
import './Footer.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Footer() {
  const beamRef = useRef(null);

  useEffect(() => {
    if (!beamRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // GSAP animated glowing gold border beam sweeping smoothly along the top
    const ctx = gsap.context(() => {
      gsap.fromTo(
        beamRef.current,
        { left: '-25%', opacity: 0 },
        {
          left: '105%',
          opacity: 1,
          duration: 3.5,
          repeat: -1,
          repeatDelay: 1.5,
          ease: 'power2.inOut',
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer className="gm-footer-wrapper" role="contentinfo">
      {/* GSAP Animated Top Border Shimmer Beam */}
      <div className="gm-beam-track" aria-hidden="true">
        <div ref={beamRef} className="gm-gold-beam" />
      </div>

      {/* Large Watermark Layer */}
      <FooterBackgroundText />

      <motion.div
        className="gm-footer-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Main 3-Column Grid */}
        <div className="gm-footer-grid">
          {/* Column 1: Brand & Heritage */}
          <motion.div className="gm-footer-col gm-col-brand" variants={itemVariants}>
            <div className="gm-brand-heading">
              <img src={logoImg} alt="Grand Master's Vodka" className="gm-brand-logo-img" />
            </div>
            <div className="gm-brand-tagline">Vodka of Rare Distinction</div>
            <p className="gm-brand-description">
              Distilled with uncompromising precision for those who appreciate pure craftsmanship, master distillation, and timeless elegance.
            </p>
            <FooterSocial />
          </motion.div>

          {/* Column 2: Navigation & The Journal */}
          <motion.div className="gm-footer-col gm-col-nav" variants={itemVariants}>
            <FooterNav />
          </motion.div>

          {/* Column 3: Contact & Headquarters */}
          <motion.div className="gm-footer-col gm-col-contact" variants={itemVariants}>
            <h4 className="gm-col-title">Get in Touch</h4>
            <div className="gm-contact-info">
              {/* Address */}
              <motion.div
                className="gm-info-item"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className="gm-info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="gm-info-content">
                  <span className="gm-info-label">Address</span>
                  <address className="gm-info-value">
                    Head Office- B1, Daffodil Building, Hiranandani Gardens, Powai, Mumbai- 400076.
                  </address>
                </div>
              </motion.div>

              {/* Email Address */}
              <motion.div
                className="gm-info-item"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className="gm-info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="gm-info-content">
                  <span className="gm-info-label">Email Address</span>
                  <a
                    href="mailto:mail@Grandmasters.co"
                    className="gm-info-value gm-interactive-link"
                    aria-label="Send email to mail@Grandmasters.co"
                  >
                    mail@Grandmasters.co
                  </a>
                </div>
              </motion.div>

              {/* Customer Care */}
              <motion.div
                className="gm-info-item"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className="gm-info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="gm-info-content">
                  <span className="gm-info-label">Customer Care</span>
                  <a
                    href="tel:02225709440"
                    className="gm-info-value gm-interactive-link"
                    aria-label="Call customer care at 022-25709440"
                  >
                    022-25709440
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <motion.div className="gm-footer-bottom" variants={itemVariants}>
          <p className="gm-copyright">
            &copy; Copyright Grandmasters Vodka 2018 All Rights Reserved
          </p>
          <p className="gm-creator-wrap">
            <span>Created By</span>
            <motion.a
              href="https://www.dwebbox.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="gm-creator-link"
              aria-label="Website designed and developed by D-WebBox"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>10dumbs</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </motion.a>
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

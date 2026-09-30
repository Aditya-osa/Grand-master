import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import logoImg from '../../assets/Logo.png';

export default function FooterBackgroundText() {
  const logoRef = useRef(null);

  useEffect(() => {
    if (!logoRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(logoRef.current, {
        y: -12,
        scale: 1.02,
        opacity: 0.08,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="gm-footer-bg-logo-wrap" aria-hidden="true">
      <img
        ref={logoRef}
        src={logoImg}
        alt=""
        className="gm-footer-bg-logo"
      />
    </div>
  );
}

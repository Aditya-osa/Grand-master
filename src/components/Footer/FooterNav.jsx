import React from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Our Heritage', href: '#about' },
  { name: 'Collection', href: '#collection' },
  { name: 'Craft & Process', href: '#distillation' },
  { name: 'Signature Mixes', href: '#cocktails' },
  { name: 'Awards', href: '#awards' },
];

export default function FooterNav() {
  return (
    <nav className="gm-footer-nav" aria-label="Footer Navigation">
      <div className="gm-nav-col">
        <h4 className="gm-col-title">Navigation</h4>
        <ul className="gm-link-list">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <motion.a
                href={link.href}
                className="gm-link"
                whileHover={{ x: 6, color: '#e6c88b' }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              >
                {link.name}
              </motion.a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

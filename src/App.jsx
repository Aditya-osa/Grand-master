import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import ContactUs from './Contact/Contact-us';
import BlogPage from './Blogs/BlogPage';

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    const hash = (window.location.hash || '').toLowerCase();
    const pathname = (window.location.pathname || '').toLowerCase();
    if (hash === '#contact' || pathname === '/contact') return 'contact';
    if (hash === '#blogs' || pathname === '/blogs' || hash === '#blog' || pathname === '/blog') return 'blogs';
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = (window.location.hash || '').toLowerCase();
      const pathname = (window.location.pathname || '').toLowerCase();
      if (hash === '#contact' || pathname === '/contact') {
        setCurrentView('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#blogs' || pathname === '/blogs' || hash === '#blog' || pathname === '/blog') {
        setCurrentView('blogs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
        if (hash && hash !== '#contact' && hash !== '#home' && hash !== '#' && hash !== '#blogs' && hash !== '#blog') {
          setTimeout(() => {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      }
    };

    const handleCustomNavigate = (e) => {
      const target = (e.detail || '').replace('#', '').toLowerCase();
      if (target === 'contact') {
        setCurrentView('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (target === 'blogs' || target === 'blog') {
        setCurrentView('blogs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
        if (target === 'home' || !target) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          setTimeout(() => {
            const el = document.getElementById(target) || document.querySelector('#' + target);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    window.addEventListener('gm-navigate', handleCustomNavigate);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
      window.removeEventListener('gm-navigate', handleCustomNavigate);
    };
  }, []);

  if (currentView === 'contact') return <ContactUs />;
  if (currentView === 'blogs') return <BlogPage />;
  return <Home />;
}


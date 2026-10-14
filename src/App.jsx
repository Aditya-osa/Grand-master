import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import ContactUs from './Contact/Contact-us';
import BlogPage from './Blogs/BlogPage';
import BlogDetails from './Blogs/Blog-details';
import About from './Aboutus/About';
import Products from './pages/Products/Products';

const normalizePath = (rawPath) => {
  let p = (rawPath || '').toLowerCase();
  p = p.replace(/\/+$/, '');
  if (p.startsWith('/new')) {
    p = p.slice(4);
  }
  return p || '/';
};

const resolveView = (hashRaw, pathnameRaw) => {
  const hash = (hashRaw || '').toLowerCase();
  const path = normalizePath(pathnameRaw);

  if (hash === '#contact' || path === '/contact') return 'contact';
  if (hash.startsWith('#blog-detail') || (hash.startsWith('#blog-') && hash !== '#blogs') || path.startsWith('/blog-detail')) return 'blog-details';
  if (hash === '#blogs' || path === '/blogs' || hash === '#blog' || path === '/blog') return 'blogs';
  if (hash === '#about' || path === '/about') return 'about';
  if (hash.startsWith('#product') || hash === '#products' || path === '/products' || hash === '#collection' || path === '/collection') return 'products';
  return 'home';
};

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    return resolveView(window.location.hash, window.location.pathname);
  });

  useEffect(() => {
    const handleHashChange = () => {
      const view = resolveView(window.location.hash, window.location.pathname);
      const hash = (window.location.hash || '').toLowerCase();
      
      setCurrentView(view);
      if (view !== 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        if (hash && hash !== '#contact' && hash !== '#home' && hash !== '#' && hash !== '#blogs' && hash !== '#blog' && !hash.startsWith('#blog-') && hash !== '#about' && !hash.startsWith('#product') && hash !== '#collection') {
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
      } else if (target.startsWith('blog-detail') || target === 'blog-details') {
        setCurrentView('blog-details');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (target === 'blogs' || target === 'blog') {
        setCurrentView('blogs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (target === 'about') {
        setCurrentView('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (target === 'products' || target === 'collection' || target.startsWith('product')) {
        setCurrentView('products');
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
  if (currentView === 'blog-details') return <BlogDetails />;
  if (currentView === 'blogs') return <BlogPage />;
  if (currentView === 'about') return <About />;
  if (currentView === 'products') return <Products />;
  return <Home />;
}


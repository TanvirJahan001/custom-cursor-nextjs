'use client';
import { useEffect } from 'react';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import FeaturesSection from './components/FeaturesSection';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';

export default function Home() {
  useEffect(() => {
    // Add smooth scrolling behavior
    const handleClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    // Add click event listeners to all anchor tags
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleClick);
    });

    // Cleanup
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: -16
    },
    open: {
      opacity: 1,
      x: 0
    }
  };

  const links = [
    { href: '/', text: 'Home' },
    { href: '#features', text: 'Features' },
    { href: '#about', text: 'About' },
    { href: '#contact', text: 'Contact' }
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/10 backdrop-blur-md border-b border-white/10 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className={`text-2xl font-bold transition-all duration-300 hover:scale-105 ${
                scrolled ? 'text-white mix-blend-exclusion' : 'text-white'
              }`}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
                Ash
              </span>
              <span className="relative ml-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                  Sams
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transform scale-x-0 transition-transform duration-300 origin-left hover:scale-x-100"></span>
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="group p-2 rounded-lg focus:outline-none hover:bg-white/10 transition-colors duration-300"
            >
              <div className="relative w-6 h-5">
                <span 
                  className={`absolute h-0.5 w-full transform transition-all duration-300 bg-white
                    ${isOpen ? 'rotate-45 top-2' : 'top-0'}`}
                />
                <span 
                  className={`absolute h-0.5 w-full transform transition-all duration-300 bg-white
                    ${isOpen ? 'opacity-0' : 'top-2'}`}
                />
                <span 
                  className={`absolute h-0.5 w-full transform transition-all duration-300 bg-white
                    ${isOpen ? '-rotate-45 top-2' : 'top-4'}`}
                />
              </div>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {links.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg 
                    ${scrolled 
                      ? 'text-indigo-600 hover:bg-white/10 hover:shadow-lg' 
                      : 'text-white hover:bg-white/10'
                    } relative overflow-hidden group`}
                >
                  <span className="relative z-10">{link.text}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden overflow-hidden bg-black/20 backdrop-blur-lg border-t border-white/10"
          >
            <motion.div className="px-4 py-4 space-y-2">
              {links.map((link) => (
                <motion.div
                  key={link.href}
                  variants={itemVariants}
                  className="transform origin-left"
                >
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 text-white hover:bg-white/10 relative overflow-hidden group"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="relative z-10">{link.text}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 
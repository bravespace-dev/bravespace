/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Sun, Moon, Mail, Instagram } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme Toggle Logic
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const isActive = (path: string) => location.pathname === path;

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen selection:bg-brave-pink selection:text-brave-dark dark:selection:bg-brave-accent dark:selection:text-white font-sans overflow-x-hidden transition-colors duration-500">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-brave-night/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 cursor-pointer group">
            <Sparkles className="text-brave-dark dark:text-white group-hover:rotate-12 transition-transform" />
            <span className="font-serif font-bold text-xl tracking-wide text-brave-dark dark:text-white transition-colors">
              THE BRAVESPACE
            </span>
          </Link>
          
          <div className="hidden md:flex items-center justify-end flex-1 ml-8">
            {/* Navigation Pills */}
            <div className="flex items-center bg-white/70 dark:bg-white/10 backdrop-blur-xl rounded-full px-3 py-2 border border-white/50 dark:border-white/20 shadow-lg shadow-black/5 mr-8">
                <Link 
                    to="/" 
                    className={`px-6 py-2.5 rounded-full text-base font-medium transition-all duration-300 
                        ${isActive('/') ? 'bg-white dark:bg-white/10 shadow-sm text-brave-accent dark:text-brave-pink' : 'hover:bg-white/60 dark:hover:bg-white/5 text-brave-dark dark:text-gray-100'}`}
                >
                    Home
                </Link>
                <Link 
                    to="/about" 
                    className={`px-6 py-2.5 rounded-full text-base font-medium transition-all duration-300 
                        ${isActive('/about') ? 'bg-white dark:bg-white/10 shadow-sm text-brave-accent dark:text-brave-pink' : 'hover:bg-white/60 dark:hover:bg-white/5 text-brave-dark dark:text-gray-100'}`}
                >
                    About
                </Link>
                <span className="px-6 py-2.5 rounded-full text-base font-medium text-brave-dark/50 dark:text-gray-500 cursor-not-allowed" title="Coming Soon">
                    Blog
                </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
                <button onClick={toggleTheme} className="p-3 rounded-full bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/20 transition-colors border border-white/30 dark:border-white/10 backdrop-blur-sm group">
                  {darkMode ? <Sun size={20} className="text-yellow-300 group-hover:rotate-45 transition-transform" /> : <Moon size={20} className="text-brave-dark group-hover:-rotate-12 transition-transform" />}
                </button>

                <a 
                  href="mailto:thebravespace24@gmail.com" 
                  className="px-7 py-3 bg-brave-dark dark:bg-white text-white dark:text-brave-dark rounded-full hover:bg-brave-accent dark:hover:bg-brave-pink transition-all duration-300 shadow-xl hover:shadow-brave-accent/20 cursor-pointer flex items-center gap-2 font-medium text-sm tracking-wide"
                >
                  <Mail size={18}/> <span>Contact Us</span>
                </a>
            </div>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button onClick={toggleTheme} className="p-2">
               {darkMode ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} className="text-brave-dark" />}
            </button>
            <button className="text-brave-dark dark:text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] dark:bg-brave-night flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in bg-gradient-to-b from-brave-blue to-brave-pink dark:from-brave-night dark:to-indigo-950 text-brave-dark dark:text-white">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-brave-accent dark:hover:text-brave-pink transition-colors cursor-pointer uppercase">Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-brave-accent dark:hover:text-brave-pink transition-colors cursor-pointer uppercase">About</Link>
            <Link to="/" onClick={() => setMenuOpen(false)} className="opacity-50 cursor-not-allowed uppercase">Blog</Link>
        </div>
      )}

      {children}

      <footer className="bg-brave-dark dark:bg-black text-brave-lavender py-12 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2 flex items-center gap-2 justify-center md:justify-start">
                    <Sparkles size={20}/> The Bravespace
                </div>
                <p className="text-sm opacity-70">Teens collaborating for a positive community impact.</p>
            </div>
            <div className="flex gap-6">
                <a href="https://www.instagram.com/thebravespace._/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram /></a>
                <a href="mailto:thebravespace24@gmail.com" className="hover:text-white transition-colors"><Mail /></a>
            </div>
        </div>
        <div className="text-center mt-12 text-xs opacity-40 border-t border-white/10 pt-8 relative z-10">
            © 2026 The Bravespace. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
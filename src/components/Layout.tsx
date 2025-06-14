
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Instagram, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
  showFooterCTA?: boolean;
}

const Layout = ({ children, showFooterCTA = true }: LayoutProps) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const location = useLocation();

  useEffect(() => {
    // Apply dark mode and save to localStorage
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-pink-200/50 dark:border-gray-700/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-300">
              BRAVESPACE
            </Link>
            
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className={`transition-all duration-300 hover:scale-105 ${isActive('/') ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-primary'}`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`transition-all duration-300 hover:scale-105 ${isActive('/about') ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-primary'}`}
              >
                About
              </Link>
              <Link 
                to="/blogs" 
                className={`transition-all duration-300 hover:scale-105 ${isActive('/blogs') ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-primary'}`}
              >
                Blogs
              </Link>
              
              <div className="flex items-center space-x-3 ml-6">
                <a 
                  href="mailto:thebravespace24@gmail.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <Mail size={16} />
                </a>
                <a 
                  href="https://www.instagram.com/thebravespace._/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <Instagram size={16} />
                </a>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDarkMode(!darkMode)}
                  className="ml-4 hover:scale-105 transition-transform duration-300"
                >
                  {darkMode ? '☀️' : '🌙'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* Call to Action Section */}
      {showFooterCTA && (
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-12 text-white glow pulse-glow">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Every small action creates ripples of positive change. Join us in building a more compassionate world.
              </p>
              <a 
                href="mailto:thebravespace24@gmail.com"
                className="inline-block bg-white text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Get Involved
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold text-gradient mb-4">BRAVESPACE</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Creating ripples of positive change through compassionate youth action. We believe in the power of small acts to transform communities.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="mailto:thebravespace24@gmail.com" 
                  className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 hover:shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <Mail size={20} />
                </a>
                <a 
                  href="https://www.instagram.com/thebravespace._/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 hover:shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gradient">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/blogs" className="text-gray-300 hover:text-white transition-colors">Our Stories</Link></li>
                <li><a href="mailto:thebravespace24@gmail.com" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gradient">Get In Touch</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail size={16} className="text-pink-400" />
                  <a href="mailto:thebravespace24@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                    thebravespace24@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Instagram size={16} className="text-pink-400" />
                  <a 
                    href="https://www.instagram.com/thebravespace._/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    @thebravespace._
                  </a>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-pink-500/20 to-blue-500/20 border border-pink-500/30">
                <p className="text-sm text-gray-300">
                  Have questions or want to get involved? We'd love to hear from you! Reach out through email or Instagram.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2024 Bravespace. All rights reserved.
              </p>
              <div className="flex items-center space-x-2 text-gray-400">
                <span>Made with</span>
                <Heart size={16} className="text-red-400" />
                <span>for a better world</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

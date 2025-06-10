
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Instagram, MapPin, Phone, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
  showFooterCTA?: boolean;
}

const Layout = ({ children, showFooterCTA = true }: LayoutProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
                  href="mailto:hello@bravespace.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <Mail size={16} />
                </a>
                <a 
                  href="https://instagram.com/bravespace" 
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
              <button className="bg-white text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                Get Involved
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold text-gradient mb-4">BRAVESPACE</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Creating ripples of positive change through compassionate youth action.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="mailto:hello@bravespace.org" 
                  className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 hover:shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <Mail size={18} />
                </a>
                <a 
                  href="https://instagram.com/bravespace" 
                  className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 hover:shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gradient">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/blogs" className="text-gray-300 hover:text-white transition-colors">Our Stories</Link></li>
                <li><a href="#programs" className="text-gray-300 hover:text-white transition-colors">Programs</a></li>
                <li><a href="#volunteer" className="text-gray-300 hover:text-white transition-colors">Volunteer</a></li>
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gradient">Our Programs</h4>
              <ul className="space-y-2">
                <li className="text-gray-300">Orphanage Visits</li>
                <li className="text-gray-300">Elder Care</li>
                <li className="text-gray-300">Special Education Support</li>
                <li className="text-gray-300">Community Outreach</li>
                <li className="text-gray-300">Youth Mentorship</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gradient">Get In Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin size={16} className="text-pink-400" />
                  <span className="text-gray-300">Mumbai, Maharashtra, India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={16} className="text-pink-400" />
                  <span className="text-gray-300">hello@bravespace.org</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={16} className="text-pink-400" />
                  <span className="text-gray-300">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock size={16} className="text-pink-400" />
                  <span className="text-gray-300">Mon-Sat: 9AM-6PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4 text-gradient">Stay Connected</h4>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter for updates on our latest initiatives and stories of impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-xl text-gray-800 bg-white"
                />
                <button className="bg-gradient-to-r from-pink-500 to-blue-500 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
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

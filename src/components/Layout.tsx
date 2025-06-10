
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Layout = ({ children }: { children: React.ReactNode }) => {
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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-pink-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gradient">
              BRAVESPACE
            </Link>
            
            <div className="flex items-center space-x-6">
              <Link 
                to="/" 
                className={`transition-colors ${isActive('/') ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-primary'}`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`transition-colors ${isActive('/about') ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-primary'}`}
              >
                About
              </Link>
              <Link 
                to="/blogs" 
                className={`transition-colors ${isActive('/blogs') ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-primary'}`}
              >
                Blogs
              </Link>
              
              <div className="flex items-center space-x-3 ml-6">
                <a 
                  href="mailto:hello@bravespace.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:shadow-lg transition-all duration-300"
                >
                  <Mail size={16} />
                </a>
                <a 
                  href="https://instagram.com/bravespace" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:shadow-lg transition-all duration-300"
                >
                  <Instagram size={16} />
                </a>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDarkMode(!darkMode)}
                  className="ml-4"
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

      {/* Footer */}
      <footer className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border-t border-pink-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © 2024 Bravespace. Making subtle positive impact, one step at a time. 💜
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

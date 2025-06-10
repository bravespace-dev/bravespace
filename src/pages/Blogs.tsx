
import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';

const Blogs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mock blog data - this will be replaced with Supabase data later
  const mockBlogs = [
    {
      id: 1,
      title: "Our First Visit to Sunshine Orphanage",
      excerpt: "Last weekend, our team visited Sunshine Orphanage and what we experienced there changed us forever. The smiles, the laughter, and the pure joy of the children reminded us why we started Bravespace.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop",
      date: "2024-01-15",
      author: "Maya Patel",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Teaching Technology to Our Elders",
      excerpt: "At Grandparents' Haven, we spent an afternoon teaching basic smartphone skills. The eagerness to learn and connect with their grandchildren through video calls was absolutely heartwarming.",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
      date: "2024-01-10",
      author: "Alex Chen",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Celebrating Unique Abilities at Rainbow Special School",
      excerpt: "Every child at Rainbow Special School has something incredible to offer. This week, we organized an art exhibition showcasing their amazing talents, and the results blew us away.",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop",
      date: "2024-01-05",
      author: "Jordan Kim",
      readTime: "6 min read"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Our Journey
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Stories from the heart. Read about our adventures, the people we've met, 
              and the lessons we've learned along the way.
            </p>
          </div>

          {/* Featured Blog */}
          {mockBlogs.length > 0 && (
            <div className="mb-16 fade-in-up">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl overflow-hidden card-glow">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img 
                      src={mockBlogs[0].image} 
                      alt={mockBlogs[0].title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8 md:p-12">
                    <div className="text-sm text-primary font-semibold mb-2">FEATURED STORY</div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
                      {mockBlogs[0].title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {mockBlogs[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        By {mockBlogs[0].author} • {mockBlogs[0].readTime}
                      </div>
                      <button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockBlogs.slice(1).map((blog, index) => (
              <div 
                key={blog.id}
                className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl overflow-hidden card-glow hover:scale-105 transition-all duration-500 fade-in-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {blog.excerpt.slice(0, 120)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {blog.author} • {blog.readTime}
                    </div>
                    <button className="text-primary font-semibold text-sm hover:underline">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-3xl p-12 text-white glow">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Stay Connected
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Get the latest stories from Bravespace delivered to your inbox. 
                Be part of our journey and never miss a moment of impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="flex-1 px-6 py-4 rounded-2xl text-gray-800 font-medium"
                />
                <button className="bg-white text-gray-800 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blogs;

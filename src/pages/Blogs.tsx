
import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  created_at: string;
  featured_image_url?: string;
}

const Blogs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setBlogs(data || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast({
          title: "Error",
          description: "Failed to load blogs. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [toast]);

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen py-20 px-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300">Loading our stories...</p>
          </div>
        </div>
      </Layout>
    );
  }

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

          {blogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-12 card-glow">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                  No Stories Yet
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We're working on sharing our amazing stories with you. Check back soon!
                </p>
                <a 
                  href="mailto:thebravespace24@gmail.com"
                  className="inline-block bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Contact Us
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* Featured Blog */}
              {blogs.length > 0 && (
                <div className="mb-16 fade-in-up">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl overflow-hidden card-glow">
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        {blogs[0].featured_image_url ? (
                          <img 
                            src={blogs[0].featured_image_url} 
                            alt={blogs[0].title}
                            className="w-full h-64 md:h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-64 md:h-full bg-gradient-to-br from-pink-400 to-blue-400 flex items-center justify-center">
                            <span className="text-white text-6xl">📖</span>
                          </div>
                        )}
                      </div>
                      <div className="md:w-1/2 p-8 md:p-12">
                        <div className="text-sm text-primary font-semibold mb-2">FEATURED STORY</div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
                          {blogs[0].title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                          {blogs[0].excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            By {blogs[0].author} • {calculateReadTime(blogs[0].content)}
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
                {blogs.slice(1).map((blog, index) => (
                  <div 
                    key={blog.id}
                    className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl overflow-hidden card-glow hover:scale-105 transition-all duration-500 fade-in-up`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {blog.featured_image_url ? (
                      <img 
                        src={blog.featured_image_url} 
                        alt={blog.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-pink-400 to-blue-400 flex items-center justify-center">
                        <span className="text-white text-4xl">📖</span>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {blog.author} • {calculateReadTime(blog.content)}
                        </div>
                        <button className="text-primary font-semibold text-sm hover:underline">
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Contact CTA */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-12 text-white glow pulse-glow">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Want to Share Your Story?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Have an idea for a blog post or want to contribute to our journey? 
                We'd love to hear from you and share your experiences with our community.
              </p>
              <a 
                href="mailto:thebravespace24@gmail.com?subject=Blog Contribution"
                className="inline-block bg-white text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blogs;

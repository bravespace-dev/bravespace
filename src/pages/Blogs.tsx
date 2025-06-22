
import Layout from '@/components/Layout';
import BlogPost from '@/components/BlogPost';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  created_at: string;
  featured_image_url?: string;
  tags?: Tag[];
}

const Blogs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchBlogs();
    fetchTags();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      setFilteredBlogs(blogs.filter(blog => 
        blog.tags?.some(tag => tag.id === selectedTag)
      ));
    } else {
      setFilteredBlogs(blogs);
    }
  }, [blogs, selectedTag]);

  const fetchTags = async () => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name');

      if (error) {
        throw error;
      }

      setAvailableTags(data || []);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const { data: blogsData, error: blogsError } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (blogsError) {
        throw blogsError;
      }

      // Fetch tags for each blog
      const blogsWithTags = await Promise.all(
        (blogsData || []).map(async (blog) => {
          const { data: tagData, error: tagError } = await supabase
            .from('blog_tags')
            .select(`
              tags (
                id,
                name,
                color
              )
            `)
            .eq('blog_id', blog.id);

          if (tagError) {
            console.error('Error fetching tags for blog:', tagError);
            return { ...blog, tags: [] };
          }

          const tags = tagData?.map(item => item.tags).filter(Boolean) || [];
          return { ...blog, tags };
        })
      );

      setBlogs(blogsWithTags);
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

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleReadMore = (blog: Blog) => {
    setSelectedBlog(blog);
  };

  const handleBackToBlogs = () => {
    setSelectedBlog(null);
  };

  const handleTagFilter = (tagId: string | null) => {
    setSelectedTag(tagId === selectedTag ? null : tagId);
  };

  if (selectedBlog) {
    return (
      <Layout showFooterCTA={false}>
        <BlogPost blog={selectedBlog} onBack={handleBackToBlogs} />
      </Layout>
    );
  }

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

          {/* Tag Filter */}
          {availableTags.length > 0 && (
            <div className="mb-8 text-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Filter by Topic
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant={selectedTag === null ? "default" : "outline"}
                  onClick={() => handleTagFilter(null)}
                  className="rounded-full"
                >
                  All Stories
                </Button>
                {availableTags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={selectedTag === tag.id ? "default" : "outline"}
                    className="cursor-pointer hover:scale-105 transition-transform text-sm px-3 py-1"
                    style={selectedTag === tag.id ? { backgroundColor: tag.color } : {}}
                    onClick={() => handleTagFilter(tag.id)}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-12 card-glow">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                  {selectedTag ? 'No Stories in This Category' : 'No Stories Yet'}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {selectedTag 
                    ? 'Try selecting a different category or view all stories.'
                    : 'We\'re working on sharing our amazing stories with you. Check back soon!'
                  }
                </p>
                {selectedTag ? (
                  <Button
                    onClick={() => setSelectedTag(null)}
                    className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    View All Stories
                  </Button>
                ) : (
                  <a 
                    href="mailto:thebravespace24@gmail.com"
                    className="inline-block bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Contact Us
                  </a>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Featured Blog */}
              {filteredBlogs.length > 0 && (
                <div className="mb-16 fade-in-up">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl overflow-hidden card-glow">
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        {filteredBlogs[0].featured_image_url ? (
                          <img 
                            src={filteredBlogs[0].featured_image_url} 
                            alt={filteredBlogs[0].title}
                            className="w-full h-64 md:h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-64 md:h-full bg-gradient-to-br from-pink-400 to-blue-400 flex items-center justify-center">
                            <span className="text-white text-6xl">📖</span>
                          </div>
                        )}
                      </div>
                      <div className="md:w-1/2 p-8 md:p-12">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="text-sm text-primary font-semibold">FEATURED STORY</div>
                          {filteredBlogs[0].tags && filteredBlogs[0].tags.length > 0 && (
                            <div className="flex gap-1">
                              {filteredBlogs[0].tags.map((tag) => (
                                <Badge key={tag.id} style={{ backgroundColor: tag.color }} className="text-white text-xs">
                                  {tag.name}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
                          {filteredBlogs[0].title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                          {filteredBlogs[0].excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            By {filteredBlogs[0].author} • {calculateReadTime(filteredBlogs[0].content)}
                          </div>
                          <button 
                            onClick={() => handleReadMore(filteredBlogs[0])}
                            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibol hover:shadow-lg transition-all duration-300 hover:scale-105"
                          >
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
                {filteredBlogs.slice(1).map((blog, index) => (
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
                      <div className="flex flex-wrap gap-1 mb-3">
                        {blog.tags?.map((tag) => (
                          <Badge key={tag.id} style={{ backgroundColor: tag.color }} className="text-white text-xs">
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
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
                        <button 
                          onClick={() => handleReadMore(blog)}
                          className="text-primary font-semibold text-sm hover:underline"
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Blogs;

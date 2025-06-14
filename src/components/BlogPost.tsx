
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BlogPostProps {
  blog: {
    id: string;
    title: string;
    content: string;
    author: string;
    created_at: string;
    featured_image_url?: string;
  };
  onBack: () => void;
}

const BlogPost = ({ blog, onBack }: BlogPostProps) => {
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-8 rounded-xl hover:scale-105 transition-transform duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Button>

        <article className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl overflow-hidden card-glow">
          {blog.featured_image_url && (
            <img 
              src={blog.featured_image_url} 
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          )}
          
          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
              {blog.title}
            </h1>
            
            <div className="flex items-center justify-between mb-8 text-gray-600 dark:text-gray-300">
              <span>By {blog.author}</span>
              <span>{new Date(blog.created_at).toLocaleDateString()} • {calculateReadTime(blog.content)}</span>
            </div>
            
            <div 
              className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </article>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-8 text-white glow">
            <h2 className="text-2xl font-bold mb-4">
              Want to Share Your Thoughts?
            </h2>
            <p className="mb-6 opacity-90">
              We'd love to hear your thoughts on this story. Reach out to us!
            </p>
            <a 
              href="mailto:thebravespace24@gmail.com?subject=Thoughts on your blog post"
              className="inline-block bg-white text-gray-800 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

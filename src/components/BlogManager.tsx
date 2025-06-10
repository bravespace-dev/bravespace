
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, Edit, Eye } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  published: boolean;
  created_at: string;
  featured_image_url?: string;
}

const BlogManager = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blogs.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Blog deleted successfully!",
      });

      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog.",
        variant: "destructive",
      });
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .update({ published: !currentStatus })
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: `Blog ${!currentStatus ? 'published' : 'unpublished'} successfully!`,
      });

      fetchBlogs();
    } catch (error) {
      console.error('Error updating blog:', error);
      toast({
        title: "Error",
        description: "Failed to update blog status.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-0 card-glow">
        <CardContent className="p-8 text-center">
          <p>Loading blogs...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-0 card-glow">
      <CardHeader>
        <CardTitle className="text-2xl text-gradient">Manage Blogs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {blogs.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No blogs found. Create your first blog!</p>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {blog.title}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          blog.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {blog.excerpt}
                    </p>
                    <p className="text-xs text-gray-500">
                      By {blog.author} • {new Date(blog.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {blog.featured_image_url && (
                    <img
                      src={blog.featured_image_url}
                      alt={blog.title}
                      className="w-16 h-16 object-cover rounded-lg ml-4"
                    />
                  )}
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => togglePublished(blog.id, blog.published)}
                    className="rounded-lg"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    {blog.published ? 'Unpublish' : 'Publish'}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(blog.id)}
                    className="rounded-lg"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogManager;

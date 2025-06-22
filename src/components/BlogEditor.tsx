
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Tag {
  id: string;
  name: string;
  color: string;
}

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [author, setAuthor] = useState('');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const { toast } = useToast();

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet', 'indent',
    'align', 'link', 'image', 'video',
    'blockquote', 'code-block'
  ];

  useEffect(() => {
    fetchTags();
  }, []);

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

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file);

    if (error) {
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const saveBlogTags = async (blogId: string, tagIds: string[]) => {
    if (tagIds.length === 0) return;

    const blogTags = tagIds.map(tagId => ({
      blog_id: blogId,
      tag_id: tagId
    }));

    const { error } = await supabase
      .from('blog_tags')
      .insert(blogTags);

    if (error) {
      throw error;
    }
  };

  const handlePublish = async () => {
    if (!title || !content || !author) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (title, content, author).",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);

    try {
      let featuredImageUrl = null;

      if (featuredImage) {
        featuredImageUrl = await uploadImage(featuredImage);
      }

      const { data, error } = await supabase
        .from('blogs')
        .insert({
          title,
          content,
          excerpt: excerpt || content.substring(0, 200) + '...',
          author,
          featured_image_url: featuredImageUrl,
          published: true,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Save tags
      if (selectedTags.length > 0) {
        await saveBlogTags(data.id, selectedTags);
      }

      toast({
        title: "Success",
        description: "Blog published successfully!",
      });

      // Reset form
      setTitle('');
      setContent('');
      setExcerpt('');
      setAuthor('');
      setFeaturedImage(null);
      setSelectedTags([]);
    } catch (error) {
      console.error('Error publishing blog:', error);
      toast({
        title: "Error",
        description: "Failed to publish blog. Please try again.",
        variant: "destructive",
      });
    }

    setIsPublishing(false);
  };

  const handleSaveDraft = async () => {
    if (!title || !content || !author) {
      toast({
        title: "Error",
        description: "Please fill in all required fields to save draft.",
        variant: "destructive",
      });
      return;
    }

    try {
      let featuredImageUrl = null;

      if (featuredImage) {
        featuredImageUrl = await uploadImage(featuredImage);
      }

      const { data, error } = await supabase
        .from('blogs')
        .insert({
          title,
          content,
          excerpt: excerpt || content.substring(0, 200) + '...',
          author,
          featured_image_url: featuredImageUrl,
          published: false,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Save tags
      if (selectedTags.length > 0) {
        await saveBlogTags(data.id, selectedTags);
      }

      toast({
        title: "Success",
        description: "Draft saved successfully!",
      });
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: "Error",
        description: "Failed to save draft. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-0 card-glow">
      <CardHeader>
        <CardTitle className="text-2xl text-gradient">Write New Blog</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            placeholder="Blog Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl"
          />
          <Input
            placeholder="Author Name *"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Featured Image
          </label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFeaturedImage(e.target.files?.[0] || null)}
            className="rounded-xl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <Badge
                key={tag.id}
                variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                className="cursor-pointer hover:scale-105 transition-transform"
                style={selectedTags.includes(tag.id) ? { backgroundColor: tag.color } : {}}
                onClick={() => toggleTag(tag.id)}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Excerpt (Optional)
          </label>
          <Textarea
            placeholder="Brief summary of the blog post..."
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="rounded-xl resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Content *
          </label>
          <div className="bg-white rounded-xl">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              style={{ minHeight: '300px' }}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={handleSaveDraft}
            variant="outline"
            className="flex-1 rounded-xl"
          >
            Save as Draft
          </Button>
          <Button
            onClick={handlePublish}
            disabled={isPublishing}
            className="flex-1 rounded-xl bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
          >
            {isPublishing ? 'Publishing...' : 'Publish Blog'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogEditor;

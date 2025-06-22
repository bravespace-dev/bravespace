
-- Create tags table
CREATE TABLE public.tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_tags junction table for many-to-many relationship
CREATE TABLE public.blog_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES public.blogs(id) ON DELETE CASCADE NOT NULL,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE NOT NULL,
  UNIQUE(blog_id, tag_id)
);

-- Enable RLS on new tables
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for tags (public can read, authenticated can manage)
CREATE POLICY "Anyone can view tags" ON public.tags FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage tags" ON public.tags FOR ALL USING (true);

-- Create RLS policies for blog_tags (public can read, authenticated can manage)
CREATE POLICY "Anyone can view blog tags" ON public.blog_tags FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage blog tags" ON public.blog_tags FOR ALL USING (true);

-- Insert some default tags
INSERT INTO public.tags (name, slug, color) VALUES
('Technology', 'technology', '#3B82F6'),
('Lifestyle', 'lifestyle', '#10B981'),
('Travel', 'travel', '#F59E0B'),
('Education', 'education', '#8B5CF6'),
('Health', 'health', '#EF4444'),
('Business', 'business', '#6B7280');

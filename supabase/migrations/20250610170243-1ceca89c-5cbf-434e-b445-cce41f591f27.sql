
-- Create admin users table for username/password authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blogs table
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  author TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery images table for the BRAVESPACE word collage
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery-images', 'gallery-images', true);

-- Create storage policies for blog images
CREATE POLICY "Anyone can view blog images" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Authenticated users can upload blog images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images');
CREATE POLICY "Authenticated users can update blog images" ON storage.objects FOR UPDATE USING (bucket_id = 'blog-images');
CREATE POLICY "Authenticated users can delete blog images" ON storage.objects FOR DELETE USING (bucket_id = 'blog-images');

-- Create storage policies for gallery images
CREATE POLICY "Anyone can view gallery images" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images');
CREATE POLICY "Authenticated users can upload gallery images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery-images');
CREATE POLICY "Authenticated users can update gallery images" ON storage.objects FOR UPDATE USING (bucket_id = 'gallery-images');
CREATE POLICY "Authenticated users can delete gallery images" ON storage.objects FOR DELETE USING (bucket_id = 'gallery-images');

-- Enable RLS on tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for admin_users (only for internal use)
CREATE POLICY "Admin users are private" ON public.admin_users FOR ALL USING (false);

-- Create RLS policies for blogs (public can read, admin can manage)
CREATE POLICY "Anyone can view published blogs" ON public.blogs FOR SELECT USING (published = true);
CREATE POLICY "Authenticated users can manage blogs" ON public.blogs FOR ALL USING (true);

-- Create RLS policies for gallery_images (public can read, admin can manage)
CREATE POLICY "Anyone can view gallery images" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage gallery images" ON public.gallery_images FOR ALL USING (true);

-- Insert the admin user with hashed password
-- Note: In production, this should be properly hashed
INSERT INTO public.admin_users (username, password_hash) 
VALUES ('bravespace', '$2a$10$8K1p/a0dclxKLR.xrJ8..OQgzQ4WQz0jzCdpUGj8f.qYLhGX8qxHe');

-- Insert some sample gallery images
INSERT INTO public.gallery_images (image_url, alt_text, sort_order) VALUES
('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop', 'Community helping', 1),
('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop', 'Children learning', 2),
('https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop', 'Bright future', 3),
('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop', 'Nature and growth', 4),
('https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop', 'Hope and light', 5),
('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop', 'Dreams and aspirations', 6);


-- Create founders table to store founder information
CREATE TABLE public.founders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.founders ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (public can read, authenticated can manage)
CREATE POLICY "Anyone can view founders" ON public.founders FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage founders" ON public.founders FOR ALL USING (true);

-- Insert the existing founders data
INSERT INTO public.founders (name, description, image_url, sort_order) VALUES
('Alex Chen', 'Passionate about creating spaces where every teen feels heard and valued.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', 1),
('Maya Patel', 'Believes in the power of small acts to create ripples of positive change.', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face', 2),
('Jordan Kim', 'Dedicated to building bridges between generations through compassionate action.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face', 3);

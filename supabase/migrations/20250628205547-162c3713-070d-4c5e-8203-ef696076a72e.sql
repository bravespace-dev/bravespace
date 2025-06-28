
-- Create a storage bucket for founder images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('founder-images', 'founder-images', true);

-- Create storage policies for the founder-images bucket
CREATE POLICY "Anyone can view founder images" ON storage.objects 
FOR SELECT USING (bucket_id = 'founder-images');

CREATE POLICY "Anyone can upload founder images" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'founder-images');

CREATE POLICY "Anyone can update founder images" ON storage.objects 
FOR UPDATE USING (bucket_id = 'founder-images');

CREATE POLICY "Anyone can delete founder images" ON storage.objects 
FOR DELETE USING (bucket_id = 'founder-images');

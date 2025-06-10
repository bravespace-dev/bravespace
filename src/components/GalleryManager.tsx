
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, Upload } from 'lucide-react';

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
}

const GalleryManager = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) {
        throw error;
      }

      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast({
        title: "Error",
        description: "Failed to fetch gallery images.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadImages = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please select images to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const uploadPromises = Array.from(selectedFiles).map(async (file, index) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabase.storage
          .from('gallery-images')
          .upload(filePath, file);

        if (error) {
          throw error;
        }

        const { data: publicUrlData } = supabase.storage
          .from('gallery-images')
          .getPublicUrl(filePath);

        // Insert into database
        const { error: dbError } = await supabase
          .from('gallery_images')
          .insert({
            image_url: publicUrlData.publicUrl,
            alt_text: file.name.split('.')[0],
            sort_order: images.length + index + 1,
          });

        if (dbError) {
          throw dbError;
        }
      });

      await Promise.all(uploadPromises);

      toast({
        title: "Success",
        description: "Images uploaded successfully!",
      });

      setSelectedFiles(null);
      fetchImages();
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Error",
        description: "Failed to upload images.",
        variant: "destructive",
      });
    }

    setIsUploading(false);
  };

  const deleteImage = async (id: string, imageUrl: string) => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      // Extract file path from URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];

      // Delete from storage
      await supabase.storage
        .from('gallery-images')
        .remove([fileName]);

      // Delete from database
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Image deleted successfully!",
      });

      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: "Failed to delete image.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-0 card-glow">
      <CardHeader>
        <CardTitle className="text-2xl text-gradient">Manage Gallery Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Upload New Images for BRAVESPACE Collage
            </label>
            <div className="flex gap-4">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setSelectedFiles(e.target.files)}
                className="rounded-xl flex-1"
              />
              <Button
                onClick={uploadImages}
                disabled={isUploading}
                className="rounded-xl bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
              >
                <Upload className="w-4 h-4 mr-2" />
                {isUploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Upload multiple images that will be used in the BRAVESPACE word collage on the homepage
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Current Gallery Images ({images.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.image_url}
                    alt={image.alt_text}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => deleteImage(image.id, image.image_url)}
                    className="absolute inset-0 bg-red-500/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GalleryManager;


import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
}

const ImageCollage = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .order('sort_order', { ascending: true })
          .limit(6);

        if (error) {
          console.error('Error fetching gallery images:', error);
          return;
        }

        setImages(data || []);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex animate-scroll-right space-x-6">
          {/* First set of images */}
          {images.map((image, index) => (
            <div
              key={`first-${image.id}`}
              className="flex-shrink-0 w-64 h-48 rounded-2xl overflow-hidden card-glow"
            >
              <img
                src={image.image_url}
                alt={image.alt_text}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {images.map((image, index) => (
            <div
              key={`second-${image.id}`}
              className="flex-shrink-0 w-64 h-48 rounded-2xl overflow-hidden card-glow"
            >
              <img
                src={image.image_url}
                alt={image.alt_text}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCollage;

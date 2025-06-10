
import { useEffect, useState } from 'react';

const BravespaceWordArt = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Placeholder images for the word collage - these can be updated later
  const collageImages = [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setImageLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative transition-all duration-1000 ${imageLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
      <div className="text-center">
        <div className="inline-block relative">
          {/* The word BRAVESPACE with image collage effect */}
          <div 
            className="text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tight leading-none"
            style={{
              background: `url("data:image/svg+xml,${encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 200">
                  <defs>
                    <pattern id="collage" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                      <image href="${collageImages[0]}" x="0" y="0" width="100" height="100"/>
                      <image href="${collageImages[1]}" x="100" y="0" width="100" height="100"/>
                      <image href="${collageImages[2]}" x="0" y="100" width="100" height="100"/>
                      <image href="${collageImages[3]}" x="100" y="100" width="100" height="100"/>
                    </pattern>
                  </defs>
                  <text x="50%" y="70%" text-anchor="middle" font-family="system-ui" font-weight="900" font-size="120" fill="url(#collage)">
                    BRAVESPACE
                  </text>
                </svg>
              `)}")`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            BRAVESPACE
          </div>
          
          {/* Glow effect overlay */}
          <div className="absolute inset-0 text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tight leading-none text-gradient opacity-30 blur-sm">
            BRAVESPACE
          </div>
        </div>
      </div>
    </div>
  );
};

export default BravespaceWordArt;

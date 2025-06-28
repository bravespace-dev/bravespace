
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import BravespaceWordArt from '@/components/BravespaceWordArt';
import FounderCard from '@/components/FounderCard';
import ImageCollage from '@/components/ImageCollage';
import WhoWeAre from '@/components/WhoWeAre';
import WhatWeDo from '@/components/WhatWeDo';
import { supabase } from '@/integrations/supabase/client';

interface Founder {
  id: string;
  name: string;
  description: string;
  image_url: string;
  sort_order: number;
}

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [founders, setFounders] = useState<Founder[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    fetchFounders();
    return () => clearTimeout(timer);
  }, []);

  const fetchFounders = async () => {
    try {
      const { data, error } = await supabase
        .from('founders')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setFounders(data || []);
    } catch (error) {
      console.error('Error fetching founders:', error);
    }
  };

  return (
    <Layout showFooterCTA={false}>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-6 text-center overflow-hidden">
          <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-gradient leading-tight">
              THE TRAILBLAZERS WELCOME YOU
            </h1>
            
            <div className="my-16">
              <BravespaceWordArt />
            </div>
            
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              A safe and loving place where teenagers come together to make subtle positive impact. 
              We work with orphanages, old age homes, special schools, and communities that need a gentle touch of hope.
            </p>
          </div>
        </section>

        {/* Image Collage Section */}
        <section className="py-12 px-6 overflow-hidden">
          <ImageCollage />
        </section>

        {/* Who We Are Section */}
        <WhoWeAre />

        {/* What We Do Section */}
        <WhatWeDo />

        {/* Founders Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
              Meet Our Founders
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {founders.map((founder, index) => (
                <FounderCard
                  key={founder.id}
                  name={founder.name}
                  description={founder.description}
                  image={founder.image_url}
                  delay={index * 200}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;

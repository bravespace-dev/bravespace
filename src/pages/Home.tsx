
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import BravespaceWordArt from '@/components/BravespaceWordArt';
import FounderCard from '@/components/FounderCard';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const founders = [
    {
      name: "Alex Chen",
      description: "Passionate about creating spaces where every teen feels heard and valued.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
    },
    {
      name: "Maya Patel",
      description: "Believes in the power of small acts to create ripples of positive change.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
    },
    {
      name: "Jordan Kim",
      description: "Dedicated to building bridges between generations through compassionate action.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
    }
  ];

  return (
    <Layout>
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

        {/* What We Do Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-3xl p-12 card-glow">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient">
                What We Do
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30">
                  <div className="text-4xl mb-4">🏠</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Orphanages</h3>
                  <p className="text-gray-600 dark:text-gray-300">Bringing joy, mentorship, and educational support to children who need it most.</p>
                </div>
                
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30">
                  <div className="text-4xl mb-4">👵</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Old Age Homes</h3>
                  <p className="text-gray-600 dark:text-gray-300">Sharing stories, technology lessons, and companionship with our elders.</p>
                </div>
                
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                  <div className="text-4xl mb-4">🎓</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Special Schools</h3>
                  <p className="text-gray-600 dark:text-gray-300">Creating inclusive activities and celebrating the unique abilities of every student.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
              Meet Our Founders
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {founders.map((founder, index) => (
                <FounderCard
                  key={founder.name}
                  name={founder.name}
                  description={founder.description}
                  image={founder.image}
                  delay={index * 200}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-3xl p-12 text-white glow">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Every small action creates ripples of positive change. Join us in building a more compassionate world.
              </p>
              <button className="bg-white text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                Get Involved
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;


import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
              About Bravespace
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Where courage meets compassion, and every small act creates waves of positive change.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-12 mb-12 card-glow fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gradient">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              At Bravespace, we believe that the smallest gestures can create the biggest impact. Our mission is to create a safe, 
              loving community where teenagers can channel their energy, creativity, and passion into meaningful action that touches 
              the lives of those who need it most.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We're not about grand gestures or dramatic changes. We're about the quiet revolution of kindness – the gentle touch 
              that reminds someone they matter, the patient ear that listens without judgment, and the warm smile that says 
              "you belong here."
            </p>
          </div>

          {/* Approach Section */}
          <div className="bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900/30 dark:to-blue-900/30 rounded-3xl p-12 mb-12 card-glow fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gradient">
              Our Approach
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Listen First</h3>
                    <p className="text-gray-600 dark:text-gray-300">We start by understanding the real needs of the communities we serve.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Act with Love</h3>
                    <p className="text-gray-600 dark:text-gray-300">Every action we take is rooted in genuine care and respect for dignity.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Build Bridges</h3>
                    <p className="text-gray-600 dark:text-gray-300">We connect different generations and communities through shared experiences.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400 flex items-center justify-center text-white font-bold text-xl">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Create Ripples</h3>
                    <p className="text-gray-600 dark:text-gray-300">Small acts of kindness inspire others to create their own positive impact.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-12 card-glow fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gradient">
              What We Believe
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">💜</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Empathy First</h3>
                <p className="text-gray-600 dark:text-gray-300">Understanding and feeling with others is the foundation of all meaningful change.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Everyone Matters</h3>
                <p className="text-gray-600 dark:text-gray-300">Every person has inherent worth and deserves to be seen, heard, and valued.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Growth Together</h3>
                <p className="text-gray-600 dark:text-gray-300">We learn and grow through our connections with people from all walks of life.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

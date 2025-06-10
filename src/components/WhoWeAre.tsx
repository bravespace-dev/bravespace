
const WhoWeAre = () => {
  return (
    <section className="py-20 px-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient">
              Who We Are
            </h2>
            <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Bravespace is more than just an organization – we're a movement of compassionate teenagers 
                who believe that every small act of kindness can create ripples of positive change in the world.
              </p>
              <p>
                Founded by a group of passionate young changemakers, we understand the power of youth and 
                the unique perspective that teenagers bring to solving societal challenges. We're not just 
                the leaders of tomorrow; we're making a difference today.
              </p>
              <p>
                Our community is built on the foundation of empathy, inclusivity, and the unwavering belief 
                that everyone deserves love, respect, and opportunities to thrive. We create safe spaces 
                where both our volunteers and the communities we serve feel valued and heard.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-3xl p-1 card-glow">
              <div className="bg-white/95 dark:bg-gray-800/95 rounded-3xl p-8 backdrop-blur-md">
                <h3 className="text-3xl font-bold mb-8 text-center text-gradient">Our Values</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl">💜</span>
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Compassionate Action</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Leading with empathy in everything we do</p>
                  </div>
                  
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl">⚡</span>
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Youth Empowerment</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Unleashing the power of young voices</p>
                  </div>
                  
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl">🤝</span>
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Inclusive Community</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Building bridges across all differences</p>
                  </div>
                  
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-pink-50 dark:from-cyan-900/20 dark:to-pink-900/20 hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl">🌱</span>
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Sustainable Impact</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Creating lasting positive change</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;

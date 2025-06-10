
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
            <div className="bg-gradient-to-br from-pink-400 to-blue-400 rounded-3xl p-8 card-glow">
              <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 backdrop-blur-md">
                <h3 className="text-2xl font-bold mb-6 text-gradient">Our Values</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
                    <span className="text-gray-800 dark:text-white font-medium">Compassionate Action</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
                    <span className="text-gray-800 dark:text-white font-medium">Youth Empowerment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
                    <span className="text-gray-800 dark:text-white font-medium">Inclusive Community</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
                    <span className="text-gray-800 dark:text-white font-medium">Sustainable Impact</span>
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

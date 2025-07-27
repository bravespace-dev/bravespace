const WhatWeDo = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-3xl p-12 card-glow">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient">
            What We Do
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                Orphanages
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Bringing joy, mentorship, and educational support to children
                who need it most.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30">
              <div className="text-4xl mb-4">👵</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                Old Age Homes
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sharing stories, technology lessons, and companionship with our
                elders.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                Special Schools
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Creating inclusive activities and celebrating the unique
                abilities of every student.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              Our Impact Approach
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We, at Bravespace, embark institutions like Orphanages, Cheshire
              homes, Old age homes, Special schools and run initiatives
              targeting varied fields. Some of our initiatives are carried out
              in local schools and through online platforms.
              <p>
                <br></br>
              </p>
              With an emphasis on making current world skills accessible to all,
              for a better living, we focus on spheres like: Financial Literacy,
              Mental well being and Media impact on peers. Through our campaigns
              we aim to connect unique ideas, provide a safe space for
              interaction and make adulting easier.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;

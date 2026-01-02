/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RevealOnScroll from '../components/RevealOnScroll';
import { Globe, UserRound, Settings, BrainCircuit } from 'lucide-react';
import { HeroScene } from '../components/QuantumScene';
import { RealisticWing } from '../components/Visuals';

const About: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if parent has dark mode enabled
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
    
    // Observer to react to theme changes in Layout
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDarkNow = document.documentElement.classList.contains('dark');
          setDarkMode(isDarkNow);
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
      
      {/* Background Scene */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-50">
        <HeroScene darkMode={darkMode} />
      </div>

      {/* Header Section */}
      <section className="container mx-auto px-6 mb-24 text-center relative z-10">
        {/* Blended Logo Background (Watermark) */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center opacity-[0.04] dark:opacity-[0.08] pointer-events-none select-none scale-110 md:scale-150 transition-opacity">
             <div className="flex items-center justify-center blur-[1px]">
                 <RealisticWing side="left" />
                 <span className="font-serif text-6xl md:text-9xl font-bold text-brave-dark dark:text-white uppercase mx-4 tracking-tighter drop-shadow-lg">Bravespace</span>
                 <RealisticWing side="right" />
             </div>
        </div>

        <RevealOnScroll>
            <div className="flex items-center justify-center relative">
                 {/* Left Wing - Visible on larger screens or scaled down */}
                 <div className="hidden md:block opacity-80 scale-75 lg:scale-100 transform -translate-y-2 translate-x-8 z-0">
                    <RealisticWing side="left" />
                 </div>

                 <div className="inline-block relative z-10 mx-4">
                     <h1 className="font-serif text-5xl md:text-7xl font-bold text-brave-dark dark:text-white mb-6 uppercase tracking-wider relative z-10 drop-shadow-sm">About</h1>
                     <motion.div 
                       initial={{ width: 0 }} 
                       animate={{ width: "100%" }} 
                       transition={{ delay: 0.5, duration: 1 }}
                       className="h-1 bg-gradient-to-r from-brave-accent to-brave-blue absolute bottom-0 left-0"
                     />
                </div>

                 {/* Right Wing */}
                 <div className="hidden md:block opacity-80 scale-75 lg:scale-100 transform -translate-y-2 -translate-x-8 z-0">
                    <RealisticWing side="right" />
                 </div>
            </div>
        </RevealOnScroll>
      </section>

      {/* Intro Text - Page 1 */}
      <section className="container mx-auto px-6 mb-32 max-w-5xl relative z-10">
         <RevealOnScroll className="bg-white/40 dark:bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-white/50 dark:border-white/10 shadow-lg text-center">
            <p className="text-xl md:text-2xl leading-loose font-serif text-brave-dark dark:text-gray-200">
               BREWED IN A PUBLIC SCHOOL LIBRARY, <span className="text-brave-accent font-bold">BRAVESPACE</span> WAS AN IDEA PROPOSED BY THREE
               JUNIOR YEAR STUDENTS WHO BELONG TO A MODEST TOWN KNOWN AS <span className="font-bold">JAMSHEDPUR</span>, FAMOUS
               FOR ITS IRON AND STEEL INDUSTRY.
            </p>
            <div className="my-8 h-px bg-brave-dark/10 dark:bg-white/10 w-1/2 mx-auto"></div>
            <p className="text-lg md:text-xl leading-relaxed text-brave-dark/80 dark:text-gray-300 mb-8">
               IN A WORLD WHERE YOUNG VOICES ARE INCREASINGLY MAKING AN IMPACT, BRAVESPACE
               STANDS OUT AS A TRAILBLAZER.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-brave-dark/80 dark:text-gray-300">
               THIS ORGANISATION IS ALL ABOUT MAKING PEERS READY TO FACE THE CHALLENGES OF THE REAL
               WORLD. WHETHER IT IS MENTAL WELLBEING, DEALING WITH THE MEDIA, OR BEING EDUCATED ABOUT
               FINANCIAL FREEDOM AND RESPONSIBILITIES, BRAVESPACE IS HERE TO ASSIST YOU!
            </p>
         </RevealOnScroll>
      </section>

      {/* Mission Section - Page 2 */}
      <section className="container mx-auto px-6 mb-32 relative z-10">
         <RevealOnScroll className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-6xl text-brave-dark dark:text-white mb-4">Our Mission</h2>
            <div className="w-24 h-1 bg-brave-dark dark:bg-white mx-auto opacity-20"></div>
         </RevealOnScroll>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
             {/* Connecting */}
             <RevealOnScroll delay={0.1} className="flex flex-col items-center group">
                 <div className="w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-blue-200 dark:border-blue-700/50">
                    <Globe size={48} className="text-blue-600 dark:text-blue-300" strokeWidth={1.5} />
                 </div>
                 <h3 className="text-2xl font-serif font-bold text-brave-dark dark:text-white tracking-widest uppercase">Connecting</h3>
             </RevealOnScroll>

             {/* Adulting */}
             <RevealOnScroll delay={0.2} className="flex flex-col items-center group">
                 <div className="w-32 h-32 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-purple-200 dark:border-purple-700/50">
                    <UserRound size={48} className="text-purple-600 dark:text-purple-300" strokeWidth={1.5} />
                 </div>
                 <h3 className="text-2xl font-serif font-bold text-brave-dark dark:text-white tracking-widest uppercase">Adulting</h3>
             </RevealOnScroll>

             {/* Challenging Norms */}
             <RevealOnScroll delay={0.3} className="flex flex-col items-center group">
                 <div className="w-32 h-32 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-rose-200 dark:border-rose-700/50">
                    <div className="relative">
                        <Settings size={48} className="text-rose-600 dark:text-rose-300" strokeWidth={1.5} />
                    </div>
                 </div>
                 <h3 className="text-2xl font-serif font-bold text-brave-dark dark:text-white tracking-widest uppercase text-center">Challenging Norms</h3>
             </RevealOnScroll>
         </div>
      </section>

      {/* Vision Section - Page 3 */}
      <section className="container mx-auto px-6 max-w-5xl relative z-10">
         <RevealOnScroll className="relative overflow-hidden bg-gradient-to-br from-brave-lavender to-white dark:from-brave-night dark:to-brave-dark p-10 md:p-16 rounded-[2rem] border border-white dark:border-white/10 shadow-2xl">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
               className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"
             >
                 <BrainCircuit size={300} />
             </motion.div>
             
             <div className="relative z-10 text-center">
                 <motion.h2 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.2, duration: 0.8 }}
                   viewport={{ once: true }}
                   className="font-serif text-4xl md:text-5xl text-brave-dark dark:text-white mb-10"
                 >
                   Our Vision
                 </motion.h2>
                 <motion.p 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.4, duration: 0.8 }}
                   viewport={{ once: true }}
                   className="text-xl md:text-2xl leading-relaxed text-brave-dark/90 dark:text-gray-200 font-light mb-8"
                 >
                    WE, AT THE BRAVESPACE, WANT TO STRIKE A POSITIVE CHANGE IN SOCIETY
                    BY CHALLENGING THE BELIEF THAT YOUNG MINDS HAVE NOTHING ELSE TO CONTRIBUTE THAN JUST
                    ACADEMICS.
                 </motion.p>
                 <motion.p 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.6, duration: 0.8 }}
                   viewport={{ once: true }}
                   className="text-lg md:text-xl leading-relaxed text-brave-dark/80 dark:text-gray-300"
                 >
                    WE INITIATE MEANINGFUL INTERACTIONS TO PREPARE THE PEERS AND
                    OUR COMMUNITY FOR A LIFE OF INDEPENDENCE, RESPONSIBILITY,
                    AND IMPACTFUL PARTICIPATION IN SOCIETY.
                 </motion.p>
             </div>
         </RevealOnScroll>
      </section>

    </div>
  );
};

export default About;
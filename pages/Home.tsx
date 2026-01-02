/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion';
import { HeroScene } from '../components/QuantumScene';
import { InitiativesDiagram, JourneyTimeline } from '../components/Diagrams';
import { RealisticWing, FootprintsPath } from '../components/Visuals';
import { ArrowDown, Sparkles, Users, Calendar, HeartHandshake } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';

// --- INTERACTIVE COMPONENTS ---

const AnimatedCounter = ({ value, label, icon: Icon, suffix = "+" }: { value: number; label: string; icon: any, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <div ref={ref} className="flex flex-col items-center p-4">
      <div className="mb-2 p-3 bg-brave-lavender dark:bg-brave-dark rounded-full text-brave-dark dark:text-brave-lavender shadow-sm transition-colors duration-300">
        <Icon size={24} />
      </div>
      <span className="text-3xl font-serif font-bold text-brave-dark dark:text-white transition-colors duration-300">{displayValue}{suffix}</span>
      <span className="text-sm uppercase tracking-widest text-brave-dark/70 dark:text-gray-400 mt-1 transition-colors duration-300">{label}</span>
    </div>
  );
};

const TooltipWord = ({ word, tooltip }: { word: string; tooltip: string }) => {
  const [show, setShow] = useState(false);
  return (
    <span 
      className="relative inline-block cursor-help font-medium text-brave-accent dark:text-brave-pink border-b border-dashed border-brave-accent/50 dark:border-brave-pink/50"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {word}
      {show && (
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 text-xs text-white bg-brave-dark dark:bg-white dark:text-brave-dark rounded-md shadow-lg text-center z-50 pointer-events-none"
        >
          {tooltip}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-brave-dark dark:border-t-white"></span>
        </motion.span>
      )}
    </span>
  );
};

const FounderCard = ({ name, role, delay }: { name: string, role: string, delay: number }) => {
  return (
    <RevealOnScroll delay={delay} className="flex flex-col group items-center p-8 bg-white/60 dark:bg-white/10 backdrop-blur-md rounded-full aspect-square justify-center border-2 border-white dark:border-white/20 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 w-64 h-64 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-brave-lavender/30 to-brave-pink/30 dark:from-brave-accent/20 dark:to-brave-blue/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10 text-center">
        <div className="w-16 h-16 mx-auto bg-brave-dark dark:bg-white rounded-full mb-4 flex items-center justify-center text-white dark:text-brave-dark text-2xl font-serif transition-colors duration-300">
            {name.charAt(0)}
        </div>
        <h3 className="font-serif text-xl text-brave-dark dark:text-white font-bold mb-2 transition-colors duration-300">{name}</h3>
        <p className="text-xs text-brave-dark/70 dark:text-gray-300 font-bold uppercase tracking-widest leading-relaxed transition-colors duration-300">{role}</p>
      </div>
      <Sparkles className="absolute top-4 right-8 text-brave-dark dark:text-white opacity-20 group-hover:opacity-100 transition-opacity" size={20} />
    </RevealOnScroll>
  );
};

const Home: React.FC = () => {
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

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <header id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene darkMode={darkMode} />
        
        <div className="relative z-10 container mx-auto px-6 text-center h-full flex flex-col justify-center items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center justify-center relative py-12 w-full"
          >
            {/* Logo Composition */}
            <div className="relative flex items-center justify-center w-full mb-2">
                 <RealisticWing side="left" />
                 <div className="flex flex-col items-center z-10 mx-2 md:mx-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="relative"
                    >
                         <div className="absolute -top-16 -right-12 animate-pulse">
                            <svg width="80" height="80" viewBox="0 0 50 50" fill="currentColor" className="text-white dark:text-brave-pink drop-shadow-lg transition-colors">
                                <path d="M25 0L28 22L50 25L28 28L25 50L22 28L0 25L22 22L25 0Z"/>
                            </svg>
                         </div>

                        <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight text-brave-dark dark:text-white uppercase drop-shadow-xl transition-colors duration-500">
                            Bravespace
                        </h1>
                    </motion.div>
                 </div>
                 <RealisticWing side="right" />
            </div>

            {/* Subtitles & Decoration */}
            <div className="relative w-full flex flex-col items-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="text-base md:text-xl font-serif tracking-[0.5em] text-brave-dark dark:text-gray-300 font-bold text-center pl-4 transition-colors duration-500"
                >
                    ORGANISATION
                </motion.div>

                <div className="relative h-24 w-full flex justify-center mt-2">
                    <FootprintsPath />
                </div>
            </div>

            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ 
                    scale: 1.1,
                    textShadow: "0 0 15px rgba(156, 39, 176, 0.5)",
                }}
                transition={{ 
                    delay: 2, 
                    duration: 0.8
                }}
                className="mt-8 text-xl md:text-3xl font-serif italic text-brave-accent dark:text-brave-pink font-semibold uppercase tracking-widest drop-shadow-sm cursor-default transition-colors duration-500"
            >
                Small Acts, Big Impact
            </motion.p>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="absolute bottom-[-100px] md:bottom-[-150px]"
            >
               <a href="#about-summary" onClick={scrollToSection('about-summary')} className="animate-bounce p-4 inline-block bg-white/30 dark:bg-white/10 backdrop-blur-sm rounded-full border border-white/50 dark:border-white/20 cursor-pointer hover:bg-white/60 dark:hover:bg-white/20 transition-colors shadow-sm">
                  <ArrowDown size={32} className="text-brave-dark dark:text-white" />
               </a>
            </motion.div>
          </motion.div>
        </div>
      </header>

      <main>
        {/* About Summary */}
        <section id="about-summary" className="py-32 relative">
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <RevealOnScroll className="text-center max-w-4xl mx-auto mb-20">
               <h2 className="font-serif text-5xl md:text-6xl mb-12 text-brave-dark dark:text-white font-medium transition-colors">Who We Are</h2>
               <p className="text-xl md:text-2xl text-brave-dark/80 dark:text-gray-300 leading-relaxed mb-10 font-light transition-colors">
                 Welcome to <span className="font-bold text-brave-accent dark:text-brave-pink">The Bravespace</span> where <TooltipWord word="teens" tooltip="Young change-makers aged 13-19" /> collaborate with each other to bring subtle, <TooltipWord word="positive impact" tooltip="Creating meaningful change in local communities" /> in the community.
               </p>
               <p className="text-lg md:text-xl text-brave-dark/70 dark:text-gray-400 leading-relaxed transition-colors">
                 We embark institutions like Orphanages, Cheshire homes, Old age homes, Special schools and run initiatives targeting varied fields. Some of our initiatives are carried out in local schools and through online platforms.
               </p>
            </RevealOnScroll>
            
            <RevealOnScroll className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20 bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/50 dark:border-white/10 shadow-sm transition-colors duration-500">
               <AnimatedCounter value={6} label="Team Members" icon={Users} suffix="" />
               <AnimatedCounter value={10} label="Workshops" icon={Calendar} suffix="+" />
               <AnimatedCounter value={350} label="Beneficiaries" icon={HeartHandshake} suffix="+" />
            </RevealOnScroll>

            <InitiativesDiagram />

            <RevealOnScroll delay={0.2} className="text-center max-w-3xl mx-auto mt-20 p-10 bg-gradient-to-br from-white/60 to-white/30 dark:from-white/10 dark:to-transparent backdrop-blur-md rounded-3xl border border-white dark:border-white/10 shadow-lg transition-colors duration-500">
               <p className="italic font-serif text-2xl text-brave-dark dark:text-gray-200 leading-relaxed">
                 "Through our campaigns we aim to connect unique ideas, provide a safe space for interaction and make adulting easier."
               </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* The Journey */}
        <section className="py-24 relative overflow-hidden">
             {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-brave-blue dark:bg-indigo-900/50 blur-[100px] absolute top-10 left-[-100px] mix-blend-multiply dark:mix-blend-screen"></div>
                <div className="w-96 h-96 rounded-full bg-brave-pink dark:bg-purple-900/50 blur-[100px] absolute bottom-10 right-[-100px] mix-blend-multiply dark:mix-blend-screen"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/50 dark:bg-white/10 text-brave-dark dark:text-white text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-white dark:border-white/20">
                            Our Story
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-brave-dark dark:text-white">A Modest Pursuit</h2>
                        <p className="text-lg text-brave-dark/70 dark:text-gray-300 mb-6 leading-relaxed">
                           The Bravespace commenced its journey on 24th June 2024. We started with a small team with three of our co-founders and conducted much of our sessions independently, continuing what we loved to do even when our team was small.
                        </p>
                        <p className="text-lg text-brave-dark/70 dark:text-gray-300 mb-6 leading-relaxed">
                            Now that our team has expanded we have finally decided to establish a presence in social media since we recognize its significance in outreach and networking.
                        </p>
                     </RevealOnScroll>
                     <div>
                        <JourneyTimeline />
                     </div>
                </div>
            </div>
        </section>

        {/* Founders */}
        <section id="founders" className="py-24">
           <div className="container mx-auto px-6 text-center">
                <RevealOnScroll className="mb-16">
                    <h2 className="font-serif text-5xl mb-4 text-brave-dark dark:text-white transition-colors">The Founders</h2>
                    <div className="w-24 h-1 bg-brave-dark dark:bg-white mx-auto opacity-20"></div>
                </RevealOnScroll>
                
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
                    <FounderCard 
                        name="Pragya Sharma" 
                        role="Financial Literacy Head" 
                        delay={0.1} 
                    />
                    <FounderCard 
                        name="Anannya Raj" 
                        role="Media Impact Initiative Head" 
                        delay={0.2} 
                    />
                    <FounderCard 
                        name="Shreya Das" 
                        role="Peer Psychology Head" 
                        delay={0.3} 
                    />
                </div>

                <div className="mt-20">
                    <RevealOnScroll delay={0.4} className="max-w-2xl mx-auto p-8 border border-white dark:border-white/10 bg-white/30 dark:bg-white/5 backdrop-blur-md rounded-2xl relative overflow-hidden transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-50">
                             <Sparkles className="text-brave-dark dark:text-white" />
                        </div>
                        <h3 className="font-serif text-2xl mb-4 text-brave-dark dark:text-white">Join Our Community</h3>
                        <p className="mb-6 text-brave-dark/80 dark:text-gray-300">We aim to share the impact we make through our work even when our steps are not very flashy or extravagant.</p>
                        <a href="mailto:thebravespace24@gmail.com" className="inline-block px-8 py-3 bg-brave-dark dark:bg-white text-white dark:text-brave-dark rounded-full hover:bg-brave-accent dark:hover:bg-brave-pink transition-all duration-300 shadow-lg cursor-pointer font-medium tracking-wide">
                            Get Involved
                        </a>
                    </RevealOnScroll>
                </div>
           </div>
        </section>
      </main>
    </>
  );
};

export default Home;
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useMotionValue, useTransform, Variants } from 'framer-motion';
import { HeroScene } from './components/QuantumScene';
import { InitiativesDiagram, JourneyTimeline } from './components/Diagrams';
import { ArrowDown, Menu, X, Sparkles, Instagram, Mail, Users, Calendar, HeartHandshake, Moon, Sun } from 'lucide-react';

// --- ANIMATION WRAPPER ---
const RevealOnScroll = ({ children, delay = 0, className = "" }: { children?: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

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

// --- REALISTIC WING COMPONENT ---
// Enhanced with more detailed SVG structure and subtle animations
const RealisticWing = ({ side = 'left' }: { side?: 'left' | 'right' }) => {
  const isRight = side === 'right';
  
  // Animation variants for realistic, subtle flapping
  const wingVariants: Variants = {
    animate: {
      rotate: isRight ? [0, 3, 0, -1, 0] : [0, -3, 0, 1, 0], // Reduced rotation range for more realism
      y: [0, -4, 0, -2, 0], // Subtle hover
      scaleY: [1, 0.98, 1, 0.99, 1], // Very slight compression
      scaleX: [1, 1.01, 1, 1.01, 1], // Breathing effect
      transition: {
        duration: 7, // Slower, more majestic
        repeat: Infinity,
        ease: "easeInOut",
        delay: isRight ? 0.4 : 0
      }
    }
  };

  return (
    <motion.div
      variants={wingVariants}
      animate="animate"
      style={{ transformOrigin: isRight ? "10% 80%" : "90% 80%" }}
      className={`relative z-0 ${isRight ? 'ml-[-20px] md:ml-[-50px]' : 'mr-[-20px] md:mr-[-50px]'}`}
    >
      <svg 
        width="300" 
        height="200" 
        viewBox="0 0 300 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={`w-32 md:w-56 lg:w-80 h-auto drop-shadow-2xl filter contrast-125 ${isRight ? 'transform scale-x-[-1]' : ''}`}
      >
        <defs>
          {/* Main Wing Gradient - Pearl/White */}
          <linearGradient id="featherGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

           {/* Inner Feather Gradient - slightly darker */}
           <linearGradient id="innerFeatherGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          
          {/* Soft Glow */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
             <feGaussianBlur stdDeviation="1.5" result="blur"/>
             <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        <g filter="url(#softGlow)">
           {/* Layer 1: Long Primary Feathers (The backmost layer) */}
           <path 
             d="M295 150 C 250 170, 150 160, 40 90 C 20 75, 5 55, 10 40 C 25 50, 60 80, 120 100 C 180 120, 240 140, 295 150 Z" 
             fill="url(#featherGradient)" 
             stroke="#94A3B8" 
             strokeWidth="0.5"
             opacity="0.9"
           />
           {/* Individual Feathers Detail - Primaries */}
           <path d="M295 150 Q 240 135 180 115" stroke="#CBD5E1" strokeWidth="0.5" fill="none"/>
           <path d="M270 145 Q 220 125 160 105" stroke="#CBD5E1" strokeWidth="0.5" fill="none"/>
           <path d="M240 138 Q 200 115 140 95" stroke="#CBD5E1" strokeWidth="0.5" fill="none"/>

           {/* Layer 2: Secondary Feathers (Middle layer) */}
           <path 
             d="M260 125 C 220 135, 130 115, 50 65 C 40 55, 35 45, 45 35 C 60 45, 100 65, 160 85 C 200 100, 240 120, 260 125 Z" 
             fill="#F8FAFC" 
             stroke="#CBD5E1" 
             strokeWidth="0.5"
           />
           {/* Secondary details */}
           <path d="M250 120 Q 200 100 140 80" stroke="#E2E8F0" strokeWidth="0.8" fill="none"/>
           <path d="M220 110 Q 180 90 120 70" stroke="#E2E8F0" strokeWidth="0.8" fill="none"/>

           {/* Layer 3: Coverts (Top fluffy layer near joint) */}
           <path 
             d="M210 100 C 180 105, 110 80, 55 45 C 50 40, 45 30, 55 25 C 75 35, 115 55, 155 70 C 185 80, 205 95, 210 100 Z" 
             fill="#FFFFFF"
             stroke="#E2E8F0"
             strokeWidth="0.5"
           />
           
           {/* Layer 4: Alula/Small feathers at the top joint */}
           <path 
             d="M100 50 C 80 40, 60 30, 60 20 C 70 25, 90 35, 110 45 C 120 50, 110 55, 100 50 Z" 
             fill="#FFFFFF"
           />

           {/* Subtle shading lines for 3D effect */}
           <path d="M80 50 Q 120 70 160 80" stroke="#CBD5E1" strokeWidth="0.5" opacity="0.5" fill="none"/>
        </g>
      </svg>
    </motion.div>
  );
};


const FootprintsPath = () => {
    // 6 steps walking down
    const steps = [0, 1, 2, 3, 4, 5];
    
    return (
    <div className="absolute top-[85%] left-1/2 transform -translate-x-1/2 w-full max-w-[400px] h-32 flex justify-center items-start pointer-events-none z-20">
        {steps.map((i) => {
            const isLeft = i % 2 === 0;
            // Calculations for realistic placement
            const xOffset = isLeft ? -30 : 30; // Distance from center
            const yOffset = i * 45; // Vertical distance between steps
            const rotation = isLeft ? -15 : 15; // Natural foot rotation

            return (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                        opacity: [0, 0.8, 0], // Fade in then out
                        scale: [0.8, 1, 0.95] // Slight squash/stretch
                    }}
                    transition={{ 
                        duration: 2.5,
                        delay: i * 0.5, // Sequential timing
                        repeat: Infinity, 
                        repeatDelay: 2,
                        ease: "easeOut"
                    }}
                    className="absolute"
                    style={{
                        marginLeft: `${xOffset}px`,
                        marginTop: `${yOffset}px`,
                        transform: `rotate(${rotation}deg)`
                    }}
                >
                    {/* Realistic Sole Shape */}
                    <svg width="30" height="45" viewBox="0 0 30 45" fill="currentColor" className="text-brave-dark dark:text-brave-pink opacity-50 drop-shadow-sm">
                        <path d="M10,12 C10,5 13,2 15,2 C17,2 20,5 20,12 C20,16 22,20 22,25 C22,35 20,42 15,42 C10,42 8,35 8,25 C8,20 10,16 10,12 Z" />
                        {/* Heel */}
                        <ellipse cx="15" cy="38" rx="4" ry="3" fill="currentColor" opacity="0.3" />
                    </svg>
                </motion.div>
            );
        })}
    </div>
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

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme Toggle Logic
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
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
    <div className="min-h-screen selection:bg-brave-pink selection:text-brave-dark dark:selection:bg-brave-accent dark:selection:text-white font-sans overflow-x-hidden transition-colors duration-500">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-brave-night/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Sparkles className="text-brave-dark dark:text-white group-hover:rotate-12 transition-transform" />
            <span className="font-serif font-bold text-xl tracking-wide text-brave-dark dark:text-white transition-colors">
              THE BRAVESPACE
            </span>
          </div>
          
          <div className="hidden md:flex items-center justify-end flex-1 ml-8">
            {/* Navigation Pills - Enhanced Size and Realism */}
            <div className="flex items-center bg-white/70 dark:bg-white/10 backdrop-blur-xl rounded-full px-3 py-2 border border-white/50 dark:border-white/20 shadow-lg shadow-black/5 mr-8">
                {['Home', 'About', 'Blog'].map((item) => (
                    <a 
                        key={item}
                        href={`#${item.toLowerCase()}`} 
                        onClick={item === 'Blog' ? (e) => e.preventDefault() : scrollToSection(item.toLowerCase())}
                        className={`px-6 py-2.5 rounded-full text-base font-medium transition-all duration-300 
                            ${item === 'Blog' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white dark:hover:bg-white/10 hover:shadow-sm hover:text-brave-accent dark:hover:text-brave-pink cursor-pointer'}
                            text-brave-dark dark:text-gray-100`}
                        title={item === 'Blog' ? "Coming Soon" : ""}
                    >
                        {item}
                    </a>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
                <button onClick={toggleTheme} className="p-3 rounded-full bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/20 transition-colors border border-white/30 dark:border-white/10 backdrop-blur-sm group">
                  {darkMode ? <Sun size={20} className="text-yellow-300 group-hover:rotate-45 transition-transform" /> : <Moon size={20} className="text-brave-dark group-hover:-rotate-12 transition-transform" />}
                </button>

                <a 
                  href="mailto:thebravespace24@gmail.com" 
                  className="px-7 py-3 bg-brave-dark dark:bg-white text-white dark:text-brave-dark rounded-full hover:bg-brave-accent dark:hover:bg-brave-pink transition-all duration-300 shadow-xl hover:shadow-brave-accent/20 cursor-pointer flex items-center gap-2 font-medium text-sm tracking-wide"
                >
                  <Mail size={18}/> <span>Contact Us</span>
                </a>
            </div>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button onClick={toggleTheme} className="p-2">
               {darkMode ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} className="text-brave-dark" />}
            </button>
            <button className="text-brave-dark dark:text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] dark:bg-brave-night flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in bg-gradient-to-b from-brave-blue to-brave-pink dark:from-brave-night dark:to-indigo-950 text-brave-dark dark:text-white">
            <a href="#home" onClick={scrollToSection('home')} className="hover:text-brave-accent dark:hover:text-brave-pink transition-colors cursor-pointer uppercase">Home</a>
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-brave-accent dark:hover:text-brave-pink transition-colors cursor-pointer uppercase">About</a>
            <a href="#founders" onClick={scrollToSection('founders')} className="hover:text-brave-accent dark:hover:text-brave-pink transition-colors cursor-pointer uppercase">The Team</a>
        </div>
      )}

      {/* Hero Section */}
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
                 {/* Left Wing */}
                 <RealisticWing side="left" />

                 {/* Main Title */}
                 <div className="flex flex-col items-center z-10 mx-2 md:mx-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="relative"
                    >
                         {/* Sparkle Cluster */}
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

                 {/* Right Wing */}
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

                {/* Animated Footprints - Sequential Walking Effect */}
                <div className="relative h-40 w-full flex justify-center mt-2 overflow-hidden">
                    <FootprintsPath />
                </div>
            </div>

            {/* Enlarged Tagline with Pulse Animation */}
            <motion.p 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                    opacity: 1, 
                    scale: [1, 1.05, 1], // Heartbeat pulsing effect
                }}
                transition={{ 
                    delay: 2,
                    scale: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                whileHover={{ 
                    scale: 1.15,
                    textShadow: "0px 0px 15px rgba(156, 39, 176, 0.5)",
                    transition: { duration: 0.3 }
                }}
                className="mt-8 text-xl md:text-3xl font-serif italic text-brave-accent dark:text-brave-pink font-semibold uppercase tracking-widest drop-shadow-sm transition-colors duration-500 cursor-default"
            >
                Small Acts, Big Impact
            </motion.p>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="absolute bottom-[-100px] md:bottom-[-150px]"
            >
               <a href="#about" onClick={scrollToSection('about')} className="animate-bounce p-4 inline-block bg-white/30 dark:bg-white/10 backdrop-blur-sm rounded-full border border-white/50 dark:border-white/20 cursor-pointer hover:bg-white/60 dark:hover:bg-white/20 transition-colors shadow-sm">
                  <ArrowDown size={32} className="text-brave-dark dark:text-white" />
               </a>
            </motion.div>
          </motion.div>
        </div>
      </header>

      <main>
        {/* About / Who We Are */}
        <section id="about" className="py-32 relative">
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
            
            {/* Animated Stats Section */}
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

      <footer className="bg-brave-dark dark:bg-black text-brave-lavender py-12 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2 flex items-center gap-2 justify-center md:justify-start">
                    <Sparkles size={20}/> The Bravespace
                </div>
                <p className="text-sm opacity-70">Teens collaborating for a positive community impact.</p>
            </div>
            <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors"><Instagram /></a>
                <a href="mailto:thebravespace24@gmail.com" className="hover:text-white transition-colors"><Mail /></a>
            </div>
        </div>
        <div className="text-center mt-12 text-xs opacity-40 border-t border-white/10 pt-8 relative z-10">
            © 2024 The Bravespace. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
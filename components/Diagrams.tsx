/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Coins, Smartphone, ArrowRight, Footprints } from 'lucide-react';

// --- INITIATIVE CARDS ---
export const InitiativesDiagram: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  const initiatives = [
    {
      id: 'finance',
      title: 'Financial Literacy',
      icon: <Coins size={32} />,
      desc: 'Making current world skills accessible. We focus on teaching the basics of finance to make adulting easier.',
      color: 'bg-green-50/50 dark:bg-green-900/20 text-green-900 dark:text-green-300 border-green-100 dark:border-green-800'
    },
    {
      id: 'mental',
      title: 'Mental Well Being',
      icon: <Heart size={32} />,
      desc: 'Creating a safe space for interaction. Understanding emotions and providing peer psychology support.',
      color: 'bg-rose-50/50 dark:bg-rose-900/20 text-rose-900 dark:text-rose-300 border-rose-100 dark:border-rose-800'
    },
    {
      id: 'media',
      title: 'Media Impact',
      icon: <Smartphone size={32} />,
      desc: 'Analyzing media impact on peers. Connecting unique ideas through our campaigns and online platforms.',
      color: 'bg-blue-50/50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-300 border-blue-100 dark:border-blue-800'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
      {initiatives.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className={`p-8 rounded-[2rem] border ${item.color} shadow-lg shadow-black/5 dark:shadow-black/20 backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 cursor-pointer transition-all duration-300 relative overflow-hidden group`}
          onClick={() => setActive(active === item.id ? null : item.id)}
        >
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center mb-6 shadow-sm border border-white/50 dark:border-white/10">
                {item.icon}
            </div>
            <h3 className="font-serif text-2xl font-bold mb-3">{item.title}</h3>
            <p className="text-base opacity-80 leading-relaxed font-light">
                {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// --- JOURNEY TIMELINE ---
export const JourneyTimeline: React.FC = () => {
  return (
    <div className="relative py-12 px-4">
      {/* Central Line */}
      <motion.div 
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-brave-dark/10 dark:bg-white/10"
      ></motion.div>

      <div className="space-y-16">
        {/* Start */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col md:flex-row items-center justify-between w-full"
        >
            <div className="order-1 md:w-5/12"></div>
            <div className="z-10 order-1 bg-white dark:bg-gray-800 text-brave-dark dark:text-white rounded-full p-3 border-4 border-brave-lavender dark:border-gray-600 shadow-md transition-colors">
                <Footprints size={20} />
            </div>
            <div className="order-1 md:w-5/12 w-full pl-8 md:pl-0">
                <div className="p-6 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 transition-colors">
                    <span className="text-xs font-bold tracking-widest uppercase text-brave-accent dark:text-brave-pink mb-2 block">24th June 2024</span>
                    <h3 className="font-serif font-bold text-xl mb-2 text-brave-dark dark:text-white">The Beginning</h3>
                    <p className="text-sm text-brave-dark/70 dark:text-gray-300 leading-relaxed">Commenced our journey with "Understanding Emotions", a session on Mental Health Awareness.</p>
                </div>
            </div>
        </motion.div>

        {/* Growth */}
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex flex-col md:flex-row items-center justify-between w-full"
        >
            <div className="order-1 md:w-5/12 w-full pl-8 md:pr-0 md:text-right">
                <div className="p-6 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 transition-colors">
                    <span className="text-xs font-bold tracking-widest uppercase text-brave-accent dark:text-brave-pink mb-2 block">Growth</span>
                    <h3 className="font-serif font-bold text-xl mb-2 text-brave-dark dark:text-white">Expansion</h3>
                    <p className="text-sm text-brave-dark/70 dark:text-gray-300 leading-relaxed">Forged connections, conducted sessions on Media & Financial Literacy, and expanded our network.</p>
                </div>
            </div>
            <div className="z-10 order-1 bg-white dark:bg-gray-800 text-brave-dark dark:text-white rounded-full p-3 border-4 border-brave-pink dark:border-purple-900 shadow-md transition-colors">
                <div className="w-5 h-5 rounded-full bg-brave-dark/20 dark:bg-white/20"></div>
            </div>
            <div className="order-1 md:w-5/12"></div>
        </motion.div>

        {/* Present */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex flex-col md:flex-row items-center justify-between w-full"
        >
            <div className="order-1 md:w-5/12"></div>
            <div className="z-10 order-1 bg-brave-dark dark:bg-white text-white dark:text-brave-dark rounded-full p-3 border-4 border-white dark:border-gray-800 shadow-md transition-colors">
                <ArrowRight size={20} />
            </div>
            <div className="order-1 md:w-5/12 w-full pl-8 md:pl-0">
                <div className="p-6 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 transition-colors">
                     <span className="text-xs font-bold tracking-widest uppercase text-brave-accent dark:text-brave-pink mb-2 block">Today</span>
                    <h3 className="font-serif font-bold text-xl mb-2 text-brave-dark dark:text-white">Social Launch</h3>
                    <p className="text-sm text-brave-dark/70 dark:text-gray-300 leading-relaxed">Establishing our presence to share our modest pursuit and impact with everyone!</p>
                </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

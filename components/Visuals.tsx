/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion, Variants } from 'framer-motion';

// --- REALISTIC WING COMPONENT ---
export const RealisticWing = ({ side = 'left' }: { side?: 'left' | 'right' }) => {
  const isRight = side === 'right';
  
  const wingVariants: Variants = {
    animate: {
      rotate: isRight ? [0, 3, 0, -1, 0] : [0, -3, 0, 1, 0],
      y: [0, -4, 0, -2, 0],
      scaleY: [1, 0.98, 1, 0.99, 1],
      scaleX: [1, 1.01, 1, 1.01, 1],
      transition: {
        duration: 7,
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
          <linearGradient id="featherGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
             <feGaussianBlur stdDeviation="1.5" result="blur"/>
             <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <g filter="url(#softGlow)">
           <path 
             d="M295 150 C 250 170, 150 160, 40 90 C 20 75, 5 55, 10 40 C 25 50, 60 80, 120 100 C 180 120, 240 140, 295 150 Z" 
             fill="url(#featherGradient)" 
             stroke="#94A3B8" 
             strokeWidth="0.5"
             opacity="0.9"
           />
           <path d="M295 150 Q 240 135 180 115" stroke="#CBD5E1" strokeWidth="0.5" fill="none"/>
           <path d="M270 145 Q 220 125 160 105" stroke="#CBD5E1" strokeWidth="0.5" fill="none"/>
           <path d="M240 138 Q 200 115 140 95" stroke="#CBD5E1" strokeWidth="0.5" fill="none"/>
           <path 
             d="M260 125 C 220 135, 130 115, 50 65 C 40 55, 35 45, 45 35 C 60 45, 100 65, 160 85 C 200 100, 240 120, 260 125 Z" 
             fill="#F8FAFC" 
             stroke="#CBD5E1" 
             strokeWidth="0.5"
           />
           <path d="M250 120 Q 200 100 140 80" stroke="#E2E8F0" strokeWidth="0.8" fill="none"/>
           <path d="M220 110 Q 180 90 120 70" stroke="#E2E8F0" strokeWidth="0.8" fill="none"/>
           <path 
             d="M210 100 C 180 105, 110 80, 55 45 C 50 40, 45 30, 55 25 C 75 35, 115 55, 155 70 C 185 80, 205 95, 210 100 Z" 
             fill="#FFFFFF"
             stroke="#E2E8F0"
             strokeWidth="0.5"
           />
           <path 
             d="M100 50 C 80 40, 60 30, 60 20 C 70 25, 90 35, 110 45 C 120 50, 110 55, 100 50 Z" 
             fill="#FFFFFF"
           />
           <path d="M80 50 Q 120 70 160 80" stroke="#CBD5E1" strokeWidth="0.5" opacity="0.5" fill="none"/>
        </g>
      </svg>
    </motion.div>
  );
};

export const FootprintsPath = () => {
    return (
    <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 w-full max-w-[500px] h-24 flex justify-center items-center pointer-events-none z-20 overflow-hidden">
        {[...Array(6)].map((_, i) => {
            const isLeft = i % 2 === 0;
            return (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ 
                        duration: 2, 
                        delay: i * 0.6, 
                        repeat: Infinity, 
                        repeatDelay: 2 
                    }}
                    className="absolute"
                    style={{
                        left: `${10 + i * 14}%`,
                        top: isLeft ? '20%' : '50%',
                        transform: `rotate(${isLeft ? '15deg' : '-15deg'}) scale(0.6)`
                    }}
                >
                     <svg width="40" height="60" viewBox="0 0 40 60" fill="currentColor" className="text-brave-dark dark:text-brave-pink opacity-60 drop-shadow-sm transition-colors duration-300">
                        <path d="M12,18 C12,8 18,2 24,2 C30,2 36,8 36,18 C36,25 34,28 34,32 C34,36 36,38 36,44 C36,52 32,56 24,56 C16,56 12,52 12,44 C12,38 14,36 14,32 C14,28 12,25 12,18 Z" />
                        <ellipse cx="24" cy="48" rx="6" ry="5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                     </svg>
                </motion.div>
            );
        })}
    </div>
    );
};

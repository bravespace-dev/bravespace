/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

const StarIcon = ({ color, size, className }: { color: string; size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color} 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ filter: `drop-shadow(0 0 8px ${color})` }}
  >
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

export const HeroScene: React.FC<{ darkMode?: boolean }> = ({ darkMode }) => {
  const starColor = darkMode ? "#A5B4FC" : "#2D2A4A";
  const accentColor = "#9C27B0";
  const goldColor = "#FFD700";

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Decorative Stars matching original positions roughly */}
      <motion.div 
        initial={{ y: 0, rotate: 0 }}
        animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[20%]"
      >
        <StarIcon color={starColor} size={60} />
      </motion.div>

      <motion.div 
        initial={{ y: 0, rotate: 0 }}
        animate={{ y: [15, -15, 15], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] right-[25%]"
      >
        <StarIcon color={starColor} size={50} />
      </motion.div>

      <motion.div 
        initial={{ y: 0, rotate: 0 }}
        animate={{ y: [-20, 20, -20], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[15%] right-[15%]"
      >
        <StarIcon color={accentColor} size={80} />
      </motion.div>

      {/* Background Particles/Sparkles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute rounded-full"
          initial={{ opacity: 0.1, scale: 0.5 }}
          animate={{ 
            opacity: [0.1, 0.6, 0.1], 
            scale: [0.5, 1, 0.5],
            y: [0, -30, 0] 
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            backgroundColor: i % 3 === 0 ? accentColor : (i % 5 === 0 ? goldColor : starColor),
          }}
        />
      ))}
    </div>
  );
};

export const MagicScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden bg-gradient-to-br from-indigo-900/10 to-purple-900/10 rounded-xl">
       <HeroScene darkMode={true} />
    </div>
  );
};

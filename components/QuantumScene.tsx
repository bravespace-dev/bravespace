/// <reference types="@react-three/fiber" />
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';

const FloatingStar = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      // slower rotation for a more calming effect
      ref.current.rotation.y = t * 0.2; 
      ref.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.1;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* 4-point star shape */}
      <mesh>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} toneMapped={false} />
      </mesh>
    </group>
  );
};

export const HeroScene: React.FC<{ darkMode?: boolean }> = ({ darkMode }) => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none transition-opacity duration-1000">
      {/* Adjusted camera FOV for better mobile scaling */}
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#FFD1DC" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#E0F7FA" />
        
        {/* Removed BackgroundOrbs as requested */}

        {/* The "Trailblazer" Stars - Main decorative elements */}
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8} floatingRange={[-0.2, 0.2]}>
           <FloatingStar position={[-1.5, 1.5, 0]} color="#2D2A4A" scale={0.3} />
           <FloatingStar position={[2, -1, 0.5]} color="#2D2A4A" scale={0.25} />
           <FloatingStar position={[0, 2.5, -2]} color="#9C27B0" scale={0.4} />
        </Float>

        {/* Layer 1: Background Dust - Very subtle, slow, covering the whole screen */}
        <Sparkles 
          count={150} 
          scale={15} 
          size={1.5} 
          speed={0.2} 
          opacity={0.3} 
          color={darkMode ? "#A5B4FC" : "#2D2A4A"} 
        />

        {/* Layer 2: Magical Accent Particles - Slightly larger, slower moving */}
        <Sparkles 
          count={40} 
          scale={10} 
          size={3} 
          speed={0.15} 
          opacity={0.5} 
          color="#9C27B0" 
          noise={0.5}
        />
        
        {/* Layer 3: Gold/Highlight Particles - Very sparse */}
        <Sparkles 
          count={15} 
          scale={8} 
          size={2} 
          speed={0.1} 
          opacity={0.4} 
          color="#FFD700" 
        />
      </Canvas>
    </div>
  );
};

export const MagicScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <Environment preset="sunset" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <FloatingStar position={[0, 0, 0]} color="#fff" scale={1.5} />
            <Sparkles count={20} scale={3} size={5} speed={0.2} opacity={0.8} color="#FFD700" />
        </Float>
      </Canvas>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { Era } from '../types';

interface ProcessingProps {
  era: Era;
}

export const Processing: React.FC<ProcessingProps> = ({ era }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 1 : prev));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-deep-space relative overflow-hidden">
      {/* Vortex Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className={`w-[800px] h-[800px] bg-gradient-to-r ${era.colorFrom} ${era.colorTo} rounded-full blur-[120px] animate-pulse-fast`}></div>
      </div>

      <div className="relative z-10 text-center">
        <div className="mb-12 relative">
          <div className="w-32 h-32 border-4 border-white/10 rounded-full mx-auto animate-spin-slow border-t-neon-blue"></div>
          <div className="absolute inset-0 flex items-center justify-center text-4xl">
            {era.icon}
          </div>
        </div>

        <h2 className="text-4xl font-serif font-bold text-white mb-4 animate-pulse">
          Traveling to {era.name}...
        </h2>
        
        <p className="text-gray-400 font-sans text-lg mb-8">
          Realigning temporal coordinates...
        </p>

        <div className="w-64 h-2 bg-white/10 rounded-full mx-auto overflow-hidden">
          <div 
            className="h-full bg-neon-blue transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

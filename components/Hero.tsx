import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-deep-space z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse-fast"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse-fast" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <Clock className="w-12 h-12 text-neon-blue animate-spin-slow" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-pink mb-6 drop-shadow-2xl">
          ChronoSnap
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 font-sans font-light mb-12 leading-relaxed">
          Step into the Time-Travel Photobooth. <br/>
          Upload your photo and let AI transport you to the Roaring 20s, Ancient Egypt, or a Cyberpunk Future.
        </p>

        <button 
          onClick={onStart}
          className="group relative px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-sans text-lg font-bold tracking-wider transition-all duration-300 backdrop-blur-md flex items-center gap-3 mx-auto hover:scale-105 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]"
        >
          ENTER PHOTOBOOTH
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-8 text-white/30 text-sm font-sans">
        Powered by Google Gemini 2.5
      </div>
    </div>
  );
};

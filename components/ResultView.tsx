import React from 'react';
import { Download, RefreshCcw, Home } from 'lucide-react';
import { Era } from '../types';

interface ResultViewProps {
  originalImage: string;
  generatedImage: string;
  era: Era;
  onReset: () => void;
  onDownload: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ 
  originalImage, 
  generatedImage, 
  era, 
  onReset, 
  onDownload 
}) => {
  return (
    <div className="min-h-screen bg-deep-space p-4 md:p-8 flex flex-col">
      <nav className="flex justify-between items-center mb-8 max-w-6xl mx-auto w-full">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="hidden md:inline">Start Over</span>
        </button>
        <h1 className="text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-pink">
          ChronoSnap
        </h1>
        <div className="w-24"></div> 
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8">
          {/* Original */}
          <div className="flex flex-col items-center">
            <span className="mb-4 font-sans text-gray-400 uppercase tracking-widest text-sm">Present Day</span>
            <div className="relative aspect-[3/4] w-full max-w-md rounded-2xl overflow-hidden border border-white/10 shadow-lg group">
              <img 
                src={originalImage} 
                alt="Original" 
                className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" 
              />
            </div>
          </div>

          {/* Generated */}
          <div className="flex flex-col items-center">
            <span className="mb-4 font-sans text-neon-blue uppercase tracking-widest text-sm font-bold flex items-center gap-2">
              {era.icon} {era.name}
            </span>
            <div className="relative aspect-[3/4] w-full max-w-md rounded-2xl overflow-hidden border-2 border-neon-blue shadow-[0_0_30px_rgba(0,243,255,0.2)]">
              <img 
                src={generatedImage} 
                alt={`Transformed to ${era.name}`} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <span className="text-white font-serif italic text-lg">"{era.name}"</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          <button 
            onClick={onDownload}
            className="flex items-center gap-2 px-8 py-3 bg-neon-blue text-black font-bold rounded-full hover:bg-white transition-colors duration-300 shadow-[0_0_15px_rgba(0,243,255,0.5)]"
          >
            <Download className="w-5 h-5" />
            Save Souvenir
          </button>
          
          <button 
            onClick={onReset}
            className="flex items-center gap-2 px-8 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors duration-300 border border-white/20"
          >
            <RefreshCcw className="w-5 h-5" />
            Time Travel Again
          </button>
        </div>
      </div>
    </div>
  );
};

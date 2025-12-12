import React from 'react';
import { ERAS } from '../constants';
import { Era } from '../types';

interface EraSelectorProps {
  onSelectEra: (era: Era) => void;
  onBack: () => void;
  previewImage: string;
}

export const EraSelector: React.FC<EraSelectorProps> = ({ onSelectEra, onBack, previewImage }) => {
  return (
    <div className="min-h-screen bg-deep-space p-6 flex flex-col">
      <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto w-full">
         <button onClick={onBack} className="text-gray-400 hover:text-white font-sans">
          ← Choose Different Photo
        </button>
        <h2 className="text-2xl md:text-3xl font-serif text-white">Select Your Destination</h2>
        <div className="w-8 md:w-24"></div> {/* Spacer */}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-12">
          {ERAS.map((era) => (
            <button
              key={era.id}
              onClick={() => onSelectEra(era)}
              className="group relative h-64 md:h-80 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-neon-blue text-left"
            >
              {/* Card Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${era.colorFrom} ${era.colorTo} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
              
              {/* Texture/Noise Overlay */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                <div className="absolute top-6 right-6 text-4xl transform group-hover:scale-110 transition-transform duration-300">
                    {era.icon}
                </div>
                
                <h3 className="text-3xl font-serif font-bold text-white mb-2 translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                  {era.name}
                </h3>
                <p className="text-white/80 font-sans text-sm translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                  {era.description}
                </p>
                
                <div className="mt-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/20">
                    Travel Here
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

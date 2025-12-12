import { Era } from './types';

export const ERAS: Era[] = [
  {
    id: '1920s',
    name: 'Roaring 20s',
    description: 'Jazz, flappers, and Art Deco elegance.',
    promptModifier: '1920s Great Gatsby style, art deco aesthetic, black and white or sepia tone, vintage film grain, flapper fashion or tuxedo, luxurious party background',
    colorFrom: 'from-yellow-900',
    colorTo: 'to-yellow-600',
    icon: '🍸'
  },
  {
    id: 'victorian',
    name: 'Victorian Era',
    description: 'Steam, gears, and gothic romance.',
    promptModifier: 'Victorian era portrait, steampunk elements, brass gears, velvet clothing, top hat or corset, foggy London street background, painting style',
    colorFrom: 'from-emerald-900',
    colorTo: 'to-slate-900',
    icon: '🎩'
  },
  {
    id: 'egypt',
    name: 'Ancient Egypt',
    description: 'Pharaohs, gold, and desert mystique.',
    promptModifier: 'Ancient Egyptian style, pharaoh or queen attire, gold jewelry, linen clothes, pyramids and hieroglyphs in background, warm sandstone lighting',
    colorFrom: 'from-orange-900',
    colorTo: 'to-yellow-500',
    icon: '🏺'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk 2099',
    description: 'Neon lights, chrome, and high-tech future.',
    promptModifier: 'Cyberpunk futuristic style, neon lights, cybernetic enhancements, chrome accessories, rain-slicked futuristic city background, blue and pink lighting',
    colorFrom: 'from-purple-900',
    colorTo: 'to-pink-600',
    icon: '🤖'
  },
  {
    id: 'bollywood',
    name: '90s Bollywood',
    description: 'Vibrant colors, dramatic lighting, and romance.',
    promptModifier: '1990s Bollywood movie poster style, vibrant colorful clothing, dramatic soft focus lighting, wind in hair, floral background, cinematic look',
    colorFrom: 'from-rose-900',
    colorTo: 'to-orange-500',
    icon: '🎬'
  },
  {
    id: 'viking',
    name: 'Viking Age',
    description: 'Warriors, fur, and icy landscapes.',
    promptModifier: 'Viking warrior style, fur and leather armor, snowy fjord background, dramatic cold lighting, braided hair, rugged look',
    colorFrom: 'from-slate-800',
    colorTo: 'to-blue-900',
    icon: '⚔️'
  }
];

export const APP_NAME = "ChronoSnap";
export const TAGLINE = "Your Passport Through Time";

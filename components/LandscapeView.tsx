import React from 'react';

interface LandscapeViewProps {
  cityName: string;
}

const LandscapeView: React.FC<LandscapeViewProps> = ({ cityName }) => {
  // Using a hash-like strategy to keep the image consistent for the same city per session
  // or just random every time. Prompt said "Sync load... landscape picture".
  // Picsum doesn't support search queries. 
  // We will use a consistent random seed based on city name length to "fake" consistency, 
  // or just use random for visual variety. Let's use random with a unique ID per city to cache it slightly?
  // No, just a simple random image is fine per the spec "picsum.photos/width/height".
  // However, for UX, I will try to make it static per city selection if possible. 
  // Picsum seed allows this: https://picsum.photos/seed/{seed}/width/height
  
  const seed = cityName.replace(/\s/g, '');
  const imageUrl = `https://picsum.photos/seed/${seed}/800/600`;

  return (
    <div className="w-full max-w-lg mx-auto mb-20 rounded-3xl overflow-hidden shadow-xl aspect-[4/3] relative group">
      <div className="absolute inset-0 bg-slate-200 animate-pulse" />
      <img 
        src={imageUrl} 
        alt={`${cityName} Landscape`} 
        className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-4 left-4 z-30 text-white/90 text-sm font-medium">
        Views of {cityName}
      </div>
    </div>
  );
};

export default LandscapeView;

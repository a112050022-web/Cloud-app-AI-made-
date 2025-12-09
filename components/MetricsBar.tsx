import React from 'react';
import { WeatherData } from '../types';
import { CloudRain, Droplets, Sunset } from 'lucide-react';

interface MetricsBarProps {
  weather: WeatherData;
}

const MetricsBar: React.FC<MetricsBarProps> = ({ weather }) => {
  // Format sunset time (ISO) to HH:MM
  const formatTime = (isoString: string) => {
    if (!isoString) return '--:--';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-lg mx-auto mb-8">
      {/* Precipitation */}
      <div className="flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white">
        <div className="flex items-center text-slate-500 mb-1">
          <CloudRain size={16} className="mr-1" />
          <span className="text-xs font-semibold uppercase tracking-wider">Rain</span>
        </div>
        <span className="text-lg font-bold text-slate-800">{weather.precipitationProbability}%</span>
      </div>

      {/* Humidity */}
      <div className="flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white">
        <div className="flex items-center text-slate-500 mb-1">
          <Droplets size={16} className="mr-1" />
          <span className="text-xs font-semibold uppercase tracking-wider">Humidity</span>
        </div>
        <span className="text-lg font-bold text-slate-800">{weather.humidity}%</span>
      </div>

      {/* Sunset */}
      <div className="flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white">
        <div className="flex items-center text-slate-500 mb-1">
          <Sunset size={16} className="mr-1" />
          <span className="text-xs font-semibold uppercase tracking-wider">Sunset</span>
        </div>
        <span className="text-lg font-bold text-slate-800">{formatTime(weather.sunset)}</span>
      </div>
    </div>
  );
};

export default MetricsBar;

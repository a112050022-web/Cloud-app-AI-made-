import React, { useState, useEffect, useCallback } from 'react';
import { City, WeatherData } from './types';
import { DEFAULT_CITIES, getWeatherIcon } from './constants';
import { fetchWeatherData } from './services/weatherService';
import { getOutfitSuggestion } from './services/geminiService';

// Components
import Dropdown from './components/Dropdown';
import MetricsBar from './components/MetricsBar';
import LandscapeView from './components/LandscapeView';
import OutfitModal from './components/OutfitModal';
import { Sparkles, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentCity, setCurrentCity] = useState<City>(DEFAULT_CITIES[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestion, setSuggestion] = useState<string>('');
  const [aiLoading, setAiLoading] = useState(false);

  // Fetch weather when city changes
  const loadWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(currentCity.latitude, currentCity.longitude);
      setWeather(data);
    } catch (err) {
      setError('Failed to load weather data.');
    } finally {
      setLoading(false);
    }
  }, [currentCity]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  // Handle Get Suggestion
  const handleGetSuggestion = async () => {
    if (!weather) return;
    setIsModalOpen(true);
    setSuggestion('');
    setAiLoading(true);
    
    // Slight delay for smoother UI transition before API call
    setTimeout(async () => {
      const result = await getOutfitSuggestion(currentCity, weather);
      setSuggestion(result);
      setAiLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-2xl flex flex-col items-center relative z-10">
        
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-sm font-bold tracking-[0.3em] text-slate-400 uppercase">Weather</h1>
        </header>

        {/* City Selection */}
        <Dropdown selectedCity={currentCity} onCityChange={setCurrentCity} />

        {/* Loading State or Weather Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center flex-grow py-20">
             <Loader2 className="animate-spin text-blue-500 mb-2" size={40} />
             <p className="text-slate-500 font-medium">Fetching atmosphere...</p>
          </div>
        ) : error ? (
           <div className="text-center py-20 text-red-500">
             <p>{error}</p>
             <button onClick={loadWeather} className="mt-4 text-blue-600 underline">Try Again</button>
           </div>
        ) : weather && (
          <>
            {/* Weather Core Info */}
            <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-center mb-4">
                {getWeatherIcon(weather.weatherCode, weather.isDay)}
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-1">{currentCity.name}</h2>
              <div className="flex justify-center items-start">
                <span className="text-8xl font-bold text-slate-900 tracking-tighter">
                  {Math.round(weather.temperature)}
                </span>
                <span className="text-3xl font-light text-slate-500 mt-2">°</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
               <MetricsBar weather={weather} />
            </div>

            {/* City Image */}
            <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <LandscapeView cityName={currentCity.name} />
            </div>
          </>
        )}
        
        {/* Bottom Placeholder for spacing above fixed button */}
        <div className="h-24"></div>
      </main>

      {/* Persistent Call To Action */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/90 to-transparent z-40 flex justify-center pointer-events-none">
        <button
          onClick={handleGetSuggestion}
          disabled={loading || !weather}
          className="pointer-events-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-lg font-semibold py-4 px-10 rounded-full shadow-xl shadow-slate-900/20 transform transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-sm"
        >
          <Sparkles size={20} className="text-yellow-300" />
          <span>本日穿搭建議</span>
        </button>
      </div>

      {/* Suggestion Modal */}
      <OutfitModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        suggestion={suggestion}
        loading={aiLoading}
      />
    </div>
  );
};

export default App;

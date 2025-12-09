import React from 'react';
import { City } from './types';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  Snowflake, 
  CloudFog, 
  CloudDrizzle,
  Moon
} from 'lucide-react';

export const DEFAULT_CITIES: City[] = [
  { name: 'Taipei City', latitude: 25.0330, longitude: 121.5654, country: 'Taiwan' },
  { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503, country: 'Japan' },
  { name: 'London', latitude: 51.5074, longitude: -0.1278, country: 'UK' },
  { name: 'New York', latitude: 40.7128, longitude: -74.0060, country: 'USA' },
  { name: 'Paris', latitude: 48.8566, longitude: 2.3522, country: 'France' },
  { name: 'Sydney', latitude: -33.8688, longitude: 151.2093, country: 'Australia' },
  { name: 'Reykjavik', latitude: 64.1466, longitude: -21.9426, country: 'Iceland' },
];

export const getWeatherIcon = (code: number, isDay: boolean) => {
  // WMO Weather interpretation codes (WW)
  // 0: Clear sky
  // 1, 2, 3: Mainly clear, partly cloudy, and overcast
  // 45, 48: Fog
  // 51, 53, 55: Drizzle
  // 61, 63, 65: Rain
  // 71, 73, 75: Snow
  // 95, 96, 99: Thunderstorm

  const className = "w-24 h-24 text-blue-600 drop-shadow-lg";

  if (code === 0) return isDay ? <Sun className={className} /> : <Moon className={className} />;
  if (code >= 1 && code <= 3) return <Cloud className={className} />;
  if (code === 45 || code === 48) return <CloudFog className={className} />;
  if (code >= 51 && code <= 57) return <CloudDrizzle className={className} />;
  if (code >= 61 && code <= 67) return <CloudRain className={className} />;
  if (code >= 71 && code <= 77) return <Snowflake className={className} />;
  if (code >= 95) return <CloudLightning className={className} />;
  
  return <Sun className={className} />;
};

export const getWeatherDescription = (code: number): string => {
  if (code === 0) return "Clear Sky";
  if (code >= 1 && code <= 3) return "Cloudy";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 95) return "Thunderstorm";
  return "Clear";
};

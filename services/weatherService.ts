import { WeatherData, WeatherResponse } from '../types';

export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lon.toString(),
      current: 'temperature_2m,relative_humidity_2m,weather_code,is_day,wind_speed_10m',
      hourly: 'precipitation_probability',
      daily: 'sunset',
      timezone: 'auto',
      forecast_days: '1'
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data: WeatherResponse = await response.json();

    // Get current hour index for precipitation
    const currentHour = new Date().getHours();
    // In a real robust app we would match ISO strings, but index matching usually works for 0-23 forecast
    // Open Meteo usually returns 24 hours starting from 00:00 today.
    const precipProb = data.hourly.precipitation_probability[currentHour] || 0;

    return {
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m,
      isDay: data.current.is_day === 1,
      precipitationProbability: precipProb,
      sunset: data.daily.sunset[0] // Returns ISO string like "2023-10-27T17:30"
    };
  } catch (error) {
    console.error("Weather Service Error:", error);
    throw error;
  }
};

// Fallback logic for REST Countries if needed, but we primarily use the constant list for reliability
export const fetchCoordinatesForCity = async (cityName: string): Promise<{lat: number, lon: number} | null> => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/capital/${cityName}`);
    if (!response.ok) return null;
    const data = await response.json();
    if (data && data[0] && data[0].latlng) {
      return { lat: data[0].latlng[0], lon: data[0].latlng[1] };
    }
    return null;
  } catch (e) {
    return null;
  }
};

import { GoogleGenAI } from "@google/genai";
import { WeatherData, City } from "../types";
import { getWeatherDescription } from "../constants";

export const getOutfitSuggestion = async (city: City, weather: WeatherData): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY is missing");
    return "AI configuration is missing. Please check API keys.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const weatherDesc = getWeatherDescription(weather.weatherCode);
  
  const prompt = `
    Act as a professional fashion stylist.
    
    Current situation:
    - City: ${city.name}
    - Temperature: ${weather.temperature}°C
    - Condition: ${weatherDesc}
    - Humidity: ${weather.humidity}%
    - Chance of Rain: ${weather.precipitationProbability}%
    - Wind Speed: ${weather.windSpeed} km/h
    
    Provide a concise, helpful, and stylish outfit suggestion for today in 2-3 sentences. 
    Focus on comfort and utility (e.g., umbrella if raining, layers if cold).
    Use a friendly tone.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Unable to generate suggestion at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't connect to the fashion AI right now. Please dress comfortably!";
  }
};

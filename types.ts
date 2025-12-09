export interface City {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
}

export interface WeatherData {
  temperature: number;
  weatherCode: number;
  precipitationProbability: number;
  humidity: number;
  sunset: string; // ISO string time
  windSpeed: number;
  isDay: boolean;
}

export interface WeatherResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    is_day: number;
    wind_speed_10m: number;
  };
  hourly: {
    time: string[];
    precipitation_probability: number[];
  };
  daily: {
    sunset: string[];
  };
}

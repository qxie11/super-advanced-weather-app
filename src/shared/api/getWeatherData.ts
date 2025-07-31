import { WeatherData } from '@/entities/weather/api/weatherApi';

interface WeatherParams {
  city?: string | null;
  lat?: string | null;
  lon?: string | null;
  units?: string;
  lang?: string;
}

export async function getWeatherData({
  city,
  lat,
  lon,
  units = 'metric',
  lang = 'en',
}: WeatherParams): Promise<WeatherData> {
  const type = 'weather';

  if (!process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY) {
    throw new Error('OpenWeather API key not configured');
  }

  let url = `https://api.openweathermap.org/data/2.5/${type}?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=${units}&lang=${lang}`;

  if (city) {
    url += `&q=${encodeURIComponent(city)}`;
  } else if (lat && lon) {
    url += `&lat=${lat}&lon=${lon}`;
  } else {
    throw new Error('City or coordinates required');
  }

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Weather API error');
  }

  return data;
}

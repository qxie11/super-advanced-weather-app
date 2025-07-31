import { WeatherData } from '@/entities/weather/api/weatherApi';

interface WeatherParams {
  city: string;
  units?: string;
  lang?: string;
}

export async function getWeatherData({
  city,
  units = 'metric',
  lang = 'en',
}: WeatherParams): Promise<WeatherData> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=${units}&lang=${lang}`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error(
      `Weather API error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (data.cod !== 200) {
    throw new Error(data.message || 'Weather API returned error');
  }

  return data;
}

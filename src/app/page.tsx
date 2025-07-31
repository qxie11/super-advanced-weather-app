import { WeatherData } from '@/entities/weather/api/weatherApi';
import HomePage from '@/pages-components/HomePage';

interface PageProps {
  searchParams: { q?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const defaultCity = searchParams.q || 'London';

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/weather?q=${defaultCity}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
  );
  const data = (await response.json()) as WeatherData;

  return <HomePage defaultCityData={data} />;
}

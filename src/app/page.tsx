import { headers as getHeaders } from 'next/headers';

import { WeatherData } from '@/entities/weather/api/weatherApi';
import HomePage from '@/pages-components/HomePage';
import { getWeatherData } from '@/shared/api/getWeatherData';
import { browserLangToOWMLang } from '@/shared/constants/lang';

interface PageProps {
  searchParams: { q?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const defaultCity = searchParams.q || 'London';

  const headersList = await getHeaders();

  const acceptLanguage = headersList.get('accept-language') || 'en';
  const browserLang = acceptLanguage.split(',')[0].split('-')[0];

  const lang =
    browserLangToOWMLang[browserLang as keyof typeof browserLangToOWMLang] ||
    'en';

  let data: WeatherData | null = null;
  try {
    data = await getWeatherData({ city: defaultCity, units: 'metric', lang });
  } catch (error) {
    console.error(error);
  }

  return <HomePage defaultCityData={data as WeatherData} />;
}

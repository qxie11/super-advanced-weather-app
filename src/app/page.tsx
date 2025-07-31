import { headers as getHeaders } from 'next/headers';

import { WeatherData } from '@/entities/weather/api/weatherApi';
import HomePage from '@/pages-components/HomePage';
import { getWeatherData } from '@/shared/api/getWeatherData';
import { browserLangToOWMLang } from '@/shared/constants/lang';

async function getCityFromIp(ip: string | null): Promise<string | null> {
  if (!ip || ip === '::1' || ip.startsWith('127.')) {
    return null; // Localhost, no city to find
  }
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data.city && data.status === 'success' ? data.city : null;
  } catch (error) {
    console.error('IP to city conversion failed:', error);
    return null;
  }
}

export default async function Page() {
  const headersList = await getHeaders();
  const ip =
    headersList.get('x-forwarded-for') || headersList.get('remote-addr');

  const acceptLanguage = headersList.get('accept-language') || 'en';
  const browserLang = acceptLanguage.split(',')[0].split('-')[0];
  const lang =
    browserLangToOWMLang[browserLang as keyof typeof browserLangToOWMLang] ||
    'en';

  let city = 'London'; // Default city
  let data: WeatherData | null = null;

  try {
    const cityFromIp = await getCityFromIp(ip);
    if (cityFromIp) {
      try {
        data = await getWeatherData({
          city: cityFromIp,
          units: 'metric',
          lang,
        });
        city = cityFromIp;
      } catch {
        console.error(
          `Could not get weather for city: ${cityFromIp}. Falling back to London.`
        );
      }
    }

    if (!data) {
      data = await getWeatherData({ city, units: 'metric', lang });
    }
  } catch (error) {
    console.error('Failed to fetch default weather data for London:', error);
  }

  return <HomePage defaultCityData={data as WeatherData} />;
}

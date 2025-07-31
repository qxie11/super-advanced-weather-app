import { headers as getHeaders } from 'next/headers';

import { WeatherData } from '@/entities/weather/api/weatherApi';
import HomePage from '@/pages-components/HomePage';
import { getWeatherData } from '@/shared/api/getWeatherData';
import { browserLangToOWMLang } from '@/shared/constants/lang';

interface PageProps {
  searchParams: { q?: string };
}

async function getCityFromIp(ip: string | null): Promise<string | null> {
  if (!ip || ip === '::1' || ip.startsWith('127.') || ip === 'localhost') {
    return null;
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

function getClientIp(headers: Headers): string | null {
  const forwardedFor = headers.get('x-forwarded-for');
  const realIp = headers.get('x-real-ip');
  const cfConnectingIp = headers.get('cf-connecting-ip');
  const xClientIp = headers.get('x-client-ip');

  if (forwardedFor) {
    const ips = forwardedFor.split(',').map(ip => ip.trim());
    return ips[0];
  }

  return realIp || cfConnectingIp || xClientIp || null;
}

export default async function Page({ searchParams }: PageProps) {
  const headersList = await getHeaders();
  const ip = getClientIp(headersList);

  const acceptLanguage = headersList.get('accept-language') || 'en';
  const browserLang = acceptLanguage.split(',')[0].split('-')[0];
  const lang =
    browserLangToOWMLang[browserLang as keyof typeof browserLangToOWMLang] ||
    'en';

  let data: WeatherData | null = null;

  if (searchParams.q) {
    try {
      data = await getWeatherData({
        city: searchParams.q,
        units: 'metric',
        lang,
      });
    } catch (error) {
      console.error(
        `Could not get weather for query city: ${searchParams.q}`,
        error
      );
    }
  }

  if (!data && ip) {
    try {
      const cityFromIp = await getCityFromIp(ip);
      if (cityFromIp) {
        data = await getWeatherData({
          city: cityFromIp,
          units: 'metric',
          lang,
        });
      }
    } catch (error) {
      console.error('Could not get weather for IP-based city:', error);
    }
  }

  if (!data) {
    try {
      data = await getWeatherData({ city: 'London', units: 'metric', lang });
    } catch (error) {
      console.error('Failed to fetch default weather data for London:', error);
    }
  }

  return <HomePage defaultCityData={data as WeatherData} />;
}

import { headers as getHeaders } from 'next/headers';

import { WeatherData } from '@/entities/weather/api/weatherApi';
import HomePage from '@/pages-components/HomePage';
import { getWeatherData } from '@/shared/api/getWeatherData';

interface PageProps {
  searchParams: { q?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const defaultCity = searchParams.q || 'London';

  const headersList = getHeaders();

  const acceptLanguage = headersList.get('accept-language') || 'en';
  const browserLang = acceptLanguage.split(',')[0].split('-')[0];

  const browserLangToOWMLang = {
    af: 'af',
    sq: 'al',
    ar: 'ar',
    az: 'az',
    bg: 'bg',
    ca: 'ca',
    cs: 'cz',
    da: 'da',
    de: 'de',
    el: 'el',
    en: 'en',
    eu: 'eu',
    fa: 'fa',
    fi: 'fi',
    fr: 'fr',
    gl: 'gl',
    he: 'he',
    hi: 'hi',
    hr: 'hr',
    hu: 'hu',
    id: 'id',
    it: 'it',
    ja: 'ja',
    ko: 'kr',
    la: 'la',
    lt: 'lt',
    mk: 'mk',
    no: 'no',
    nl: 'nl',
    pl: 'pl',
    pt: 'pt',
    ro: 'ro',
    ru: 'ru',
    sv: 'se',
    sk: 'sk',
    sl: 'sl',
    es: 'es',
    sr: 'sr',
    th: 'th',
    tr: 'tr',
    uk: 'ua',
    vi: 'vi',
    zh: 'zh_cn',
    zu: 'zu',
  };

  const lang =
    browserLangToOWMLang[browserLang as keyof typeof browserLangToOWMLang] ||
    'en';

  let data: WeatherData | null = null;
  try {
    data = await getWeatherData({ city: defaultCity, units: 'metric', lang });
  } catch (error) {
    console.error(error);
  }

  return <HomePage defaultCityData={data} />;
}

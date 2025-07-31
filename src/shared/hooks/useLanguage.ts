'use client';

import { useEffect, useState } from 'react';

export function useLanguage() {
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';

    const primaryLang = browserLang.split('-')[0];

    const supportedLanguages = [
      'af',
      'al',
      'ar',
      'az',
      'bg',
      'ca',
      'cz',
      'da',
      'de',
      'el',
      'en',
      'eu',
      'fa',
      'fi',
      'fr',
      'gl',
      'he',
      'hi',
      'hr',
      'hu',
      'id',
      'it',
      'ja',
      'kr',
      'la',
      'lt',
      'mk',
      'no',
      'nl',
      'pl',
      'pt',
      'pt_br',
      'ro',
      'ru',
      'sv',
      'sk',
      'sl',
      'sp',
      'sr',
      'th',
      'tr',
      'ua',
      'vi',
      'zh_cn',
      'zh_tw',
      'zu',
    ];

    const supportedLang = supportedLanguages.includes(primaryLang)
      ? primaryLang
      : 'en';

    setLanguage(supportedLang);
  }, []);

  return language;
}

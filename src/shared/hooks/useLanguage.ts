'use client';

import { useEffect, useState } from 'react';

import { browserLangToOWMLang } from '../constants/lang';

export function useLanguage() {
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';

    const primaryLang = browserLang.split('-')[0];

    const supportedLanguages = Object.values(browserLangToOWMLang);

    const supportedLang = supportedLanguages.includes(primaryLang)
      ? primaryLang
      : 'en';

    setLanguage(supportedLang);
  }, []);

  return language;
}

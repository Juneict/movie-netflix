"use client";

import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(async (locale: string) => {
    try {
      await i18n.changeLanguage(locale);
      localStorage.setItem('i18nextLng', locale);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  }, [i18n]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`text-sm hover:text-gray-200 transition ${
          i18n.language === 'en' ? 'text-white' : 'text-gray-400'
        }`}
      >
        EN
      </button>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => changeLanguage('th')}
        className={`text-sm hover:text-gray-200 transition ${
          i18n.language === 'th' ? 'text-white' : 'text-gray-400'
        }`}
      >
        TH
      </button>
    </div>
  );
}
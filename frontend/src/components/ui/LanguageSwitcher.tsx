"use client";

import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (locale: string) => {
    i18n.changeLanguage(locale);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className="text-sm hover:text-gray-200 transition"
      >
        EN
      </button>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => changeLanguage('th')}
        className="text-sm hover:text-gray-200 transition"
      >
        TH
      </button>
    </div>
  );
}
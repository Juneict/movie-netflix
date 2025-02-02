'use client';

import { I18nextProvider } from 'react-i18next';
import { Suspense } from 'react';
import i18n from './i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback="Loading translations...">
        {children}
      </Suspense>
    </I18nextProvider>
  );
}
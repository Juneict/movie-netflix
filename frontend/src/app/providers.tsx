// app/providers.tsx
'use client';

import I18nProvider from './i18n-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <I18nProvider>{children}</I18nProvider>;
}
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import I18nProvider from './i18n-provider';
import Navbar from '@/components/ui/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nextflix',
  description: 'A Netflix clone built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <I18nProvider>
          <Navbar/>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
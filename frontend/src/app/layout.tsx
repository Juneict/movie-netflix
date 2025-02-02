import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import { Geist, Geist_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: 'Nextflix',
  description: 'A Netflix clone built with Next.js',
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
import type { Metadata, Viewport } from 'next';
import { Syne, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { PortfolioProvider } from '@/context/PortfolioContext';
import Analytics from '@/components/Analytics';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '700'],
});

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Kiki Rachmat',
  description: 'Official portfolio of Kiki Rachmat. Film Producer, Line Producer, and UPM with 45 productions spanning narrative shorts, series, music videos, and commercial brand campaigns across Indonesia.',
  keywords: [
    'Kiki Rachmat', 'Film Producer Jakarta',
    'Line Producer Indonesia', 'Unit Production Manager',
    'Fikri Mulya Rachmat', 'Music Video Producer',
  ],
  authors: [{ name: 'Kiki Rachmat' }],
  openGraph: {
    title: 'Kiki Rachmat',
    description: 'Filmography, narrative films, music videos, and commercial productions.',
    type: 'website',
    locale: 'id_ID',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-gray-100 font-sans min-h-screen antialiased overflow-x-hidden">
        <PortfolioProvider>
          {children}
          <Analytics />
        </PortfolioProvider>
      </body>
    </html>
  );
}

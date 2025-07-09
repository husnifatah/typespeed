import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TypeSpeed - Professional Typing Practice',
  description: 'Test your typing speed and accuracy with various modes including timed tests, word count challenges, and quote typing. Improve your WPM with real-time feedback.',
  keywords: 'typing test, WPM, typing speed, typing practice, accuracy, CPM, keyboard, monkeytype',
  authors: [{ name: 'TypeSpeed' }],
  creator: 'TypeSpeed',
  publisher: 'TypeSpeed',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://typespeed.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://typespeed.vercel.app',
    title: 'TypeSpeed - Professional Typing Practice',
    description: 'Test your typing speed and accuracy with various modes including timed tests, word count challenges, and quote typing.',
    siteName: 'TypeSpeed',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TypeSpeed - Professional Typing Practice',
    description: 'Test your typing speed and accuracy with various modes including timed tests, word count challenges, and quote typing.',
    creator: '@typespeed',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/icon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body 
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
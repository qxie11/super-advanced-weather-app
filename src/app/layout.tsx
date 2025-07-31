import type { Metadata } from 'next';

import { Readex_Pro } from 'next/font/google';

import { Providers } from '@/shared/config/providers';

import './globals.css';

const _readex = Readex_Pro({ subsets: ['latin'], variable: '--font-readex' });

export const metadata: Metadata = {
  title: 'Weather app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body className="font-body antialiased h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

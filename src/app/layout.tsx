import type { Metadata } from 'next';

import { Readex_Pro } from 'next/font/google';

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
        <link
          href="https://fonts.googleapis.com/css2?family=Readex_Pro&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased h-full">{children}</body>
    </html>
  );
}

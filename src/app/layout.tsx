import type { Metadata } from 'next';
import { Playfair_Display, Jost } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
});

const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  title: 'Deutsch Spirits Hub | Bib & Tucker + Redemption',
  description:
    'Explore the heritage and craftsmanship of Bib & Tucker and Redemption whiskeys. Presented by Whisky Advocate in partnership with Deutsch Family Wine & Spirits.',
  keywords: [
    'Bib & Tucker',
    'Redemption Whiskey',
    'Deutsch Family',
    'Whisky Advocate',
    'Bourbon',
    'American Whiskey',
    'Tennessee Whiskey',
    'Rye Whiskey',
    'Premium Spirits',
    'Cocktail Recipes',
  ],
  authors: [{ name: 'Whisky Advocate' }],
  openGraph: {
    title: 'Deutsch Spirits Hub | Bib & Tucker + Redemption',
    description:
      'Discover the bold character of Bib & Tucker and Redemption whiskeys. Explore cocktail recipes, brand stories, and more.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deutsch Spirits Hub | Bib & Tucker + Redemption',
    description:
      'Discover the bold character of Bib & Tucker and Redemption whiskeys.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1E1408',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${jost.variable} antialiased min-h-screen overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}

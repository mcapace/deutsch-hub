import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Deutsch Spirits Collection | Whisky Advocate',
  description:
    'Explore the heritage and craftsmanship of Bib & Tucker and Redemption whiskeys. Presented by Whisky Advocate in partnership with Deutsch Family Wine & Spirits.',
  keywords: [
    'Bib & Tucker',
    'Redemption Whiskey',
    'Deutsch Family',
    'Whisky Advocate',
    'Bourbon',
    'American Whiskey',
    'Premium Spirits',
  ],
  authors: [{ name: 'Whisky Advocate' }],
  openGraph: {
    title: 'Deutsch Spirits Collection | Whisky Advocate',
    description:
      'Discover the bold character of Bib & Tucker and Redemption whiskeys.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deutsch Spirits Collection | Whisky Advocate',
    description:
      'Discover the bold character of Bib & Tucker and Redemption whiskeys.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${playfair.variable}`}>
      <body className="antialiased font-sans bg-[#FAFAF8] text-[#1A1A1A]">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="antialiased"
        style={{
          fontFamily: "Georgia, 'Times New Roman', Times, serif",
          backgroundColor: '#FAFAF8',
          color: '#1A1410',
        }}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Abraham Cohen | Profit & Growth Consulting for Roofing & Home Services',
  description:
    'Helping roofing and home-service owners find hidden profit leaks, fix cash flow, set smarter job pricing, and scale net margins.',
  openGraph: {
    title: 'Abraham Cohen | Profit & Growth Consulting',
    description:
      'Turn revenue growth into real bottom-line profit. Financial strategy, job costing, cash flow forecasting, and commission restructuring for contractors.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abraham Cohen | Profit & Growth Consulting',
    description:
      'Find hidden profit leaks, fix cash flow, and scale roofing & home-service businesses profitably.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body
        className="antialiased text-slate-800 bg-white selection:bg-[#C5A059]/20 selection:text-[#0B1F3A] font-sans"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

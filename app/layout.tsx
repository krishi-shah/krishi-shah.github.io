import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { getSiteConfig } from '@/lib/content';

const siteConfig = getSiteConfig();

export const viewport: Viewport = {
  themeColor: '#090909',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.shortBio,
  keywords: [
    'Machine Learning',
    'Data Science',
    'Applied ML',
    'Generative AI',
    'Portfolio',
    'Python',
    'PyTorch',
    'York University',
    'Internship',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  metadataBase: new URL('https://krishi-shah.github.io'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://krishi-shah.github.io',
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.shortBio,
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.shortBio,
    images: ['/og-image.png'],
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" href="/fonts/anton.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/manrope.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/jetbrains-mono.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/caveat.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var d = document.documentElement;
                  var off = localStorage.getItem('motion') === 'off';
                  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  if (off || reduce) { d.classList.add('motion-off'); return; }
                  // The cursor intro plays once per visit, only when the page opens at the top.
                  // Refreshes, back and forward, links to a section and later page loads render instantly.
                  var nav = performance.getEntriesByType ? performance.getEntriesByType('navigation')[0] : null;
                  var type = nav && nav.type;
                  var seen = sessionStorage.getItem('introSeen') === '1';
                  if (seen || type === 'reload' || type === 'back_forward' || location.hash) return;
                  sessionStorage.setItem('introSeen', '1');
                  d.classList.add('cb-armed');
                  setTimeout(function () {
                    if (!window.__cbReady) d.classList.remove('cb-armed');
                  }, 3500);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans bg-ink text-bone overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

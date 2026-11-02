import type { Metadata, Viewport } from 'next';
import '@fontsource/anton/400.css';
import '@fontsource-variable/manrope';
import '@fontsource/caveat/600.css';
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
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var d = document.documentElement;
                  var off = localStorage.getItem('motion') === 'off';
                  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  if (off || reduce) { d.classList.add('motion-off'); return; }
                  d.classList.add('cb-armed');
                  setTimeout(function () {
                    if (!window.__cbReady) d.classList.remove('cb-armed');
                  }, 6000);
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

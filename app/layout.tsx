import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Next.js Performance Demo - 100/100 Lighthouse Score',
  description: 'Experience lightning-fast product browsing with modern Next.js optimization techniques. Achieving perfect 100/100 Lighthouse scores.',
  keywords: ['Next.js', 'Performance', 'Lighthouse', 'Web Development', 'React', 'Product Search', 'Optimization'],
  authors: [{ name: 'Performance Demo' }],
  creator: 'Next.js Performance Demo',
  publisher: 'Performance Demo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Next.js Performance Demo - 100/100 Lighthouse Score',
    description: 'Experience lightning-fast product browsing with modern optimization techniques',
    type: 'website',
    locale: 'en_US',
    url: 'https://localhost:3000',
    siteName: 'Performance Demo',
  },
  twitter: {
    card: 'summary',
    title: 'Next.js Performance Demo - 100/100 Lighthouse',
    description: 'Lightning-fast product browsing with perfect optimization',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Next.js Performance Demo" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Perf Demo" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Preload critical resources */}
        <link rel="preconnect" href="https://cdn.dummyjson.com" />
        <link rel="preconnect" href="https://i.dummyjson.com" />
      </head>
      <body>
        {children}
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                      // Service worker registered successfully
                    })
                    .catch((registrationError) => {
                      // Service worker registration failed
                    });
                });
              }
            `
          }}
        />
      </body>
    </html>
  )
}
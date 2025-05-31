import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/index';
import StructuredData from './components/StructuredData';


export const metadata: Metadata = {
  title: {
    default: 'WhatBreedIsMyCat - AI Cat Breed Identifier',
    template: '%s | WhatBreedIsMyCat'
  },
  description: 'Discover your cat\'s breed with our AI-powered tool. Upload a photo and get instant results with detailed breed information, traits, and care tips.',
  keywords: [
    'cat breed identifier',
    'AI cat breed',
    'what breed is my cat',
    'cat breed recognition',
    'identify cat breed',
    'cat photo analysis',
    'feline breed detector',
    'cat genetics',
    'pet identification',
    'artificial intelligence cats'
  ],
  authors: [{ name: 'WhatBreedIsMyCat Team' }],
  creator: 'WhatBreedIsMyCat',
  publisher: 'WhatBreedIsMyCat',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://whatbreedismycat.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'WhatBreedIsMyCat - AI Cat Breed Identifier',
    description: 'Discover your cat\'s breed with our AI-powered tool. Upload a photo and get instant results with detailed breed information.',
    url: 'https://whatbreedismycat.com',
    siteName: 'WhatBreedIsMyCat',
    images: [
      {
        url: '/page/catbreed.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Cat Breed Identifier - WhatBreedIsMyCat',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhatBreedIsMyCat - AI Cat Breed Identifier',
    description: 'Discover your cat\'s breed with our AI-powered tool. Upload a photo and get instant results.',
    images: ['/page/catbreed.jpg'],
    creator: '@whatbreedismycat',
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
      { url: '/logo/favicon.ico' },
      { url: '/logo/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/logo/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/logo/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/logo/site.webmanifest',
  verification: {
    google: 'your-google-verification-code', // 请替换为真实的验证码
    yandex: 'your-yandex-verification-code', // 请替换为真实的验证码
    yahoo: 'your-yahoo-verification-code', // 请替换为真实的验证码
  },
}

// //@ts-ignore
// import { HttpsProxyAgent } from 'https-proxy-agent';
// import nodefetch from 'node-fetch';
// const PROXY_URL = process.env.PROXY_URL || '';

// if (typeof window === 'undefined') {
//   // 服务器端
//   global.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
//     console.log("fetch", input, init);
//     const res = await nodefetch(input as string, {
//       ...(init as any),
//       agent: new HttpsProxyAgent(PROXY_URL),
//     });
//     console.log("res", res);
//     return res as unknown as Response;
//   };
// } else {
//   // 客户端
//   const originalFetch = window.fetch;
//   window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
//     console.log("fetch", input, init);
//     const res = await originalFetch(input, init);
//     console.log("res", res);
//     return res;
//   };
// }
// //@ts-ignore




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo/favicon.ico" sizes="any" />
        <StructuredData type="WebSite" />
        <StructuredData type="Organization" />
        </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
} 
import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/index';


export const metadata: Metadata = {
  title: 'WhatBreedIsMyCat - AI Cat Breed Identifier',
  description: 'Discover your cat\'s breed with our AI-powered tool. Upload a photo and get instant results with detailed breed information.',
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
        </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
} 
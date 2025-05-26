import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/index';
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
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
} 
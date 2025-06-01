import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/index';



export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/logo/favicon.ico' },
      { url: '/logo/logo-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/logo/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/logo/favicon.svg', type: 'image/svg+xml' },
    ],
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
        <link rel="manifest" href="/logo/site.webmanifest" />
        
        {/* FontAwesome CSS */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
        
        {/* Clarity tracking code for https://whatbreedismycat.app/ */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "rs3n8wyq5g");
            `
          }}
        />
        
        {/* Ahrefs analytics */}
        <script 
          src="https://analytics.ahrefs.com/analytics.js" 
          data-key="7dOKmxxzXH22F/Ozh9yyRw" 
          async 
        />
      </head>
      <body >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
} 
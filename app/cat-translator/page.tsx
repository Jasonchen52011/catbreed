import CatTranslatorTool from './tool-page';
import Navbar from '../components/Navbar/index';
import ExploreOurAiTools from '../components/explore-our-ai-tools';
import HowToSection from '../components/HowToSection';
import UserScenarios from '../components/UserScenarios';
import UserReviewsSection from '../components/UserReviewsSection';
import WhyChooseSection from '../components/WhyChooseSection';
import FAQ from '../components/FAQ';
import CallToAction from '../components/call-to-action';
import UniqueSection from '../components/UniqueSection';
import config from './config.json';
import { Metadata } from 'next';
import Script from 'next/script';


export const metadata: Metadata = {
  title: config.metadata.title,
  description: config.metadata.description,
  metadataBase: new URL('https://whatbreedismycat.app'),
  alternates: {
    canonical: config.metadata.canonical
  },
  keywords: config.metadata.keywords,
  openGraph: {
    url: config.metadata.openGraph.url,
    title: config.metadata.openGraph.title,
    description: config.metadata.openGraph.description,
    images: config.metadata.openGraph.images,
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@whatbreedismycat',
    images: [config.metadata.openGraph.images[0].url],
    creator: '@whatbreedismycat'
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' },
      { url: '/logo.png', type: 'image/png', sizes: 'any' },
    ],
  },
};



// 使用相关工具配置
const toolNames = config.relatedTools;

// 结构化数据配置
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Cat Translator Online',
  url: 'https://whatbreedismycat.app/cat-translator',
  description: config.metadata.description,
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Windows, MacOS, Linux, ChromeOS, Android, iOS, iPadOS',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  brand: {
    '@type': 'Brand',
    name: 'whatbreedismycat.app'
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  author: {
    '@type': 'Organization',
    name: 'whatbreedismycat.app',
    url: 'https://whatbreedismycat.app'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    worstRating: '1',
    bestRating: '5',
    ratingCount: '1624'
  }
};

const organizationData = {
  '@type': 'Organization',
  name: 'whatbreedismycat.app',
  url: 'https://whatbreedismycat.app/cat-translator',
  logo: {
    '@type': 'ImageObject',
    inLanguage: 'en-US',
    '@id': 'https://whatbreedismycat.app/logo/logo-96x96.png',
    url: 'https://whatbreedismycat.app/logo/logo-96x96.png',
    width: '192',
    height: '192',
    caption: 'Breed.dog Logo'
  }
};

const breadcrumbData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://whatbreedismycat.app'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Cat Translator Online',
      item: 'https://whatbreedismycat.app/cat-translator'
    }
  ]
};

export default function CatTranslatorOnlinePage() {
  return (
    <>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <Script
        id="schema-org-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(config.structuredData.faq) }}
      />
      <Navbar />
      
      {/* tool Section */}
      <section className="container max-w-5xl mx-auto p-6 mt-10">
        <header className="text-center">
          <h1 className="text-2xl md:text-6xl font-bold text-gary-800">{config.seo.h1}</h1>
          <p className="text-lg text-gary-800 mt-4 mb-4 max-w-4xl mx-auto">
            {config.seo.h1Description}
          </p>

          <img
            src="/page/cat-translator.webp"
            alt="Cat Translator Online"
            width={600}
            height={400}
            className="rounded-lg mx-auto shadow-lg"
          />
        </header>
      </section>
      
      {/* Main Tool Section */}
      <CatTranslatorTool />
      
      {/* Unique Sections - 放在 How to 上面 */}
      <div className=" mb-16">
        {config.uniqueSections.map((section, index) => {
          // 使用特定图片：第一个section用meow-pitch.webp，第二个section用cat-body-language.webp
          const catImages = ['/page/meow-pitch.webp', '/page/cat-body-language.webp'];
          // 为第二个section设置特殊的CSS类
          const isSecondSection = index === 1;
          return (
            <div
              key={index}
              className={isSecondSection ? "[&_img]:!h-96 [&_img]:!object-contain [&_img]:!bg-gray-50" : ""}
            >
              <UniqueSection
                title={section.title}
                description={section.description}
                image={{
                  src: catImages[index] || '/page/meow-pitch.webp',
                  alt: section.title
                }}
                imagePosition={index % 2 === 0 ? 'right' : 'left'}
              />
            </div>
          );
        })}
      </div>

      {/* How to Use Section */}
      <div className="mt-20 mb-16">
        <HowToSection
          title={config.howToUse.title}
          subtitle={config.howToUse.description}
          steps={config.howToUse.steps}
          image={{
            src: "/page/cat-translator-how-to.webp",
            alt: "How to use cat translator online",
            width: 500,
            height: 400
          }}
          ctaText="Try Cat Translator Now"
        />
      </div>
      
      {/* User Scenarios Section */}
      <div className="mt-20 mb-16">
        <UserScenarios
          title="Use Cat Translator Online in Happy Moments"
          description="Discover how our cat translator brings joy and connection to special moments with your furry friend"
          scenarios={config.userScenarios}
          buttonText="Try Cat Translator Now"
        />
      </div>

      {/* Why Choose Section */}
      <div className="mt-20 mb-16">
        <WhyChooseSection 
          whyChooseSection={config.whyChoose}
          testimonialsConfig={[]}
        />
      </div>

      {/* User Reviews Section */}
      <div className="mt-20 mb-16">
        <UserReviewsSection
          title="What Users Are Saying About Cat Translator Online"
          description="Discover how our users are using the Cat Translator Online to connect with their pets and create memorable moments."
          reviews={config.userReviews}
          buttonText="Try Cat Translator Now"
        />
      </div>


      {/* FAQ Section */}
      <div className="mt-20 mb-16">
        <FAQ 
          faqs={config.faq}
          title="FAQ for Cat Translator Online"
        />
      </div>

      {/* CTA Section */}
      <div className="mt-20 mb-16">
        <CallToAction 
          title={config.footerCTA.title}
          description={config.footerCTA.description}
          buttonText="Try Cat Translator Now"
        />
      </div>
    </>
  );
}




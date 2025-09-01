import CatCarousel from './CatBreedIdentifier/CatCarousel';
import CatBreedIdentifier from './CatBreedIdentifier/index';
import FAQ from './components/FAQ';
import TestimonialCarousel from './components/TestimonialCarousel';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Head from 'next/head';
import { Metadata } from 'next';
import config from '../config.json';


export const metadata: Metadata = {
  title: config.metadata.title,
  description: config.metadata.description,
  metadataBase: new URL(config.metadata.url),
  alternates: {
    canonical: config.metadata.url
  },
  openGraph: config.metadata.openGraph,
  twitter: config.metadata.twitter,
  icons: config.metadata.icons,
};

export default function HomePage() {
  const { content } = config;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(config.structuredData.webApplication),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(config.structuredData.organization),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(config.structuredData.faqPage),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(config.structuredData.breadcrumb),
        }}
      />
      
      <div className=" min-h-screen bg-white flex flex-col">

            <CatBreedIdentifier />
            <CatCarousel />

            {/* How Our AI Finds Your Cat's Breed Section */}
            <section id="how-it-works" className="py-8 sm:py-16 px-4 max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-bold text-center mb-12 text-gray-800">
                {content.sections.howAIWorks.title}
              </h2>
              
              <div className="grid md:grid-cols-2  gap-8 items-center">
                {/* Left side - Image placeholder */}
                <div className="h-100 rounded-lg overflow-hidden">
                  <img
                    src={content.sections.howAIWorks.image}
                    alt={content.sections.howAIWorks.imageAlt}
                    width={500}
                    height={800}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                {/* Right side - Text content */}
                <div className="space-y-4 text-gray-700 text-base leading-relaxed">
                  {content.sections.howAIWorks.content.map((paragraph, index) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                  ))}
                </div>
              </div>
            </section>

            {/* How to Identify Your Cat's Breed Section */}
            <section className="py-8 sm:py-16 px-4 w-full bg-gray-50">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-4xl font-bold text-center mb-4 text-gray-800">
                  {content.sections.howTo.title}
                </h2>
                <p className="text-center text-gray-600 mb-12" dangerouslySetInnerHTML={{ __html: content.sections.howTo.subtitle }} />

                {/* Mobile only image - positioned after intro text */}
                <div className="md:hidden mb-8 h-90 rounded-lg overflow-hidden">
                  <img
                    src={content.sections.howTo.image}
                    alt={content.sections.howTo.imageAlt}
                    width={400}
                    height={384}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="grid md:grid-cols-5 gap-12 items-start">
                  {/* Left side - Steps */}
                  <div className="md:col-span-3 max-w-2xl mx-auto space-y-8">
                    {content.sections.howTo.steps.map((step, index) => (
                      <div key={index}>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">
                          {step.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Right side - Image placeholder - hidden on mobile */}
                  <div className="hidden md:block md:col-span-2 h-120 rounded-lg overflow-hidden">
                    <img
                      src={content.sections.howTo.image}
                      alt={content.sections.howTo.imageAlt}
                      width={400}
                      height={384}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <a 
                  href="#cat-identifier"
                  className="inline-block items-center justify-center bg-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors mt-10"
                >
                  {content.sections.howTo.ctaText}
                </a>
              </div>
            </section>

            {/* Just Got a New Cat Section */}
            <section className="py-8 sm:py-16 bg-white px-4 max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left side - Image placeholder */}
                <div className="h-80 rounded-lg overflow-hidden">
                  <img
                    src={content.sections.justGotNewCat.image}
                    alt={content.sections.justGotNewCat.imageAlt}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                {/* Right side - Content */}
                <div>
                  <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-gray-800">
                    {content.sections.justGotNewCat.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-8">
                    {content.sections.justGotNewCat.description}
                  </p>
                  
                  <a 
                    href="#cat-identifier"
                    className="inline-block bg-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                  >
                    {content.sections.justGotNewCat.ctaText}
                  </a>
                </div>
              </div>
            </section>

            {/* Curious About Your Cat's Looks Section */}
            <section className="py-3 sm:py-12 px-4 max-w-6xl mx-auto">
              {/* Mobile only - Image before title */}
              <div className="md:hidden mb-6 h-80 rounded-lg overflow-hidden">
                <img
                  src={content.sections.curiousAboutLooks.image}
                  alt={content.sections.curiousAboutLooks.imageAlt}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left side - Content */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
                    {content.sections.curiousAboutLooks.title}
                  </h2>
                  <p className="text-gray-700 text-base leading-relaxed mb-8">
                    {content.sections.curiousAboutLooks.description}
                  </p>
                  
                  <a 
                    href="#cat-identifier"
                    className="inline-block bg-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                  >
                    {content.sections.curiousAboutLooks.ctaText}
                  </a>
                </div>
                
                {/* Right side - Image placeholder - hidden on mobile */}
                <div className="hidden md:block h-90 rounded-lg overflow-hidden">
                  <img
                    src={content.sections.curiousAboutLooks.image}
                    alt={content.sections.curiousAboutLooks.imageAlt}
                    width={600}
                    height={400}
                        className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </section>

            {/* Sharing with Friends or Online Section */}
            <section className="py-8 sm:py-16 px-4 max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left side - Image placeholder */}
                <div className="h-80 rounded-lg overflow-hidden">
                  <img
                    src={content.sections.sharingWithFriends.image}
                    alt={content.sections.sharingWithFriends.imageAlt}
                    width={500}
                    height={400}
                        className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                {/* Right side - Content */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
                    {content.sections.sharingWithFriends.title}
                  </h2>
                  <p className="text-gray-700 text-base leading-relaxed mb-8">
                    {content.sections.sharingWithFriends.description}
                  </p>
                  
                  <a 
                    href="#cat-identifier"
                    className="inline-block bg-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                  >
                    {content.sections.sharingWithFriends.ctaText}
                  </a>
                </div>
              </div>
            </section>

            {/* Helping Kids Learn About Pets Section */}
            <section className="py-8 sm:py-16 px-4 max-w-6xl mx-auto">
              {/* Mobile only - Image before title */}
              <div className="md:hidden mb-6 h-80 rounded-lg overflow-hidden">
                <img
                  src={content.sections.helpingKidsLearn.image}
                  alt={content.sections.helpingKidsLearn.imageAlt}
                  width={500}
                  height={400}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left side - Content */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
                    {content.sections.helpingKidsLearn.title}
                  </h2>
                  <p className="text-gray-700 text-base leading-relaxed mb-8">
                    {content.sections.helpingKidsLearn.description}
                  </p>
                  
                  <a 
                    href="#cat-identifier"
                    className="inline-block bg-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                  >
                    {content.sections.helpingKidsLearn.ctaText}
                  </a>
                </div>
                
                {/* Right side - Image placeholder - hidden on mobile */}
                <div className="hidden md:block h-80 rounded-lg overflow-hidden">
                  <img
                    src={content.sections.helpingKidsLearn.image}
                    alt={content.sections.helpingKidsLearn.imageAlt}
                    width={500}
                    height={400}
                        className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </section>

            {/* Cat Breed Chart Section */}
            <section id="cat-breed-chart" className="py-8 sm:py-16 bg-gray-50 w-full px-4 ">
              <div className="grid grid-cols-1 gap-6 text-center  items-center">
                {/* Left side - Content */}
                <div>
                  <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-gray-800">
                    {content.sections.catBreedChart.title}
                  </h2>
                  <p className="text-gray-700  max-w-6xl mx-auto text-base leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: content.sections.catBreedChart.description }} />
                </div>
              
                <div className="w-full overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
                  <table className="min-w-full text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        {content.catBreedTable.headers.map((header, index) => (
                          <th key={index} className="px-4 py-3 text-left font-semibold text-gray-900 min-w-[120px]">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y text-left text-xs divide-gray-200">
                      {content.catBreedTable.breeds.map((breed, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-900">{breed.name}</td>
                          <td className="px-4 py-3 text-gray-700">{breed.size}</td>
                          <td className="px-4 py-3 text-gray-700">{breed.coat}</td>
                          <td className="px-4 py-3 text-gray-700">{breed.color}</td>
                          <td className="px-4 py-3 text-gray-700">{breed.eyes}</td>
                          <td className="px-4 py-3 text-gray-700">{breed.ears}</td>
                          <td className="px-4 py-3 text-gray-700">{breed.tail}</td>
                          <td className="px-4 py-3 text-gray-700">{breed.temperament}</td>
                          <td className="px-4 py-3 text-gray-700">{breed.health}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Why Cat Owners Trust WhatBreedIsMyCat Section */}
            <section className="py-8 sm:py-16 px-4 max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-bold text-center mb-12 text-gray-800" dangerouslySetInnerHTML={{ __html: content.sections.whyTrust.title }} />
              
              {/* Feature Cards Grid */}
              <div className="grid md:grid-cols-4 gap-6 mb-6">
                {content.sections.whyTrust.features.map((feature, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                    <div className="h-20 w-20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <i className={`fas ${feature.icon} text-4xl text-pink-500`}></i>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: feature.description }} />
                  </div>
                ))}
              </div>

              {/* Testimonial Section */}
              <div className="w-full px-4 py-6">
                <TestimonialCarousel testimonials={content.testimonials} />
              </div>
            </section>
            
            {/* FAQ Section */}
            <section id="faq">
              <FAQ 
                title={content.faq.title}
                faqs={content.faq.items}
              />
            </section>

            {/* Call to Action Section */}
            <section className="py-8 sm:py-20 px-4 w-full bg-gray-50">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6 text-gray-800">
                  {content.sections.cta.title}
                </h2>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                  {content.sections.cta.description}
                </p>
                
                <a 
                  href="#cat-identifier"
                  className="inline-block bg-pink-500 text-white px-10 py-5 rounded-lg font-semibold text-lg hover:bg-pink-600 transition-colors shadow-lg"
                >
                  {content.sections.cta.buttonText}
                </a>
              </div>
            </section>
      </div>
    </>

  );
}
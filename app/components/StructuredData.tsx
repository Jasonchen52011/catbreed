'use client'

interface StructuredDataProps {
  type?: 'WebApplication' | 'WebSite' | 'Organization'
  data?: Record<string, any>
}

export default function StructuredData({ type = 'WebApplication', data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
    }

    switch (type) {
      case 'WebApplication':
        return {
          ...baseData,
          name: 'WhatBreedIsMyCat - AI Cat Breed Identifier',
          description: 'AI-powered tool to identify cat breeds from photos. Upload a picture and get instant breed recognition with detailed information.',
          url: 'https://whatbreedismycat.com',
          applicationCategory: 'PhotographyApplication',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          },
          featureList: [
            'AI Cat Breed Recognition',
            'Instant Photo Analysis',
            'Detailed Breed Information',
            'Care Tips and Traits',
            'Free to Use'
          ],
          screenshot: 'https://whatbreedismycat.com/page/catbreed.jpg',
          author: {
            '@type': 'Organization',
            name: 'WhatBreedIsMyCat Team'
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.7',
            ratingCount: '500',
            bestRating: '5',
            worstRating: '1'
          },
          ...data
        }

      case 'WebSite':
        return {
          ...baseData,
          name: 'WhatBreedIsMyCat',
          url: 'https://whatbreedismycat.com',
          description: 'AI-powered cat breed identification tool. Upload photos and discover your cat\'s breed with detailed information.',
          publisher: {
            '@type': 'Organization',
            name: 'WhatBreedIsMyCat'
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://whatbreedismycat.com/?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          },
          ...data
        }

      case 'Organization':
        return {
          ...baseData,
          name: 'WhatBreedIsMyCat',
          url: 'https://whatbreedismycat.com',
          description: 'AI technology company specializing in pet breed identification using artificial intelligence.',
          sameAs: [
            'https://twitter.com/whatbreedismycat',
            'https://facebook.com/whatbreedismycat'
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            email: 'support@whatbreedismycat.com'
          },
          ...data
        }

      default:
        return { ...baseData, ...data }
    }
  }

  const structuredData = getStructuredData()

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
} 
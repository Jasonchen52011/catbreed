import { Metadata } from 'next';
import ContentPage from './content-page';


export const metadata: Metadata = {
  title: 'Cat Breed Identification Results - WhatBreedIsMyCat',
  description: 'View your cat breed identification results from our AI analysis. Discover your cat\'s breed with detailed information about traits, personality, and care tips.',
  metadataBase: new URL('https://whatbreedismycat.app/result'),
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://whatbreedismycat.app/result',
  },
};

export default function ResultPage() {
  return (
    <>
      <ContentPage />
    </>
  )
}

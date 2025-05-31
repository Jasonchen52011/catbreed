import { Metadata } from 'next';
import ContentPage from './content-page';


export const metadata: Metadata = {
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

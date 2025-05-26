


import CatBreedIdentifier from './CatBreedIdentifier/index';
import Script from 'next/script';

import Head from 'next/head';

export default function HomePage() {

  return (
    <div className="min-h-screen bg-white flex flex-col">

            <CatBreedIdentifier />
      </div>

  );
}
import CatCarousel from './CatBreedIdentifier/CatCarousel';
import CatBreedIdentifier from './CatBreedIdentifier/index';
import FAQ from './components/FAQ';
import TestimonialCarousel from './components/TestimonialCarousel';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Head from 'next/head';
import Image from 'next/image';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'What Breed is My Cat? - Free AI Cat Breed Identifier',
  description: 'Not sure what kind of cat you have? Upload photo,let AI cat breed identifier free give you top 3 matches form 360+ cat breeds with personality and health.',
  metadataBase: new URL('https://whatbreedismycat.app'),
  alternates: {
    canonical: 'https://whatbreedismycat.app'
  },
  openGraph: {
    title: 'What Breed is My Cat? - Free AI Cat Breed Identifier',
    description: 'Not sure what kind of cat you have? Upload photo,let AI cat breed identifier free give you top 3 matches form 360+ cat breeds with personality and health.',
    url: 'https://whatbreedismycat.app',
    images: [
      {
        url: 'page/cathowto.jpg',
        width: 1920,
        height: 1080,
        alt: 'Cat Breed Identifier - Find Your Perfect Cat'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@site',
    creator: '@catbreedai',
    images: [
      {
        url: 'page/catbreed.jpg',
        width: 1920,
        height: 1080,
        alt: 'Cat Breed Identifier - Identify Your Perfect Cat'
      }
    ]
  },
  icons: {
    icon: [
      { url: '/logo/favicon.ico', type: 'image/x-icon', sizes: 'any' },
      { url: '/logo/logo-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/logo/logo-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/logo/logo-512x512.png', type: 'image/png', sizes: '512x512' },
      { url: '/logo/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
    ],
  },

};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Cat Breed Identifier',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Windows, MacOS, Linux, ChromeOS, Android, iOS, iPadOS',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  brand: {
    '@type': 'Brand',
    name: 'whatbreedismycat.app'
  },
  publishedTime: '2025-05-31',
  modifiedTime: '2025-05-31',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  author: {
    '@type': 'Organization',
    name: 'Jason',
    url: 'https://whatbreedismycat.app'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    worstRating: '1',
    bestRating: '5',
    ratingCount: '1501'
  }
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How can I know what breed my cat is?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To find out your cat\'s possible breed, just follow these steps: 1. Upload a clear photo of your cat. 2. Our AI scans its features instantly. 3. You\'ll see the top 3 matching breeds with traits and care tips. It\'s fast, free, and doesn\'t require an account.'
      }
    },
    {
      '@type': 'Question',
      name: 'What\'s the best cat breed identifier app?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The best cat breed identifier is one that\'s fast, accurate, and respects your privacy. WhatBreedIsMyCat uses AI trained on real breed data to show you the 3 closest matches—free, with no photo storage and no ads.'
      }
    },
    {
      '@type': 'Question',
      name: 'How accurate is the AI detection?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our AI is trained using official breed data from TICA, so it\'s very good at spotting physical traits. But it\'s not perfect—especially for mixed cats. Think of it as a smart guess, not a final answer like a DNA test.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is my cat a purebred?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most cats—over 90%—are not purebred. Unless you have official papers from a breeder, your cat is likely a mix. That\'s totally normal, and it doesn\'t make your cat any less special.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can AI recognize mixed-breed cats?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! AI can analyze physical traits and suggest the closest breed matches—even for mixed cats. It won\'t give a full genetic breakdown, but it helps you understand what your cat may be a mix of.'
      }
    },
    {
      '@type': 'Question',
      name: 'What\'s the difference between AI detection and a DNA test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI detection is based on what your cat looks like. DNA tests check what your cat is made of—its genetic history. For fun and fast insights, use AI. For deeper health or ancestry info, try a DNA test like Basepaws.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can my cat\'s coat color or pattern tell me its breed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Coat color and pattern alone can\'t tell you the breed. For example, "tabby" is a pattern, not a breed. Many different breeds can have the same color or markings, so you need more features to get a real match.'
      }
    },
    {
      '@type': 'Question',
      name: 'Why is knowing my cat\'s breed or genetic similarity important?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Knowing your cat\'s possible breed helps you understand its behavior, energy level, and health needs. Even if it\'s not purebred, breed-like traits can guide better care and bonding with your cat.'
      }
    },
    {
      '@type': 'Question',
      name: 'How to identify cat breed by picture?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Here\'s how to do it: 1. Take or upload a clear photo of your cat\'s face. 2. The AI will scan its features like ears, eyes, fur, and shape. 3. In seconds, you\'ll get 3 possible breed matches with info to explore.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I use the cat breed identifier for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! WhatBreedIsMyCat is completely free to use. You don\'t need to sign up or pay. Just upload a photo and enjoy instant breed results, matching scores, and care tips—no hidden fees.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is my photo safe and private?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Your photo is never saved or shared. We delete it right after processing. No accounts, no tracking—just one-time analysis with full privacy. Your cat\'s picture stays yours only.'
      }
    }
  ]
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
  ]
  };

const organizationData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Cat Breed Identifier',
  url: 'https://whatbreedismycat.app',
  logo: {
    '@type': 'ImageObject',
    inLanguage: 'en-US',
    '@id': 'https://whatbreedismycat.app/logo/logo-192x192.png',
    url: 'https://whatbreedismycat.app/logo/logo-192x192.png',
    width: '192',
    height: '192',
    caption: 'Cat Breed Identifier Logo'
  },
  website: {
    '@type': 'WebSite',
    url: 'https://whatbreedismycat.app',
    name: 'What Breed is My Cat?'
  }
};





export default function HomePage() {


  // 用户评论数据
  const testimonials = [
    {
      id: 1,
      quote: "We used it in class during pet week! My students loved seeing their cats' possible breeds. It sparked great conversations about genetics and animal traits.",
      author: "Jake Reynolds",
      title: "Elementary School Teacher", 
      rating: 4.8
    },
    {
      id: 2,
      quote: "Uploaded a photo of my cat and got results in seconds. I found out she's 80% Maine Coon. Now I can finally tell people what kind of cat I have.",
      author: "Emily Chen",
      title: "Pet Care Student",
      rating: 5
    },
    {
      id: 3,
      quote: "Snapped a quick pic, hit upload, and boom—three breeds with exact match percentages. Loved how the cat breed identifier showed a clear winner with info I could understand.",
      author: "Marcus Hill", 
      title: "Pet Store Assistant",
      rating: 4
    },
    {
      id: 4,
      quote: "Took just one photo to know what kind of cat I have. The biggest image helped me spot the match fast. Great for people with mixed breed cats.",
      author: "Josh Rivera",
      title: "Freelance Illustrator",
      rating: 5
    },
    {
      id: 5,
      quote: "Didn't just find the breed—this cat breed identifier told me the history and traits. You just upload and it does the rest.",
      author: "Sarah Long",
      title: "Vet Assistant", 
      rating: 4
    }
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      
      <div className=" min-h-screen bg-white flex flex-col">

            <CatBreedIdentifier />
            <CatCarousel />

            {/* How Our AI Finds Your Cat's Breed Section */}
            <section id="how-it-works" className="py-8 sm:py-16 px-4 max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-bold text-center mb-12 text-gray-800">
                How Our AI Finds Your Cat's Breed
              </h2>
              
              <div className="grid md:grid-cols-2  gap-8 items-center">
                {/* Left side - Image placeholder */}
                <div className="h-100 rounded-lg overflow-hidden">
                  <Image
                    src="/page/catbreed.jpg"
                    alt="Cat Analysis - AI analyzing cat breeds"
                    width={500}
                    height={800}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                {/* Right side - Text content */}
                <div className="space-y-4 text-gray-700 text-base leading-relaxed">
                  <p>
                    Our AI is trained using breed standards from trusted sources like{' '}
                    <a href="https://tica.org/find-a-cat/find-a-cat-breeder-listings/" target="_blank" rel="noopener noreferrer" className=" text-gray-800 underline hover:text-pink-700">The International Cat Association (TICA)</a>. 
                    This means our model has seen thousands of examples of purebred cats with known traits—like face shape, ear size, coat type, and more.
                  </p>
                  <p>
                    When you upload a photo, the AI looks at your cat's physical features and compares them to these known patterns.
                  </p>
                  <p>
                    The result? You'll get the 3 most likely breeds your cat looks similar to, along with a match percentage, common traits, and care tips.
                  </p>
                  <p>
                    But here's the thing: most cats are mixed, and photos can only show so much. Our tool gives a smart guess based on visual features—but it's not perfect. It can't see your cat's full DNA or health background.
                  </p>
                  <p>
                    Want to be 100% sure about your cat's breed? We recommend doing a DNA test with trusted providers like <a href="https://basepaws.com/" target="_blank" rel="noopener noreferrer" className="text-gray-800 underline hover:text-pink-700">Basepaws</a> or <a href="https://www.wisdompanel.com/en-us" target="_blank" rel="noopener noreferrer" className="text-gray-800 underline hover:text-pink-700">Wisdom Panel</a>. They can reveal your cat's genetic history and even spot health risks.
                  </p>
                  <p>
                    Our AI is a fast, fun way to explore your cat's story—but for deep answers, DNA is still the gold standard.
                  </p>
                </div>
              </div>
            </section>

            {/* How to Identify Your Cat's Breed Section */}
            <section className="py-8 sm:py-16 px-4 w-full bg-gray-50">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-4xl font-bold text-center mb-4 text-gray-800">
                  How to Identify Your Cat's Breed with Our AI Tool
                </h2>
                <p className="text-center text-gray-600 mb-12">
                  Just upload a photo of your cat—our AI will start scanning right away. In a few seconds, you'll see <span className="text-sky-400">3 likely breeds</span> with helpful info.
                </p>

                <div className="grid md:grid-cols-5 gap-12 items-start">
                  {/* Left side - Steps */}
                  <div className="md:col-span-3 max-w-2xl mx-auto space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">
                        Step 1: Upload a Clear Photo
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Take a front-facing photo of your cat or choose one from your gallery. Make sure the image is bright, clear, and focused on your cat's face. Avoid pictures with blurry faces, heavy shadows, or other pets in the frame. Supported formats: JPG, JPEG, PNG, and WEBP. Max size: 10MB.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">
                        Step 2: Let AI Scan Automatically
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Once you upload the photo, our AI starts working right away—no buttons to press. It looks at your cat's face shape, ears, fur, and other features, then compares them to known breed patterns. The scan takes about 5 seconds. All done in real time!
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">
                        Step 3: Get Breed Match Results
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        You'll see 3 cat breeds your cat most likely resembles. Each comes with a match percentage, key traits, behavior info, and care tips. These aren't random guesses—they're based on visual features and breed standards.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">
                        Step 4: Download or Share Your Results
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        You can download a copy of your results or share it on social media. Show off your cat's "hidden" breed with friends! And don't worry—your photo is deleted right after analysis. We never store your data.
                      </p>
                    </div>


                  </div>

                  {/* Right side - Image placeholder */}
                  <div className="md:col-span-2 h-100 rounded-lg overflow-hidden">
                    <Image
                      src="/page/cathowto.jpg"
                      alt="Step-by-step guide for cat breed identification"
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
                  Identify My Cat Now →
                </a>
              </div>
            </section>

            {/* Just Got a New Cat Section */}
            <section className="py-8 sm:py-16 bg-white px-4 max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left side - Image placeholder */}
                <div className="h-80 rounded-lg overflow-hidden">
                  <Image
                    src="/page/playwithcat.jpg"
                    alt="New cat - identifying breed for newly adopted cats"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                {/* Right side - Content */}
                <div>
                  <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-gray-800">
                    Just Got a New Cat?
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-8">
                    Adopted a cat but have no idea what breed it might be? Whether it's from a shelter or a stray, knowing its possible breed mix helps you understand its traits, behavior, and care needs. It's a simple way to bond with your new furry friend and learn where it might come from.
                  </p>
                  
                  <a 
                    href="#cat-identifier"
                    className="inline-block bg-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                  >
                    Identify My Cat Now →
                  </a>
                </div>
              </div>
            </section>

            {/* Curious About Your Cat's Looks Section */}
            <section className="py-8 sm:py-16 px-4 max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left side - Content */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
                    Curious About Your Cat's Looks?
                  </h2>
                  <p className="text-gray-700 text-base leading-relaxed mb-8">
                    Big ears? Super fluffy tail? Unique coat? If your cat has features you've always wondered about, breed insights can explain why. Maybe it shares traits with a Siamese or Maine Coon. Learning the "why" behind your cat's look makes it even more special.
                  </p>
                  
                  <a 
                    href="#cat-identifier"
                    className="inline-block bg-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                  >
                    Identify My Cat Now →
                  </a>
                </div>
                
                {/* Right side - Image placeholder */}
                <div className="h-90 rounded-lg overflow-hidden">
                  <Image
                    src="/page/catlook.png"
                    alt="Want know your cat breed?"
                    width={600}
                    height={400}
                    quality={95}
                    priority={true}
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
                  <Image
                    src="/cat/maine-coon.jpg"
                    alt="Maine Coon cat - perfect for social sharing and showing off cat breeds"
                    width={500}
                    height={400}
                    quality={95}
                    priority={true}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                {/* Right side - Content */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
                    Sharing with Friends or Online?
                  </h2>
                  <p className="text-gray-700 text-base leading-relaxed mb-8">
                    Posting cute cat pics? People will ask, "What breed is that?" Now you'll have a fun answer—plus a shareable result card with breed names and fun facts. Great for Instagram, TikTok, or just making your group chat smile.
                  </p>
                  
                  <a 
                    href="#cat-identifier"
                    className="inline-block bg-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                  >
                    Identify My Cat Now →
                  </a>
                </div>
              </div>
            </section>

            {/* Helping Kids Learn About Pets Section */}
            <section className="py-8 sm:py-16 px-4 max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left side - Content */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
                    Helping Kids Learn About Pets?
                  </h2>
                  <p className="text-gray-700 text-base leading-relaxed mb-8">
                    Kids love asking questions—and cats are full of surprises. Turn breed results into a learning moment. Talk about where the breeds come from, their traits, and how to care for them. It's fun, hands-on, and sparks curiosity about animals.
                  </p>
                  
                  <a 
                    href="#cat-identifier"
                    className="inline-block bg-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                  >
                    Identify My Cat Now →
                  </a>
                </div>
                
                {/* Right side - Image placeholder */}
                <div className="h-80 rounded-lg overflow-hidden">
                  <Image
                    src="/cat/british-shorthair.jpg"
                    alt="British Shorthair cat - great for teaching kids about cat breeds"
                    width={500}
                    height={400}
                    quality={95}
                    priority={true}
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
                    Cat Breed Chart: Compare 10 Popular Breeds at a Glance
                  </h2>
                  <p className="text-gray-700  max-w-6xl mx-auto text-base leading-relaxed mb-2">
                   Want to figure out your cat's breed based on its looks? We've created a helpful chart of 10 common cat breeds using official data from <a href="https://tica.org/find-a-cat/find-a-cat-breeder-listings/" target="_blank" rel="noopener noreferrer" className="text-gray-700 underline hover:text-pink-700">The International Cat Association (TICA)</a> and <a href="https://cfa.org/" target="_blank" rel="noopener noreferrer" className="text-gray-700 underline hover:text-pink-700">The Cat Fanciers' Association (CFA)</a>. You can use it to compare size, coat, eyes, ears, and personality traits—side by side. It's a great quick reference when you're trying to match your cat's features to possible breeds. <a href="https://docs.google.com/spreadsheets/d/1I_zX5jJnmUY45FxmqbSKuumagMo9wyYfZu6RRvQKkBE/edit?pli=1&gid=0#gid=0" target="_blank" rel="noopener noreferrer" className="text-pink-500 font-blod hover:text-pink-700">Click here to view the full interactive chart </a>  and explore 50+ cat breeds in detail.
                  </p>
                  
                </div>
              
                <div className="w-full overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
                  <table className="min-w-full text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900 min-w-[120px]">Breed Name</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900 min-w-[100px]">Size</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900 min-w-[150px]">Coat Length & Type</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900 min-w-[150px]">Coat Color & Pattern</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900 min-w-[120px]">Eye Color & Shape</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900 min-w-[120px]">Ear Shape & Features</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900 min-w-[120px]">Tail Length & Features</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900 min-w-[200px]">Typical Temperament & Behavior</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900 min-w-[200px]">Notable Health Tendencies or Special Care Needs</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-left text-xs divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Abyssinian</td>
                        <td className="px-4 py-3 text-gray-700">Medium-sized</td>
                        <td className="px-4 py-3 text-gray-700">Semi-long, soft, finely textured, agouti ticking</td>
                        <td className="px-4 py-3 text-gray-700">Ruddy, cinnamon, blue, fawn, chocolate, lilac, with or without silver</td>
                        <td className="px-4 py-3 text-gray-700">Large, almond-shaped, expressive; gold, amber, or green; ringed with dark color (eyeliner)</td>
                        <td className="px-4 py-3 text-gray-700">Large, arched forward, often with ear tufts</td>
                        <td className="px-4 py-3 text-gray-700">Long, tapering</td>
                        <td className="px-4 py-3 text-gray-700">Loyal, affectionate, highly intelligent, active, inquisitive, playful, agile, athletic, enjoys climbing, not typically lap cats, happiest with company</td>
                        <td className="px-4 py-3 text-gray-700">Potential for early periodontal disease, patellar luxation, amyloidosis, PRA, PK-deficiency; weekly/bi-weekly nail clipping, regular teeth brushing</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">American Bobtail</td>
                        <td className="px-4 py-3 text-gray-700">Medium-to-large; males 12-16 lbs, females 7-11 lbs; slow to mature (up to 3 years)</td>
                        <td className="px-4 py-3 text-gray-700">Short (plush, rabbit pelt-like) or medium-long (easy to maintain); any color/pattern</td>
                        <td className="px-4 py-3 text-gray-700">Any color/pattern including black, brown, chocolate, cinnamon, blue, lilac, fawn, red, cream, with or without white</td>
                        <td className="px-4 py-3 text-gray-700">Almost almond-shaped; color varies with coat color</td>
                        <td className="px-4 py-3 text-gray-700">Medium-sized, wide-based, rounded tips</td>
                        <td className="px-4 py-3 text-gray-700">Shortened, minimum 1 inch to hock length; unique, no two identical; proudly held, wags</td>
                        <td className="px-4 py-3 text-gray-700">Confident, friendly, highly intelligent, clown-like, affectionate, loving, devoted to entire family, good with older children/other pets, not very vocal (chirps, clicks, trills), moderately active, trainable (leash, fetch), good travelers, therapy cats</td>
                        <td className="px-4 py-3 text-gray-700">Generally healthy, potential for genetic problems; weekly/bi-weekly combing, more frequent during shedding; rarely needs bathing; bi-weekly nail trims, regular teeth brushing, weekly eye/ear cleaning</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">American Bobtail Shorthair</td>
                        <td className="px-4 py-3 text-gray-700">Medium-to-large; males 12-16 lbs, females 7-11 lbs; slow to mature (up to 3 years); well-muscled, substantial boning</td>
                        <td className="px-4 py-3 text-gray-700">Shorthair (plush, rabbit pelt-like); any color/pattern</td>
                        <td className="px-4 py-3 text-gray-700">Any color/pattern including black, brown, chocolate, cinnamon, blue, lilac, fawn, red, cream, with or without white</td>
                        <td className="px-4 py-3 text-gray-700">Not specified in provided material</td>
                        <td className="px-4 py-3 text-gray-700">Not specified in provided material</td>
                        <td className="px-4 py-3 text-gray-700">Shortened, minimum 1 inch to hock length; unique, no two identical; proudly held, wags; tail mutation gene not controllable</td>
                        <td className="px-4 py-3 text-gray-700">Confident, friendly, highly intelligent, clown-like, affectionate, loving, warm, devoted to entire family, dislikes being alone, good with older children/other pets, not very vocal (chirps, clicks, trills), moderately active, trainable (leash, fetch), good travelers, therapy cats</td>
                        <td className="px-4 py-3 text-gray-700">Generally healthy, potential for genetic problems; easy to groom, weekly/bi-weekly combing, more frequent during shedding; rarely needs bathing; bi-weekly nail trims, regular teeth brushing, weekly eye/ear cleaning; life expectancy 11-15+ years</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">American Curl</td>
                        <td className="px-4 py-3 text-gray-700">Medium-sized; females 5-8 lbs, males 7-10 lbs</td>
                        <td className="px-4 py-3 text-gray-700">Long or short hair; silky, lies flat, little undercoat (less shedding, easier maintenance)</td>
                        <td className="px-4 py-3 text-gray-700">All colors and patterns</td>
                        <td className="px-4 py-3 text-gray-700">Large, walnut-shaped</td>
                        <td className="px-4 py-3 text-gray-700">Unique curled ears (90-180 degrees arc); firm cartilage; born straight, curl at 2-3 days, final curvature at 4 months</td>
                        <td className="px-4 py-3 text-gray-700">Longhaired has beautifully plumed tail</td>
                        <td className="px-4 py-3 text-gray-700">Sweet disposition, thrives on human interaction, lovable, affectionate, adaptable, curious, exuberant, loving companions, people-oriented, pat for attention, adore children, good with other pets, alert, inquisitive, even-tempered, intelligent, devoted, follow owners, quiet voices (gentle trilling/cooing), kitten-like (Peter Pan), playful, enjoys climbing/jumping, can learn fetch, open doors/cabinets</td>
                        <td className="px-4 py-3 text-gray-700">No known genetic health issues; shorthair brushed regularly, longhair occasionally; periodic nail trims; normal black ear wax (clean periodically); dental hygiene (brushing, professional cleaning); good quality food, enjoys canned food supplement; fresh water daily (3 ft from food)</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">American Curl Longhair</td>
                        <td className="px-4 py-3 text-gray-700">Medium-sized; females 5-8 lbs, males 7-10 lbs</td>
                        <td className="px-4 py-3 text-gray-700">Long hair; silky, lies flat, little undercoat (less shedding, easier maintenance)</td>
                        <td className="px-4 py-3 text-gray-700">All colors and patterns</td>
                        <td className="px-4 py-3 text-gray-700">Large, walnut-shaped</td>
                        <td className="px-4 py-3 text-gray-700">Unique curled ears (90-180 degrees arc); firm cartilage; born straight, curl at 2-3 days, final curvature at 4 months</td>
                        <td className="px-4 py-3 text-gray-700">Beautifully plumed tail</td>
                        <td className="px-4 py-3 text-gray-700">Sweet disposition, thrives on human interaction, lovable, affectionate, adaptable, curious, exuberant, loving companions, people-oriented, pat for attention, adore children, good with other pets, alert, inquisitive, even-tempered, intelligent, devoted, follow owners, quiet voices (gentle trilling/cooing), kitten-like (Peter Pan), playful, enjoys climbing/jumping, can learn fetch, open doors/cabinets</td>
                        <td className="px-4 py-3 text-gray-700">No known genetic health issues; brushed occasionally; periodic nail trims; normal black ear wax (clean periodically); dental hygiene (brushing, professional cleaning); good quality food, enjoys canned food supplement; fresh water daily (3 ft from food)</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">American Shorthair</td>
                        <td className="px-4 py-3 text-gray-700">Medium-sized; males larger than females; muscular, firm, well-balanced</td>
                        <td className="px-4 py-3 text-gray-700">Short, lustrous, dense, hard texture; natural protective appearance</td>
                        <td className="px-4 py-3 text-gray-700">All traditional colors, tabby and tabby with white most common; clarity of markings desirable</td>
                        <td className="px-4 py-3 text-gray-700">Wide-set, medium to large, proportionate to head; rounded (upper lid half almond, lower full curve)</td>
                        <td className="px-4 py-3 text-gray-700">Medium size, slightly rounded at tip, set twice distance between eyes</td>
                        <td className="px-4 py-3 text-gray-700">Medium long, heavy at base, tapering to abrupt blunt end; length equal to distance from shoulder blades to base of tail</td>
                        <td className="px-4 py-3 text-gray-700">Gentle, good-natured, easy-going, adaptable, loyal, loving, people-oriented, intelligent, curious, playful even in old age; females busier than males; retains hunting instincts; enjoys company but independent; easy to train, enjoys fetch</td>
                        <td className="px-4 py-3 text-gray-700">Not prone to genetic/hereditary illnesses; regular vet visits; weekly combing; nail trims, ear cleaning, teeth brushing regularly; tall scratching post; small portion wet food daily, dry food for grazing; fresh water daily (3 ft from food)</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">American Wirehair</td>
                        <td className="px-4 py-3 text-gray-700">Not specified in provided material</td>
                        <td className="px-4 py-3 text-gray-700">Not specified in provided material</td>
                        <td className="px-4 py-3 text-gray-700">Not specified in provided material</td>
                        <td className="px-4 py-3 text-gray-700">Not specified in provided material</td>
                        <td className="px-4 py-3 text-gray-700">Not specified in provided material</td>
                        <td className="px-4 py-3 text-gray-700">Not specified in provided material</td>
                        <td className="px-4 py-3 text-gray-700">Not specified in provided material</td>
                        <td className="px-4 py-3 text-gray-700">Not specified in provided material</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Australian Mist</td>
                        <td className="px-4 py-3 text-gray-700">Medium-sized</td>
                        <td className="px-4 py-3 text-gray-700">Very short, lacks undercoat</td>
                        <td className="px-4 py-3 text-gray-700">Spotted or marbled; 7 colors: brown, blue, chocolate, lilac, caramel, gold, peach; misted veil appearance (random ticking); legs/tail ringed/barred; face/neck lines</td>
                        <td className="px-4 py-3 text-gray-700">Not specified</td>
                        <td className="px-4 py-3 text-gray-700">Not specified</td>
                        <td className="px-4 py-3 text-gray-700">Ringed or barred</td>
                        <td className="px-4 py-3 text-gray-700">Easy-going, extremely sociable, loyal, loving, people-oriented, thrives on companionship, lively as kittens, calms with age, prefers warm lap as adults, easy to train, can play fetch, good with young children/other pets/elderly/disabled, tolerant of handling, not inclined to scratch, excellent indoor cats, can walk on lead</td>
                        <td className="px-4 py-3 text-gray-700">Not prone to genetic/hereditary illnesses due to "hybrid vigor"; at risk for HCM (breeders screen via echo); weekly brushing; nail trims, ear cleaning, teeth brushing regularly; tall scratching post; good quality dry kibble; fresh water daily (3 ft from food); life expectancy 15-18 years</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Balinese</td>
                        <td className="px-4 py-3 text-gray-700">Medium-sized; females 5-8 lbs, males 8-12 lbs; slow to mature (18-24 months)</td>
                        <td className="px-4 py-3 text-gray-700">Single coat, close-lying, no undercoat (reduces matting); soft, fine, silky; 0.5-2 inches long</td>
                        <td className="px-4 py-3 text-gray-700">Light/wispy main coat; dark mask/extremities (seal point); other colors: chocolate, blue, lilac, cinnamon, fawn, red, cream points; with/without white, silver/smoke, lynx point, tortie/tortie points</td>
                        <td className="px-4 py-3 text-gray-700">Stunning deep sapphire blue eyes</td>
                        <td className="px-4 py-3 text-gray-700">Strikingly large, pointed, wide at base, continuing triangular line of wedge-shaped head</td>
                        <td className="px-4 py-3 text-gray-700">Magnificent plume (up to 5 inches long hair); long tail fringed with long hair</td>
                        <td className="px-4 py-3 text-gray-700">Very social, talkative, loving, bonds closely with families (all ages, cat-friendly dogs, other cats), thrives on attention, "helpful" (follows humans), vocal (quieter/softer than Siamese), demands attention, mischievous, highly intelligent, agile, athletic, requires stimulation/toys, excels at feline agility, receptive to training (fetch, leash), enjoys lounging</td>
                        <td className="px-4 py-3 text-gray-700">Generally healthy; sensitive to anesthesia (inform vet); susceptible to Amyloidosis (no test); weekly brushing; weekly nail trims (avoid quick); weekly eye/ear cleaning; regular teeth brushing/dental cleanings; adults fed twice daily, kittens 3-4 times; fresh water daily (3 ft from food); prefers canned food (higher protein/water, lower carbs)</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Bengal</td>
                        <td className="px-4 py-3 text-gray-700">Medium to large; females 6-12 lbs, males 9-15 lbs; muscular, solid build; reaches full size by 2 years</td>
                        <td className="px-4 py-3 text-gray-700">Luxurious short, soft coat; may have "glitter" (iridescent sparkle); Longhair Bengals exist</td>
                        <td className="px-4 py-3 text-gray-700">Brown/black tabby (cool grey to golden/bronze/copper/mahogany with rich brown/black spots/marbling); "snow" colors (ivory/cream/light tan with light brown/dark chocolate spots/marbling); silver (grey to nearly white with dark grey/black patterns); nearly white undersides/facial markings; spotted or marble pattern; rosettes (two-toned spots); marble pattern (swirls/lines)</td>
                        <td className="px-4 py-3 text-gray-700">Large, oval, almost round; blue to aqua for "snow" colors</td>
                        <td className="px-4 py-3 text-gray-700">Relatively short, wide base, rounded tips</td>
                        <td className="px-4 py-3 text-gray-700">Thick, low-set, medium-length</td>
                        <td className="px-4 py-3 text-gray-700">Inquisitive, spirited, loving, social, people-oriented, confident, curious, devoted, extroverted/introverted, loving, communicative; high-energy (climbing, exploring, stimulating play); highly intelligent, trainable (leash, fetch, sit, stay, clicker); enjoys water; uses chirps, trills, meows to "chat"; coexists with other pets; needs enrichment/companionship if only pet</td>
                        <td className="px-4 py-3 text-gray-700">Breeders test for HCM, PRA, PK-deficiency; commonly misdiagnosed with IBD (high-protein diet/parasite testing helps); shorthair needs little grooming (brush during shedding); monthly nail trimming; longhair needs daily grooming; high-quality diet (proper protein/nutrients); mindful of weight gain after spay/neuter (avoid free feeding); raw diet suitable; fresh water daily (3 ft from food)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Why Cat Owners Trust WhatBreedIsMyCat Section */}
            <section className="py-8 sm:py-16 px-4 max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-bold text-center mb-12 text-gray-800">
                Why Cat Owners Trust <span className="text-sky-400">WhatBreedIsMyCat</span>
              </h2>
              
              {/* Feature Cards Grid */}
              <div className="grid md:grid-cols-4 gap-6 mb-6">
                {/* Easy & Free to Use */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                  <div className="h-20 w-20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <i className="fas fa-upload text-4xl text-pink-500"></i>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Easy & Free to Use
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    No sign-up. No long forms. Just upload a photo and see your cat's breed results in seconds. It's designed for anyone to use—no tech skills needed.
                  </p>
                </div>

                {/* Trained with Trusted Breed Data */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                  <div className="h-20 w-20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <i className="fas fa-certificate text-4xl text-pink-500"></i>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Trained with Trusted Breed Data
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Our AI was trained using official breed standards from <a href="https://tica.org/find-a-cat/find-a-cat-breeder-listings/" target="_blank" rel="noopener noreferrer" className="text-gray-700 underline hover:text-pink-700">The International Cat Association (TICA)</a>, making the results more reliable and informed by expert knowledge.
                  </p>
                </div>

                {/* Private by Default */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                  <div className="h-20 w-20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <i className="fas fa-shield-alt text-4xl text-pink-500"></i>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Private by Default
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Your photo is never saved. We delete it right after the scan. No accounts, no data tracking—just you and your cat's results, 100% private.
                  </p>
                </div>

                {/* More Than a Breed Name */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                  <div className="h-20 w-20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <i className="fas fa-chart-pie text-4xl text-pink-500"></i>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    More Than a Breed Name
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    You don't just get a label. We show you matching percentages, key traits, behavior tips, and care info. It helps you understand your cat, not just name it.
                  </p>
                </div>
              </div>

              {/* Testimonial Section */}
              <div className="w-full px-4 py-6">
              
                <TestimonialCarousel testimonials={testimonials} />
              </div>
            </section>
            
            {/* FAQ Section */}
            <section id="faq">
              <FAQ 
                title="Frequently Asked Questions"
                faqs={[
                  {
                    question: "How can I know what breed my cat is?",
                    answer: `To find out your cat's possible breed, just follow these steps:
1. Upload a clear photo of your cat.
2. Our AI scans its features instantly.
3. You'll see the top 3 matching breeds with traits and care tips.
It's fast, free, and doesn't require an account.`
                  },
                  {
                    question: "What's the best cat breed identifier app?",
                    answer: "The best cat breed identifier is one that's fast, accurate, and respects your privacy. WhatBreedIsMyCat uses AI trained on real breed data to show you the 3 closest matches—free, with no photo storage and no ads."
                  },
                  {
                    question: "How accurate is the AI detection?",
                    answer: "Our AI is trained using official breed data from TICA, so it's very good at spotting physical traits. But it's not perfect—especially for mixed cats. Think of it as a smart guess, not a final answer like a DNA test."
                  },
                  {
                    question: "Is my cat a purebred?",
                    answer: "Most cats—over 90%—are not purebred. Unless you have official papers from a breeder, your cat is likely a mix. That's totally normal, and it doesn't make your cat any less special."
                  },
                  {
                    question: "Can AI recognize mixed-breed cats?",
                    answer: "Yes! AI can analyze physical traits and suggest the closest breed matches—even for mixed cats. It won't give a full genetic breakdown, but it helps you understand what your cat may be a mix of."
                  },
                  {
                    question: "What's the difference between AI detection and a DNA test?",
                    answer: "AI detection is based on what your cat looks like. DNA tests check what your cat is made of—its genetic history. For fun and fast insights, use AI. For deeper health or ancestry info, try a DNA test like <a href=\"https://basepaws.com/\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-gray-800 underline hover:text-pink-700\">Basepaws</a>."
                  },
                  {
                    question: "Can my cat's coat color or pattern tell me its breed?",
                    answer: "Coat color and pattern alone can't tell you the breed. For example, \"tabby\" is a pattern, not a breed. Many different breeds can have the same color or markings, so you need more features to get a real match."
                  },
                  {
                    question: "Why is knowing my cat's breed or genetic similarity important?",
                    answer: "Knowing your cat's possible breed helps you understand its behavior, energy level, and health needs. Even if it's not purebred, breed-like traits can guide better care and bonding with your cat."
                  },
                  {
                    question: "How to identify cat breed by picture?",
                    answer: `Here's how to do it:
1. Take or upload a clear photo of your cat's face.
2. The AI will scan its features like ears, eyes, fur, and shape.
3. In seconds, you'll get 3 possible breed matches with info to explore.`
                  },
                  {
                    question: "Can I use the cat breed identifier for free?",
                    answer: "Yes! WhatBreedIsMyCat is completely free to use. You don't need to sign up or pay. Just upload a photo and enjoy instant breed results, matching scores, and care tips—no hidden fees."
                  },
                  {
                    question: "Is my photo safe and private?",
                    answer: "Absolutely. Your photo is never saved or shared. We delete it right after processing. No accounts, no tracking—just one-time analysis with full privacy. Your cat's picture stays yours only."
                  }
                ]}
              />
            </section>

            {/* Call to Action Section */}
            <section className="py-8 sm:py-20 px-4 w-full bg-gray-50">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6 text-gray-800">
                  Ready to Discover Your Cat's Breed?
                </h2>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                  Upload a photo and see your cat's top 3 breed matches in seconds—free, fast, and private.
                </p>
                
                <a 
                  href="#cat-identifier"
                  className="inline-block bg-pink-500 text-white px-10 py-5 rounded-lg font-semibold text-lg hover:bg-pink-600 transition-colors shadow-lg"
                >
                  Identify My Cat Now →
                </a>
              </div>
            </section>
            
      </div>
    </>

  );
}
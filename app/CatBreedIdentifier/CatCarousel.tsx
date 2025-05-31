'use client';

import React, { useState, useEffect } from 'react';

// 30种欧美流行猫咪品种
const POPULAR_CATS = [
  { name: 'Persian', image: '/cat/persian.jpg' },
  { name: 'Maine Coon', image: '/cat/maine-coon.jpg' },
  { name: 'British Shorthair', image: '/cat/british-shorthair.jpg' },
  { name: 'Siamese', image: '/cat/siamese.jpg' },
  { name: 'American Shorthair', image: '/cat/american-shorthair.jpg' },
  { name: 'Abyssinian', image: '/cat/abyssinian.jpg' },
  { name: 'Russian Blue', image: '/cat/russian-blue.jpg' },
  { name: 'Birman', image: '/cat/birman.jpg' },
  { name: 'Norwegian Forest Cat', image: '/cat/norwegian-forest-cat.jpg' },
  { name: 'Scottish Fold', image: '/cat/scottish-fold.jpg' },
  { name: 'Bengal', image: '/cat/bengal.jpg' },
  { name: 'Exotic Shorthair', image: '/cat/exotic-shorthair.jpg' },
  { name: 'Sphynx', image: '/cat/sphynx.jpg' },
  { name: 'American Bobtail', image: '/cat/american-bobtail.jpg' },
  { name: 'Turkish Angora', image: '/cat/turkish-angora.jpg' },
  { name: 'Manx', image: '/cat/manx.jpg' },
  { name: 'Cornish Rex', image: '/cat/cornish-rex.jpg' },
  { name: 'Selkirk Rex', image: '/cat/selkirk-rex.jpg' },
  { name: 'Bombay', image: '/cat/bombay.jpg' },
  { name: 'Chartreux', image: '/cat/chartreux.jpg' },
  { name: 'Havana Brown', image: '/cat/havana-brown.jpg' },
  { name: 'Burmese', image: '/cat/burmese.jpg' },
  { name: 'Tonkinese', image: '/cat/tonkinese.jpg' },
  { name: 'Snowshoe', image: '/cat/snowshoe.jpg' },
  { name: 'Ocicat', image: '/cat/ocicat.jpg' },
  { name: 'Savannah', image: '/cat/savannah.jpg' },
  { name: 'Munchkin', image: '/cat/munchkin.jpg' }
];

const CatCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 自动轮播
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= POPULAR_CATS.length - 4 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex >= POPULAR_CATS.length - 4 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? POPULAR_CATS.length - 4 : prevIndex - 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-gray-50 py-9 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-9">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
            Real Results from Real Cats
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            See how our AI tool identified different cat breeds from user photos. Each cat gets 3 likely breed matches with details on traits, looks, and health.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* 左导航按钮 */}
          <button
            onClick={prevSlide}
            className="flex-shrink-0 bg-white hover:bg-gray-50 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="Previous slides"
          >
            <i className="fas fa-chevron-left text-gray-700 text-lg"></i>
          </button>

          {/* 轮播容器 */}
          <div 
            className="flex-1 overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
            >
              {POPULAR_CATS.map((cat, index) => (
                <div key={index} className="flex-shrink-0 w-1/4 px-2">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-square">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-80 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity duration-300"
                        onClick={scrollToTop}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/cat/placeholder.png';
                        }}
                      />
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="font-semibold text-gray-900 text-sm">{cat.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右导航按钮 */}
          <button
            onClick={nextSlide}
            className="flex-shrink-0 bg-white hover:bg-gray-50 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="Next slides"
          >
            <i className="fas fa-chevron-right text-gray-700 text-lg"></i>
          </button>
        </div>

        {/* 指示器 */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.min(8, POPULAR_CATS.length - 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index * 3)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                Math.floor(currentIndex / 3) === index ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatCarousel; 
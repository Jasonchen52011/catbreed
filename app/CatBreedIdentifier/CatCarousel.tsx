'use client';

import React, { useState, useEffect } from 'react';

// 30种欧美流行猫咪品种
const POPULAR_CATS = [
  { name: 'Persian', image: '/cat/persian.jpg', percentage: 91 },
  { name: 'Maine Coon', image: '/cat/maine-coon.jpg', percentage: 89 },
  { name: 'British Shorthair', image: '/cat/british-shorthair.jpg', percentage: 93 },
  { name: 'Siamese', image: '/cat/siamese.jpg', percentage: 87 },
  { name: 'American Shorthair', image: '/cat/american-shorthair.jpg', percentage: 85 },
  { name: 'Abyssinian', image: '/cat/abyssinian.jpg', percentage: 82 },
  { name: 'Russian Blue', image: '/cat/russian-blue.jpg', percentage: 90 },
  { name: 'Birman', image: '/cat/birman.jpg', percentage: 88 },
  { name: 'Norwegian Forest Cat', image: '/cat/norwegian-forest-cat.jpg', percentage: 84 },
  { name: 'Scottish Fold', image: '/cat/scottish-fold.jpg', percentage: 92 },
  { name: 'Bengal', image: '/cat/bengal.jpg', percentage: 86 },
  { name: 'Exotic Shorthair', image: '/cat/exotic-shorthair.jpg', percentage: 81 },
  { name: 'Sphynx', image: '/cat/sphynx.jpg', percentage: 83 },
  { name: 'American Bobtail', image: '/cat/american-bobtail.jpg', percentage: 80 },
  { name: 'Turkish Angora', image: '/cat/turkish-angora.jpg', percentage: 87 },
  { name: 'Manx', image: '/cat/manx.jpg', percentage: 85 },
  { name: 'Cornish Rex', image: '/cat/cornish-rex.jpg', percentage: 88 },
  { name: 'Selkirk Rex', image: '/cat/selkirk-rex.jpg', percentage: 84 },
  { name: 'Bombay', image: '/cat/bombay.jpg', percentage: 89 },
  { name: 'Chartreux', image: '/cat/chartreux.jpg', percentage: 86 },
  { name: 'Havana Brown', image: '/cat/havana-brown.jpg', percentage: 82 },
  { name: 'Burmese', image: '/cat/burmese.jpg', percentage: 90 },
  { name: 'Tonkinese', image: '/cat/tonkinese.jpg', percentage: 83 },
  { name: 'Snowshoe', image: '/cat/snowshoe.jpg', percentage: 87 },
  { name: 'Ocicat', image: '/cat/ocicat.jpg', percentage: 85 },
  { name: 'Savannah', image: '/cat/savannah.jpg', percentage: 91 },
  { name: 'Munchkin', image: '/cat/munchkin.jpg', percentage: 81 }
];

const CatCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(4);

  // 响应式设置每页显示数量
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1); // 手机：1个
      } else if (window.innerWidth < 768) {
        setItemsPerView(2); // 平板小：2个
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3); // 平板：3个
      } else {
        setItemsPerView(4); // 桌面：4个
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // 自动轮播
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= POPULAR_CATS.length - itemsPerView ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, itemsPerView]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex >= POPULAR_CATS.length - itemsPerView ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? POPULAR_CATS.length - itemsPerView : prevIndex - 1
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
    <div className="bg-gray-50 py-6 sm:py-9 px-4 sm:px-6 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-9">
          <h2 className="text-2xl sm:text-4xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Real Results from Real Cats
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto px-2">
            See how our AI tool identified different cat breeds from user photos. Each cat gets 3 likely breed matches with details on traits, looks, and health.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 w-full">
          {/* 左导航按钮 */}
          <button
            onClick={prevSlide}
            className="flex-shrink-0 bg-white hover:bg-gray-50 shadow-lg rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-110 border border-gray-200 z-10"
            aria-label="Previous slides"
          >
            <i className="fas fa-chevron-left text-gray-700 text-sm sm:text-lg"></i>
          </button>

          {/* 轮播容器 */}
          <div 
            className="flex-1 overflow-hidden min-w-0"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out w-full"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {POPULAR_CATS.map((cat, index) => (
                <div 
                  key={index} 
                  className={`flex-shrink-0 px-1 sm:px-2 ${
                    itemsPerView === 1 ? 'w-full' :
                    itemsPerView === 2 ? 'w-1/2' :
                    itemsPerView === 3 ? 'w-1/3' :
                    'w-1/4'
                  }`}
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 w-full">
                    <div className="w-full">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-48 sm:h-64 lg:h-80 object-cover cursor-pointer hover:opacity-90 transition-opacity duration-300"
                        onClick={scrollToTop}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/cat/placeholder.png';
                        }}
                      />
                    </div>
                    <div className="p-2 sm:p-3 text-center">
                      <h3 className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                        {cat.name} <span className="text-pink-600 font-bold">{cat.percentage}%</span>
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右导航按钮 */}
          <button
            onClick={nextSlide}
            className="flex-shrink-0 bg-white hover:bg-gray-50 shadow-lg rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-110 border border-gray-200 z-10"
            aria-label="Next slides"
          >
            <i className="fas fa-chevron-right text-gray-700 text-sm sm:text-lg"></i>
          </button>
        </div>

        {/* 指示器 */}
        <div className="flex justify-center mt-6 sm:mt-8 space-x-1 sm:space-x-2">
          {Array.from({ length: Math.min(8, POPULAR_CATS.length - (itemsPerView - 1)) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index * Math.max(1, Math.floor(itemsPerView / 2)))}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
                Math.floor(currentIndex / Math.max(1, Math.floor(itemsPerView / 2))) === index ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatCarousel; 
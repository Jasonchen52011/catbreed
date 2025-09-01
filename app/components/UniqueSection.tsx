'use client'


interface UniqueSectionProps {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  imagePosition?: 'left' | 'right';
  showBackToTop?: boolean;
  backToTopText?: string;
}

export default function UniqueSection({ 
  title, 
  description, 
  image, 
  imagePosition = 'right',
  showBackToTop = false,
  backToTopText = 'Try Raw Dog Food Calculator Now'
}: UniqueSectionProps) {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
          imagePosition === 'left' ? 'lg:grid-flow-col-dense' : ''
        }`}>
          {/* 内容部分 */}
          <div className={imagePosition === 'left' ? 'lg:col-start-2' : ''}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
            <div 
              className="text-gray-600 text-lg leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            
            {/* 回到顶部按钮 */}
            {showBackToTop && (
              <div className="mt-8">
                <button
                  onClick={scrollToTop}
                  className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg text-base transition-colors hover:shadow-lg flex items-center gap-2"
                >
                  {backToTopText}
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M7 11l5-5m0 0l5 5m-5-5v12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* 图片部分 */}
          <div className={`flex justify-center ${
            imagePosition === 'left' ? 'lg:col-start-1' : ''
          }`}>
            <div className="relative w-full max-w-md">
              <img
                src={image.src}
                alt={image.alt}
                width={500}
                height={400}
                className="rounded-2xl shadow-xl object-cover w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// app/result/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';

// 定义 cat.json 中猫品种的类型结构
interface CatBreedInfo {
  id: string;
  breed_name: string;
  size?: string;
  height?: string;
  lifespan?: string;
  weight?: string;
  Rare_or_not?: string;
  personality?: string;
  fun_fact?: string;
  likes_to_eat?: string;
  cant_eat?: string;
  region_of_origin?: string;
  mixed_or_not?: string;
  Potential_Health_Problems?: string;
  Hypo_Allergenic?: string;
  Grooming_Needs?: string;
  Hair_Loss?: string;
  Exercise_Needs?: string;
  Is_it_suitable_for_kids_or_the_elderly?: string;
  How_to_build_a_close_relationship?: string;
  image: string;
}

// AI 返回的预测结果的类型
interface BreedPrediction {
  breed_name: string;
  percentage: number;
}

// 结合了 AI 预测和 JSON 数据的类型
interface DisplayBreedInfo extends CatBreedInfo {
  percentage: number;
}

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [catData, setCatData] = useState<CatBreedInfo[]>([]);
  const [identifiedBreeds, setIdentifiedBreeds] = useState<DisplayBreedInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [selectedBreedData, setSelectedBreedData] = useState<DisplayBreedInfo | null>(null);

  // 图片路径处理函数
  const getImageSrc = (imagePath: string) => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    // 将 /images/cat/ 替换为 /cat/
    return imagePath.replace('/images/cat/', '/cat/');
  };

  // 图片错误处理函数
  const handleImageError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== '/cat/placeholder.png') {
      target.src = '/cat/placeholder.png';
    }
  };

  useEffect(() => {
    // 1. 获取 cat.json 数据
    const fetchCatJson = async () => {
      try {
        const response = await fetch('/cat.json');
        if (!response.ok) {
          throw new Error('Failed to load cat breed data.');
        }
        const data: CatBreedInfo[] = await response.json();
        setCatData(data);
      } catch (err: any) {
        setError(err.message || 'Could not load cat information.');
        setIsLoading(false);
      }
    };

    fetchCatJson();
  }, []);

  useEffect(() => {
    if (catData.length === 0) return;

    const predictionsParam = searchParams.get('predictions');
    if (predictionsParam) {
      try {
        const aiPredictions: BreedPrediction[] = JSON.parse(decodeURIComponent(predictionsParam));

        if (!Array.isArray(aiPredictions) || aiPredictions.length === 0) {
            setError("Hmm, we couldn't identify any specific breeds. Maybe try a clearer picture?");
            setIsLoading(false);
            return;
        }

        const matchedBreeds: DisplayBreedInfo[] = [];
        aiPredictions.forEach(prediction => {
          const foundBreed = catData.find(cat =>
            cat.breed_name.toLowerCase().trim() === prediction.breed_name.toLowerCase().replace(/\s+cat$/i, '').trim()
          );

          if (foundBreed) {
            matchedBreeds.push({ ...foundBreed, percentage: prediction.percentage });
          } else {
            console.warn(`Breed "${prediction.breed_name}" not found in cat.json. It will be displayed without details.`);
            matchedBreeds.push({
                id: `unknown-${prediction.breed_name.replace(/\s/g, '-')}`,
                breed_name: prediction.breed_name,
                image: '/cat/placeholder.png',
                percentage: prediction.percentage,
                personality: "Details not available in our database."
            });
          }
        });

        matchedBreeds.sort((a, b) => b.percentage - a.percentage);
        setIdentifiedBreeds(matchedBreeds.slice(0, 3));

        if(matchedBreeds.length === 0 && aiPredictions.length > 0){
            setError("We got some results from the AI, but couldn't match them to our cat database. The AI suggested: " + aiPredictions.map(p => `${p.breed_name} (${p.percentage.toFixed(1)}%)`).join(', ') + ". Try another pic!");
        }

      } catch (err) {
        console.error('Error processing predictions:', err);
        setError('Oops! There was trouble showing the results. Please try again.');
      }
    } else {
        setError("No prediction data found. Did you upload an image?");
    }
    setIsLoading(false);
  }, [searchParams, catData]);

  // 监听selectedBreed变化，查找详细信息
  useEffect(() => {
    if (selectedBreed && identifiedBreeds.length > 0) {
      const found = identifiedBreeds.find(b => b.breed_name.toLowerCase() === selectedBreed.toLowerCase());
      setSelectedBreedData(found || null);
      // 禁止背景滚动
      document.body.style.overflow = 'hidden';
    } else {
      setSelectedBreedData(null);
      // 恢复背景滚动
      document.body.style.overflow = 'unset';
    }
  }, [selectedBreed, identifiedBreeds]);

  // 组件卸载时恢复滚动
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // 获取随机描述信息
  const getRandomDescription = (breed: DisplayBreedInfo) => {
    const fields = [
      "personality",
      "fun_fact",
      "Grooming_Needs",
      "Exercise_Needs",
      "Is_it_suitable_for_kids_or_the_elderly",
      "How_to_build_a_close_relationship"
    ];
    const available = fields.map(f => breed[f as keyof DisplayBreedInfo]).filter(Boolean);
    if (available.length === 0) return null;
    const randomContent = available[Math.floor(Math.random() * available.length)];
    return randomContent as string;
  };

  if (isLoading && identifiedBreeds.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-white flex flex-col items-center justify-center p-4 text-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-500">Analyzing your cat...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-white flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md w-full">
          <p>{error}</p>
          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => router.push('/')}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (identifiedBreeds.length === 0 && !isLoading) {
     return (
      <div className="min-h-screen bg-white dark:bg-white flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">No Breeds Identified!</h2>
          <p className="text-gray-600 mb-6">
            We couldn't quite make out the breed from the image. Sometimes a different angle or better lighting helps!
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Upload Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-white container mx-auto px-4 py-8 mt-2 max-w-6xl flex flex-col">
      <h1 className="mt-2 text-2xl md:text-5xl font-bold text-center mb-4 md:mb-10">
        Most Similar Cat With <span className="text-blue-600">Cat Breed Identifier</span>
      </h1>
      
      <div className="max-w-3xl mx-auto mb-3">
        {/* 匹配的猫品种图片展示区域 */}
        <div className="w-full">
          {identifiedBreeds.length > 0 ? (
            <div className="grid grid-cols-1 gap-2">
              {/* 最匹配的品种显示最大图片 */}
              {identifiedBreeds[0] && (
                <div className="w-full md:pl-14 flex items-center gap-4 md:gap-10 mb-4 md:mb-6">
                  {identifiedBreeds[0].image && (
                    <div className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105 max-w-[240px] max-h-[240px] md:max-w-[300px] md:max-h-[300px]" onClick={() => setSelectedBreed(identifiedBreeds[0].breed_name)}>
                                              <Image 
                          src={getImageSrc(identifiedBreeds[0].image)}
                          alt={identifiedBreeds[0].breed_name}
                          width={300}
                          height={300}
                          className="w-full h-auto object-cover"
                          onError={handleImageError}
                        />
                      <button
                        className="absolute top-2 right-2 bg-black/30 text-white rounded-lg p-2 shadow flex items-center justify-center"
                        onClick={e => { e.stopPropagation(); setSelectedBreed(identifiedBreeds[0].breed_name); }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
                        </svg>
                      </button>
                    </div>
                  )}

                  <div className="flex flex-col justify-center cursor-pointer" onClick={() => setSelectedBreed(identifiedBreeds[0].breed_name)}>
                    <h3 className="text-2xl md:text-4xl font-bold mb-2">{identifiedBreeds[0].breed_name}</h3>
                    <p className="text-xl md:text-4xl font-bold text-blue-600">{identifiedBreeds[0].percentage.toFixed(1)}%</p>
                    {(() => {
                      const randomContent = getRandomDescription(identifiedBreeds[0]);
                      return randomContent ? (
                        <div className="mt-2 md:mt-8 text-xs md:text-base text-start text-gray-400 font-medium">"{randomContent}"</div>
                      ) : null;
                    })()}
                  </div>
                </div>
              )}
              
              {/* 第二和第三匹配的品种显示较小图片 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {identifiedBreeds[1] && (
                  <div className="w-full flex items-center gap-4 mb-4 md:mb-0">
                    {identifiedBreeds[1].image && (
                      <div className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105 max-w-[160px] max-h-[160px] md:max-w-[200px] md:max-h-[200px]" onClick={() => setSelectedBreed(identifiedBreeds[1].breed_name)}>
                                                  <Image 
                            src={getImageSrc(identifiedBreeds[1].image)}
                            alt={identifiedBreeds[1].breed_name}
                            width={200}
                            height={200}
                            className="w-full h-auto object-cover"
                            onError={handleImageError}
                          />
                        <button
                          className="absolute top-2 right-2 bg-black/30 text-white rounded-lg p-2 shadow flex items-center justify-center"
                          onClick={e => { e.stopPropagation(); setSelectedBreed(identifiedBreeds[1].breed_name); }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
                          </svg>
                        </button>
                      </div>
                    )}
                    <div className="flex flex-col justify-center cursor-pointer" onClick={() => setSelectedBreed(identifiedBreeds[1].breed_name)}>
                      <h3 className="text-xl font-bold mb-2">{identifiedBreeds[1].breed_name}</h3>
                      <p className="text-xl md:text-4xl font-bold text-blue-600">{identifiedBreeds[1].percentage.toFixed(1)}%</p>
                      {(() => {
                        const randomContent = getRandomDescription(identifiedBreeds[1]);
                        return randomContent ? (
                          <div className="mt-4 text-sm text-start text-gray-400 font-medium">"{randomContent}"</div>
                        ) : null;
                      })()}
                    </div>
                  </div>
                )}
                {identifiedBreeds[2] && (
                  <div className="w-full flex items-center gap-4 mb-4">
                    {identifiedBreeds[2].image && (
                      <div className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105 max-w-[120px] max-h-[120px] md:max-w-[200px] md:max-h-[200px]" onClick={() => setSelectedBreed(identifiedBreeds[2].breed_name)}>
                                                  <Image 
                            src={getImageSrc(identifiedBreeds[2].image)}
                            alt={identifiedBreeds[2].breed_name}
                            width={200}
                            height={200}
                            className="w-full h-auto object-cover"
                            style={{ maxHeight: '200px' }}
                            onError={handleImageError}
                          />
                        <button
                          className="absolute text-xl md:text-3xl top-2 right-2 bg-black/30 text-white rounded-lg p-2 shadow flex items-center justify-center"
                          onClick={e => { e.stopPropagation(); setSelectedBreed(identifiedBreeds[2].breed_name); }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
                          </svg>
                        </button>
                      </div>
                    )}
                    <div className="flex flex-col justify-center cursor-pointer" onClick={() => setSelectedBreed(identifiedBreeds[2].breed_name)}>
                      <h3 className="text-xl font-bold mb-2">{identifiedBreeds[2].breed_name}</h3>
                      <p className="text-xl md:text-4xl font-bold text-blue-600">{identifiedBreeds[2].percentage.toFixed(1)}%</p>
                      {(() => {
                        const randomContent = getRandomDescription(identifiedBreeds[2]);
                        return randomContent ? (
                          <div className="mt-4 text-sm text-start text-gray-400 font-medium">"{randomContent}"</div>
                        ) : null;
                      })()}
                    </div>
                  </div>
                )}
              </div>
              <button 
                onClick={() => router.push('/')}
                className="mt-6 w-64 mx-auto py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 hover:text-white transition-colors"
              >
                Try again
              </button>
            </div>
          ) : (
            <div className="w-full text-center py-12">
              <p className="text-gray-500">No matches found. Please try uploading a different image.</p>
            </div>
          )}
        </div>
      </div>

      {/* 详情弹窗 */}
      {selectedBreedData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={() => setSelectedBreed(null)}
        >
          <div
            className="bg-white dark:bg-white rounded-2xl shadow-2xl max-w-3xl w-full flex flex-col overflow-hidden relative"
            onClick={e => e.stopPropagation()}
          >
            {/* 右上角关闭按钮 */}
            <button
              className="absolute top-4 right-4 bg-white dark:bg-white rounded-full p-1 shadow hover:bg-blue-600/10"
              onClick={() => setSelectedBreed(null)}
              aria-label="Close"
            >
              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* 图片 */}
            <div className="p-4 flex items-center justify-center bg-gray-50">
                              <Image 
                  src={getImageSrc(selectedBreedData.image)}
                  alt={selectedBreedData.breed_name}
                  width={100}
                  height={100}
                  className="w-[100px] h-[100px] object-cover rounded-lg"
                  onError={handleImageError}
                />
            </div>
            {/* 信息 */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">{selectedBreedData.breed_name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(selectedBreedData).map(([key, value]) => {
                  if (key === "breed_name" || key === "image" || key === "id" || key === "percentage" || !value) return null;
                  return (
                    <div key={key} className="space-y-1">
                      <h3 className="font-semibold text-blue-600 capitalize">{key.replace(/_/g, ' ')}</h3>
                      <p className="text-gray-600">{value as string}</p>
                    </div>
                  );
                })}
              </div>
              <button
                className="mt-8 w-full py-3 rounded-xl bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition-colors"
                onClick={() => setSelectedBreed(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-12 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} whatbreedismycat.app</p>
      </footer>
    </div>
  );
}

// 使用 Suspense 来处理 useSearchParams 的 Next.js 要求
export default function ResultPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white dark:bg-white flex items-center justify-center">
                <p className="text-xl text-gray-700 dark:text-gray-700">Loading results...</p>
            </div>
        }>
            <ResultContent />
        </Suspense>
    );
}
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense, useRef } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import DownloadResultButton from '../components/DownloadResultButton';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
  fun_fact_1?: string;
  fun_fact_2?: string;
  fun_fact_3?: string;
  likes_to_eat?: string;
  can_t_eat?: string;
  region_of_origin?: string;
  mixed_or_not?: string;

  Potential_Health_Problems?: string;
  Hypo_Allergenic?: string;
  Grooming_Needs?: string;
  Hair_Loss?: string;
  Exercise_Needs?: string;
  Is_it_suitable_for_kids_or_the_elderly?: string;
  How_to_build_a_close_relationship?: string;
  Typical_Temperament_Behavior?: string;
  Notable_Health_Tendencies_Special_Care_Needs?: string;
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
  const [currentDisplayImage, setCurrentDisplayImage] = useState<DisplayBreedInfo | null>(null);
  const [userUploadedImage, setUserUploadedImage] = useState<string | null>(null);

  // 添加用于截图的ref
  const pageContentRef = useRef<HTMLDivElement>(null);

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

    // 2. 获取用户上传的图片
    const savedImage = sessionStorage.getItem('userUploadedImage');
    if (savedImage) {
      setUserUploadedImage(savedImage);
    }

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
            cat.breed_name.toLowerCase().replace(/\s+cat$/i, '').trim() === prediction.breed_name.toLowerCase().replace(/\s+cat$/i, '').trim()
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
    } else {
      setSelectedBreedData(null);
    }
  }, [selectedBreed, identifiedBreeds]);

  // 设置初始显示图片和默认选中第一个品种
  useEffect(() => {
    if (identifiedBreeds.length > 0 && !currentDisplayImage) {
      setCurrentDisplayImage(identifiedBreeds[0]);
      // 默认选中第一个品种
      setSelectedBreed(identifiedBreeds[0].breed_name);
    }
  }, [identifiedBreeds, currentDisplayImage]);

  // 处理品种点击，同时更新大图和详情
  const handleBreedClick = (breed: DisplayBreedInfo) => {
    setCurrentDisplayImage(breed);
    setSelectedBreed(breed.breed_name);
  };

  // 组件卸载时恢复滚动
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
      // 清理sessionStorage中的图片数据
      sessionStorage.removeItem('userUploadedImage');
    };
  }, []);

  if (isLoading && identifiedBreeds.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-white flex flex-col items-center justify-center p-4 text-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-white flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md w-full">
          <p>{error}</p>
          <button
            className="mt-4 px-6 py-2 bg-taro-300 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
            className="bg-pink-500 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Upload Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div ref={pageContentRef} className="container mx-auto px-4 py-8 mt-2 max-w-6xl flex flex-col">
        {/* 标题区域 */}
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="mt-8  text-3xl md:text-4xl font-bold mb-2 md:mb-3">
            Cat Breed Results
          </h1>
          <p className="text-gray-600">Note: These AI results are based on visual features and may not be 100% accurate. For fun and reference only.</p>
        </div>
        
        {/* 整个结果区域的外框 */}
        <div className="max-w-3xl mx-auto mb-3 bg-white border  rounded-2xl shadow-lg p-4 sm:p-6">
          {/* 匹配的猫品种图片展示区域 */}
          <div className="w-full max-w-5xl mx-auto">
            {identifiedBreeds.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {/* 新的布局：左边大图，右边匹配结果 */}
                <div className="flex flex-col lg:flex-row gap-8  mb-2 sm:mb-6">
                  {/* 左边：放大的结果图片 */}
                  <div className="w-full mt-1 sm:w-8 lg:w-1/2">
                    {userUploadedImage ? (
                      <div className="relative rounded-lg overflow-hidden shadow-lg w-full h-64 lg:h-96">
                        <img 
                          src={userUploadedImage}
                          alt="Your uploaded cat"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : currentDisplayImage && currentDisplayImage.image && (
                      <div className="relative rounded-lg overflow-hidden shadow-lg w-full h-64 lg:h-96">
                        <img 
                          src={getImageSrc(currentDisplayImage.image)}
                          alt={currentDisplayImage.breed_name}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover"
                          onError={handleImageError}
                        />
                      </div>
                    )}
                  </div>

                  {/* 右边：匹配结果 */}
                  <div className="w-full lg:w-1/2 flex flex-col">
                    {/* Cat Breed Match 标题 */}
                    <h2 className="text-lg mb-6 text-gray-700">Cat Breed Match:</h2>
                    
                    {/* 主要匹配结果 */}
                    {identifiedBreeds[0] && (
                      <div 
                        className={`rounded-lg max-w-5xl p-4 mb-4 sm:mb-8  cursor-pointer  flex items-center justify-between ${
                          currentDisplayImage?.breed_name === identifiedBreeds[0].breed_name 
                            ? 'bg-gray-50 border-2 border-pink-400' 
                            : ' hover:bg-gray-50'
                        }`}
                        onClick={() => handleBreedClick(identifiedBreeds[0])}
                      >
                        <div>
                          <h3 className="text-xl lg:text-2xl font-bold mb-1">{identifiedBreeds[0].breed_name}</h3>
                          <p className="text-lg lg:text-xl font-bold text-pink-500">{identifiedBreeds[0].percentage.toFixed(1)}% confident</p>
                        </div>
                        <div className="w-16 h-16 rounded flex-shrink-0 overflow-hidden">
                          {identifiedBreeds[0].image && (
                            <img 
                              src={getImageSrc(identifiedBreeds[0].image)}
                              alt={identifiedBreeds[0].breed_name}
                              width={48}
                              height={48}
                              className="w-full h-full object-contain"
                              onError={handleImageError}
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Other Breed Match 标题 */}
                    {identifiedBreeds.length > 1 && (
                      <>
                        <h2 className="text-lg  mb-6 text-gray-700">Other Breed Match:</h2>
                        
                        {/* 其他匹配结果 */}
                        <div className="space-y-4">
                          {identifiedBreeds.slice(1).map((breed, index) => (
                            <div 
                              key={breed.id}
                              className={`flex items-center gap-3 cursor-pointer p-2 rounded transition-colors ${
                                currentDisplayImage?.breed_name === breed.breed_name 
                                  ? 'bg-gray-50 border-2 border-pink-400' 
                                  : 'hover:bg-gray-50'
                              }`}
                              onClick={() => handleBreedClick(breed)}
                            >
                              <div className="w-16 h-16 bg-gray-400 rounded overflow-hidden flex-shrink-0">
                                {breed.image && (
                                  <img 
                                    src={getImageSrc(breed.image)}
                                    alt={breed.breed_name}
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-contain"
                                    onError={handleImageError}
                                  />
                                )}
                              </div>
                              <div>
                                <h3 className="font-bold text-lg">{breed.breed_name}</h3>
                                <p className="text-pink-500 font-semibold">{breed.percentage.toFixed(1)}% confident</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

          {/* 品种详情显示区域 */}
          {selectedBreedData ? (
            <div className="pt-1 ">
              {/* 品种名称标题 */}
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{selectedBreedData.breed_name} <i className="fas fa-cat ms-2 text-pink-500"></i></h2>
              
              {/* 基本信息分类 */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-pink-500 mb-4 pb-1 ">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {selectedBreedData.size && (
                    <div>
                      <p className="text-gray-600"><span className="font-semibold text-gray-700">Size: </span>{selectedBreedData.size}</p>
                    </div>
                  )}
                  {selectedBreedData.height && (
                    <div>
                      <p className="text-gray-600"><span className="font-semibold text-gray-700">Height: </span>{selectedBreedData.height}</p>
                    </div>
                  )}
                  {selectedBreedData.weight && (
                    <div>
                      <p className="text-gray-600"><span className="font-semibold text-gray-700">Weight: </span>{selectedBreedData.weight}</p>
                    </div>
                  )}
                  {selectedBreedData.lifespan && (
                    <div>
                      <p className="text-gray-600"><span className="font-semibold text-gray-700">Lifespan: </span>{selectedBreedData.lifespan}</p>
                    </div>
                  )}
                  {selectedBreedData.region_of_origin && (
                    <div>
                      <p className="text-gray-600"><span className="font-semibold text-gray-700">Origin: </span>{selectedBreedData.region_of_origin}</p>
                    </div>
                  )}
                  {selectedBreedData.Rare_or_not && (
                    <div>
                      <p className="text-gray-600"><span className="font-semibold text-gray-700">Rarity: </span>{selectedBreedData.Rare_or_not}</p>
                    </div>
                  )}
                  {selectedBreedData.mixed_or_not && (
                    <div>
                      <p className="text-gray-600"><span className="font-semibold text-gray-700">Mixed: </span>{selectedBreedData.mixed_or_not}</p>
                    </div>
                  )}
                                    {selectedBreedData.likes_to_eat && (
                    <div>
                      <p className="text-gray-600"><span className="font-semibold text-gray-700">Likes:  </span>{selectedBreedData.likes_to_eat}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 左右分栏布局 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 左栏：健康与护理 */}
                <div>
                  <h3 className="text-lg font-bold  text-pink-500 mb-4 pb-1 ">Notable Health Tendencies & Special Care Needs</h3>
                  <div className="space-y-3 text-sm">
                    {selectedBreedData.Notable_Health_Tendencies_Special_Care_Needs && (
                      <div>
                        <p className="text-gray-600 mb-4 leading-relaxed">{selectedBreedData.Notable_Health_Tendencies_Special_Care_Needs}</p>
                      </div>
                    )}
                    
                  </div>
                </div>

                {/* 右栏：性格与行为 */}
                <div>
                  <h3 className="text-lg font-bold text-pink-500 mb-4 pb-1 ">Typical Temperament & Behavior</h3>
                  <div className="space-y-3 text-sm">
                    {selectedBreedData.Typical_Temperament_Behavior && (
                      <div>
                        <p className="text-gray-600 leading-relaxed">{selectedBreedData.Typical_Temperament_Behavior}</p>
                      </div>
                    )}
                    
                      
                  </div>
                </div>
              </div>

              {/* 饮食与趣事分类 */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-pink-500 mb-4 pb-1 ">Diet & Fun Facts</h3>


                {/* Fun Facts 网格布局 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {selectedBreedData.fun_fact && (
                    <div className="p-2 ">
                      <h4 className="font-semibold text-gray-700 mb-2">Special</h4>
                      <p className="text-gray-600 leading-relaxed">{selectedBreedData.fun_fact}</p>
                    </div>
                  )}
                  
                  {selectedBreedData.fun_fact_1 && (
                    <div className="p-2 ">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {selectedBreedData.fun_fact_1.includes('appearance') || selectedBreedData.fun_fact_1.includes('coat') || selectedBreedData.fun_fact_1.includes('look') || selectedBreedData.fun_fact_1.includes('eyes') || selectedBreedData.fun_fact_1.includes('body') ? 'Appearance' :
                         selectedBreedData.fun_fact_1.includes('history') || selectedBreedData.fun_fact_1.includes('ancient') || selectedBreedData.fun_fact_1.includes('origin') || selectedBreedData.fun_fact_1.includes('brought') || selectedBreedData.fun_fact_1.includes('Viking') || selectedBreedData.fun_fact_1.includes('temple') || selectedBreedData.fun_fact_1.includes('royalty') ? 'Heritage' :
                         selectedBreedData.fun_fact_1.includes('water') || selectedBreedData.fun_fact_1.includes('swim') || selectedBreedData.fun_fact_1.includes('bath') ? 'Aquatic' :
                         selectedBreedData.fun_fact_1.includes('behavior') || selectedBreedData.fun_fact_1.includes('personality') || selectedBreedData.fun_fact_1.includes('loyal') || selectedBreedData.fun_fact_1.includes('follow') || selectedBreedData.fun_fact_1.includes('dog-like') ? 'Behavior' :
                         'Unique'}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{selectedBreedData.fun_fact_1}</p>
                    </div>
                  )}
                  
                  {selectedBreedData.fun_fact_2 && (
                    <div className="p-2 ">
                      <h4 className="font-semibold text-gray-700 mb-2">
                        {selectedBreedData.fun_fact_2.includes('appearance') || selectedBreedData.fun_fact_2.includes('coat') || selectedBreedData.fun_fact_2.includes('look') || selectedBreedData.fun_fact_2.includes('eyes') || selectedBreedData.fun_fact_2.includes('body') || selectedBreedData.fun_fact_2.includes('build') ? 'Physical' :
                         selectedBreedData.fun_fact_2.includes('history') || selectedBreedData.fun_fact_2.includes('ancient') || selectedBreedData.fun_fact_2.includes('origin') || selectedBreedData.fun_fact_2.includes('brought') || selectedBreedData.fun_fact_2.includes('Viking') || selectedBreedData.fun_fact_2.includes('temple') || selectedBreedData.fun_fact_2.includes('royalty') ? 'Heritage' :
                         selectedBreedData.fun_fact_2.includes('water') || selectedBreedData.fun_fact_2.includes('swim') || selectedBreedData.fun_fact_2.includes('bath') ? 'Aquatic' :
                         selectedBreedData.fun_fact_2.includes('behavior') || selectedBreedData.fun_fact_2.includes('personality') || selectedBreedData.fun_fact_2.includes('loyal') || selectedBreedData.fun_fact_2.includes('follow') || selectedBreedData.fun_fact_2.includes('dog-like') || selectedBreedData.fun_fact_2.includes('playful') ? 'Traits' :
                         'Unique'}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{selectedBreedData.fun_fact_2}</p>
                    </div>
                  )}
                  
                  {selectedBreedData.fun_fact_3 && (
                    <div className="p-2 ">
                      <h4 className="font-semibold text-gray-700 mb-2">
                        {selectedBreedData.fun_fact_3.includes('appearance') || selectedBreedData.fun_fact_3.includes('coat') || selectedBreedData.fun_fact_3.includes('look') || selectedBreedData.fun_fact_3.includes('eyes') || selectedBreedData.fun_fact_3.includes('body') || selectedBreedData.fun_fact_3.includes('build') ? 'Physical' :
                         selectedBreedData.fun_fact_3.includes('history') || selectedBreedData.fun_fact_3.includes('ancient') || selectedBreedData.fun_fact_3.includes('origin') || selectedBreedData.fun_fact_3.includes('brought') || selectedBreedData.fun_fact_3.includes('Viking') || selectedBreedData.fun_fact_3.includes('temple') || selectedBreedData.fun_fact_3.includes('royalty') ? 'Heritage' :
                         selectedBreedData.fun_fact_3.includes('water') || selectedBreedData.fun_fact_3.includes('swim') || selectedBreedData.fun_fact_3.includes('bath') ? 'Aquatic' :
                         selectedBreedData.fun_fact_3.includes('behavior') || selectedBreedData.fun_fact_3.includes('personality') || selectedBreedData.fun_fact_3.includes('loyal') || selectedBreedData.fun_fact_3.includes('follow') || selectedBreedData.fun_fact_3.includes('dog-like') || selectedBreedData.fun_fact_3.includes('playful') || selectedBreedData.fun_fact_3.includes('energy') || selectedBreedData.fun_fact_3.includes('love') || selectedBreedData.fun_fact_3.includes('cuddle') || selectedBreedData.fun_fact_3.includes('social') ? 'Character' :
                         'Notable'}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{selectedBreedData.fun_fact_3}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-4 text-center">

            </div>
          )}

                
              </div>
            ) : (
              <div className="w-full text-center py-12">
                <p className="text-gray-500">No matches found. Please try uploading a different image.</p>
              </div>
            )}
          </div>
        </div>

                { /* 功能按钮区域  */}
                <div className="pt-6 download-buttons-container">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    {/* 下载和检查按钮 */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* 使用下载组件 */}
                      <DownloadResultButton 
                        captureRef={pageContentRef}
                        disabled={identifiedBreeds.length === 0}
                      />
                      
                      <button
                        onClick={() => router.push('/')}
                        className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap"
                      >
                        Check another photo
                      </button>
                    </div>
                    
               
                  </div>
                </div>

      </div>

    </div>
  );
}

// 使用 Suspense 来处理 useSearchParams 的 Next.js 要求
export default function ResultPage() {
    return (
        <>
            <Suspense fallback={
                <div className="min-h-screen bg-white dark:bg-white flex items-center justify-center">
                    <p className="text-xl text-gray-700 dark:text-gray-700">Loading results...</p>
                </div>
            }>
                <ResultContent />
            </Suspense>
        </>
    );
}
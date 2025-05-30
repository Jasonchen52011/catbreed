// app/result/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense, useRef } from 'react';
import Image from 'next/image';
import LoadingSpinner from '../components/LoadingSpinner';
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
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentDisplayImage, setCurrentDisplayImage] = useState<DisplayBreedInfo | null>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);

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

  // 设置初始显示图片
  useEffect(() => {
    if (identifiedBreeds.length > 0 && !currentDisplayImage) {
      setCurrentDisplayImage(identifiedBreeds[0]);
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

  // 检测设备类型
  const isMobileDevice = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // 下载结果为图片
  const downloadAsImage = async () => {
    if (!resultCardRef.current) return;
    
    setIsDownloading(true);
    
    try {
      // 动态导入 html2canvas
      const html2canvas = (await import('html2canvas')).default;
      
      // 隐藏按钮区域
      const buttonContainer = resultCardRef.current.querySelector('.pt-6.border-t.border-gray-200');
      if (buttonContainer) {
        (buttonContainer as HTMLElement).style.display = 'none';
      }
      
      // 创建用于下载的容器
      const downloadContainer = document.createElement('div');
      downloadContainer.style.cssText = `
        background: white;
        padding: 40px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        width: 1200px;
        margin: 0 auto;
        position: absolute;
        top: -9999px;
        left: 0;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      `;
      
      // 克隆原始内容
      const clonedContent = resultCardRef.current.cloneNode(true) as HTMLElement;
      
      // 移除克隆内容中的按钮区域
      const clonedButtonContainer = clonedContent.querySelector('.pt-6.border-t.border-gray-200');
      if (clonedButtonContainer) {
        clonedButtonContainer.remove();
      }
      
      // 添加水印和品牌信息
      const watermark = document.createElement('div');
      watermark.style.cssText = `
        text-align: center;
        padding-top: 30px;
        border-top: 1px solid #e5e7eb;
        margin-top: 30px;
        color: #6b7280;
        font-size: 14px;
      `;
      watermark.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
          <span>🐱</span>
          <span>Generated by whatbreedismycat.app</span>
          <span>•</span>
          <span>${new Date().toLocaleDateString()}</span>
        </div>
      `;
      
      // 组装下载内容
      downloadContainer.appendChild(clonedContent);
      downloadContainer.appendChild(watermark);
      document.body.appendChild(downloadContainer);
      
      // 等待渲染
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // 生成截图
      const canvas = await html2canvas(downloadContainer, {
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        scale: 2,
        scrollX: 0,
        scrollY: 0,
        logging: false,
        width: 1200,
        height: downloadContainer.scrollHeight
      });
      
      // 清理临时元素
      document.body.removeChild(downloadContainer);
      
      // 恢复按钮显示
      if (buttonContainer) {
        (buttonContainer as HTMLElement).style.display = '';
      }
      
      // 创建下载链接
      const link = document.createElement('a');
      const breedName = identifiedBreeds[0]?.breed_name?.replace(/\s+/g, '-').toLowerCase() || 'cat-breed';
      const timestamp = new Date().toISOString().slice(0, 10);
      link.download = `${breedName}-results-${timestamp}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      
      // 触发下载
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Professional cat breed result image downloaded successfully!');
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // 社交媒体分享
  const shareToSocial = (platform: string) => {
    const url = window.location.href;
    const text = `Check out my cat breed identification results! ${identifiedBreeds[0]?.breed_name} - ${identifiedBreeds[0]?.percentage.toFixed(1)}% confident`;
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

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
    <div className="min-h-screen bg-white dark:bg-white">
      <div className="container mx-auto px-4 py-8 mt-2 max-w-6xl flex flex-col">
        {/* 标题区域 */}
        <div className="text-center mb-8">
          <h1 className="mt-8 text-2xl md:text-4xl font-bold mb-2 md:mb-3">
            Cat Breed Results
          </h1>
          <p className="text-gray-600">Note: These AI results are based on visual features and may not be 100% accurate. For fun and reference only.</p>
        </div>
        
        {/* 整个结果区域的外框 */}
        <div ref={resultCardRef} className="max-w-5xl mx-auto mb-3 bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
          {/* 匹配的猫品种图片展示区域 */}
          <div className="w-full max-w-5xl mx-auto">
            {identifiedBreeds.length > 0 ? (
              <div className="grid grid-cols-1 gap-8">
                {/* 新的布局：左边大图，右边匹配结果 */}
                <div className="flex flex-col lg:flex-row gap-8 mb-6">
                  {/* 左边：放大的结果图片 */}
                  <div className="w-full lg:w-1/2">
                    {currentDisplayImage && currentDisplayImage.image && (
                      <div className="relative rounded-lg overflow-hidden shadow-lg w-full h-64 lg:h-96">
                        <Image 
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
                        className={`rounded-lg max-w-6xl p-4 mb-8  flex items-center justify-between ${
                          currentDisplayImage?.breed_name === identifiedBreeds[0].breed_name 
                            ? 'bg-gray-100 border-2 border-pink-400' 
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        onClick={() => handleBreedClick(identifiedBreeds[0])}
                      >
                        <div>
                          <h3 className="text-xl lg:text-2xl font-bold mb-1">{identifiedBreeds[0].breed_name}</h3>
                          <p className="text-lg lg:text-xl font-bold text-pink-500">{identifiedBreeds[0].percentage.toFixed(1)}% confident</p>
                        </div>
                        <div className="w-16 h-16 rounded flex-shrink-0 overflow-hidden">
                          {identifiedBreeds[0].image && (
                            <Image 
                              src={getImageSrc(identifiedBreeds[0].image)}
                              alt={identifiedBreeds[0].breed_name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
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
                                  ? 'bg-gray-100 border-2 border-pink-400' 
                                  : 'hover:bg-gray-50'
                              }`}
                              onClick={() => handleBreedClick(breed)}
                            >
                              <div className="w-16 h-16 bg-gray-400 rounded overflow-hidden flex-shrink-0">
                                {breed.image && (
                                  <Image 
                                    src={getImageSrc(breed.image)}
                                    alt={breed.breed_name}
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover"
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
          {selectedBreedData && (
            <div className="pt-4 border-t border-gray-200">
              {/* 品种名称标题 */}
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{selectedBreedData.breed_name} <i className="fas fa-cat ms-2 text-pink-500"></i></h2>
              
              {/* 基本信息分类 */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-pink-500 mb-2 pb-1 border-b border-pink-200">Basic Information</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
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
                </div>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {/* 健康与护理分类 */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-pink-500 mb-2 pb-1 border-b border-pink-200">
                  Health & Care
                  </h3>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  {selectedBreedData.Potential_Health_Problems && (
                    <div>
                      <span className="font-semibold text-gray-700">Health:</span>
                      <p className="text-gray-600 leading-tight">{selectedBreedData.Potential_Health_Problems}</p>
                    </div>
                  )}
                  {selectedBreedData.Hypo_Allergenic && (
                    <div>
                      <span className="font-semibold text-gray-700">Hypoallergenic:</span>
                      <p className="text-gray-600">{selectedBreedData.Hypo_Allergenic}</p>
                    </div>
                  )}
                  {selectedBreedData.Grooming_Needs && (
                    <div>
                      <span className="font-semibold text-gray-700">Grooming:</span>
                      <p className="text-gray-600 leading-tight">{selectedBreedData.Grooming_Needs}</p>
                    </div>
                  )}
                  {selectedBreedData.Hair_Loss && (
                    <div>
                      <span className="font-semibold text-gray-700">Hair Loss:</span>
                      <p className="text-gray-600">{selectedBreedData.Hair_Loss}</p>
                    </div>
                  )}
                  {selectedBreedData.Exercise_Needs && (
                    <div>
                      <span className="font-semibold text-gray-700">Exercise:</span>
                      <p className="text-gray-600 leading-tight">{selectedBreedData.Exercise_Needs}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 性格与行为分类 */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-pink-500 mb-2 pb-1 border-b border-pink-200">Personality & Behavior</h3>
                <div className="space-y-2 text-sm">
                  {selectedBreedData.personality && (
                    <div>
                      <span className="font-semibold text-gray-700">Temperament:</span>
                      <p className="text-gray-600 leading-tight">{selectedBreedData.personality}</p>
                    </div>
                  )}
                  {selectedBreedData.Is_it_suitable_for_kids_or_the_elderly && (
                    <div>
                      <span className="font-semibold text-gray-700">Family Suitable:</span>
                      <p className="text-gray-600 leading-tight">{selectedBreedData.Is_it_suitable_for_kids_or_the_elderly}</p>
                    </div>
                  )}
                  {selectedBreedData.How_to_build_a_close_relationship && (
                    <div>
                      <span className="font-semibold text-gray-700">Bonding:</span>
                      <p className="text-gray-600 leading-tight">{selectedBreedData.How_to_build_a_close_relationship}</p>
                    </div>
                  )}
                </div>
              </div>
              
              </div>
              {/* 饮食与趣事分类 */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-pink-500 mb-2 pb-1 border-b border-pink-200">Diet & Fun Facts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  {selectedBreedData.likes_to_eat && (
                    <div>
                      <span className="font-semibold text-gray-700">Likes:</span>
                      <p className="text-gray-600 leading-tight">{selectedBreedData.likes_to_eat}</p>
                    </div>
                  )}
                  {selectedBreedData.can_t_eat && (
                    <div>
                      <span className="font-semibold text-gray-700">Avoid:</span>
                      <p className="text-gray-600 leading-tight">{selectedBreedData.can_t_eat}</p>
                    </div>
                  )}
                  {selectedBreedData.fun_fact && (
                    <div className="md:col-span-2">
                      <span className="font-semibold text-gray-700">Fun Fact:</span>
                      <p className="text-gray-600 leading-tight">{selectedBreedData.fun_fact}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

                {/* 功能按钮区域 - 移动到卡片底部 */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    {/* 下载和检查按钮 */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={downloadAsImage}
                        disabled={isDownloading}
                        className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-2"
                      >
                        {isDownloading ? (
                          <>
                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Generating image...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Download as image</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => router.push('/')}
                        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap"
                      >
                        Check another photo
                      </button>
                    </div>
                    
                    {/* 社交媒体分享 */}
                    <div className="flex items-center gap-3">
                      <span className="text-gray-700 font-medium">Share to:</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => shareToSocial('facebook')}
                          className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                          aria-label="Share on Facebook"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => shareToSocial('twitter')}
                          className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                          aria-label="Share on Twitter"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => shareToSocial('pinterest')}
                          className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                          aria-label="Share on Pinterest"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.407-5.965 1.407-5.965s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => shareToSocial('linkedin')}
                          className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                          aria-label="Share on LinkedIn"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full text-center py-12">
                <p className="text-gray-500">No matches found. Please try uploading a different image.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-sm text-gray-600 pb-8">
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
// app/page.tsx
'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../components/LoadingSpinner';
import config from '../../config.json';


// 定义允许的图片文件类型
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/bmp', 'image/webp'];
const MAX_FILE_SIZE_MB = config.content.upload.maxFileSize; // 最大文件大小 (MB)
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// 示例猫咪图片
const EXAMPLE_CATS = config.content.upload.exampleCats;

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const router = useRouter();

  // 重试机制函数
  const retryWithBackoff = async (
    fn: () => Promise<Response>,
    maxRetries: number = 3,
    baseDelay: number = 1500
  ): Promise<Response> => {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await fn();
        if (response.ok) {
          return response;
        }
        
        // 如果是客户端错误（4xx），除了429外不重试
        if (response.status >= 400 && response.status < 500) {
          if (response.status === 429) {
            // 429错误需要特殊处理，抛出错误让前端显示配额超限信息
            throw new Error(`Rate limit exceeded: ${response.status}`);
          }
          console.log(`Client error ${response.status}, not retrying`);
          return response;
        }
        
        // 服务器错误（5xx），抛出错误以触发重试
        throw new Error(`Server error: ${response.status}`);
      } catch (error: any) {
        console.error(`Frontend API call attempt ${attempt + 1} failed:`, error.message);
        
        if (attempt === maxRetries) {
          console.error(`All frontend retries failed. Final error:`, error);
          throw error;
        }
        
        // 指数退避延迟，加入随机抖动
        const jitter = Math.random() * 500;
        const delay = baseDelay * Math.pow(2, attempt) + jitter;
        console.log(`Frontend retrying in ${Math.round(delay)}ms (attempt ${attempt + 1}/${maxRetries + 1})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    throw new Error('Max retries exceeded');
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError(`Oh no! File is too big. Please keep it under ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setSelectedFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.bmp'] },
    disabled: isLoading,
    maxFiles: 1,
  });

  // 处理示例图片点击
  const handleExampleClick = async (imagePath: string) => {
    try {
      setError(null);
      setImgError(false);
      
      // 从public路径获取图片并转换为File对象
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const fileName = imagePath.split('/').pop() || 'example-cat.jpg';
      const file = new File([blob], fileName, { type: blob.type });
      
      // 设置预览和文件
      setPreviewUrl(imagePath);
      setSelectedFile(file);
    } catch (error) {
      console.error('Error loading example image:', error);
      setError('Failed to load example image');
    }
  };

  const handleSubmit = async () => {
    if (previewUrl && selectedFile) {
      try {
        setIsLoading(true);
        setError(null);

        const reader = new FileReader();
        reader.onload = async () => {
          if (typeof reader.result === 'string') {
            try {
              const mimeType = selectedFile.type;

              // 保存用户上传的图片到sessionStorage
              sessionStorage.setItem('userUploadedImage', reader.result);

              const response = await retryWithBackoff(async () => {
                return await fetch('/api/identify', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: reader.result, mimeType: mimeType }),
                });
              });

              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Something went wrong (status: ${response.status})`);
              }

              const result = await response.json();
              const queryString = encodeURIComponent(JSON.stringify(result.predictions));
              router.push(`/result?predictions=${queryString}`);

            } catch (err: any) {
              // 更友好的错误信息
              if (err.message.includes('fetch failed') || err.message.includes('Server error')) {
                setError('Network connection failed. Please check your internet connection and try again.');
              } else if (err.message.includes('Rate limit exceeded')) {
                // 429错误的特殊处理
                setError('⏰ AI service quota exceeded. Free tier limit reached. Please try again later or upgrade to premium for unlimited access!');
              } else {
              setError(err.message || 'Could not identify your cat. Please try again!');
              }
              console.error(err);
            } finally {
              setIsLoading(false);
            }
          }
        };
        reader.readAsDataURL(selectedFile);
      } catch (error) {
        console.error('Error processing image:', error);
        setIsLoading(false);
      }
    } else {
      setError('Please select an image first!');
    }
  };

  return (
    <>
      <div id="cat-identifier" className="bg-white mt-3 sm:mt-10 sm:smb-14 px-4 sm:px-8 lg:px-12 py-6 sm:py-10 overflow-x-hidden">
        <div className="max-w-6xl mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-center">
            
            {/* 左侧内容 - 只在桌面端显示 */}
            <div className="hidden lg:block space-y-6 sm:space-y-8  order-2 lg:order-1 lg:pt-8">
              <div>
                <h1 className="text-3xl sm:text-5xl  mb-8 sm:mb-8   font-bold text-gray-900 leading-tight">
                  {config.content.hero.title}
                </h1>
                <p className="text-base sm:text-2xl text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  {config.content.hero.description}
                </p>
              </div>

              {/* 统计信息 - 桌面端 */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex -space-x-2">
                  {config.content.hero.stats.avatars.map((avatar, index) => (
                    <div key={index} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white overflow-hidden flex-shrink-0">
                      <img src={avatar.src} alt={avatar.alt} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <span className="text-base sm:text-lg font-medium text-gray-700 min-w-0 flex-shrink">{config.content.hero.stats.text}</span>
              </div>
              
              
            </div>

            {/* 右侧区域 */}
            <div className="order-1 lg:order-2 w-full max-w-full space-y-4">
              
              {/* 移动端内容区域 - 放在上传区域上方 */}
              <div className="lg:hidden mt-10 mb-6 text-center">
                <h2 className="text-2xl sm:text-6xl  mb-8 sm:mb-8   lg:text-5xl font-bold text-gray-900 leading-tight">
                  {config.content.hero.title}
                </h2>
                <p className="text-base sm:text-2xl text-gray-600 mb-6 leading-relaxed">
                  {config.content.hero.description}
                </p>

                {/* 统计信息 - 移动端 */}
                <div className="flex items-center justify-center space-x-3">
                  <div className="flex -space-x-2">
                    {config.content.hero.stats.avatars.map((avatar, index) => (
                      <div key={index} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden flex-shrink-0">
                        <img src={avatar.src} alt={avatar.alt} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-base font-medium text-gray-700 min-w-0 flex-shrink">{config.content.hero.stats.text}</span>
                </div>
              </div>

              {/* 上传区域 */}
              <div className="bg-white border border-gray-100 shadow-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 w-full max-w-full">
                {!previewUrl ? (
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed border-gray-200 rounded-xl sm:rounded-2xl p-6 sm:p-12 text-center cursor-pointer transition-all duration-300 w-full ${
                      isDragActive ? 'border-blue-500 bg-blue-50' : 'hover:border-pink-300'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <input {...getInputProps()} />
                    
                    <div className="space-y-6 sm:space-y-8">
                      <p className="text-lg sm:text-xl font-medium text-gray-700">
                        {config.content.upload.dragDropText}
                      </p>
                      <p className="text-sm text-gray-500">
                        {config.content.upload.allowedFormats.join(', ')}, Less Than {MAX_FILE_SIZE_MB}MB
                      </p>
                      
                      <button
                        type="button"
                        className="max-w-xs mx-auto block bg-pink-500 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-semibold text-base sm:text-lg hover:bg-pink-700 transition-colors disabled:opacity-50 w-full sm:w-auto"
                        disabled={isLoading}
                      >
                        {config.content.upload.uploadButtonText}
                        <i className="fas fa-upload ml-2"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 sm:space-y-6 w-full">
                    <div
                      {...getRootProps()}
                      className="relative cursor-pointer group w-full"
                    >
                      <input {...getInputProps()} />
                      <div className="w-full h-48 sm:h-60 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-gray-50">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 rounded-xl sm:rounded-2xl"
                          onError={() => setImgError(true)}
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl sm:rounded-2xl transition-colors duration-300 flex items-center justify-center">
                        <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-sm sm:text-base">
                          Click to change photo
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="max-w-sm mx-auto block bg-pink-500 text-white py-3 sm:py-4 px-4 sm:px-5 rounded-xl font-semibold text-base sm:text-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                    >
                      {isLoading ? (
                        <LoadingSpinner />
                      ) : (
                        config.content.upload.analyzeButtonText
                      )}
                    </button>
                  </div>
                )}

                {error && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 w-full">
                    <p className="text-red-600 text-sm sm:text-base break-words">{error}</p>
                  </div>
                )}

                {/* 示例图片区域 */}
                <div className="mt-6 sm:mt-8 w-full">
                  <p className="text-sm text-gray-500 mb-3 sm:mb-4">{config.content.upload.exampleText}</p>
                  <div className="grid grid-cols-4 sm:grid-cols-4 gap-1.5 sm:gap-3 w-full max-w-xs sm:max-w-none mx-auto">
                    {EXAMPLE_CATS.map((cat) => (
                      <div 
                        key={cat.name} 
                        className="aspect-square bg-gray-200 rounded-md sm:rounded-lg cursor-pointer hover:bg-gray-300 transition-all duration-300 overflow-hidden group hover:shadow-md w-full"
                        onClick={() => handleExampleClick(cat.image)}
                        title={cat.name}
                      >
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
    </>
  );
}
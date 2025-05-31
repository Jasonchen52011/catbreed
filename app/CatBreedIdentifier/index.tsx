// app/page.tsx
'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../components/LoadingSpinner';


// 定义允许的图片文件类型
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/bmp', 'image/webp'];
const MAX_FILE_SIZE_MB = 10; // 最大文件大小 (MB)
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// 示例猫咪图片
const EXAMPLE_CATS = [
  { name: 'Persian', image: '/cat/persian.jpg' },
  { name: 'Maine Coon', image: '/cat/maine-coon.jpg' },
  { name: 'British Shorthair', image: '/cat/british-shorthair.jpg' },
  { name: 'Siamese', image: '/cat/siamese.jpg' },
  { name: 'Ragdoll', image: '/cat/ragdoll.jpg' }
];

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const router = useRouter();

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

              const response = await fetch('/api/identify', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: reader.result, mimeType: mimeType }),
              });

              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Something went wrong (status: ${response.status})`);
              }

              const result = await response.json();
              const queryString = encodeURIComponent(JSON.stringify(result.predictions));
              router.push(`/result?predictions=${queryString}`);

            } catch (err: any) {
              setError(err.message || 'Could not identify your cat. Please try again!');
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
      <div id="cat-identifier" className="bg-white mt-3 sm:mt-10 mb-14 px-4 sm:px-8 lg:px-12 py-6 sm:py-10 overflow-x-hidden">
        <div className="max-w-6xl mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-center">
            
            {/* 左侧内容 - 只在桌面端显示 */}
            <div className="hidden lg:block space-y-6 sm:space-y-8  order-2 lg:order-1 lg:pt-8">
              <div>
                <h1 className="text-3xl sm:text-5xl  mb-8 sm:mb-8   font-bold text-gray-900 leading-tight">
                  AI Cat Breed Identifier
                </h1>
                <p className="text-base sm:text-2xl text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                   Upload a photo of your cat to let AI identify its possible breed. You'll get 3 likely breed types, each with a matching percentage, breed features, and care tips—free, fast, and smart.
                </p>
              </div>

              {/* 统计信息 - 桌面端 */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white overflow-hidden flex-shrink-0">
                    <img src="/cat/ceylon.jpg" alt="ceylon Cat" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white overflow-hidden flex-shrink-0">
                    <img src="/cat/balinese.jpg" alt="balinese Cat" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white overflow-hidden flex-shrink-0">
                    <img src="/cat/bombay.jpg" alt="bombay Cat" className="w-full h-full object-cover" />
                  </div>
                </div>
                <span className="text-base sm:text-lg font-medium text-gray-700 min-w-0 flex-shrink">50,000+ cat photos scanned</span>
              </div>
              
              
            </div>

            {/* 右侧区域 */}
            <div className="order-1 lg:order-2 w-full max-w-full space-y-4">
              
              {/* 移动端内容区域 - 放在上传区域上方 */}
              <div className="lg:hidden mt-10 mb-6 text-center">
                <h2 className="text-2xl sm:text-6xl  mb-8 sm:mb-8   lg:text-5xl font-bold text-gray-900 leading-tight">
                  AI Cat Breed Identifier
                </h2>
                <p className="text-base sm:text-2xl text-gray-600 mb-6 leading-relaxed">
                   Upload a photo of your cat to let AI identify its possible breed. You'll get 3 likely breed types, each with a matching percentage, breed features, and care tips—free, fast, and smart.
                </p>
                image.png
                {/* 统计信息 - 移动端 */}
                <div className="flex items-center justify-center space-x-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden flex-shrink-0">
                      <img src="/cat/ceylon.jpg" alt="ceylon Cat" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden flex-shrink-0">
                      <img src="/cat/balinese.jpg" alt="balinese Cat" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden flex-shrink-0">
                      <img src="/cat/bombay.jpg" alt="bombay Cat" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <span className="text-base font-medium text-gray-700 min-w-0 flex-shrink">50,000+ cat photos scanned</span>
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
                    
                    <div className="space-y-6 sm:space-y-12">
                      <p className="text-lg sm:text-xl font-medium text-gray-700">
                        Click or drag photo here to upload
                      </p>
                      <p className="text-sm text-gray-500">
                        JPG, JPEG, PNG, WEBP, Less Than {MAX_FILE_SIZE_MB}MB
                      </p>
                      
                      <button
                        type="button"
                        className="max-w-xs mx-auto block bg-pink-500 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-semibold text-base sm:text-lg hover:bg-pink-700 transition-colors disabled:opacity-50 w-full sm:w-auto"
                        disabled={isLoading}
                      >
                        Upload Cat Photo
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
                        'Analyze Cat Breed'
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
                  <p className="text-sm text-gray-500 mb-3 sm:mb-4">No photo? Try one of these:</p>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 w-full">
                    {EXAMPLE_CATS.map((cat) => (
                      <div 
                        key={cat.name} 
                        className="aspect-square bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-all duration-300 overflow-hidden group hover:shadow-md w-full"
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
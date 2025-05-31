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
      <div id="cat-identifier" className="min-h-screen bg-white mt-6 px-12 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 items-center">
            
            {/* 左侧内容 */}
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl sm:text-5xl  font-bold text-gray-900 mb-6">
                  AI Cat Breed Identifier

                </h1>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                   Upload a photo of your cat to let AI identify its possible breed. You'll get 3 likely breed types, each with a matching percentage, breed features, and care tips—free, fast, and smart.

                </p>

              </div>

              {/* 统计信息 */}
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img src="/cat/ceylon.jpg" alt="ceylon Cat" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img src="/cat/balinese.jpg" alt="balinese Cat" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img src="/cat/bombay.jpg" alt="bombay Cat" className="w-full h-full object-cover" />
                  </div>
                </div>
                <span className="text-lg font-medium text-gray-700">50,000+ cat photos scanned</span>

              </div>
            </div>

            {/* 右侧上传区域 */}
            <div className="bg-white border border-gray-100 shadow-md rounded-3xl p-6 mt-10">
              {!previewUrl ? (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                    isDragActive ? 'border-blue-500 bg-blue-50' : 'hover:border-pink-300'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <input {...getInputProps()} />
                  
                  <div className="space-y-12">
                    <p className="text-xl font-medium text-gray-700">
                      Click or drag photo here to upload
                    </p>
                    <p className="text-sm text-gray-500">
                      JPG, JPEG, PNG, WEBP, Less Than {MAX_FILE_SIZE_MB}MB
                    </p>
                    
                    <button
                      type="button"
                      className="max-w-xs mx-auto block bg-pink-500 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-pink-700 transition-colors disabled:opacity-50"
                      disabled={isLoading}
                    >
                      Upload Cat Photo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div
                    {...getRootProps()}
                    className="relative cursor-pointer group"
                  >
                    <input {...getInputProps()} />
                    <div className="w-full h-60 rounded-2xl overflow-hidden border-2  border-gray-50">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 rounded-2xl"
                        onError={() => setImgError(true)}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition-colors duration-300 flex items-center justify-center">
                      <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                        Click to change photo
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="max-w-sm mx-auto block bg-pink-500 text-white py-4 px-5 rounded-xl font-semibold text-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {/* 示例图片区域 */}
              <div className="mt-8">
                <p className="text-sm text-gray-500 mb-4">No photo? Try one of these:</p>
                <div className="grid grid-cols-5 gap-3">
                  {EXAMPLE_CATS.map((cat) => (
                    <div 
                      key={cat.name} 
                      className="aspect-square bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-all duration-300 overflow-hidden group hover:shadow-md"
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
      
    </>
  );
}
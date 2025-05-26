// app/page.tsx
'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';

// 定义允许的图片文件类型
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/bmp', 'image/webp'];
const MAX_FILE_SIZE_MB = 5; // 最大文件大小 (MB)
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

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
    <div className="w-full max-w-7xl mt-10 md:mt-8 mb-2 md:mb-16 mx-auto px-5">
      <div className="flex flex-col-reverse md:flex-row mt-0 md:mt-10 items-center justify-between">

        {/* 右侧内容 */}
        <div className="w-full max-w-xl mx-auto text-center mt-1 md:mt-8">
          <div className="text-center mb-4 md:mb-8">
            <h1 className="text-2xl text-black md:text-5xl font-extrabold mb-4 md:mb-6 whitespace-nowrap">
              What Breed is My Cat?
            </h1>
            <p className="text-gray-800 mb-4 text-xs md:text-sm">
               Not sure what kind of cat you have? Upload photo,and let breed.cat AI cat breed identifier free give you top 3 matches from 300+ cat breeds with personality and health. 
            </p>
            <p className="text-gray-800 mb-4 text-xs md:text-sm">
              With over 5 years in the business, we've analyzed 28 similar tools and consulted with over 250 cat lovers to make our identifier the most reliable. Learn all about your cat for free!
            </p>
          
            <div className="flex justify-center items-center space-x-1 text-base mb-3">
              {['Upload Photo', 'Submit Image', 'View Results'].map((label, idx) => (
                <div key={label} className="flex items-center">
                  <div
                    className={`flex items-center justify-center rounded-full w-8 h-8 text-white font-bold mr-2 ${
                      (idx === 0 && !previewUrl) || (idx === 1 && previewUrl)
                        ? 'bg-blue-600'
                        : 'bg-gray-300'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 上传区域 */}
          <div className="w-full max-w-md mx-auto">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-2 md:p-4 my-4 md:my-4 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-blue-600'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <input {...getInputProps()} />

              {previewUrl && !imgError ? (
                <div className="flex flex-col items-center">
                  <div className="relative w-full max-w-sm h-50 mb-4 transition-transform duration-300 hover:scale-105">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{ objectFit: 'contain', width: '100%', height: '150px', borderRadius: '0.5rem' }}
                      onError={() => setImgError(true)}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Click or drag images here to change uploaded image
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg text-gray-600 mb-4">
                    Drag and drop or click to upload image
                  </p>
                  <button
                    type="button"
                    className="px-10 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                  >
                    Upload Image
                  </button>
                  <p className="text-xs text-gray-600 mt-4">
                    JPG, JPEG, PNG, BMP, WEBP
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {/* 提交按钮 */}
            {previewUrl && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full max-w-xs px-8 py-3 rounded-lg font-semibold transition-colors ${
                    isLoading
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isLoading ? 'Analyzing...' : 'Submit for Analysis'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 左图 */}
        <div className="w-full h-auto max-w-xl mx-auto">
          <img
            src="/images/page/dogbreedhero.jpg"
            alt="cat breed identifier intro, show how it works."
            className="w-full object-contain rounded-lg transition-transform duration-300 md:h-[540px] h-[300px]"
          />
        </div>

      </div>
    </div>
  );
}
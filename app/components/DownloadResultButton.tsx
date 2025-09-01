'use client';

import { useState, RefObject } from 'react';
import html2canvas from 'html2canvas';

interface DownloadResultButtonProps {
  captureRef: RefObject<HTMLElement>;
  disabled?: boolean;
  className?: string;
}

export default function DownloadResultButton({ 
  captureRef, 
  disabled = false, 
  className = "" 
}: DownloadResultButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadAsImage = async () => {
    if (!captureRef.current) {
      console.error("Error: The element to capture could not be found.");
      alert("无法捕获页面内容，请稍后再试。");
      return;
    }

    setIsDownloading(true);
    const targetElement = captureRef.current;

    // 保存原始滚动位置
    const originalScrollX = window.scrollX;
    const originalScrollY = window.scrollY;
    
    try {
      // 滚动到页面顶部确保完整截图
      window.scrollTo(0, 0);
      
      // 等待页面稳定和所有图片加载
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 获取目标元素的实际尺寸
      const rect = targetElement.getBoundingClientRect();
      const elementWidth = targetElement.scrollWidth || rect.width;
      const elementHeight = targetElement.scrollHeight || rect.height;

      // 减少不必要的空白，调整捕获区域
      const contentHeight = Math.min(elementHeight, targetElement.offsetHeight);
      const adjustedHeight = contentHeight - 250; // 减少底部空白
      const adjustedWidth = elementWidth - 200; // 减少宽度空白

      console.log('Capturing element dimensions:', { elementWidth, elementHeight, contentHeight, adjustedHeight, adjustedWidth });

      const canvas = await html2canvas(targetElement, {
        logging: true,
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0,
        width: adjustedWidth,
        height: adjustedHeight,
        windowWidth: adjustedWidth,
        windowHeight: adjustedHeight,
        backgroundColor: '#ffffff',
        scale: 1,
        imageTimeout: 15000,
        removeContainer: false,
        foreignObjectRendering: false,
        onclone: (documentClone) => {
          try {
            // 设置白色背景
            documentClone.body.style.backgroundColor = 'white';
            documentClone.documentElement.style.backgroundColor = 'white';
            
            // 找到实际被捕获的容器
            const targetContainer = documentClone.querySelector('[ref]') || 
                                   documentClone.querySelector('.container') || 
                                   documentClone.querySelector('.min-h-screen') ||
                                   documentClone.body.firstElementChild;
            
            if (targetContainer) {
              // 创建logo并插入到目标容器的开头
              const logoElement = documentClone.createElement('div');
              logoElement.style.cssText = `
                background: #ffffff !important;
                text-align: center !important;
                padding: 20px !important;
                border-bottom: 3px solid #ec4899 !important;
                margin: 0 0 20px 0 !important;
                font-family: Arial, sans-serif !important;
                width: 100% !important;
                box-sizing: border-box !important;
              `;
              logoElement.innerHTML = `
                <div style="font-size: 28px; font-weight: bold; color: #1f2937; margin-bottom: 5px;">
                  🐱 WhatBreedIsMyCat
                </div>
                <div style="font-size: 14px; color: #6b7280;">
                  AI-Powered Cat Breed Identification
                </div>
              `;
              
              // 插入到目标容器的最开始
              if (targetContainer.firstChild) {
                targetContainer.insertBefore(logoElement, targetContainer.firstChild);
              } else {
                targetContainer.appendChild(logoElement);
              }
            }
            
            // 查找目标元素并移除可能的边框
            const clonedElement = documentClone.querySelector('.container') || documentClone.body;
            if (clonedElement) {
              (clonedElement as HTMLElement).style.backgroundColor = 'white';
              (clonedElement as HTMLElement).style.minHeight = `${elementHeight}px`;
              (clonedElement as HTMLElement).style.width = `${elementWidth}px`;
              (clonedElement as HTMLElement).style.border = 'none';
              (clonedElement as HTMLElement).style.outline = 'none';
            }
            
            // 移除所有元素的边框和轮廓
            const allElements = documentClone.querySelectorAll('*');
            allElements.forEach(el => {
              const element = el as HTMLElement;
              element.style.outline = 'none';
              element.style.boxShadow = 'none';
              // 只保留特定的边框
              if (!element.classList.contains('border') && 
                  !element.classList.contains('border-2') && 
                  !element.classList.contains('border-pink-400')) {
                element.style.border = 'none';
              }
            });
            
            // 隐藏底部按钮区域
            const buttonContainer = documentClone.querySelector('.download-buttons-container');
            if (buttonContainer) {
              (buttonContainer as HTMLElement).style.display = 'none';
            }
            
            // 处理图片容器，移除所有可能的边框
            const imageContainers = documentClone.querySelectorAll('.relative, .overflow-hidden, .shadow-lg, .rounded-lg');
            imageContainers.forEach(container => {
              const element = container as HTMLElement;
              element.style.border = 'none';
              element.style.outline = 'none';
              element.style.boxShadow = 'none';
            });
            
            // 特别处理小图标的容器
            const smallImageContainers = documentClone.querySelectorAll('.w-16, .h-16, .w-64, .h-64');
            smallImageContainers.forEach(container => {
              const element = container as HTMLElement;
              element.style.border = 'none';
              element.style.outline = 'none';
              element.style.boxShadow = 'none';
              element.style.backgroundColor = 'transparent';
            });
            
            // 处理图片
            const images = documentClone.querySelectorAll('img');
            images.forEach(img => {
              // 确保图片路径是绝对路径
              if (img.src && img.src.startsWith('/')) {
                img.src = window.location.origin + img.src;
              }
              
              // 检查是否是小图标（通过父容器的类或尺寸判断）
              const isSmallIcon = img.closest('.w-16') || img.closest('.h-16') || 
                                img.closest('.w-64') || img.closest('.h-64') ||
                                img.width <= 64 || img.height <= 64;
              
              if (isSmallIcon) {
                // 小图标样式 - 确保完整显示但保持合适大小
                img.setAttribute('style', `
                  width: 100% !important;
                  height: 100% !important;
                  max-height: none !important;
                  min-height: auto !important;
                  object-fit: contain !important;
                  display: block !important;
                  border: none !important;
                  outline: none !important;
                  max-width: 100% !important;
                `);
              } else {
                // 大图片样式
                img.setAttribute('style', `
                  width: 100% !important;
                  height: auto !important;
                  max-height: none !important;
                  min-height: auto !important;
                  object-fit: contain !important;
                  display: block !important;
                  border: none !important;
                  outline: none !important;
                  max-width: 100% !important;
                `);
              }
              
              // 处理所有父级容器
              let currentElement: HTMLElement | null = img.parentElement;
              let level = 0;
              
              while (currentElement && level < 5) {
                // 移除所有可能导致裁剪的CSS类
                const classesToRemove = [
                  'h-64', 'h-96', 'lg:h-96', 'h-auto', 'min-h-screen',
                  'overflow-hidden', 'object-cover', 'object-fit',
                  'max-h-64', 'max-h-96', 'max-h-screen', 'h-16', 'w-16'
                ];
                
                classesToRemove.forEach(className => {
                  currentElement!.classList.remove(className);
                });
                
                // 为小图标容器设置特殊样式
                if (isSmallIcon) {
                  currentElement.setAttribute('style', `
                    height: auto !important;
                    max-height: none !important;
                    min-height: 64px !important;
                    overflow: visible !important;
                    border: none !important;
                    outline: none !important;
                    box-shadow: none !important;
                    background-color: transparent !important;
                    ${currentElement.style.cssText}
                  `);
                } else {
                  // 大图片容器样式
                  currentElement.setAttribute('style', `
                    height: auto !important;
                    max-height: none !important;
                    min-height: auto !important;
                    overflow: visible !important;
                    border: none !important;
                    outline: none !important;
                    box-shadow: none !important;
                    ${currentElement.style.cssText}
                  `);
                }
                
                currentElement = currentElement.parentElement;
                level++;
              }
            });

            // 修复两列布局 - 确保左右两个区域各占一半
            const flexContainer = documentClone.querySelector('.flex.flex-col.lg\\:flex-row');
            if (flexContainer) {
              (flexContainer as HTMLElement).style.display = 'flex';
              (flexContainer as HTMLElement).style.flexDirection = 'row';
              (flexContainer as HTMLElement).style.gap = '2rem';
              
              // 找到两个子元素并设置宽度
              const leftArea = flexContainer.querySelector('.w-full.mt-1, .w-full.lg\\:w-1\\/2');
              const rightArea = flexContainer.querySelector('.w-full.lg\\:w-1\\/2:not(.mt-1)');
              
              if (leftArea) {
                (leftArea as HTMLElement).style.width = '50%';
                (leftArea as HTMLElement).style.flex = '0 0 50%';
              }
              if (rightArea) {
                (rightArea as HTMLElement).style.width = '50%';
                (rightArea as HTMLElement).style.flex = '0 0 50%';
              }
            }
            
            // 也可以通过类名直接查找
            const allLgHalfWidth = documentClone.querySelectorAll('.lg\\:w-1\\/2');
            allLgHalfWidth.forEach(element => {
              (element as HTMLElement).style.width = '50%';
              (element as HTMLElement).style.flex = '0 0 50%';
            });

            // 强制应用重要的布局样式
            const styleEl = documentClone.createElement('style');
            styleEl.textContent = `
              /* 最高优先级：确保所有图片完整显示 */
              * img, img, div img, .relative img, .overflow-hidden img {
                object-fit: contain !important;
                width: 100% !important;
                height: auto !important;
                max-height: none !important;
                min-height: auto !important;
                display: block !important;
              }
              /* 特别处理小图标 */
              .w-16 img, .h-16 img, .w-64 img, .h-64 img,
              .w-16.h-16 img, .bg-gray-400 img {
                object-fit: contain !important;
                width: 100% !important;
                height: 100% !important;
                max-height: none !important;
                min-height: auto !important;
                display: block !important;
              }
              /* 小图标容器 */
              .w-16, .h-16, .w-64, .h-64, .bg-gray-400, .flex-shrink-0 {
                height: auto !important;
                max-height: none !important;
                min-height: 64px !important;
                overflow: visible !important;
                background-color: transparent !important;
              }
              /* 最高优先级：确保所有图片容器不裁剪 */
              * div, div, .relative, .overflow-hidden, .shadow-lg, .rounded-lg,
              .h-64, .h-96, .lg\\:h-96, .w-full {
                height: auto !important;
                max-height: none !important;
                min-height: auto !important;
                overflow: visible !important;
              }
              * {
                box-sizing: border-box !important;
                outline: none !important;
                box-shadow: none !important;
              }
              *:not(.border):not(.border-2):not(.border-pink-400) {
                border: none !important;
              }
              html, body {
                background-color: white !important;
                margin: 0 !important;
                padding: 0 !important;
                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif !important;
                overflow: visible !important;
                border: none !important;
                outline: none !important;
              }
              .min-h-screen {
                min-height: auto !important;
                background-color: #f9fafb !important;
                border: none !important;
              }
              .container {
                width: 100% !important;
                max-width: 72rem !important;
                margin: 0 auto !important;
                padding: 2rem 1rem !important;
                border: none !important;
                outline: none !important;
              }
              .max-w-6xl {
                max-width: 72rem !important;
              }
              .max-w-3xl {
                max-width: 48rem !important;
              }
              .flex {
                display: flex !important;
              }
              .flex-col {
                flex-direction: column !important;
              }
              .flex-row {
                flex-direction: row !important;
              }
              /* 确保左右两个区域正确布局 */
              .lg\\:flex-row {
                display: flex !important;
                flex-direction: row !important;
              }
              .lg\\:w-1\\/2 {
                width: 50% !important;
                flex: 0 0 50% !important;
              }
              /* 用户上传图片区域 */
              .w-full.mt-1.sm\\:w-8.lg\\:w-1\\/2,
              .w-full.lg\\:w-1\\/2 {
                width: 50% !important;
                flex: 0 0 50% !important;
              }
              .gap-8 {
                gap: 2rem !important;
              }
              .gap-6 {
                gap: 1.5rem !important;
              }
              .gap-4 {
                gap: 1rem !important;
              }
              .gap-3 {
                gap: 0.75rem !important;
              }
              .grid {
                display: grid !important;
              }
              .grid-cols-1 {
                grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
              }
              .grid-cols-2 {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              }
              .items-center {
                align-items: center !important;
              }
              .justify-center {
                justify-content: center !important;
              }
              .justify-between {
                justify-content: space-between !important;
              }
              .text-center {
                text-align: center !important;
              }
              .mx-auto {
                margin-left: auto !important;
                margin-right: auto !important;
              }
              .mb-1 {
                margin-bottom: 0.25rem !important;
              }
              .mb-2 {
                margin-bottom: 0.5rem !important;
              }
              .mb-3 {
                margin-bottom: 0.75rem !important;
              }
              .mb-4 {
                margin-bottom: 1rem !important;
              }
              .mb-6 {
                margin-bottom: 1.5rem !important;
              }
              .mb-8 {
                margin-bottom: 2rem !important;
              }
              .mt-1 {
                margin-top: 0.25rem !important;
              }
              .mt-8 {
                margin-top: 2rem !important;
              }
              .p-2 {
                padding: 0.5rem !important;
              }
              .p-4 {
                padding: 1rem !important;
              }
              .p-6 {
                padding: 1.5rem !important;
              }
              .px-4 {
                padding-left: 1rem !important;
                padding-right: 1rem !important;
              }
              .py-8 {
                padding-top: 2rem !important;
                padding-bottom: 2rem !important;
              }
              .pt-1 {
                padding-top: 0.25rem !important;
              }
              .pt-6 {
                padding-top: 1.5rem !important;
              }
              .pb-1 {
                padding-bottom: 0.25rem !important;
              }
              .w-full {
                width: 100% !important;
              }
              .h-64 {
                height: auto !important;
                min-height: 16rem !important;
              }
              .h-128, .lg\\:h-128 {
                height: auto !important;
                min-height: 36rem !important;
              }
              .w-16 {
                width: 4rem !important;
              }
              .h-16 {
                height: 4rem !important;
              }
              .bg-white {
                background-color: white !important;
              }
              .bg-gray-50 {
                background-color: #f9fafb !important;
              }
              .bg-gray-400 {
                background-color: #9ca3af !important;
              }
              .bg-pink-500 {
                background-color: #ec4899 !important;
              }
              .text-pink-500 {
                color: #ec4899 !important;
              }
              .text-gray-600 {
                color: #4b5563 !important;
              }
              .text-gray-700 {
                color: #374151 !important;
              }
              .text-gray-800 {
                color: #1f2937 !important;
              }
              .border {
                border: 1px solid #e5e7eb !important;
              }
              .border-2 {
                border-width: 2px !important;
              }
              .border-pink-400 {
                border-color: #f472b6 !important;
              }
              .rounded-2xl {
                border-radius: 1rem !important;
              }
              .rounded-lg {
                border-radius: 0.5rem !important;
              }
              .rounded {
                border-radius: 0.25rem !important;
              }
              .shadow-lg {
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
              }
              .overflow-hidden {
                overflow: visible !important;
                min-height: auto !important;
                height: auto !important;
                max-height: none !important;
              }
              .object-cover {
                object-fit: contain !important;
              }
              .relative {
                position: relative !important;
              }
              .text-3xl {
                font-size: 1.875rem !important;
                line-height: 2.25rem !important;
              }
              .text-2xl {
                font-size: 1.5rem !important;
                line-height: 2rem !important;
              }
              .text-xl {
                font-size: 1.25rem !important;
                line-height: 1.75rem !important;
              }
              .text-lg {
                font-size: 1.125rem !important;
                line-height: 1.75rem !important;
              }
              .text-sm {
                font-size: 0.875rem !important;
                line-height: 1.25rem !important;
              }
              .font-bold {
                font-weight: 700 !important;
              }
              .font-semibold {
                font-weight: 600 !important;
              }
              .leading-relaxed {
                line-height: 1.625 !important;
              }
              .space-y-4 > * + * {
                margin-top: 1rem !important;
              }
              .space-y-3 > * + * {
                margin-top: 0.75rem !important;
              }
              .cursor-pointer {
                cursor: pointer !important;
              }
              .hover\\:bg-gray-50:hover {
                background-color: #f9fafb !important;
              }
              .transition-colors {
                transition: background-color 0.15s ease-in-out !important;
              }
              .flex-shrink-0 {
                flex-shrink: 0 !important;
              }
              .max-w-5xl {
                max-width: 64rem !important;
              }
              /* 确保用户上传图片区域正确显示 */
              .lg\\:flex-row .w-full.mt-1 img,
              .lg\\:flex-row .w-full.lg\\:w-1\\/2 img {
                width: 100% !important;
                height: auto !important;
                object-fit: contain !important;
                border: none !important;
                outline: none !important;
                max-height: none !important;
              }
              @media (min-width: 1024px) {
                .lg\\:flex-row {
                  flex-direction: row !important;
                }
                .lg\\:w-1\\/2 {
                  width: 50% !important;
                }
                .lg\\:h-96 {
                  height: auto !important;
                }
                .lg\\:text-2xl {
                  font-size: 1.5rem !important;
                  line-height: 2rem !important;
                }
                .lg\\:text-xl {
                  font-size: 1.25rem !important;
                  line-height: 1.75rem !important;
                }
              }
              @media (min-width: 768px) {
                .md\\:grid-cols-2 {
                  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                }
                .md\\:text-4xl {
                  font-size: 2.25rem !important;
                  line-height: 2.5rem !important;
                }
                .md\\:mb-3 {
                  margin-bottom: 0.75rem !important;
                }
              }
              @media (min-width: 640px) {
                .sm\\:flex-row {
                  flex-direction: row !important;
                }
                .sm\\:gap-6 {
                  gap: 1.5rem !important;
                }
                .sm\\:mb-6 {
                  margin-bottom: 1.5rem !important;
                }
                .sm\\:mb-8 {
                  margin-bottom: 2rem !important;
                }
                .sm\\:p-6 {
                  padding: 1.5rem !important;
                }
                .sm\\:w-8 {
                  width: 2rem !important;
                }
              }
              /* 隐藏按钮区域 */
              .download-buttons-container {
                display: none !important;
              }
              /* 移除所有图片容器的边框和阴影 */
              .relative, .overflow-hidden, .shadow-lg, .rounded-lg, 
              .w-full.h-64, .w-full.h-96, .w-full.lg\\:h-96 {
                border: none !important;
                outline: none !important;
                box-shadow: none !important;
              }
              /* 确保所有div容器支持完整图片显示 */
              div.relative, div.overflow-hidden, div.shadow-lg, div.rounded-lg,
              div.w-full, div.h-64, div.h-96, div.lg\\:h-96 {
                height: auto !important;
                max-height: none !important;
                min-height: auto !important;
                overflow: visible !important;
              }
            `;
            documentClone.head.appendChild(styleEl);
            
          } catch (e) {
            console.warn('Error in onclone:', e);
          }
        }
      });
      
      // 恢复滚动位置
      window.scrollTo(originalScrollX, originalScrollY);

      // 创建下载链接
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = `cat-breed-results-${new Date().getTime()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Image downloaded successfully');

    } catch (error: any) {
      console.error("Screenshot generation failed:", error);
      alert(`生成图片失败: ${error.message || '未知错误'}。请稍后再试。`);
      
      // 恢复滚动位置
      window.scrollTo(originalScrollX, originalScrollY);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={downloadAsImage}
      disabled={disabled || isDownloading}
      className={`px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-700 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${className}`}
    >
      {isDownloading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating...
        </>
      ) : (
        <>
          <i className="fas fa-download"></i>
          Download Result
        </>
      )}
    </button>
  );
} 
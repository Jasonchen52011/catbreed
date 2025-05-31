'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // 关闭菜单的函数
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // 页面内锚点定位功能
  const scrollToSection = (sectionId: string) => {
    // 如果不在首页，先跳转到首页
    if (pathname !== '/') {
      router.push('/');
      // 等待页面跳转完成后再滚动
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else {
      // 如果已经在首页，直接滚动
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    closeMenu();
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white text-black shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2" onClick={closeMenu}>
          <Image 
            src="/logo/favicon.svg" 
            alt="WhatBreedIsMyCat Logo" 
            width={32} 
            height={32}
            className="rounded-md"
          />
          <span>WhatBreedIsMyCat</span>
        </Link>
        
        <div className="hidden md:flex space-x-8 items-center ml-auto">
          <Link href="/" className="transition-colors hover:text-pink-600 font-medium">
            Home
          </Link>
          
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="transition-colors hover:text-pink-600 font-medium"
          >
            How it Works
          </button>
          
          <button 
            onClick={() => scrollToSection('cat-breed-chart')}
            className="transition-colors hover:text-pink-600 font-medium"
          >
            Cat Breed Chart
          </button>
          
          <button 
            onClick={() => scrollToSection('faq')}
            className="transition-colors hover:text-pink-600 font-medium"
          >
            FAQ
          </button>

        </div>
        
        <div className="md:hidden">
          {/* Mobile menu button */}
          <button 
            className="focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
        <div className="px-4 pt-2 pb-4 space-y-3 bg-white border-t border-gray-200">
          <Link 
            href="/" 
            className="block py-2 px-4 rounded-md hover:bg-pink-50 hover:text-pink-600 transition-colors"
            onClick={closeMenu}
          >
            Home
          </Link>
          
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left py-2 px-4 rounded-md hover:bg-pink-50 hover:text-pink-600 transition-colors"
          >
            How it Works
          </button>
          
          <button 
            onClick={() => scrollToSection('cat-breed-chart')}
            className="block w-full text-left py-2 px-4 rounded-md hover:bg-pink-50 hover:text-pink-600 transition-colors"
          >
            Cat Breed Chart
          </button>
          
          <button 
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2 px-4 rounded-md hover:bg-pink-50 hover:text-pink-600 transition-colors"
          >
            FAQ
          </button>
          
        </div>
      </div>
    </nav>
  );
}
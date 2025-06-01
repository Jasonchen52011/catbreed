import { FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-800 py-12 border-t border-gray-100">
      <div className="container mx-auto px-4 text-center lg:text-left">
        {/* 主要内容布局：左侧介绍，右侧链接 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* 左侧LOGO和介绍 */}
          <div className="col-span-1 lg:col-span-2 flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-2 mb-2">
              <Image 
                src="/logo/favicon.ico" 
                alt="WhatBreedIsMyCat Logo" 
                width={28} 
                height={28}
                className="rounded-2xl"
              />
              <h2 className="text-xl font-bold text-white">WhatBreedIsMyCat</h2>
            </div>
            <p className="text-white mt-4 text-base mb-6 text-center lg:text-left max-w-xs">
            WhatBreedIsMyCat is a free AI tool that helps you find your cat's breed from a photo.
            </p>
          </div>
          
          {/* 右侧链接区域 */}
          <div className="col-span-1 lg:col-span-3 text-sm grid grid-cols-1 md:grid-cols-3 gap-6">
            
            
            {/* About部分 */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-gray-300 text-lg font-medium mb-3">About</h3>
              <div className="flex flex-col space-y-2">
                <Link href="/about" className="text-white hover:text-orange-400 transition-colors">
                  About Us
                </Link>
                <Link href="/privacy-policy" className="text-white hover:text-orange-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="text-white hover:text-orange-400 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
            
            {/* Contact和Social合并 */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-gray-300 text-lg font-medium mb-3">Contact</h3>
              <div className="flex flex-col space-y-2 mb-4">
                <Link href="mailto:hello@whatbreedismycat.app" className="text-white hover:text-blue-500 transition-colors">
                  hello@whatbreedismycat.app
                </Link>
              </div>
              
、
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-400 text-sm mt-8 pt-6 border-t border-gray-800">
          &copy; {new Date().getFullYear()} whatbreedismycat.app All rights reserved.
        </div>
      </div>
    </footer>
  );
} 
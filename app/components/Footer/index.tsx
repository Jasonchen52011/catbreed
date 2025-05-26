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
              <div className="relative w-8 h-8 rounded-2xl">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">🐱</span>
                </div>
              </div>
              <h2 className="text-xl font-bold text-white">Cat Breed AI</h2>
            </div>
            <p className="text-white text-sm mb-6 text-center lg:text-left max-w-xs">
              Discover your cat's breed with AI-powered image recognition. Upload a photo and get instant breed identification with detailed information about your feline friend's characteristics and traits.
            </p>
          </div>
          
          {/* 右侧链接区域 */}
          <div className="col-span-1 lg:col-span-3 text-sm grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Features部分 */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-gray-300 text-lg font-medium mb-3">Features</h3>
              <div className="flex flex-col space-y-2">
                <Link href="/" className="text-white hover:text-orange-400 transition-colors">
                  Cat Breed Identifier
                </Link>
                <Link href="/cat-care-tips" className="text-white hover:text-orange-400 transition-colors">
                  Cat Care Tips
                </Link>
                <Link href="/breed-gallery" className="text-white hover:text-orange-400 transition-colors">
                  Breed Gallery
                </Link>
                <Link href="/cat-health" className="text-white hover:text-orange-400 transition-colors">
                  Cat Health Guide
                </Link>
              </div>
            </div>
            
            {/* About部分 */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-gray-300 text-lg font-medium mb-3">About</h3>
              <div className="flex flex-col space-y-2">
                <Link href="/about" className="text-white hover:text-orange-400 transition-colors">
                  About Us
                </Link>
                <Link href="/how-it-works" className="text-white hover:text-orange-400 transition-colors">
                  How It Works
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
                <Link href="mailto:hello@breed.dog" className="text-white hover:text-blue-500 transition-colors">
                  hello@breed.dog
                </Link>
              </div>
              
              <h3 className="text-gray-300 text-lg font-medium mb-3">Social</h3>
              <div className="flex space-x-4">
                <Link href="https://x.com/dogbreedai" aria-label="Twitter" className="text-white hover:text-blue-500 transition-colors">
                  <FaTwitter size={24} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-400 text-sm mt-8 pt-6 border-t border-gray-800">
          &copy; {new Date().getFullYear()} Dog Breed Identifier. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 
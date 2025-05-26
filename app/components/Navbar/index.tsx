'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  
  // 关闭菜单的函数
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsToolsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white text-black shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2" onClick={closeMenu}>
          <div className="rounded-full overflow-hidden shadow-md">
            <Image src="/logo-192x192.png"
             alt="Breed.dog Logo" 
             width={32} 
             height={32} 
             className="rounded-full" 
             priority
             />
          </div>
          <span>Breed.dog</span>
        </Link>
        
        <div className="hidden md:flex space-x-6 items-center ml-auto">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          
          {/* Other Tools 下拉菜单 */}
          <div className="relative group">
            <button 
              className="flex items-center transition-colors hover:text-primary"
              onClick={() => setIsToolsMenuOpen(!isToolsMenuOpen)}
              onMouseEnter={() => setIsToolsMenuOpen(true)}
              onMouseLeave={() => setIsToolsMenuOpen(false)}
            >
              Other Tools
              <svg 
                className="w-4 h-4 ml-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div 
              className={`absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${isToolsMenuOpen ? 'block' : 'hidden'} group-hover:block`}
              onMouseEnter={() => setIsToolsMenuOpen(true)}
              onMouseLeave={() => setIsToolsMenuOpen(false)}
              style={{ marginTop: '-1px', paddingTop: '10px' }}
            >

              <div className="py-1">
              <Link 
                  href="/dog-translator-online" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  Dog Translator Online
                </Link>
                <Link 
                  href="/dog-breed-quiz" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  Dog Breed Quiz: Guess the Breed
                </Link>
                <Link 
                  href="/dog-weight-calculator" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  Dog Weight Calculator
                </Link>
              <Link 
                  href="/what-dog-breed-am-i" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  What Dog Breed Am I?
                </Link>
                <Link 
                  href="/dog-breed-finder" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  Dog Breed Finder
                </Link>

                <Link 
                  href="/random-dog-breed-generator" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  Random Dog Breed Generator
                </Link>
                <Link 
                  href="/dog-name-generator" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  Dog Name Generator
                </Link>
                <Link 
                  href="/dog-age-calculator" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  Dog Age Calculator
                </Link>
              </div>
            </div>
          </div>
          
          <Link href="/about-us" className="transition-colors hover:text-primary">
            About Us
          </Link>
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
        <div className="px-4 pt-2 pb-4 space-y-3 bg-white">
          <Link 
            href="/" 
            className="block py-2 px-4 rounded-md hover:bg-blue-100"
            onClick={closeMenu}
          >
            Home
          </Link>
          
          {/* Tools 分组标题 */}
          <div className="py-2 px-4 text-gray-500 font-medium">
            Tools
          </div>
          <Link 
            href="/dog-translator-online" 
            className="block py-2 px-4 rounded-md hover:bg-blue-100 ml-2"
            onClick={closeMenu}
          >
            Dog Translator Online
          </Link>
          <Link 
            href="/dog-breed-quiz" 
            className="block py-2 px-4 rounded-md hover:bg-blue-100 ml-2"
            onClick={closeMenu}
          >
            Dog Breed Quiz: Guess the Breed
          </Link>
          <Link 
            href="/dog-weight-calculator" 
            className="block py-2 px-4 rounded-md hover:bg-blue-100 ml-2"
            onClick={closeMenu}
          >
            Dog Weight Calculator
          </Link>
          <Link 
            href="/what-dog-breed-am-i" 
            className="block py-2 px-4 rounded-md hover:bg-blue-100 ml-2"
            onClick={closeMenu}
          >
            What Dog Breed Am I?
          </Link>
          <Link 
            href="/dog-breed-finder" 
            className="block py-2 px-4 rounded-md hover:bg-blue-100 ml-2"
            onClick={closeMenu}
          >
            Dog Breed Finder
          </Link>
          
          <Link 
            href="/random-dog-breed-generator" 
            className="block py-2 px-4 rounded-md hover:bg-blue-100 ml-2"
            onClick={closeMenu}
          >
            Random Dog Breed Generator
          </Link>
          
          <Link 
            href="/dog-name-generator" 
            className="block py-2 px-4 rounded-md hover:bg-blue-100 ml-2"
            onClick={closeMenu}
          >
            Dog Name Generator
          </Link>
          
          <Link 
            href="/dog-age-calculator" 
            className="block py-2 px-4 rounded-md hover:bg-blue-100 ml-2"
            onClick={closeMenu}
          >
            Dog Age Calculator
          </Link>
          
          <Link 
            href="/about-us" 
            className="block py-2 px-4 rounded-md hover:bg-blue-100"
            onClick={closeMenu}
          >
            About Us
          </Link>
        </div>
      </div>
    </nav>
  );
}
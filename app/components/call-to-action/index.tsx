'use client';

import React from 'react';

interface CallToActionProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

export default function CallToAction({ 
  title = "Start Understanding Your Cat's Meows Today!",
  description = "With our free, online Cat Translator, you can finally understand your cat's meows and strengthen your bond. Translate meows instantly with no sign-up required!",
  buttonText = "Try Cat Translator Now"
}: CallToActionProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className="w-full bg-white py-16 flex flex-col items-center justify-center border-t border-b border-gray-100">
      <h2 className="text-4xl md:text-4xl font-bold text-center mb-4">{title}</h2>
      <p className="text-gray-500 text-lg md:text-xl text-center max-w-2xl mb-8">
         {description}
      </p>
      <div className="flex flex-col items-center justify-center w-full">
        <button 
          onClick={scrollToTop}
          className="w-full max-w-sm md:w-auto bg-primary hover:bg-primary/80 text-white text-lg font-semibold px-8 py-3 rounded-xl shadow transition-colors flex items-center justify-center gap-2"
        >
           {buttonText}
          <span className="ml-2">↑</span>
        </button>
      </div>
    </section>
  );
}

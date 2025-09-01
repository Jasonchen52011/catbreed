'use client';

import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ScrollToTop from './ScrollToTop';

interface HowToStep {
  title: string;
  description: string;
}

interface HowToSectionProps {
  title: string;
  subtitle: string;
  steps: HowToStep[];
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  ctaText?: string;
  ctaIcon?: string;
}

export default function HowToSection({
  title,
  subtitle,
  steps,
  image,
  ctaText = "Try Now",
  ctaIcon = "fa-paw"
}: HowToSectionProps) {
  return (
    <section className="max-w-7xl mx-auto mt-2 mb-10 bg-surface-light/50">
      <div className=" backdrop-blur-sm rounded-2xl p-6 sm:p-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600 mt-4 max-w-4xl mx-auto text-lg">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              {steps.map((step, index) => {
                const icons = ['fa-weight', 'fa-list-check', 'fa-calculator', 'fa-clipboard-list'];
                return (
                  <div key={index} className="flex items-start gap-4">
                    <i className={`fas ${icons[index] || 'fa-circle'} text-2xl text-pink-500`}></i>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-800">Step {index + 1}: {step.title}</h3>
                      <p className="text-gray-600 text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {image && (
            <div className="relative">
              <div className="sticky top-4">
                <div className="relative shadow-lg rounded-lg overflow-hidden h-[500px]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-contain bg-gray-50 shadow-lg"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mt-10">
        <ScrollToTop
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-4 px-12 rounded-lg text-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out">
          {ctaText}
          <i className={`fas ${ctaIcon} ms-2`}></i>
        </ScrollToTop>
      </div>
    </section>
  );
}
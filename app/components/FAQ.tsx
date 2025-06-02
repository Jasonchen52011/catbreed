'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  faqs: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ title = "Frequently Asked Questions", faqs }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? []
        : [index]
    );
  };

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        {title}
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="bg-white max-w-4xl mx-auto border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus:ring-1 focus:ring-gray-200 rounded-lg"
            >
              <h3 className="text-lg  text-gray-800 pr-4">
                {faq.question}
              </h3>
              <div className="flex-shrink-0">
                <i 
                  className={`fas ${openItems.includes(index) ? 'fa-minus' : 'fa-plus'} text-pink-600 transition-transform duration-300 ${openItems.includes(index) ? 'rotate-180' : ''}`}
                ></i>
              </div>
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openItems.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-5">
                <div className="border-t border-gray-100 pt-4">
                  <div 
                    className="text-gray-700 leading-relaxed whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ; 
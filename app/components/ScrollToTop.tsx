'use client';

import { ReactNode } from 'react';

interface ScrollToTopProps {
  className: string;
  children: ReactNode;
}

export default function ScrollToTop({ className, children }: ScrollToTopProps) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
} 
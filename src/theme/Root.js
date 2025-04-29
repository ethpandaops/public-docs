import React, { useEffect } from 'react';
import useFixedHighlighting from './hooks/useFixedHighlighting';

// Default implementation, that you can customize
export default function Root({ children }) {
  // Apply our custom hook to fix menu highlighting
  useFixedHighlighting();
  
  useEffect(() => {
    // Simple fix for scrolling and overlays
    const fixScrolling = () => {
      // Fix overlays - make them not block pointer events
      document.querySelectorAll('[id^="example-"], [id*="example-"], .example-overlay')
        .forEach(overlay => {
          overlay.style.pointerEvents = 'none';
          overlay.style.zIndex = '0';
        });
      
      // Fix heading anchor pseudo-elements
      const fixHeadingPseudoElements = () => {
        const style = document.createElement('style');
        style.textContent = `
          h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
            pointer-events: none !important;
            position: absolute !important;
            z-index: -1 !important;
          }
        `;
        document.head.appendChild(style);
      };
      
      fixHeadingPseudoElements();
      
      // Make pre elements scrollable
      document.querySelectorAll('pre')
        .forEach(pre => {
          pre.style.overflow = 'auto';
          pre.style.whiteSpace = 'pre';
          pre.style.position = 'relative';
          pre.style.zIndex = '5';
          pre.style.paddingBottom = '20px'; // Give space for scrollbar
        });
    };
    
    // Run on load and on resize
    fixScrolling();
    window.addEventListener('resize', fixScrolling);
    
    // Clear the event listener on unmount
    return () => {
      window.removeEventListener('resize', fixScrolling);
    };
  }, []);

  return <>{children}</>;
} 
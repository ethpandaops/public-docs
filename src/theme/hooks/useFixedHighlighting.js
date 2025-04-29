import {useEffect} from 'react';

/**
 * Custom hook to fix menu highlighting issues
 * This will remove the active class from parent menu items when a child is selected
 */
function useFixedHighlighting() {
  useEffect(() => {
    const fixHighlighting = () => {
      // Remove active class from Introduction link in dropdown when Onboarding or Tooling page is active
      const dropdownLinks = document.querySelectorAll('.dropdown__menu .dropdown__link');
      
      // Get the current pathname
      const currentPath = window.location.pathname;
      
      dropdownLinks.forEach(link => {
        // If current path includes 'guides' or 'tooling' and this is the Introduction link
        if ((currentPath.includes('/docs/guides/') || currentPath.includes('/docs/tooling/')) && 
            link.textContent.trim() === 'Introduction') {
          link.classList.remove('dropdown__link--active');
        }
      });
    };

    // Run initially and add event listener for route changes
    fixHighlighting();

    // For history changes (SPA navigation)
    const observer = new MutationObserver(fixHighlighting);
    observer.observe(document.body, {subtree: true, childList: true});

    return () => {
      observer.disconnect();
    };
  }, []);
}

export default useFixedHighlighting; 
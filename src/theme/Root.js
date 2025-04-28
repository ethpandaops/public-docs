import React from 'react';
import useFixedHighlighting from './hooks/useFixedHighlighting';

// Default implementation, that you can customize
function Root({children}) {
  // Apply our custom hook to fix menu highlighting
  useFixedHighlighting();
  
  return <>{children}</>;
}

export default Root; 
import React, { useState, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

function DefaultImage({ style, dirName, metadata }) {
  const {siteConfig} = useDocusaurusContext();
  const {baseUrl} = siteConfig;
  const [imagePath, setImagePath] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Determine the image path based on metadata or dirName
  useEffect(() => {
    if (metadata && metadata.image) {
      // Use the image path from the metadata
      const path = metadata.image.startsWith('/')
        ? metadata.image  // Already has leading slash, use as is
        : `/${metadata.image}`; // Add leading slash
      
      setImagePath(path);
    } else if (dirName) {
      // Try to get the path from dirName
      try {
        // This might throw if the webpack import fails
        const requiredImage = require(`@site/${dirName}/featured.png`).default;
        setImagePath(requiredImage);
      } catch (error) {
        // Fall back to direct path
        const fallbackPath = `/${dirName}/featured.png`;
        setImagePath(fallbackPath);
      }
    }
  }, [metadata, dirName, baseUrl]);
  
  // Only render the image if we have a valid path
  if (!imagePath) {
    return null;
  }
  
  return (
    <img 
      src={imagePath}
      alt={(metadata && metadata.title) || "Blog post featured image"} 
      className={styles.defaultImage}
      style={style}
      onLoad={() => setImageLoaded(true)}
      onError={(e) => {
        console.warn(`Image failed to load: ${imagePath}`);
        e.target.style.display = 'none';
      }}
    />
  );
}

export default DefaultImage; 
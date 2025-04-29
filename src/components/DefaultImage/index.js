import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

function DefaultImage({ style, dirName, metadata, className }) {
  const {siteConfig} = useDocusaurusContext();
  const {baseUrl} = siteConfig;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Get image path from frontmatter or use a default
  let imagePath = '';

  // Handle different metadata structures (list vs single post)
  if (metadata && metadata.frontMatter && metadata.frontMatter.image) {
    // Blog list view - frontMatter is passed directly
    imagePath = metadata.frontMatter.image.startsWith('/')
      ? metadata.frontMatter.image 
      : `/${metadata.frontMatter.image}`;
  } else if (metadata && metadata.image) {
    // Single blog post view - image is directly on metadata
    imagePath = metadata.image.startsWith('/')
      ? metadata.image
      : `/${metadata.image}`;
  } else if (dirName) {
    // Try to use slug-based path as fallback
    imagePath = `/${dirName}/featured.png`;
  } else {
    // Default fallback image
    imagePath = '/img/blog/default-blog-image.png';
  }
  
  // Prepend baseUrl if needed
  const fullImagePath = imagePath.startsWith('http') 
    ? imagePath 
    : `${baseUrl}${imagePath.startsWith('/') ? imagePath.slice(1) : imagePath}`;
  
  return (
    <div className={`${styles.imageContainer} ${className || ''}`}>
      <img 
        src={fullImagePath}
        alt={(metadata && metadata.title) || "Blog post featured image"} 
        className={`${styles.defaultImage} ${imageError ? styles.imageError : ''}`}
        style={style}
        onLoad={() => setImageLoaded(true)}
        onError={(e) => {
          console.warn(`Image failed to load: ${fullImagePath}`);
          setImageError(true);
          // Fall back to default image if the specified one fails
          e.target.src = `${baseUrl}img/blog/default-blog-image.png`;
        }}
      />
    </div>
  );
}

export default DefaultImage; 
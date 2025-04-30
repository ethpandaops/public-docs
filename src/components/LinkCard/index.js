import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function LinkCard({
  title,
  url,
  description,
  image,
  category,
  className,
  ...props
}) {
  return (
    <div className={clsx(styles.linkCard, className)} {...props}>
      <Link to={url} className={styles.linkCardInner} target="_blank" rel="noopener noreferrer">
        <div className={styles.imageContainer}>
          {image && <img src={image} alt={title} className={styles.image} />}
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          {category && <span className={styles.category}>{category}</span>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </Link>
    </div>
  );
} 
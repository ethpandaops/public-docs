import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function ExampleCard({
  title,
  children,
  number,
  className,
  ...props
}) {
  return (
    <div className={clsx(styles.exampleCard, className)} {...props}>
      {(title || number) && (
        <div className={styles.exampleHeader}>
          {number && <span className={styles.exampleNumber}>{number}</span>}
          {title && <h3 className={styles.exampleTitle}>{title}</h3>}
        </div>
      )}
      <div className={styles.exampleContent}>
        {children}
      </div>
    </div>
  );
} 
import React, { useState } from 'react';
import styles from './Collapsible.module.css';
import clsx from 'clsx';

export function Collapsible({ children, title, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.collapsible}>
      <div 
        className={clsx(styles.collapsibleHeader, isOpen && styles.open)} 
        onClick={toggleOpen}
      >
        <span className={styles.collapsibleIcon}>
          {isOpen ? '▼' : '►'}
        </span>
        <span className={styles.collapsibleTitle}>{title}</span>
      </div>
      <div className={clsx(styles.collapsibleContent, isOpen && styles.open)}>
        {children}
      </div>
    </div>
  );
}

export function Details({ children, summary, open = false }) {
  const [isOpen, setIsOpen] = useState(open);

  // Find summary and content children
  let summaryContent = summary;
  let mainContent = children;

  // If summary is not provided, try to find a Summary component in children
  if (!summaryContent && Array.isArray(children)) {
    const summaryChild = children.find(child => 
      child?.type?.name === 'Summary' || 
      (typeof child?.type === 'string' && child?.type?.toLowerCase() === 'summary')
    );
    
    if (summaryChild) {
      summaryContent = summaryChild.props.children;
      mainContent = children.filter(child => 
        child?.type?.name !== 'Summary' && 
        (typeof child?.type !== 'string' || child?.type?.toLowerCase() !== 'summary')
      );
    }
  }

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.details}>
      <div 
        className={clsx(styles.summary, isOpen && styles.open)} 
        onClick={toggleOpen}
      >
        <span className={styles.summaryIcon}>
          {isOpen ? '▼' : '►'}
        </span>
        <span className={styles.summaryTitle}>{summaryContent}</span>
      </div>
      <div className={clsx(styles.detailsContent, isOpen && styles.open)}>
        {mainContent}
      </div>
    </div>
  );
}

export function Summary({ children }) {
  return <>{children}</>;
}

// Default export for convenience
export default Details; 
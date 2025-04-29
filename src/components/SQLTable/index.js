import React from 'react';
import styles from './styles.module.css';

/**
 * Component for rendering SQL query results in a nicely styled table
 * 
 * @param {object} props
 * @param {string} props.title - Optional title for the SQL result table
 * @param {React.ReactNode} props.children - Table content
 * @param {boolean} props.bordered - Whether to show borders (default: true)
 * @param {boolean} props.compact - Whether to use compact styling (default: false)
 */
export default function SQLTable({ title, children, bordered = true, compact = false }) {
  return (
    <div className={styles.sqlContainer}>
      {title && <div className={styles.sqlTitle}>{title}</div>}
      <div className={styles.sqlTableWrapper}>
        {React.cloneElement(children, {
          className: `${styles.sqlTable} ${bordered ? styles.bordered : ''} ${compact ? styles.compact : ''}`,
        })}
      </div>
    </div>
  );
} 
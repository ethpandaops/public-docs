import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function BlogPagination({ currentPage, totalPages }) {
  if (totalPages <= 1) {
    return null;
  }

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  // Generate page links 
  const pageLinks = [];
  const maxPageLinks = 5; // Show at most 5 page links

  let startPage = Math.max(1, currentPage - Math.floor(maxPageLinks / 2));
  let endPage = Math.min(totalPages, startPage + maxPageLinks - 1);

  // Adjust start page if we're near the end
  if (endPage - startPage + 1 < maxPageLinks) {
    startPage = Math.max(1, endPage - maxPageLinks + 1);
  }

  // Add page links
  for (let i = startPage; i <= endPage; i++) {
    pageLinks.push(
      <Link
        key={i}
        to={i === 1 ? '/posts' : `/posts/page/${i}`}
        className={`${styles.paginationItem} ${i === currentPage ? styles.paginationItemActive : ''}`}
      >
        {i}
      </Link>
    );
  }

  return (
    <div className={styles.paginationNav}>
      {prevPage && (
        <Link
          to={prevPage === 1 ? '/posts' : `/posts/page/${prevPage}`}
          className={`${styles.paginationItem} ${styles.paginationItemPrev}`}
        >
          Previous
        </Link>
      )}
      
      {pageLinks}
      
      {nextPage && (
        <Link
          to={`/posts/page/${nextPage}`}
          className={`${styles.paginationItem} ${styles.paginationItemNext}`}
        >
          Next
        </Link>
      )}
    </div>
  );
}

export default BlogPagination; 
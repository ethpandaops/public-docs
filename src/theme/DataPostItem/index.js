import React from 'react';
import clsx from 'clsx';
import {MDXProvider} from '@mdx-js/react';
import Link from '@docusaurus/Link';
import MDXComponents from '@theme/MDXComponents';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '../BlogPostItem/styles.module.css';

export default function DataPostItem({children, className}) {
  // Extract content and metadata safely
  const mdxContent = children?.props?.children;
  const metadata = children?.props?.metadata || {};
  
  const isBlogPostPage = className?.includes('data-post--page');
  
  const {
    permalink = '',
    title = '',
    date = '',
    formattedDate = '',
    frontMatter = {},
    tags = [],
  } = metadata;

  const renderPostHeader = () => {
    return (
      <header>
        <div className="container">
          <h1 className="data-post-title">
            {isBlogPostPage ? title : <Link to={permalink}>{title}</Link>}
          </h1>
          <div className="data-post-meta">
            {date && (
              <time dateTime={date} className="data-post-date">
                {formattedDate}
              </time>
            )}
          </div>
          {isBlogPostPage && tags?.length > 0 && (
            <div className="data-post-tags">
              {tags.map(({label, permalink: tagPermalink}) => (
                <Link
                  key={tagPermalink}
                  to={tagPermalink}
                  className="data-post-tag">
                  #{label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>
    );
  };

  return (
    <article
      className={clsx(
        'data-post',
        isBlogPostPage && 'data-post--page',
        className,
      )}>
      {renderPostHeader()}
      <div className="container data-post-container">
        <div className={clsx('data-post-content', styles.blogPostContent)}>
          <MDXProvider components={MDXComponents}>
            {mdxContent || children}
          </MDXProvider>
        </div>
      </div>
    </article>
  );
} 
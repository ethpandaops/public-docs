import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/lib/client';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

export default function BlogPostItemWrapper(props) {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {frontMatter, title, description, date, formattedDate, authors, tags, permalink} = metadata;
  
  // For the blog post page, use the original BlogPostItem without our wrapper
  if (isBlogPostPage) {
    return <BlogPostItem {...props} />;
  }
  
  // For the list view, use our custom card view
  return (
    <div className={clsx('blog-list-item', isBlogPostPage && 'blog-post-page')}>
      <article>
        <header className="blog-post-item-header">
          <Link to={permalink}>
            <h2 className="blog-post-title">{title}</h2>
          </Link>
          <div className="blog-post-metadata">
            <time dateTime={date}>{formattedDate}</time>
            {authors.length > 0 && (
              <div className="blog-post-author-row">
                {authors.slice(0, 2).map((author) => (
                  <Link key={author.key || author.name} href={author.url} className="blog-post-author">
                    {author.imageURL && (
                      <img 
                        src={author.imageURL} 
                        alt={author.name}
                        className="blog-post-author-image"
                      />
                    )}
                    {author.name}
                  </Link>
                ))}
                {authors.length > 2 && (
                  <span>
                    {translate(
                      {
                        id: 'theme.blog.post.readMoreByAuthors',
                        message: ' and {count} more',
                      },
                      {count: authors.length - 2},
                    )}
                  </span>
                )}
              </div>
            )}
            {metadata.readingTime && (
              <span>
                {translate(
                  {
                    id: 'theme.blog.post.readingTime',
                    message: '{readingTime} min read',
                  },
                  {readingTime: metadata.readingTime},
                )}
              </span>
            )}
          </div>
        </header>
        <div className="blog-post-item-content">
          <p className="blog-post-description">{description}</p>
          
          {tags.length > 0 && (
            <div className="blog-post-tags">
              {tags.map(({label, permalink: tagPermalink}) => (
                <Link
                  key={tagPermalink}
                  to={tagPermalink}
                  className="blog-post-tag">
                  {label}
                </Link>
              ))}
            </div>
          )}
          
          <Link to={permalink} className="blog-post-read-more">
            Read More →
          </Link>
        </div>
      </article>
    </div>
  );
} 
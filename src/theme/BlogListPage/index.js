import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import DefaultImage from '@site/src/components/DefaultImage';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { PageMetadata } from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import Heading from '@theme/Heading';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPagination from '@site/src/components/BlogPagination';
import ParticlesBackground from '@site/src/components/ParticlesBackground';

function BlogHero() {
  return (
    <header className="blog-hero">
      <div className="particles-wrapper">
        <ParticlesBackground />
      </div>
      <div className="container blog-hero-content">
        <Heading as="h1" className="blog-hero-title">
          Blog
        </Heading>
        <p className="blog-hero-subtitle">
          Updates, guides, and deep dives into Ethereum infrastructure
        </p>
      </div>
    </header>
  );
}

function BlogPostCard({post}) {
  const {
    metadata: {
      frontMatter,
      title,
      permalink,
      date,
      formattedDate,
      readingTime,
      tags,
      description,
      authors,
    },
  } = post;
  
  // Get the directory path from the post metadata
  const dirName = frontMatter.slug ? `blog/${frontMatter.slug}` : null;
  
  // Calculate reading time - for blog list, readingTime is directly a number
  let readingMins = 0;
  
  if (typeof readingTime === 'number') {
    // Direct number value (common in blog list view)
    readingMins = Math.round(readingTime);
  } else if (readingTime && typeof readingTime === 'object') {
    // Object with properties (common in individual post view)
    if (readingTime.minutes !== undefined) {
      readingMins = Math.round(readingTime.minutes);
    } else if (readingTime.words !== undefined) {
      readingMins = Math.round(readingTime.words / 200);
    }
  }
  
  // Ensure minimum 1 minute reading time
  readingMins = Math.max(1, readingMins);

  return (
    <div className="blog-post-card">
      <div className="row">
        <div className="col col--4">
          <Link to={permalink} className="blog-post-card-image-link">
            <DefaultImage 
              dirName={dirName} 
              metadata={{frontMatter, title}} 
              className="blog-post-card-image" 
            />
          </Link>
        </div>
        <div className="col col--8">
          <div className="blog-post-card-content">
            <Link to={permalink}>
              <h2 className="blog-post-card-title">{title}</h2>
            </Link>
            <div className="blog-post-card-meta">
              {formattedDate ? (
                <>
                  <span className="blog-post-card-date">
                    {formattedDate}
                  </span>
                  <span className="blog-post-card-dot">•</span>
                </>
              ) : date ? (
                <>
                  <span className="blog-post-card-date">
                    {new Date(date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="blog-post-card-dot">•</span>
                </>
              ) : null}
              <span className="blog-post-card-reading-time">
                {readingMins} min read
              </span>
              <span className="blog-post-card-dot">•</span>
              {authors && authors.length > 0 && (
                <span className="blog-post-card-authors">
                  {authors.map((author, idx) => (
                    <React.Fragment key={author.key || idx}>
                      {idx > 0 && <span className="author-separator">, </span>}
                      <span className="blog-post-card-author">
                        {author.url ? (
                          <Link to={author.url} className="blog-post-card-author-link">
                            {author.name}
                          </Link>
                        ) : (
                          author.name
                        )}
                      </span>
                    </React.Fragment>
                  ))}
                </span>
              )}
            </div>
            {description && (
              <p className="blog-post-card-desc">{description}</p>
            )}
            {tags && tags.length > 0 && (
              <div className="blog-post-card-tags">
                {tags.map((tag) => (
                  <Link
                    key={tag.permalink}
                    to={tag.permalink}
                    className="blog-post-card-tag"
                  >
                    #{tag.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogListPage(props) {
  const {metadata, items, sidebar} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink, page, totalPages, totalCount, postsPerPage, nextPage} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  
  // Debug output for pagination
  console.log('Pagination details:', {
    currentPage: page,
    totalPages,
    nextPage,
    postsPerPage,
    totalCount
  });
  
  // Group posts by year
  const postsByYear = {};
  items.forEach(item => {
    const year = new Date(item.content.metadata.date).getFullYear();
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(item.content);
  });

  // Sort years in descending order
  const years = Object.keys(postsByYear).sort((a, b) => b - a);

  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
      
      <BlogLayout sidebar={sidebar}>
        <div className="blog-content-wrapper">
          <BlogHero />
          
          <div className="container">
            <div className="blog-posts-container">
              {years.map(year => (
                <div key={year} className="blog-posts-year-section">
                  <Heading as="h2" className="blog-posts-year-heading">
                    {year}
                  </Heading>
                  <div className="blog-posts-list">
                    {postsByYear[year].map((post, idx) => (
                      <BlogPostCard key={idx} post={post} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="blog-pagination-container">
                <BlogPagination
                  currentPage={page}
                  totalPages={totalPages}
                />
              </div>
            )}
          </div>
        </div>
      </BlogLayout>
    </>
  );
} 
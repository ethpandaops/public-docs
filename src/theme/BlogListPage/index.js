import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import DefaultImage from '@site/src/components/DefaultImage';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { PageMetadata } from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import Heading from '@theme/Heading';
import SearchMetadata from '@theme/SearchMetadata';

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
    },
  } = post;
  
  // Get the directory path from the post metadata
  const dirName = frontMatter.slug ? `blog/${frontMatter.slug}` : null;
  const wordCount = readingTime?.words || 0;
  const mins = Math.ceil(wordCount / 200);

  return (
    <div className="blog-post-card">
      <div className="row">
        {dirName && (
          <div className="col col--4">
            <Link to={permalink} className="blog-post-card-image-link">
              <DefaultImage dirName={dirName} className="blog-post-card-image" />
            </Link>
          </div>
        )}
        <div className={dirName ? 'col col--8' : 'col col--12'}>
          <div className="blog-post-card-content">
            <Link to={permalink}>
              <h2 className="blog-post-card-title">{title}</h2>
            </Link>
            <div className="blog-post-card-meta">
              <span className="blog-post-card-date">
                {formattedDate}
              </span>
              <span className="blog-post-card-dot">•</span>
              <span className="blog-post-card-reading-time">
                {wordCount} words
              </span>
              <span className="blog-post-card-dot">•</span>
              <span className="blog-post-card-mins">
                {mins} mins
              </span>
            </div>
            {description && (
              <p className="blog-post-card-desc">{description}</p>
            )}
            <div className="blog-post-card-tags">
              {tags.map((tag) => (
                <Link
                  key={tag.permalink}
                  to={tag.permalink}
                  className="blog-post-card-tag"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogListPage(props) {
  const {metadata, items} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  
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
      <BlogLayout>
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
        </div>
      </BlogLayout>
    </>
  );
} 
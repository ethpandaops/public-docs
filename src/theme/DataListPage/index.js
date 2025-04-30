import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import DefaultImage from '@site/src/components/DefaultImage';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { PageMetadata } from '@docusaurus/theme-common';
import DataLayout from '@theme/DataLayout';
import Heading from '@theme/Heading';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPagination from '@site/src/components/BlogPagination';
import ParticlesBackground from '@site/src/components/ParticlesBackground';

function DataHero() {
  return (
    <header className="blog-hero">
      <div className="particles-wrapper">
        <ParticlesBackground />
      </div>
      <div className="container blog-hero-content">
        <Heading as="h1" className="blog-hero-title">
          Data
        </Heading>
        <p className="blog-hero-subtitle">
          Ethereum network snapshots, statistics, metrics, and performance data
        </p>
      </div>
    </header>
  );
}

function DataPostCard({post}) {
  const {
    metadata: {
      frontMatter,
      title,
      permalink,
      date,
      formattedDate,
      tags,
      description,
    },
  } = post;
  
  // Get the directory path from the post metadata
  const dirName = frontMatter.slug ? `data/${frontMatter.slug}` : null;

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

export default function DataListPage(props) {
  const {metadata, items, sidebar} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink, page, totalPages} = metadata;
  const title = blogTitle || 'Data';
  
  // Filter out nested pages - only show root level items
  const rootItems = items.filter(item => {
    const slug = item.content.metadata.frontMatter.slug;
    // Keep only items that don't have a slash in their slug (which indicates nesting)
    return !slug || !slug.includes('/');
  });
  
  // Group posts by year
  const postsByYear = {};
  rootItems.forEach(item => {
    const year = new Date(item.content.metadata.date || new Date()).getFullYear();
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
      <SearchMetadata tag="data_list" />
      
      <DataLayout sidebar={sidebar}>
        <div className="blog-content-wrapper">
          <DataHero />
          
          <div className="container">
            <div className="blog-posts-container">
              {years.map(year => (
                <div key={year} className="blog-posts-year-section">
                  <div className="blog-posts-list" style={{ marginTop: '3rem' }}>
                    {postsByYear[year].map((post, idx) => (
                      <DataPostCard key={idx} post={post} />
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
      </DataLayout>
    </>
  );
} 
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {HtmlClassNameProvider, ThemeClassNames} from '@docusaurus/theme-common';
import {BlogPostProvider, useBlogPost} from '@docusaurus/plugin-content-blog/lib/client';
import BlogLayout from '@theme/BlogLayout';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import DefaultImage from '@site/src/components/DefaultImage';
import BlogHero from '@site/src/components/BlogHero';
import TOC from '@theme/TOC';

// Sidebar action component for GitHub links, related links, and TOC toggle
function BlogSidebarActions({ githubRepos, relatedLinks, hasTOC, showTOC, toggleTOC }) {
  return (
    <div className="blog-sidebar-actions">
      {/* TOC Toggle */}
      {hasTOC && (
        <div className="blog-sidebar-action-item toc-toggle">
          <button 
            onClick={toggleTOC} 
            className="blog-sidebar-action-button"
            aria-label={showTOC ? "Hide Table of Contents" : "Show Table of Contents"}
            title={showTOC ? "Hide Table of Contents" : "Show Table of Contents"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{showTOC ? "Hide Contents" : "Show Contents"}</span>
          </button>
        </div>
      )}

      {/* GitHub Repository Links */}
      {githubRepos && githubRepos.length > 0 && (
        <div className="blog-sidebar-section">
          <h4 className="blog-sidebar-heading">GitHub Repositories</h4>
          <div className="blog-sidebar-links">
            {githubRepos.map((repo, index) => (
              <a 
                key={index} 
                href={repo.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="blog-sidebar-link"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{repo.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Related Links */}
      {relatedLinks && relatedLinks.length > 0 && (
        <div className="blog-sidebar-section">
          <h4 className="blog-sidebar-heading">Related Links</h4>
          <div className="blog-sidebar-links">
            {relatedLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="blog-sidebar-link"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 3h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BlogPostPageContent({children}) {
  const {metadata, toc} = useBlogPost();
  const {title, authors, date, formattedDate, readingTime, tags, frontMatter, source} = metadata;
  const hasTOC = toc.length > 0;
  const [showTOC, setShowTOC] = useState(() => {
    // Load from localStorage if available, default to true otherwise
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('showTOC');
      return savedState !== null ? savedState === 'true' : true;
    }
    return true;
  });
  
  // Update localStorage when state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('showTOC', showTOC);
    }
  }, [showTOC]);
  
  // Extract the full blog directory path from the source
  // Source path looks like: @site/blog/2024-10-16-xatu-execution-layer/index.md
  let blogPath = null;
  
  if (source && source.startsWith('@site/')) {
    // Extract directory from source path 
    const sourcePath = source.replace('@site/', '');
    blogPath = sourcePath.substring(0, sourcePath.lastIndexOf('/'));
    console.log("Extracted blog path from source:", blogPath);
  } else if (frontMatter.slug) {
    // If source is not available, we can't reliably determine the blog directory 
    // as we don't know the date prefix
    console.warn("Source path not available, featured image may not display correctly");
    blogPath = null;
  }
  
  // Format the date properly
  const displayDate = date ? new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';
  
  // Round reading time to nearest integer
  const roundedReadingTime = readingTime ? Math.round(readingTime) : null;

  // Toggle TOC visibility
  const toggleTOC = () => {
    setShowTOC(!showTOC);
  };

  // Get GitHub repos and related links from frontmatter
  const githubRepos = frontMatter.githubRepos || [];
  const relatedLinks = frontMatter.relatedLinks || [];

  // Debug frontmatter data
  console.log('Blog Post Frontmatter:', frontMatter);
  console.log('GitHub Repos:', githubRepos);
  console.log('Related Links:', relatedLinks);

  // Determine if we need to show the sidebar at all
  const hasSidebar = hasTOC || githubRepos.length > 0 || relatedLinks.length > 0;

  return (
    <BlogLayout
      title={title}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogPostPage}>
      
      <div className="blog-post-layout">
        {/* Hero Section */}
        <section className="blog-hero-section">
          <BlogHero 
            title={title} 
            authors={authors} 
            date={displayDate} 
            readingTime={roundedReadingTime} 
            tags={tags} 
          />
        </section>
        
        {/* Content Section */}
        <section className="container blog-post-page">
          <div className={clsx('row', hasTOC && showTOC && 'row--has-toc')}>
            <div className={clsx('col', hasSidebar && showTOC ? 'col--9' : 'col--12')}>
              <div className="blog-post-container">
                {/* Featured image section - use frontmatter metadata or fall back to directory path */}
                <div className="blog-post-featured-image-container">
                  <DefaultImage 
                    dirName={blogPath} 
                    metadata={frontMatter}
                    style={{width: '100%', borderRadius: '8px', marginBottom: '1.5rem'}} 
                  />
                </div>
                
                <div className="blog-post-content markdown">
                  {children}
                </div>
              </div>
              
              {(metadata.nextItem || metadata.prevItem) && (
                <div className="blog-post-page-nav">
                  {metadata.prevItem && (
                    <a href={metadata.prevItem.permalink} className="blog-post-page-nav-item blog-post-page-nav-prev">
                      <span className="blog-post-page-nav-item-label">Previous Post</span>
                      <div className="blog-post-page-nav-item-title">{metadata.prevItem.title}</div>
                    </a>
                  )}
                  
                  {metadata.nextItem && (
                    <a href={metadata.nextItem.permalink} className="blog-post-page-nav-item blog-post-page-nav-next">
                      <span className="blog-post-page-nav-item-label">Next Post</span>
                      <div className="blog-post-page-nav-item-title">{metadata.nextItem.title}</div>
                    </a>
                  )}
                </div>
              )}
            </div>
            {hasSidebar && showTOC && (
              <div className="col col--3">
                <div className="blog-sidebar">
                  {/* TOC Toggle Button at the top */}
                  {hasTOC && (
                    <div className="blog-sidebar-action-item toc-toggle-top">
                      <button 
                        onClick={toggleTOC} 
                        className="blog-sidebar-action-button"
                        aria-label={showTOC ? "Hide Table of Contents" : "Show Table of Contents"}
                        title={showTOC ? "Hide Table of Contents" : "Show Table of Contents"}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Hide Contents</span>
                      </button>
                    </div>
                  )}
                  
                  {/* Table of Contents */}
                  {hasTOC && (
                    <div className="toc-wrapper">
                      <TOC toc={toc} />
                    </div>
                  )}
                  
                  {/* Sidebar actions (GitHub, related links) - WITHOUT the TOC toggle */}
                  <div className="blog-sidebar-actions">
                    {/* GitHub Repository Links */}
                    {githubRepos && githubRepos.length > 0 && (
                      <div className="blog-sidebar-section">
                        <h4 className="blog-sidebar-heading">GitHub Repositories</h4>
                        <div className="blog-sidebar-links">
                          {githubRepos.map((repo, index) => (
                            <a 
                              key={index} 
                              href={repo.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="blog-sidebar-link"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span>{repo.name}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Related Links */}
                    {relatedLinks && relatedLinks.length > 0 && (
                      <div className="blog-sidebar-section">
                        <h4 className="blog-sidebar-heading">Related Links</h4>
                        <div className="blog-sidebar-links">
                          {relatedLinks.map((link, index) => (
                            <a 
                              key={index} 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="blog-sidebar-link"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M15 3h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span>{link.name}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Floating TOC toggle button when sidebar is hidden */}
          {hasSidebar && !showTOC && (
            <div className="toc-toggle-floating">
              <button 
                onClick={toggleTOC} 
                className="toc-toggle-button"
                aria-label="Show Table of Contents"
                title="Show Table of Contents"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </section>
      </div>
    </BlogLayout>
  );
}

export default function BlogPostPage(props) {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <BlogPostPageMetadata />
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage,
        )}>
        <BlogPostPageContent>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
} 
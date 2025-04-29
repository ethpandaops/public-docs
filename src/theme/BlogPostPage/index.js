import React from 'react';
import clsx from 'clsx';
import {HtmlClassNameProvider, ThemeClassNames} from '@docusaurus/theme-common';
import {BlogPostProvider, useBlogPost} from '@docusaurus/plugin-content-blog/lib/client';
import BlogLayout from '@theme/BlogLayout';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import DefaultImage from '@site/src/components/DefaultImage';
import BlogHero from '@site/src/components/BlogHero';
import TOC from '@theme/TOC';

function BlogPostPageContent({children}) {
  const {metadata, toc} = useBlogPost();
  const {title, authors, date, formattedDate, readingTime, tags, frontMatter, source} = metadata;
  const hasTOC = toc.length > 0;
  
  // For debugging
  console.log("Blog post metadata:", metadata);
  console.log("Blog post frontMatter:", frontMatter);
  
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
          <div className={clsx('row', hasTOC && 'row--has-toc')}>
            <div className={clsx('col', hasTOC ? 'col--9' : 'col--12')}>
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
            {hasTOC && (
              <div className="col col--3">
                <div className="toc-wrapper">
                  <TOC toc={toc} />
                </div>
              </div>
            )}
          </div>
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
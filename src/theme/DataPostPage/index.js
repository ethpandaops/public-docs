import React from 'react';
import clsx from 'clsx';
import {HtmlClassNameProvider, ThemeClassNames} from '@docusaurus/theme-common';
import {PageMetadata} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import DataLayout from '@theme/DataLayout';
import Link from '@docusaurus/Link';
import {FaArrowLeft} from 'react-icons/fa';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '@theme/MDXComponents';
import DefaultImage from '@site/src/components/DefaultImage';
import DataHero from '@site/src/components/DataHero';

function DataPostPageMetadata(props) {
  const {content: DataPostContent} = props;
  const {
    metadata,
    frontMatter,
  } = DataPostContent;
  const {title, description, date, tags, permalink, editUrl} = metadata;
  const {siteConfig} = useDocusaurusContext();
  const {baseUrl} = siteConfig;
  
  let imageUrl = '';
  // Use image from frontMatter if available, otherwise fallback
  if (frontMatter.image && !frontMatter.image.startsWith('http')) {
    imageUrl = `${baseUrl}${frontMatter.image}`;
  } else if (frontMatter.image) {
    imageUrl = frontMatter.image;
  } else {
    imageUrl = `${baseUrl}img/panda-social-card.jpg`;
  }

  return (
    <PageMetadata
      title={title}
      description={description}
      keywords={tags?.map((tag) => tag.label)}
      image={imageUrl}>
      <meta property="og:type" content="article" />
      <meta property="article:published_time" content={date} />
      {/* For Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
    </PageMetadata>
  );
}

export default function DataPostPage(props) {
  const {
    content: DataPostContent,
    sidebar,
  } = props;
   
  if (!DataPostContent) {
    return (
      <Layout>
        <div className="container margin-vert--lg">
          <div className="row">
            <main className="col col--12">
              <h1>Error: No content found</h1>
              <p>Could not find the content for this data post.</p>
              <Link to="/data" className="button button--primary">
                Back to Data
              </Link>
            </main>
          </div>
        </div>
      </Layout>
    );
  }
   
  const {metadata, frontMatter, source} = DataPostContent;
  const {
    title,
    permalink,
    date,
    formattedDate,
    tags,
    authors = [],
    readingTime,
    description,
  } = metadata;
  
  // Extract the full data directory path from the source
  // Source path looks like: @site/data/xatu-data/index.md
  let dataPath = null;
  
  if (source && source.startsWith('@site/')) {
    // Extract directory from source path 
    const sourcePath = source.replace('@site/', '');
    dataPath = sourcePath.substring(0, sourcePath.lastIndexOf('/'));
  } else if (frontMatter.slug) {
    // If source is not available, fall back to the slug
    dataPath = `data/${frontMatter.slug.replace(/\//g, '-')}`;
  }
  
  // Format the date properly
  const displayDate = date ? new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';
  
  // Round reading time to nearest integer
  const roundedReadingTime = readingTime ? Math.round(readingTime) : null;

  const Content = DataPostContent; // The actual MDX component

  return (
    <HtmlClassNameProvider
      className={clsx('data-post-page-wrapper', 'blog-post-page-wrapper', 'single-post-page')}>
      <DataPostPageMetadata content={DataPostContent} />
      <DataLayout
        title={title}
        wrapperClassName={ThemeClassNames.wrapper.blogPages}
        pageClassName={ThemeClassNames.page.blogPostPage}>
        
        <div className="blog-post-layout">
          {/* Hero Section */}
          <section className="blog-hero-section">
            <DataHero 
              title={title} 
              description={description} 
              tags={tags} 
            />
          </section>
          
          {/* Content Section */}
          <section className="container blog-post-page data-post-page" style={{ paddingBottom: '2rem' }}>
            <div className="row">
              <div className="col col--12">
                <div className="blog-post-container">
                  <div className="blog-post-content markdown data-post-content">
                    <MDXProvider components={MDXComponents}>
                      <Content />
                    </MDXProvider>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </DataLayout>
    </HtmlClassNameProvider>
  );
} 
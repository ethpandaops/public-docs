import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import ParticlesBackground from './ParticlesBackground';
import styles from './BlogHero.module.css';

export default function BlogHero({ title, authors, date, readingTime, tags }) {
  return (
    <header className={styles.blogHero}>
      <div className={styles.particlesWrapper}>
        <ParticlesBackground />
      </div>
      <div className={clsx("container", styles.blogHeroContent)}>
        <Heading as="h1" className={clsx(styles.title)}>
          {title}
        </Heading>
        
        <div className={styles.blogMeta}>
          {date && (
            <span className={styles.blogDate}>
              {date}
            </span>
          )}
          
          {readingTime && (
            <>
              <span className={styles.metaDot}>•</span>
              <span className={styles.blogReadTime}>
                {readingTime} min read
              </span>
            </>
          )}
          
          {authors && authors.length > 0 && (
            <>
              <span className={styles.metaDot}>•</span>
              <span className={styles.blogAuthors}>
                By&nbsp;
                {authors.map((author, idx) => (
                  <React.Fragment key={author.key || idx}>
                    {idx > 0 && (idx === authors.length - 1 ? ' and ' : ', ')}
                    <a href={author.url} className={styles.authorLink}>
                      {author.name}
                    </a>
                  </React.Fragment>
                ))}
              </span>
            </>
          )}
        </div>
        
        {tags && tags.length > 0 && (
          <div className={styles.blogTags}>
            {tags.map((tag) => (
              <a key={tag.permalink} href={tag.permalink} className={styles.tagLink}>
                #{tag.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
} 
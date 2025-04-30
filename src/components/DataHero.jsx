import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import ParticlesBackground from './ParticlesBackground';
import styles from './DataHero.module.css';

export default function DataHero({ title, description, tags }) {
  return (
    <header className={styles.dataHero}>
      <div className={styles.particlesWrapper}>
        <ParticlesBackground />
      </div>
      <div className={clsx("container", styles.dataHeroContent)}>
        <Heading as="h1" className={clsx(styles.title)}>
          {title}
        </Heading>
        
        {description && (
          <div className={styles.description}>
            {description}
          </div>
        )}
        
        {tags && tags.length > 0 && (
          <div className={styles.dataTags}>
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
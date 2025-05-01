import React from 'react';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './RelatedLinks.module.css';

export default function RelatedLinks({ links, githubRepo, githubRepos }) {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';

  // Convert single githubRepo to array for consistent handling
  const repositories = githubRepos || (githubRepo ? [githubRepo] : []);

  if (!links?.length && !repositories.length) {
    return null;
  }

  return (
    <div className={styles.relatedContainer}>
      {repositories.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeading}>
            <svg width="16" height="16" className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.332-1.755-1.332-1.755-1.09-.745.082-.73.082-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" fill="currentColor" />
            </svg>
            {repositories.length === 1 ? 'Repository' : 'Repositories'}
          </div>
          <div className={styles.itemsContainer}>
            {repositories.map((repo, index) => (
              <a 
                key={index}
                href={`https://github.com/${repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repoLink}
              >
                {repo.split('/')[1] || repo}
              </a>
            ))}
          </div>
        </div>
      )}

      {links && links.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeading}>
            <svg width="16" height="16" className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.544 10.456a4.368 4.368 0 0 0-6.176 0l-3.089 3.088a4.367 4.367 0 0 0 6.177 6.177l1.907-1.907m-2.176-8.636a4.368 4.368 0 0 0 6.177 0l3.088-3.088a4.368 4.368 0 0 0-6.177-6.177L11.09 1.826" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Links
          </div>
          <div className={styles.itemsContainer}>
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.url}
                className={styles.link}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 
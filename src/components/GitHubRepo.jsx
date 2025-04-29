import React, { useState, useEffect } from 'react';
import styles from './GitHubRepo.module.css';
import { FiStar, FiGitBranch } from 'react-icons/fi';

export default function GitHubRepo({ repo }) {
  const [repoInfo, setRepoInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Parse repo string into owner and name
  const [owner, name] = repo.includes('/') ? repo.split('/') : [null, repo];
  
  useEffect(() => {
    if (!owner || !name) {
      setError('Invalid repository format. Please use "owner/name" format.');
      setLoading(false);
      return;
    }

    const fetchRepoData = async () => {
      try {
        // This is just static data for now to avoid rate limits
        // In production, you'd make an API call to GitHub
        const staticData = {
          name: name,
          owner: {
            login: owner
          },
          html_url: `https://github.com/${owner}/${name}`,
          description: repoDescriptions[repo] || `An Ethereum project by ${owner}`,
          stargazers_count: repoStars[repo] || 0,
          forks_count: repoForks[repo] || 0,
          language: repoLanguages[repo] || null
        };
        
        setRepoInfo(staticData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch repository data');
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [owner, name, repo]);

  if (loading) {
    return <div className={styles.loading}>Loading repository information...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.repoCard}>
      <div className={styles.repoHeader}>
        <svg className={styles.repoIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
          <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
        </svg>
        <a href={repoInfo.html_url} target="_blank" rel="noopener noreferrer" className={styles.repoName}>
          {repoInfo.owner.login}/{repoInfo.name}
        </a>
      </div>
      
      <div className={styles.repoDescription}>
        {repoInfo.description}
      </div>
      
      <div className={styles.repoFooter}>
        {repoInfo.language && (
          <div className={styles.repoLanguage}>
            <span 
              className={styles.languageColor} 
              style={{ backgroundColor: languageColors[repoInfo.language] || '#586069' }}
            ></span>
            <span>{repoInfo.language}</span>
          </div>
        )}
        
        <div className={styles.repoStats}>
          <a href={`${repoInfo.html_url}/stargazers`} target="_blank" rel="noopener noreferrer" className={styles.repoStat}>
            <FiStar className={styles.icon} />
            <span>{repoInfo.stargazers_count}</span>
          </a>
          
          <a href={`${repoInfo.html_url}/network/members`} target="_blank" rel="noopener noreferrer" className={styles.repoStat}>
            <FiGitBranch className={styles.icon} />
            <span>{repoInfo.forks_count}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// Static data for common repositories
const repoDescriptions = {
  'ethpandaops/tracoor': 'An Ethereum beacon data and execution trace explorer',
  'ethpandaops/xatu': 'Ethereum beacon and execution data pipeline',
  'ethpandaops/ethwallclock': 'Ethereum block time calendar',
  'ethpandaops/checkpointz': 'Checkpoint sync service for Ethereum consensus clients'
};

const repoStars = {
  'ethpandaops/tracoor': 16,
  'ethpandaops/xatu': 112,
  'ethpandaops/ethwallclock': 45,
  'ethpandaops/checkpointz': 301
};

const repoForks = {
  'ethpandaops/tracoor': 0,
  'ethpandaops/xatu': 42,
  'ethpandaops/ethwallclock': 12,
  'ethpandaops/checkpointz': 78
};

const repoLanguages = {
  'ethpandaops/tracoor': 'Go',
  'ethpandaops/xatu': 'Go',
  'ethpandaops/ethwallclock': 'TypeScript',
  'ethpandaops/checkpointz': 'Go'
};

const languageColors = {
  Go: '#00ADD8',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Rust: '#dea584',
  Java: '#b07219',
  Solidity: '#AA6746'
}; 
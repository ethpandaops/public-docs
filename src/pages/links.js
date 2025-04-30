import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import ParticlesBackground from '../components/ParticlesBackground';
import styles from './links.module.css';

function LinksHeader() {
  return (
    <header className={clsx('hero', styles.linksHero, 'homepage-header')}>
      <div className="particles-wrapper">
        <ParticlesBackground />
      </div>
      <div className={clsx("container", styles.linksHeaderContent)}>
        <Heading as="h1" className={clsx(styles.title)}>
          ethPandaOps Links
        </Heading>
        <p className={clsx(styles.subtitle)}>
          Access our services and tools across different Ethereum networks
        </p>
      </div>
    </header>
  );
}

function IntroSection() {
  return (
    <div className={styles.introSection}>
      <div className={styles.introContent}>
        <p>This page hosts a curated list of links to various tools we manage, designed to assist with debugging across multiple Ethereum networks.</p>
        <p>We also run a lot of ethereum nodes across multiple networks. Their RPC and Beacon API endpoints are protected via authentication to prevent external abuses. There's more information in our <Link to="/docs/guides/client-developers/api-access">Ethereum API docs</Link>.</p>
      </div>
    </div>
  );
}

function NetworkCard({ networkData }) {
  const { name, emoji, links } = networkData;
  
  return (
    <div className={styles.networkCard}>
      <div className={styles.networkHeader}>
        <h2 className={styles.networkTitle}>{emoji} {name}</h2>
      </div>
      
      {Object.entries(links).map(([categoryKey, categoryData]) => (
        <div key={categoryKey} className={styles.categoryContainer}>
          <h3 className={styles.categoryTitle}>
            <span className={styles.categoryIcon}>{categoryData.emoji}</span> 
            <span>{categoryData.name}</span>
          </h3>
          
          <div className={styles.linksList}>
            {categoryData.items.map((link, index) => (
              <Link 
                key={index}
                to={link.url} 
                className={clsx(
                  styles.linkButton,
                )}
                target="_blank" 
                rel="noopener noreferrer"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LinksPage() {
  const [networksData, setNetworksData] = useState({});
  const [networks, setNetworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLinks() {
      try {
        const response = await fetch('/data/links.json');
        const data = await response.json();
        
        // Filter only network entries (those with our specific structure)
        const networkEntries = Object.entries(data).filter(([key, value]) => 
          value.name && value.emoji && value.links
        );
        
        // Create an object with just the network data
        const networksObject = Object.fromEntries(networkEntries);
        
        // Get network keys in desired order
        const orderedNetworks = [
          'ethereum-mainnet',
          'holesky-testnet',
          'sepolia-testnet',
          'hoodi-network',
          ...networkEntries
            .map(([key]) => key)
            .filter(key => !['ethereum-mainnet', 'holesky-testnet', 'sepolia-testnet', 'hoodi-network'].includes(key))
        ];
        
        setNetworksData(networksObject);
        setNetworks(orderedNetworks);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching links:', error);
        setIsLoading(false);
      }
    }

    fetchLinks();
  }, []);

  return (
    <Layout
      title="Links"
      description="Access ethPandaOps services and tools across different Ethereum networks"
    >
      <LinksHeader />
      <IntroSection />
      
      <main className={styles.linksContainer}>
        {isLoading ? (
          <div className={styles.loading}>Loading links...</div>
        ) : (
          <div className={styles.networkGrid}>
            {networks.map((networkKey) => {
              const networkData = networksData[networkKey];
              if (!networkData) return null;
              
              return <NetworkCard key={networkKey} networkData={networkData} />;
            })}
          </div>
        )}
      </main>
    </Layout>
  );
} 
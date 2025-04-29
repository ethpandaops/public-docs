import React, { useState, useEffect } from 'react';
import styles from './HeroStats.module.css';

// Map from continent codes to names for better display
const continentCodeToName = {
  'AF': 'Africa',
  'AS': 'Asia',
  'EU': 'Europe',
  'NA': 'North America',
  'SA': 'South America',
  'OC': 'Oceania',
  'AN': 'Antarctica'
};

export default function HeroStats() {
  const [stats, setStats] = useState({
    continents: 0,
    nodes: 0,
    countries: 0,
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    // Use the provided API endpoint
    fetch('https://lab-api.primary.production.platform.ethpandaops.io/lab-data/xatu_public_contributors/summary.json')
      .then(response => response.json())
      .then(data => {
        // Calculate total nodes across all networks
        const totalNodes = Object.values(data.networks).reduce(
          (sum, network) => sum + network.total_nodes, 0
        );
        
        // Extract unique countries and continents across all networks
        const uniqueCountries = new Set();
        const uniqueContinents = new Set();
        
        Object.values(data.networks).forEach(network => {
          // Add countries
          if (network.countries) {
            Object.keys(network.countries).forEach(country => {
              uniqueCountries.add(country);
            });
          }
          
          // Add continents - they're already available in the JSON
          if (network.continents) {
            Object.keys(network.continents).forEach(continent => {
              uniqueContinents.add(continent);
            });
          }
        });
        
        setStats({
          continents: uniqueContinents.size, 
          nodes: totalNodes,
          countries: uniqueCountries.size
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
        // On error, show zeros
        setStats({
          continents: 0,
          nodes: 0,
          countries: 0
        });
        setLoading(false);
      });
  }, []);

  return (
    <div className={`${styles.statsContainer} ${loading ? styles.loading : ''}`}>
      <div className={styles.statItem}>
        {loading ? (
          <div className={styles.loadingPulse}></div>
        ) : (
          <>
            <span className={styles.statNumber}>{stats.nodes.toLocaleString()}</span>
            <span className={styles.statLabel}>Total Nodes</span>
          </>
        )}
      </div>
      <div className={styles.statItem}>
        {loading ? (
          <div className={styles.loadingPulse}></div>
        ) : (
          <>
            <span className={styles.statNumber}>{stats.countries}</span>
            <span className={styles.statLabel}>Countries</span>
          </>
        )}
      </div>
      <div className={styles.statItem}>
        {loading ? (
          <div className={styles.loadingPulse}></div>
        ) : (
          <>
            <span className={styles.statNumber}>{stats.continents}</span>
            <span className={styles.statLabel}>Continents</span>
          </>
        )}
      </div>
    </div>
  );
} 
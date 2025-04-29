import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './UserJourneySection.module.css';

export default function UserJourneySection() {
  return (
    <section className={styles.journeySection}>
      <div className="container">
        <div className="row">
          <div className="col col--12 text--center">
            <Heading as="h2" className={styles.sectionTitle}>Find Your Path</Heading>
            <p className={styles.sectionSubtitle}>
              Discover the right tools and guides for your role in the Ethereum ecosystem
            </p>
          </div>
        </div>
        
        <div className="row margin-top--lg">
          <div className="col col--4">
            <div className={styles.journeyCard}>
              <div className={styles.journeyIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 14L18 11V7C18 6.73478 17.8946 6.48043 17.7071 6.29289C17.5196 6.10536 17.2652 6 17 6H14L11 3H8L5 6H2C1.73478 6 1.48043 6.10536 1.29289 6.29289C1.10536 6.48043 1 6.73478 1 7V11L4 14H21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11H10V14H9V11Z" fill="currentColor"/>
                  <path d="M14 11H15V14H14V11Z" fill="currentColor"/>
                  <path d="M3 14V17C3 17.7956 3.31607 18.5587 3.87868 19.1213C4.44129 19.6839 5.20435 20 6 20H18C18.7956 20 19.5587 19.6839 20.1213 19.1213C20.6839 18.5587 21 17.7956 21 17V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <Heading as="h3" className={styles.journeyTitle}>Node Operators</Heading>
              <p className={styles.journeyDescription}>
                Optimize your Ethereum node operations with our monitoring and testing tools
              </p>
              <ul className={styles.journeyFeatures}>
                <li>Real-time node monitoring</li>
                <li>Performance optimization</li>
                <li>Network health tracking</li>
                <li>Client diversity tools</li>
              </ul>
              <div className={styles.journeyActions}>
                <Link
                  className="button button--primary button--sm"
                  to="/docs/guides/node-operators">
                  Node Operator Guides
                </Link>
              </div>
            </div>
          </div>
          
          <div className="col col--4">
            <div className={styles.journeyCard}>
              <div className={styles.journeyIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 3V7L12 9L16 7V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17L12 15L8 17V21L12 19L16 21V17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 9L8 11L12 9L16 11L20 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 13L8 11V15L12 13L16 15V11L20 13V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <Heading as="h3" className={styles.journeyTitle}>Developers</Heading>
              <p className={styles.journeyDescription}>
                Build and test on Ethereum with our development environments and packages
              </p>
              <ul className={styles.journeyFeatures}>
                <li>Local testing environments</li>
                <li>Smart contract tools</li>
                <li>API integrations</li>
                <li>Ethereum package deployment</li>
              </ul>
              <div className={styles.journeyActions}>
                <Link
                  className="button button--primary button--sm"
                  to="/docs/guides/client-developers">
                  Client Developer Guides
                </Link>
              </div>
            </div>
          </div>
          
          <div className="col col--4">
            <div className={styles.journeyCard}>
              <div className={styles.journeyIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <Heading as="h3" className={styles.journeyTitle}>Data Analysts</Heading>
              <p className={styles.journeyDescription}>
                Analyze Ethereum network data with our analytical tools and pipelines
              </p>
              <ul className={styles.journeyFeatures}>
                <li>Data visualization tools</li>
                <li>Advanced query interfaces</li>
                <li>Real-time network analytics</li>
                <li>Custom dashboard creation</li>
              </ul>
              <div className={styles.journeyActions}>
                <Link
                  className="button button--primary button--sm"
                  to="/docs/guides/data-analysts">
                  Data Analyst Guides
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
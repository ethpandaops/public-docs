import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ParticlesBackground from '../components/ParticlesBackground';
import HeroStats from '../components/HeroStats';
import UserJourneySection from '../components/UserJourneySection';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner, 'homepage-header')}>
      <div className="particles-wrapper">
        <ParticlesBackground />
      </div>
      <div className={clsx("container", "homepage-header-content")}>
        <div className={styles.heroTitleRow}>
          <img src="https://ethpandaops.io/logo.png" alt="ethPandaOps Logo" className={clsx(styles.logoImage, 'logo-animate')} />
          <Heading as="h1" className={clsx('hero__title', styles.title)}>
            {siteConfig.title}
          </Heading>
        </div>
        <p className={clsx('hero__subtitle', styles.subtitle)}>
          Powerful open-source tools for Ethereum infrastructure that improve reliability, 
          performance, and visibility for node operators and developers
        </p>
        <HeroStats />
        <div className="header-buttons">
          <Link
            className="button button--primary button--lg"
            to="/docs/guides">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/tooling/overview">
            Explore Our Tools
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureSection() {
  return (
    <section className="feature-section">
      <div className="container">
        <div className="row">
          <div className="col col--12 text--center">
            <Heading as="h2" className={styles.featuresTitle}>
              <span>Tools and Services.</span> <span>Open Source.</span> <span>Ethereum Infrastructure.</span>
            </Heading>
            <p className={styles.featuresSubtitle}>
              Our suite of tools powers Ethereum infrastructure at every level
            </p>
          </div>
        </div>
        
        <div className="row margin-top--lg">
          <div className="col col--3">
            <div className={styles.toolCard}>
              <div className={styles.toolImageContainer}>
                <img src="https://ethpandaops.io/posts/kurtosis-deep-dive/featured_hu10858589907513282560.png" alt="Ethereum Package" className={styles.toolImage} />
                <div className={styles.toolOverlay}></div>
              </div>
              <div className={styles.toolContent}>
                <Heading as="h3" className={styles.toolTitle}>Ethereum Package</Heading>
                <p className={styles.toolDescription}>A Kurtosis package for deploying and testing Ethereum networks locally in a containerized environment.</p>
                <div className={styles.toolActions}>
                  <Link
                    className={styles.toolButton}
                    to="/docs/tooling/kurtosis">
                    Learn More
                  </Link>
                  <Link
                    className={styles.toolButtonSecondary}
                    href="https://github.com/ethpandaops/ethereum-package"
                    target="_blank">
                    GitHub
                    <svg className={styles.toolButtonIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col col--3">
            <div className={styles.toolCard}>
              <div className={styles.toolImageContainer}>
                <img src="https://lab.ethpandaops.io/header.png" alt="The Lab" className={styles.toolImage} />
                <div className={styles.toolOverlay}></div>
              </div>
              <div className={styles.toolContent}>
                <Heading as="h3" className={styles.toolTitle}>The Lab</Heading>
                <p className={styles.toolDescription}>A research and development environment for Ethereum network testing and analysis.</p>
                <div className={styles.toolActions}>
                  <Link
                    className={styles.toolButton}
                    to="/docs/tooling/lab">
                    Learn More
                  </Link>
                  <Link
                    className={styles.toolButtonSecondary}
                    href="https://lab.ethpandaops.io/"
                    target="_blank">
                    Visit
                    <svg className={styles.toolButtonIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col col--3">
            <div className={styles.toolCard}>
              <div className={styles.toolImageContainer}>
                <img src="https://ethpandaops.io/posts/contributoor-beacon-node-companion/featured_hu7374463724229542517.png" alt="Contributoor" className={styles.toolImage} />
                <div className={styles.toolOverlay}></div>
              </div>
              <div className={styles.toolContent}>
                <Heading as="h3" className={styles.toolTitle}>Contributoor</Heading>
                <p className={styles.toolDescription}>A monitoring and data-gathering tool that helps improve Ethereum's network visibility.</p>
                <div className={styles.toolActions}>
                  <Link
                    className={styles.toolButton}
                    to="/docs/tooling/contributoor">
                    Learn More
                  </Link>
                  <Link
                    className={styles.toolButtonSecondary}
                    href="https://github.com/ethpandaops/contributoor-installer"
                    target="_blank">
                    GitHub
                    <svg className={styles.toolButtonIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col col--3">
            <div className={styles.toolCard}>
              <div className={styles.toolImageContainer}>
                <img src="https://ethpandaops.io/posts/assertoor-introduction/featured_hu10906002355583469052.png" alt="Assertoor" className={styles.toolImage} />
                <div className={styles.toolOverlay}></div>
              </div>
              <div className={styles.toolContent}>
                <Heading as="h3" className={styles.toolTitle}>Assertoor</Heading>
                <p className={styles.toolDescription}>A comprehensive testing tool for Ethereum networks with orchestrated test sequences and real-time monitoring.</p>
                <div className={styles.toolActions}>
                  <Link
                    className={styles.toolButton}
                    to="/docs/tooling/assertoor">
                    Learn More
                  </Link>
                  <Link
                    className={styles.toolButtonSecondary}
                    href="https://github.com/ethpandaops/assertoor"
                    target="_blank">
                    GitHub
                    <svg className={styles.toolButtonIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col col--12 text--center" style={{ marginTop: '3rem', marginBottom: '1rem' }}>
            <Link
              className={styles.exploreMoreContainer}
              to="/docs/tooling/overview">
              <span className={styles.exploreMoreButton}>
                Explore All Our Tools
                <svg className={styles.exploreMoreIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className="community-section">
      <svg width="0" height="0" className={styles.hidden}>
        <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0969da" />
          <stop offset="100%" stopColor="#9c44dc" />
        </linearGradient>
      </svg>
      <div className="container">
        <div className="row">
          <div className="col col--12 text--center">
            <Heading as="h2" className={styles.sectionTitle}>Join the ethPandaOps Community</Heading>
            <p className={styles.sectionSubtitle}>We're a team of dedicated pandas with a passion for decentralization and a knack for bamboo-chomping. Our mission? To contribute to the evolution of Ethereum, one byte at a time!</p>
          </div>
        </div>
        
        <div className="row margin-top--lg">
          <div className="col col--6">
            <div className="community-card">
              <div className={styles.cardIconWrapper}>
                <svg className={styles.cardIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </div>
              <Heading as="h3">Contribute</Heading>
              <p>Help us build and maintain Ethereum infrastructure tools. All of our projects are open source and welcome contributions from developers of all experience levels. Join us in creating a more decentralized future!</p>
              <Link
                className="button button--primary"
                href="https://github.com/ethpandaops"
                target="_blank">
                GitHub Organization
              </Link>
            </div>
          </div>
          
          <div className="col col--6">
            <div className="community-card">
              <div className={styles.cardIconWrapper}>
                <svg className={styles.cardIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <Heading as="h3">Learn & Connect</Heading>
              <p>Connect with us on the Ethereum R&D Discord server where Ethereum infrastructure operators and developers collaborate. Share ideas, ask questions, and participate in discussions about Ethereum's future.</p>
              <Link
                className="button button--primary"
                href="https://discord.com/invite/qGpsxSA"
                target="_blank">
                Join Eth R&D Discord
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Ethereum Infrastructure Tools`}
      description="ethPandaOps provides open-source tools and services for Ethereum infrastructure operators and developers.">
      <HomepageHeader />
      <main>
        <FeatureSection />
        <div className="divider-container">
          <hr className="section-divider" />
        </div>
        <UserJourneySection />
        <CommunitySection />
      </main>
    </Layout>
  );
}

import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner, 'homepage-header')}>
      <div className="container homepage-header-content">
        <div className={styles.logoContainer}>
          <img src="https://ethpandaops.io/logo.png" alt="ethPandaOps Logo" className={clsx(styles.logoImage, 'logo-animate')} />
        </div>
        <Heading as="h1" className={clsx('hero__title', styles.title)}>
          {siteConfig.title}
        </Heading>
        <p className={clsx('hero__subtitle', styles.subtitle)}>{siteConfig.tagline}</p>
        <div className="header-buttons">
          <Link
            className="button button--primary button--lg"
            to="/docs/onboarding/intro">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/tooling/intro">
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
          </div>
        </div>
        
        <div className="row margin-top--lg">
          <div className="col col--3">
            <div className="feature-card">
              <div className="feature-image">
                <img src="https://ethpandaops.io/posts/kurtosis-deep-dive/featured_hu10858589907513282560.png" alt="Ethereum Package" />
              </div>
              <Heading as="h3">Ethereum Package</Heading>
              <p>A Kurtosis package for deploying and testing Ethereum networks locally in a containerized environment.</p>
              <Link
                className="button button--primary button--sm"
                to="/docs/tooling/kurtosis">
                Learn More
              </Link>
              <Link
                className="button button--secondary button--sm"
                href="https://github.com/ethpandaops/ethereum-package"
                target="_blank">
                GitHub
              </Link>
            </div>
          </div>
          
          <div className="col col--3">
            <div className="feature-card">
              <div className="feature-image">
                <img src="https://lab.ethpandaops.io/header.png" alt="The Lab" />
              </div>
              <Heading as="h3">The Lab</Heading>
              <p>A research and development environment for Ethereum network testing and analysis.</p>
              <Link
                className="button button--primary button--sm"
                to="/docs/tooling/lab">
                Learn More
              </Link>
              <Link
                className="button button--secondary button--sm"
                href="https://lab.ethpandaops.io/"
                target="_blank">
                Visit The Lab
              </Link>
            </div>
          </div>
          
          <div className="col col--3">
            <div className="feature-card">
              <div className="feature-image">
                <img src="https://ethpandaops.io/posts/contributoor-beacon-node-companion/featured_hu7374463724229542517.png" alt="Contributoor" />
              </div>
              <Heading as="h3">Contributoor</Heading>
              <p>A monitoring and data-gathering tool that helps improve Ethereum's network visibility.</p>
              <Link
                className="button button--primary button--sm"
                to="/docs/tooling/contributoor">
                Learn More
              </Link>
              <Link
                className="button button--secondary button--sm"
                href="https://github.com/ethpandaops/contributoor-installer"
                target="_blank">
                GitHub
              </Link>
            </div>
          </div>
          
          <div className="col col--3">
            <div className="feature-card">
              <div className="feature-image">
                <img src="https://ethpandaops.io/posts/assertoor-introduction/featured_hu10906002355583469052.png" alt="Assertoor" />
              </div>
              <Heading as="h3">Assertoor</Heading>
              <p>A comprehensive testing tool for Ethereum networks with orchestrated test sequences and real-time monitoring.</p>
              <Link
                className="button button--primary button--sm"
                to="/docs/tooling/assertoor">
                Learn More
              </Link>
              <Link
                className="button button--secondary button--sm"
                href="https://github.com/ethpandaops/assertoor"
                target="_blank">
                GitHub
              </Link>
            </div>
          </div>
        </div>
        
        <div className="row margin-top--xl">
          <div className="col col--12 text--center">
            <div className="more-tools-section">
              <p className="more-tools-text">These are just a few highlights from our toolkit. Discover our full range of Ethereum infrastructure tools and services.</p>
              <Link
                className="button button--primary button--lg"
                to="/docs/tooling/intro">
                Explore All Our Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className="community-section">
      <div className="container">
        <div className="row">
          <div className="col col--12 text--center">
            <Heading as="h2">Join the ethPandaOps Community</Heading>
            <p>ethPandaOps is a community of developers, operators, and enthusiasts working to improve Ethereum infrastructure.</p>
          </div>
        </div>
        
        <div className="row margin-top--lg">
          <div className="col col--6">
            <div className="community-card">
              <Heading as="h3">Contribute</Heading>
              <p>Help us build and maintain Ethereum infrastructure tools. All of our projects are open source and welcome contributions.</p>
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
              <Heading as="h3">Learn & Connect</Heading>
              <p>Connect with us on the Ethereum R&D Discord server where Ethereum infrastructure operators and developers collaborate.</p>
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
        <CommunitySection />
      </main>
    </Layout>
  );
}

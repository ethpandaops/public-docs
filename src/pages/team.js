import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import TeamProfile from '@site/src/components/TeamProfile';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import ParticlesBackground from '../components/ParticlesBackground';
import styles from './team.module.css';

function TeamHeader() {
  return (
    <header className={clsx('hero', styles.teamHero, 'homepage-header')}>
      <div className="particles-wrapper">
        <ParticlesBackground />
      </div>
      <div className={clsx("container", styles.teamHeaderContent)}>
        <Heading as="h1" className={clsx(styles.title)}>
          Team
        </Heading>
        <p className={clsx(styles.subtitle)}>
          Nestled within the Ethereum Foundation DevOps team, we're a globally distributed group of pandas with a passion for decentralization, open source and Ethereum.
        </p>
      </div>
    </header>
  );
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const teamData = [
          'barnabasbusa',
          'matty',
          'parithosh',
          'pk910',
          'samcm',
          'savid',
          'skylenet'
        ];

        const members = await Promise.all(
          teamData.map(async (member) => {
            const response = await fetch(`/data/authors/${member}.json`);
            const data = await response.json();
            return data;
          })
        );

        setTeamMembers(members);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    }

    fetchTeamMembers();
  }, []);

  return (
    <Layout
      title="Team"
      description="Meet the ethPandaOps team"
    >
      <TeamHeader />
      <main className={styles.teamContainer}>
        {teamMembers.map((member, idx) => (
          <TeamProfile
            key={idx}
            name={member.name}
            image={member.image}
            bio={member.bio}
            social={member.social}
          />
        ))}
      </main>
    </Layout>
  );
} 
import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import TeamProfile from '@site/src/components/TeamProfile';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import ParticlesBackground from '../components/ParticlesBackground';
import styles from './team.module.css';

// Define team members in the component
const TEAM_MEMBER_KEYS = [
  'barnabasbusa',
  'matty',
  'parithosh',
  'pk910',
  'samcm',
  'savid',
  'skylenet'
];

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
    async function fetchAuthors() {
      try {
        const response = await fetch('/data/authors.json');
        const authorsData = await response.json();
        
        // Format the team members from the author data
        const formattedMembers = TEAM_MEMBER_KEYS.map(key => {
          const member = authorsData[key];
          if (!member) return null;
          
          // Create social array format expected by TeamProfile component
          const social = [];
          if (member.github) social.push({ github: member.github });
          if (member.twitter) social.push({ twitter: member.twitter });
          if (member.website) social.push({ home: member.website });
          
          const imagePath = member.image_url || member.image || '';
          
          return {
            name: member.name,
            image: imagePath.replace(/^\//, ''), // Remove leading slash if present
            bio: member.bio || member.title || '',
            social: social
          };
        }).filter(Boolean);
        
        setTeamMembers(formattedMembers);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    }

    fetchAuthors();
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
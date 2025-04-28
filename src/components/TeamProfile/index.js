import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import {FaGithub, FaHome} from 'react-icons/fa';
import {FaXTwitter} from 'react-icons/fa6';

function SocialLink({type, url}) {
  let icon = null;
  
  switch(Object.keys(type)[0]) {
    case 'twitter':
      icon = <FaXTwitter />;
      break;
    case 'github':
      icon = <FaGithub />;
      break;
    case 'home':
      icon = <FaHome />;
      break;
    default:
      return null;
  }
  
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
      {icon}
    </a>
  );
}

export default function TeamProfile({name, image, bio, social}) {
  return (
    <div className={styles.teamMember}>
      <div className={styles.imgContainer}>
        <img src={image} alt={name} className={styles.img} />
      </div>
      <div className={styles.content}>
        <h3>{name}</h3>
        <p>{bio}</p>
        {social && (
          <div className={styles.socialLinks}>
            {social.map((item, idx) => (
              <SocialLink 
                key={idx} 
                type={item} 
                url={Object.values(item)[0]} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
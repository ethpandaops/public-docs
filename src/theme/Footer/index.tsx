/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import FooterLinks from '@theme/Footer/Links';
import FooterLogo from '@theme/Footer/Logo';
import styles from './styles.module.css';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

function Footer(): React.ReactElement | null {
  const {footer} = useThemeConfig();
  if (!footer) {
    return null;
  }
  const {copyright, links, logo, style} = footer;

  return (
    <footer className={clsx('footer', styles.footerDark)}>
      {/* SVG gradient definitions */}
      <svg width="0" height="0" className={styles.hidden}>
        <linearGradient id="footer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0969da" />
          <stop offset="100%" stopColor="#9c44dc" />
        </linearGradient>
      </svg>

      {/* Background effects */}
      <div className={styles.footerBackgroundGlow}></div>
      
      <div className={clsx('container container-fluid', styles.footerContainer)}>
        {links && links.length > 0 && <FooterLinks links={links} />}
        
        <div className="footer__bottom text--center">
          {copyright && (
            <div className={styles.footerCopyright}>
              <span>{copyright.replace('❤️', '').replace('for the Ethereum community', '')}</span>
              <span className={styles.heart}>❤️</span>
              <span>for the Ethereum community</span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);

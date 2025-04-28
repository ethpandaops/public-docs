/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from '@docusaurus/Link';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import type {Props} from '@theme/Footer/Logo';

import styles from './styles.module.css';

export default function FooterLogo({logo}: Props): React.ReactElement {
  const {withBaseUrl} = useBaseUrlUtils();
  const sources = {
    light: withBaseUrl(logo.src),
    dark: withBaseUrl(logo.srcDark ?? logo.src),
  };

  return (
    <div className={styles.footerLogoContainer}>
      {logo.href ? (
        <Link href={logo.href} className={styles.footerLogoLink} target={logo.target}>
          <ThemedImage
            sources={sources}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className={styles.footerLogo}
          />
        </Link>
      ) : (
        <ThemedImage
          sources={sources}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className={styles.footerLogo}
        />
      )}
    </div>
  );
}

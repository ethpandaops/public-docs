import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {type FooterLinkItem} from '@docusaurus/theme-common';
import IconExternalLink from '@theme/Icon/ExternalLink';
import styles from '../styles.module.css';
import clsx from 'clsx';

export default function FooterLinkItem({
  item,
}: {
  item: FooterLinkItem;
}): ReactNode {
  const {to, href, label, prependBaseUrlToHref, ...props} = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});

  return (
    <Link
      className={clsx('footer__link-item', styles.footerItemLink)}
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}>
      {label}
      {href && !isInternalUrl(href) && (
        <IconExternalLink />
      )}
    </Link>
  );
}

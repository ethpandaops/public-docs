import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/Footer/Copyright';
import styles from '../styles.module.css';

export default function FooterCopyright({copyright}: Props): ReactNode {
  return (
    <div
      className={clsx('footer__copyright', styles.footerCopyright)}
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: copyright}}>
    </div>
  );
}

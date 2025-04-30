import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from '../BlogLayout/styles.module.css';

export default function DataLayout(props) {
  const {
    children,
    title,
    description,
    wrapperClassName,
    pageClassName,
    noSidebar,
    ...layoutProps
  } = props;
  
  return (
    <Layout
      title={title}
      description={description}
      wrapperClassName={clsx('data-layout-root', wrapperClassName)}
      pageClassName={pageClassName}
      {...layoutProps}
    >
      <main className={clsx(styles.blogMainContainer, noSidebar && styles.blogMainContainerNoSidebar)}>
        {children}
      </main>
    </Layout>
  );
} 
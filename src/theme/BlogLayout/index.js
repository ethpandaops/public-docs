import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function BlogLayout(props) {
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
      wrapperClassName={clsx('blog-layout-root', wrapperClassName)}
      pageClassName={pageClassName}
      {...layoutProps}
    >
      <main className={clsx(styles.blogMainContainer, noSidebar && styles.blogMainContainerNoSidebar)}>
        {children}
      </main>
    </Layout>
  );
} 
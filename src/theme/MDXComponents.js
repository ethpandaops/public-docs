import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import MDImporter from '../plugins/md-importer-plugin';

export default {
  ...MDXComponents,
  MDImporter: MDImporter,
}; 
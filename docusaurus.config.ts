import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import fs from 'fs';
import path from 'path';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Try to load announcement data from file
let announcementBarProps = {
  id: 'announcement_bar',
  content: 'Explore Ethereum infrastructure tools by ethPandaOps! 🐼',
  backgroundColor: '#00a550',
  textColor: '#fff',
  isCloseable: false,
};

try {
  // Check if the announcement data file exists
  const announcementDataPath = path.join(__dirname, 'announcement-data.json');
  if (fs.existsSync(announcementDataPath)) {
    const announcementData = JSON.parse(fs.readFileSync(announcementDataPath, 'utf8'));
    announcementBarProps = {
      ...announcementBarProps,
      ...announcementData,
    };
  }
} catch (error) {
  console.warn('Failed to load dynamic announcement data:', error);
}

const config: Config = {
  title: 'ethPandaOps',
  tagline: 'Ethereum Infrastructure Tools & Services',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.ethpandaops.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  onBrokenAnchors: 'ignore',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ethpandaops', // Usually your GitHub org/user name.
  projectName: 'public-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Configure head tags for favicons and touch icons
  headTags: [
    // Favicons
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/img/apple-touch-icon.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/img/favicon-32x32.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/img/favicon-16x16.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'msapplication-TileColor',
        content: '#4d8df6',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'theme-color',
        content: '#ffffff',
      },
    },
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // MDX configuration for client components
  markdown: {
    mermaid: true,
    mdx1Compat: {
      comments: false,
      admonitions: false,
      headingIds: false,
    },
  },

  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'data',
        routeBasePath: 'data',
        path: './data',
        blogTitle: 'Data',
        blogDescription: 'ethPandaOps Data',
        blogSidebarTitle: 'All Data Items',
        blogSidebarCount: 'ALL',
        postsPerPage: 10,
        showReadingTime: false,
        onUntruncatedBlogPosts: 'ignore',
        blogListComponent: '@theme/DataListPage',
        blogPostComponent: '@theme/DataPostPage',
        blogTagsListComponent: '@theme/DataTagsListPage',
        blogTagsPostsComponent: '@theme/DataTagsPostsPage',
      },
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts'
        },
        blog: {
          onUntruncatedBlogPosts: 'ignore',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          routeBasePath: 'posts',
          postsPerPage: 10,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All Blog Posts',
        },
        theme: {
          customCss: [
            './src/css/custom.css',
            './src/css/blog.css',
            './src/css/data.css',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/panda-social-card.jpg',
    announcementBar: announcementBarProps,
    navbar: {
      title: 'ethPandaOps',
      logo: {
        alt: 'ethPandaOps Logo',
        src: 'https://ethpandaops.io/logo.png',
      },
      items: [
        {
          label: 'Tooling',
          to: '/docs/tooling/overview',
          position: 'left',
        },
        {
          label: 'Blog',
          to: '/posts',
          position: 'left',
        },
        {
          label: 'Data',
          to: '/data',
          position: 'left',
        },
        {
          label: 'Links',
          to: '/links',
          position: 'left',
        },
        {
          label: 'Team',
          to: '/team',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'Documentation',
          position: 'left',
          items: [
            {
              label: 'Introduction',
              to: '/docs',
            },
            {
              label: 'Guides',
              to: '/docs/guides',
            },
            {
              label: 'Node Operators',
              to: '/docs/guides/node-operators',
            },
            {
              label: 'Client Developers',
              to: '/docs/guides/client-developers',
            },
            {
              label: 'Data Analysts',
              to: '/docs/guides/data-analysts',
            },
          ],
        },
        {
          href: 'https://github.com/ethpandaops',
          label: 'GitHub',
          position: 'right',
        }
      ],
    },
    mermaid: {
      theme: { light: 'neutral', dark: 'forest' },
    },
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_API_KEY',
      indexName: 'YOUR_INDEX_NAME',
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Navigation',
          items: [
            {
              label: 'Tooling',
              to: '/docs/tooling/overview',
            },
            {
              label: 'Blog',
              to: '/posts',
            },
            {
              label: 'Data',
              to: '/data',
            },
            {
              label: 'Links',
              to: '/links',
            },
            {
              label: 'Team',
              to: '/team',
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ethpandaops',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/ethpandaops',
            },
            {
              label: 'Eth R&D Discord',
              href: 'https://discord.com/invite/qGpsxSA',
            },
            {
              label: 'The Lab',
              href: 'https://lab.ethpandaops.io/',
            },
          ],
        },
        {
          title: 'Guides',
          items: [
            {
              label: 'Node Operator Guides',
              to: '/docs/guides/node-operators',
            },
            {
              label: 'Client Developer Guides',
              to: '/docs/guides/client-developers',
            },
            {
              label: 'Data Analyst Guides',
              to: '/docs/guides/data-analysts',
            },
            {
              label: 'Contributoor Setup',
              to: '/docs/guides/node-operators/contributoor',
            },
          ],
        }
      ],
      copyright: `ethPandaOps © ${new Date().getFullYear()} | Built with ❤️ for the Ethereum community`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash'],
    },
  } satisfies Preset.ThemeConfig,
  
  // Update custom fields - remove defaultBlogImage
  customFields: {},
};

export default config;

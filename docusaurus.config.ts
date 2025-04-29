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
  isCloseable: true,
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

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  plugins: [],

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ethpandaops/public-docs/tree/main/',
        },
        blog: {
          onUntruncatedBlogPosts: 'ignore',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ethpandaops/public-docs/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          // Use 'posts' as the URL path instead of 'blog'
          routeBasePath: 'posts',
        },
        theme: {
          customCss: [
            './src/css/custom.css',
            './src/css/blog.css',
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
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
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
              label: 'Tooling',
              to: '/docs/tooling/overview',
            },
            {
              label: 'Team',
              to: '/team',
            },
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
    },
  } satisfies Preset.ThemeConfig,
  
  // Update custom fields - remove defaultBlogImage
  customFields: {},
};

export default config;

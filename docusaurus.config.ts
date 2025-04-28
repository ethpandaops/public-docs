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

  plugins: [],

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
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ['rss', 'atom'],
        //     xslt: true,
        //   },
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/ethpandaops/public-docs/tree/main/',
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: 'warn',
        //   onInlineAuthors: 'warn',
        //   onUntruncatedBlogPosts: 'warn',
        // },
        theme: {
          customCss: './src/css/custom.css',
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
          type: 'dropdown',
          label: 'Documentation',
          position: 'left',
          items: [
            {
              label: 'Introduction',
              to: '/docs',
            },
            {
              label: 'Onboarding',
              to: '/docs/onboarding/guide',
            },
            {
              label: 'Tooling',
              to: '/docs/tooling/overview',
            },
          ],
        },
        {
          label: 'Onboarding',
          to: '/docs/onboarding/guide',
          position: 'left',
        },
        {
          label: 'Tooling',
          to: '/docs/tooling/overview',
          position: 'left',
        },
        {
          label: 'Team',
          to: '/team',
          position: 'left',
        },
        {
          href: 'https://github.com/ethpandaops',
          label: 'GitHub',
          position: 'right',
        }
      ],
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
              label: 'Onboarding',
              to: '/docs/onboarding/guide',
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
          title: ' ',
          className: 'footer__logo-hidden',
          items: [
            {
              label: ' ',
              to: 'https://ethpandaops.io',
              className: 'footer__logo-hidden',
            },
          ],
        },
      ],
      logo: {
        alt: 'ethPandaOps Logo',
        src: 'https://ethpandaops.io/logo.png',
        href: 'https://ethpandaops.io',
        width: 100,
      },
      copyright: `ethPandaOps © ${new Date().getFullYear()} | Built with ❤️ for the Ethereum community`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

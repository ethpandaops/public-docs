import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/index',
        {
          type: 'category',
          label: 'Node Operators',
          link: {
            type: 'generated-index',
            title: 'Node Operator Guides',
            slug: '/guides/node-operators',
          },
          items: [
            'guides/node-operators/contributoor',
          ],
        },
        {
          type: 'category',
          label: 'Client Developers',
          link: {
            type: 'generated-index',
            title: 'Client Developer Guides',
            slug: '/guides/client-developers',
          },
          items: [
            {
              type: 'doc',
              id: 'guides/client-developers/api-access',
              label: 'API Access',
            },
            {
              type: 'doc',
              id: 'guides/client-developers/vpn-access',
              label: 'VPN Access',
            },
            {
              type: 'doc',
              id: 'guides/client-developers/node-logs',
              label: 'Accessing Node Logs',
            },
          ],
        },
        {
          type: 'category',
          label: 'Data Analysts',
          link: {
            type: 'generated-index',
            title: 'Data Analyst Guides',
            slug: '/guides/data-analysts',
          },
          items: [
            {
              type: 'category',
              label: 'Xatu Stack',
              link: {
                type: 'generated-index',
                title: 'Xatu Stack Guides',
                slug: '/guides/data-analysts/xatu-stack',
              },
              items: [
                'guides/data-analysts/xatu-stack/intro',
                'guides/data-analysts/xatu-stack/components',
                {
                  type: 'category',
                  label: 'Clickhouse',
                  items: [
                    'guides/data-analysts/xatu-stack/clickhouse/intro',
                    'guides/data-analysts/xatu-stack/clickhouse/example-queries',
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Tooling',
      link: {
        type: 'doc',
        id: 'tooling/overview',
      },
      items: [
        'tooling/overview',
        {
          type: 'category',
          label: 'Network Observability',
          items: [
            'tooling/contributoor',
            'tooling/dora',
            'tooling/forky',
            'tooling/lab',
            'tooling/tracoor',
            {
              type: 'category',
              label: 'Xatu',
              link: {
                type: 'doc',
                id: 'tooling/xatu/intro',
              },
              items: [
                'tooling/xatu/intro'
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Testing & Validation',
          items: [
            'tooling/assertoor',
            'tooling/genesis-generator',
            'tooling/kurtosis',
          ],
        },
        {
          type: 'category',
          label: 'Deployment & Operations',
          items: [
            'tooling/checkpointz',
            'tooling/dugtrio',
            'tooling/metrics-exporter',
            'tooling/snapshotter',
          ],
        },
        {
          type: 'category',
          label: 'Protocol Development',
          items: [
            'tooling/funding-vault',
            'tooling/mempool-bridge',
            'tooling/spamoor',
          ],
        },
      ],
    },
  ],
};

export default sidebars;

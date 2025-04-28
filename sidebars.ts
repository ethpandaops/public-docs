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
  // Main sidebar with all documentation
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Onboarding',
      link: {
        type: 'doc',
        id: 'onboarding/intro',
      },
      items: [
        'onboarding/intro',
        {
          type: 'doc',
          id: 'onboarding/API',
          label: 'API Access',
        },
        {
          type: 'doc',
          id: 'onboarding/VPN',
          label: 'VPN Access',
        },
        {
          type: 'doc',
          id: 'onboarding/logs',
          label: 'Accessing Node Logs',
        },
      ],
    },
    {
      type: 'category',
      label: 'Tooling',
      link: {
        type: 'doc',
        id: 'tooling/intro',
      },
      items: [
        'tooling/intro',
        {
          type: 'category',
          label: 'Network Observability',
          items: [
            'tooling/contributoor',
            'tooling/dora',
            'tooling/forky',
            'tooling/lab',
            'tooling/tracoor',
            'tooling/xatu',
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

---
slug: contributoor-beacon-node-companion
title: 'Contributoor: A Lightweight Beacon Node Companion'
description: "We're excited to announce Contributoor; a new monitoring and data-gathering tool that helps improve Ethereum's network visibility while running seamlessly alongside your beacon node."
authors: [matty, samcm, savid]
tags: [xatu, consensus layer]
image: img/blog/contributoor-beacon-node-companion.png
---

import GitHubRepo from '@site/src/components/GitHubRepo';

We're excited to announce **[Contributoor](https://github.com/ethpandaops/contributoor)**, a new monitoring and data-gathering tool that helps improve Ethereum's network visibility while running seamlessly alongside your beacon node. Think of it as a streamlined version of [Xatu Sentry](https://ethpandaops.io/posts/contribute-to-xatu-data/) with a smaller footprint, fewer dependencies, and a much simpler setup process. For more info on Xatu Sentry, check out our [post on contributing to the Xatu dataset](https://ethpandaops.io/posts/contribute-to-xatu-data/).

### Why Contributoor?

We're building a network of home stakers to provide comprehensive and decentralized timing data for Ethereum. We started with a small group, and contributoor is a step towards including the broader community as our primary data source.

- **Lightweight**: This tool is slimmed down and focuses on the essential features you need.
- **Easy Installation**: We built an installer—[Contributoor Installer](https://github.com/ethpandaops/contributoor-installer)—so anyone can get started in minutes.
- **Reduced Complexity**: Contributoor is set up to get you running faster, with minimal overhead compared to a typical Xatu Sentry installation.

### How It Works

Contributoor runs as a sidecar process to your beacon node, collecting important metrics and events without impacting your node's performance. It:

- Connects to your beacon node's API
- Monitors key events and metrics
- Securely forwards data to our collection endpoints

### What Does It Do?

Contributoor captures the same [events Xatu Sentry does](https://ethpandaops.io/posts/contribute-to-xatu-data/#events-collected), including:

- `beacon_api_eth_v1_events_block`
- `beacon_api_eth_v1_events_blob_sidecar`
- `beacon_api_eth_v1_events_chain_reorg`
- `beacon_api_eth_v1_events_finalized_checkpoint`
- `beacon_api_eth_v1_events_head_v2`

This data helps researchers and developers:

- Optimize network performance
- Identify potential issues early
- Improve client implementations
- Understand network behavior during upgrades

### Getting Started
**Installation**:
```bash
# Download the script.
curl -O https://raw.githubusercontent.com/ethpandaops/contributoor-installer/refs/heads/master/install.sh

# Inspect the script contents.
less install.sh

# Make it executable and run if you're satisfied with the contents.
chmod +x install.sh && ./install.sh
```

Alternatively, if you trust the source, you can run this one-liner:
```bash
curl -O https://raw.githubusercontent.com/ethpandaops/contributoor-installer/refs/heads/master/install.sh && chmod +x install.sh && ./install.sh
```

> **Using eth-docker?** Contributoor can be run as part of your eth-docker setup - [check it out here](https://github.com/ethpandaops/contributoor-installer?tab=readme-ov-file#getting-started).

**Managing Contributoor**:

After installation, you can manage Contributoor using a single command-line interface:

```bash
contributoor start     # Start the service
contributoor stop      # Stop the service
contributoor status    # Check service status
contributoor restart   # Restart the service
contributoor config    # View/edit configuration
contributoor update    # Update to latest version
contributoor logs      # Show logs
```

For more details or troubleshooting tips, check out the main [Contributoor GitHub repository](https://github.com/ethpandaops/contributoor). 

### Staying Up to Date

It's a good idea to periodically check contributoor to ensure you're on the latest version!

Keeping up to date is simple - just run:

```bash
contributoor update
```

![Updating Contributoor](/img/blog/contributoor-update.gif)

### Ready to Contribute?

By offering Contributoor as a streamlined data collection tool, we hope to empower the Ethereum community to gather valuable insights and drive meaningful improvements to the network. 

We're gradually scaling up our data collection network, starting with home stakers. If you run your own beacon node and want to help improve Ethereum's network visibility:

- **Who Can Join**: For now, individual home stakers running their own beacon nodes
- **Getting Started**: We need some basic details to get you started - [Apply here](https://forms.gle/S7g5g8nB8aGG8aTX6)
- **What's Next**: We're expanding access as we scale, with home stakers being our primary focus

<GitHubRepo repo="ethpandaops/contributoor" />

<GitHubRepo repo="ethpandaops/contributoor-installer" />

### Get in Touch

- Join our [Telegram](https://t.me/+JanoQFu_nO8yNzQ1) group
- Find us on [Twitter](https://x.com/ethpandaops)

> 🤫 Psst... we've got something cooking in the [lab 🧪](https://lab.ethpandaops.io/xatu) that lets you peek at some of the contributed data. More on that soon!

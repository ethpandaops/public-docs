---
sidebar_position: 2
---

# Contributoor

:::tip GitHub Repository
Visit the [Contributoor repository](https://github.com/ethpandaops/contributoor-installer) for the latest code, documentation, and contribution guidelines.
:::

Contributoor is a lightweight monitoring and data-gathering tool that helps improve Ethereum's network visibility while running seamlessly alongside your beacon node. It allows node operators to easily share data about their nodes and network conditions, contributing to a more transparent and observable Ethereum ecosystem.

## What is Contributoor?

Contributoor is designed to collect and share metrics from Ethereum consensus clients. By installing Contributoor on your node, you help provide valuable data about the Ethereum network's health, performance, and behavior. Think of it as a streamlined version of Xatu Sentry with a smaller footprint, fewer dependencies, and a much simpler setup process.

## Key Benefits

- **Network Visibility**: Increases overall visibility into the Ethereum network's performance
- **Data Collection**: Gathers important metrics about consensus clients and network conditions
- **Community Contribution**: Allows node operators to contribute to network monitoring
- **Lightweight**: Designed to have minimal impact on node performance with reduced complexity compared to Xatu
- **Easy Installation**: Built with a dedicated installer so anyone can get started in minutes
- **Privacy-Focused**: Collects only necessary data with transparency about what is shared

## What Data Does It Collect?

Contributoor captures several important beacon chain events, including:

- Beacon API block events
- Blob sidecar events
- Chain reorganization events
- Finalized checkpoint events
- Head events (v2)

## Use Cases

- **Network Analysis**: Data is used to analyze network-wide patterns and performance
- **Protocol Development**: Insights help inform protocol improvements
- **Client Improvements**: Client teams can identify and address issues based on real-world data
- **Node Operator Feedback**: Provides a way for node operators to contribute to network health
- **Network Optimization**: Helps researchers and developers optimize network performance
- **Upgrade Monitoring**: Understand network behavior during protocol upgrades

## How It Works

Contributoor runs as a sidecar process to your beacon node, connecting to your beacon node's API and monitoring key events and metrics. This data is then securely transmitted to ethPandaOps infrastructure, where it's aggregated with data from other nodes to provide network-wide insights.

## Who Can Join

Currently, Contributoor is primarily focused on individual home stakers running their own beacon nodes. The ethPandaOps team is building a network of home stakers to provide comprehensive and decentralized timing data for Ethereum, with plans to expand access as they scale.

## Further Resources

- [GitHub Repository](https://github.com/ethpandaops/contributoor-installer)
- [Release Blog Post](https://ethpandaops.io/posts/contributoor-beacon-node-companion/) 
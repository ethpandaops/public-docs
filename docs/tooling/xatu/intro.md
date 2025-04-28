---
sidebar_position: 1
---

# Xatu

:::tip GitHub Repository
Visit the [Xatu repository](https://github.com/ethpandaops/xatu) for the latest code, documentation, and contribution guidelines.
:::

Xatu is a distributed monitoring tool designed specifically for Ethereum networks, providing comprehensive visibility into network behavior and performance.

## What is Xatu?

Xatu acts as a sophisticated monitoring and data collection system for Ethereum networks. It connects to multiple consensus and execution layer clients, aggregates events and metrics, and forwards this data to various destinations for analysis and visualization. The distributed architecture allows Xatu to provide a network-wide view of Ethereum's operation, making it invaluable for operators, developers, and researchers.

## Key Features

- **Comprehensive Event Collection**: Capture beacon chain events, execution layer data, and validator activities
- **Distributed Architecture**: Deploy multiple collectors across the network for complete coverage
- **Multi-client Support**: Compatible with all major Ethereum client implementations
- **Flexible Data Sinks**: Stream data to Kafka, databases, or custom endpoints
- **Configurable Filtering**: Focus collection on specific event types or network segments
- **Low Overhead**: Minimal impact on node performance
- **Real-time Processing**: Stream and process events as they occur
- **Scalable Design**: From single-node to network-wide deployment

## Data Types

Xatu collects various types of data:

- **Beacon Chain Events**:
  - Block proposals and attestations
  - Validator activations and exits
  - Fork choice updates
  - Finality checkpoints

- **Execution Layer Data**:
  - New blocks and transactions
  - Gas price statistics
  - Network state updates
  - Reorgs and uncle blocks

- **Node Metrics**:
  - Peer counts and network connectivity
  - Sync status and performance
  - System resource usage
  - Client-specific metrics

## Available Sub-Components

Xatu is comprised of several components that work together:

- Xatu Server - The central collection and processing server
- Xatu Sentry - Collects data from consensus clients
- Xatu Discovery - Discovers nodes on the network
- Xatu Mimicry - Collects data from the execution layer
- Xatu Cannon - Collects canonical finalized data
- [Clickhouse](/docs/tooling/xatu/clickhouse/intro) - Data storage and analytics platform

## Further Resources

- [GitHub Repository](https://github.com/ethpandaops/xatu)
- [EthPandaOps Published Data](https://ethpandaops.io/data/xatu/) - EthPandaOps publishes all the data collected with Xatu 
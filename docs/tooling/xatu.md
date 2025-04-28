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

## System Architecture

Xatu can run in multiple modes, with each mode being able to run independently. The following components work together to create a comprehensive monitoring system:

### Xatu Server

The centralized server that collects events from various clients and outputs them to various sinks. It:
- Processes and normalizes data
- Applies filtering rules
- Manages persistence
- Handles distribution to data pipelines

### Xatu Sentry

A client that runs alongside an Ethereum consensus client and collects data via the consensus client's Beacon API. The Sentry:
- Connects to your existing consensus client via HTTP server
- Subscribes to beacon chain events
- Collects validator activities and metrics
- Forwards data to the Xatu Server

### Xatu Discovery

A client that uses the Node Discovery Protocol v5 and v4 to discover nodes on the network. It also:
- Attempts to connect to execution layer nodes
- Collects metadata from discovered nodes
- Maps the network topology

### Xatu Mimicry

A client that collects data from the execution layer P2P network, providing insight into:
- Transaction propagation
- Network behavior
- Execution layer metrics

### Xatu Cannon

A client that runs alongside an Ethereum consensus client and collects canonical finalized data via the Beacon API, focusing on:
- Finalized block data
- Historical chain data
- Canonical state information

The components interact as shown in this simplified diagram:

```
             ┌───────────┐
             │ CONSENSUS │
             │P2P NETWORK│
             └─────▲─────┘
                   │
      ┌────────────┘─────────────┐
      │                          │
┌─────▲─────┐              ┌─────▲─────┐       ┌───────────┐
│ CONSENSUS │              │ ARMIARMA  │       │ EXECUTION │
│   CLIENT  ◄─────┐        │           │       │P2P NETWORK│
└─────▲─────┘     │        └─────▲─────┘       └─────▲─────┘
      │           │              │             ┌─────┘───────┐
      │           │              │             │             │
  ┌───▼────┐ ┌────▼─────┐  ┌─────▼─────┐ ┌─────▼─────┐ ┌─────▼─────┐
  │  XATU  │ │   XATU   │  │   XATU    │ │   XATU    │ │   XATU    │
  │ SENTRY │ │  CANNON  │  │   SAGE    │ │  MIMICRY  │ │ DISCOVERY │
  └───┬────┘ └─────┬────┘  └─────┬─────┘ └─────┬─────┘ └─────┬─────┘
      │            │             │             │             │
      │            │             │             │             │
      │       ┌────▼─────┐       │             │             │
      └───────►          ◄───────┘─────────────┘─────────────┘
              │   XATU   │
              │  SERVER  │    ┌─────────────┐
              │          ◄────► PERSISTENCE │
              │          │    └─────────────┘
              └─────┬────┘
                    │
                    │
                    ▼
              DATA PIPELINE
```

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

## Use Cases

Xatu provides valuable data and insights for various purposes:

- **Network Monitoring**: Track the health and performance of Ethereum networks
- **Protocol Research**: Analyze network behavior and client implementations
- **Validator Operations**: Monitor validator performance and rewards
- **Security Analysis**: Detect network anomalies and potential issues
- **Dashboard Creation**: Build visualizations and real-time monitoring tools

## Further Resources

- [GitHub Repository](https://github.com/ethpandaops/xatu)
- [EthPandaOps Published Data](https://ethpandaops.io/data/xatu/) - EthPandaOps publishes all the data collected with Xatu 
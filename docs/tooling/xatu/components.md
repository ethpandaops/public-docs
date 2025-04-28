---
sidebar_position: 2
---

# System Architecture

Xatu consists of multiple components that work together to provide comprehensive Ethereum network monitoring. Each component serves a specific purpose and can be deployed independently or as part of the complete system.

## Architecture Overview

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

## Component Descriptions

### Xatu Server

The centralized server that collects events from various clients and outputs them to various sinks:

- **Role**: Central hub for data collection and processing
- **Features**:
  - Data normalization and transformation
  - Filtering capabilities
  - Management of persistence and data pipelines
  - Support for multiple output destinations
- **Use Cases**: Core component for any Xatu deployment, essential for aggregation

### Xatu Sentry

A client that collects data from Ethereum consensus clients via the Beacon API:

- **Role**: Consensus layer monitoring
- **Features**:
  - Connects to existing consensus clients via HTTP
  - Subscribes to beacon chain events (attestations, blocks, etc.)
  - Collects validator activities
  - Real-time metrics gathering
- **Use Cases**: Monitoring validator operations, consensus layer analysis

### Xatu Discovery

A client that uses network discovery protocols to map the Ethereum network:

- **Role**: Network topology mapping
- **Features**:
  - Implements Discovery Protocol v5 and v4
  - Attempts connections to execution layer nodes
  - Collects node metadata (client type, version, etc.)
  - Geographic distribution information
- **Use Cases**: Network health monitoring, client diversity analysis

### Xatu Mimicry

A client that collects data from the execution layer P2P network:

- **Role**: Execution layer monitoring
- **Features**:
  - Acts as an execution layer node
  - Monitors transaction propagation
  - Captures network behavior
  - Collects execution layer metrics
- **Use Cases**: Transaction analysis, network performance evaluation

### Xatu Cannon

A client that collects canonical finalized data from consensus clients:

- **Role**: Historical data collection
- **Features**:
  - Focuses on finalized block data
  - Collects historical chain data
  - Gathers canonical state information
  - Provides data consistency checks
- **Use Cases**: Long-term analysis, historical data archiving

## Deployment Scenarios

Xatu components can be deployed in various configurations depending on monitoring needs:

### Minimal Deployment
- Xatu Server + Xatu Sentry
- Suitable for basic validator monitoring

### Network Research
- All components
- Provides comprehensive network visibility

### Transaction Monitoring
- Xatu Server + Xatu Mimicry
- Focuses on transaction propagation and mempool analysis

### Client Diversity Tracking
- Xatu Server + Xatu Discovery
- Tracks client implementations across the network

## Further Information

For more detailed information on each component, refer to their specific documentation:

- [Xatu Server](/docs/xatu/server)
- [Xatu Sentry](/docs/xatu/sentry)
- [Xatu Discovery](/docs/xatu/discovery)
- [Xatu Mimicry](/docs/xatu/mimicry)
- [Xatu Cannon](/docs/xatu/cannon) 
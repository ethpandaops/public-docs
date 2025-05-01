---
sidebar_position: 4
title: Snapshotter
---

import RelatedLinks from '@site/src/components/RelatedLinks';

<RelatedLinks 
  githubRepo="ethpandaops/snapshotter"
  links={[
    {
      name: "Public Snapshots",
      url: "/data/snapshots/"
    }
  ]}
  />

Snapshotter is a specialized tool for capturing and managing Ethereum node data snapshots, enabling fast node bootstrapping and data recovery.

## What is Snapshotter?

Snapshotter automates the process of creating, managing, and distributing Ethereum node data snapshots. It helps node operators capture consistent data states from both execution and consensus clients, compress them efficiently, and make them available for node bootstrapping. By using Snapshotter, operators can rapidly deploy new nodes, recover from failures, or provide reference data sets for testing and development.

## Key Features

- **Execution & Consensus Client Support**: Create snapshots for both layers
- **Client Agnostic**: Support for all major Ethereum client implementations
- **Scheduled Snapshots**: Automate regular snapshot creation
- **Incremental Snapshots**: Efficiently capture only changes since last snapshot
- **Compression**: Minimize storage requirements with efficient compression
- **Metadata Tracking**: Store and retrieve information about each snapshot
- **Snapshot Catalog**: Maintain a searchable index of available snapshots
- **Remote Storage Integration**: Store snapshots on cloud providers (S3, GCS, etc.)
- **Distribution API**: Share snapshots with other node operators

## Public Snapshots

EthPandaOps provides public data directory snapshots for Ethereum execution clients on several networks. These snapshots are updated automatically every 2-3 days.

### Available Networks and Clients

Snapshots are currently available for:

- **Networks**: Sepolia, Hoodi, Holesky, Mainnet, and other testnets
- **Clients**: Geth, Nethermind, Besu, Erigon, Reth

### Snapshot Format

The data snapshots are packaged into a tar archive, compressed using zstandard (`.tar.zst` files).

### URL Naming Conventions

Snapshots follow a consistent naming pattern:
```
https://snapshots.ethpandaops.io/{network_name}/{client_name}/latest/snapshot.tar.zst
```

Additional metadata is available at:
```
https://snapshots.ethpandaops.io/{network_name}/{client_name}/latest/_snapshot_eth_getBlockByNumber.json
https://snapshots.ethpandaops.io/{network_name}/{client_name}/latest/_snapshot_web3_clientVersion.json
```

## Use Cases

- **Fast Node Provisioning**: Rapidly deploy new nodes from snapshots
- **Disaster Recovery**: Quickly recover from node failures
- **Testing & Development**: Start with consistent, production-like data
- **Data Analysis**: Capture point-in-time states for offline analysis
- **Network Bootstrapping**: Distribute common data to accelerate network growth
- **Client Migration**: Move data between different client implementations

---
sidebar_position: 2
---

# Setting Up Contributoor

This guide walks you through setting up Contributoor, a tool for contributing Ethereum node metrics to community dashboards.

## Overview

Contributoor allows node operators to securely share metrics with the ethPandaOps community, helping build a comprehensive view of network health. By contributing your node metrics, you help improve understanding of the Ethereum network and assist in identifying issues.

## Quick Start Installation

1. **Prerequisites**
   - A running Ethereum node (consensus and/or execution client)
   - Docker and Docker Compose installed (recommended deployment method)

2. **Get the configuration files**
   ```bash
   git clone https://github.com/ethpandaops/contributoor.git
   cd contributoor
   ```

3. **Configure your setup**
   - Edit the `config.yaml` file to match your node setup
   - Specify which metrics you want to share

4. **Start Contributoor**
   ```bash
   docker-compose up -d
   ```

## Advanced Configuration

Contributoor can be configured to collect metrics from various types of Ethereum clients and setups:

- Multiple clients on different machines
- Various client combinations (Geth, Erigon, Lighthouse, Prysm, etc.)
- Custom metric collection intervals

Check the [Contributoor documentation](/docs/tooling/contributoor) for detailed configuration options.

## Dashboard Access

After your metrics are being collected, you can view aggregated data on the community dashboards:

- Visit [The Lab](https://lab.ethpandaops.io/) to see network-wide metrics
- Check for your node's contributions in the contributors section

## Troubleshooting

Common issues and their solutions:

- **Missing metrics**: Check your client's metrics endpoint accessibility
- **Connection issues**: Verify network connectivity and firewall settings
- **High resource usage**: Adjust collection intervals in configuration

For more help, join the [ethPandaOps Discord](https://discord.gg/ethereum) community. 
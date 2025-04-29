---
sidebar_position: 4
id: node-logs
---

# Accessing Node Logs

This documentation covers how to access logs for testnet Ethereum nodes and clients operated by the ethPandaOps Team.

## Overview

Having access to node logs is essential for debugging issues, monitoring performance, and understanding the behavior of Ethereum clients. There are three primary methods for accessing logs from our testnet infrastructure:

1. **Docker Container Logs**: Direct access via SSH
2. **LogCLI**: Command-line interface for querying logs
3. **Grafana**: Visualizing logs through the Explore page or dashboards

## Docker Container Logs

If you have SSH access to the host machines, you can directly access logs from Docker containers.

```bash
# Example commands - to be expanded
ssh user@testnet-node
docker logs -f client-container-name
```

## LogCLI

LogCLI is a command-line tool that allows you to query logs stored in Loki.

```bash
# Example LogCLI setup and usage - to be expanded
logcli query '{job="beacon-node"}' --output=raw
```

## Grafana Access

Logs can be viewed and analyzed through Grafana's interface.

### Explore Page

The Explore page in Grafana allows you to run custom queries against log data.

### Dashboards

Several pre-configured dashboards provide visualizations and log panels specific to different client types and metrics.

## Common Log Queries

```logql
# Example LogQL queries for common scenarios - to be expanded
{job="beacon-node"} |= "error"
{container="lighthouse"} |= "slot"
```

## Permissions and Access Control

Details about the different permission levels and how to request access to logs. 